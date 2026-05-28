# -*- coding: utf-8 -*-
"""
==================================================
ALPHA INSIGHT: REAL-TIME FASTAPI BACKEND SERVER
==================================================
This server retrieves real-time stock information, key financial stats, 
and historical charts for global and Korean stocks using yfinance.

Dependencies to install:
    pip install fastapi uvicorn yfinance pandas
To run the server:
    python server.py
"""

import uvicorn
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import yfinance as yf
import pandas as pd
import math
from datetime import datetime
import requests
import time
import os
import google.generativeai as genai

KIS_APP_KEY = os.environ.get("KIS_APP_KEY", "PSIIeGwEzCsZfKNlorM5Ah6tanXxtjDH3oYY")
KIS_APP_SECRET = os.environ.get("KIS_APP_SECRET", "iEwRssXSvvvLzNRTbDmCxW5TimENnL4xV1dIR2/VQn9llFoNG56OifcB1fIkcS8OQj8qnq38kDrGTBUkUsoQ9okLqGiwClVUEiSnsTs+OplfdR6+hrI9fZ6XF2c//pZnSvsxEDX0A1qfUag0kV+6IlilFEy1zEqziMSy4ERjVPA5Dhx41Do=")
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)

KIS_ACCESS_TOKEN = None
KIS_TOKEN_EXPIRED = 0

def get_kis_access_token():
    global KIS_ACCESS_TOKEN, KIS_TOKEN_EXPIRED
    now = time.time()
    if KIS_ACCESS_TOKEN and now < KIS_TOKEN_EXPIRED:
        return KIS_ACCESS_TOKEN
        
    url = "https://openapi.koreainvestment.com:9443/oauth2/tokenP"
    headers = {"content-type": "application/json"}
    body = {
        "grant_type": "client_credentials",
        "appkey": KIS_APP_KEY,
        "appsecret": KIS_APP_SECRET
    }
    
    try:
        res = requests.post(url, headers=headers, json=body)
        if res.status_code == 200:
            data = res.json()
            KIS_ACCESS_TOKEN = data.get("access_token")
            # expires_in is seconds (usually 86400)
            expires_in = data.get("expires_in", 86400)
            KIS_TOKEN_EXPIRED = now + expires_in - 3600 # renew 1 hour early
            return KIS_ACCESS_TOKEN
    except Exception as e:
        print("KIS API Token Error:", e)
    return None

def get_kis_current_price(ticker_6digit: str):
    token = get_kis_access_token()
    if not token:
        return None
        
    url = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-price"
    headers = {
        "authorization": f"Bearer {token}",
        "appkey": KIS_APP_KEY,
        "appsecret": KIS_APP_SECRET,
        "tr_id": "FHKST01010100"
    }
    params = {
        "FID_COND_MRKT_DIV_CODE": "J",
        "FID_INPUT_ISCD": ticker_6digit
    }
    
    try:
        res = requests.get(url, headers=headers, params=params)
        if res.status_code == 200:
            data = res.json()
            output = data.get("output", {})
            # 'stck_prpr' is current price, 'prdy_vrss' is change, 'prdy_ctrt' is change rate
            if output and "stck_prpr" in output and output["stck_prpr"]:
                return {
                    "price": float(output["stck_prpr"]),
                    "change": float(output["prdy_vrss"]),
                    "change_percent": float(output["prdy_ctrt"])
                }
    except Exception as e:
        print("KIS API Price Fetch Error:", e)
    return None

def get_kis_us_price(ticker: str):
    token = get_kis_access_token()
    if not token:
        return None
        
    url = "https://openapi.koreainvestment.com:9443/uapi/overseas-price/v1/quotations/price"
    headers = {
        "authorization": f"Bearer {token}",
        "appkey": KIS_APP_KEY,
        "appsecret": KIS_APP_SECRET,
        "tr_id": "HHDFS00000300"
    }
    
    # Identify Exchange (Basic mapping for common stocks)
    exchange = "NAS"
    if ticker in ["TSLA", "AAPL", "NVDA", "MSFT", "GOOGL"]:
        exchange = "NAS"
    else:
        exchange = "NYS"
        
    params = {
        "AUTH": "",
        "EXCD": exchange,
        "SYMB": ticker
    }
    
    try:
        res = requests.get(url, headers=headers, params=params)
        if res.status_code == 200:
            data = res.json()
            output = data.get("output", {})
            if output and "last" in output and output["last"]:
                change = float(output.get("diff", 0))
                rate = float(output.get("rate", 0))
                sign = output.get("sign", "")
                if sign in ["5", "6", "7"] and change > 0:
                    change = -change
                if sign in ["5", "6", "7"] and rate > 0:
                    rate = -rate
                    
                return {
                    "price": float(output["last"]),
                    "change": change,
                    "change_percent": rate
                }
    except Exception as e:
        print("KIS US API Error:", e)
    return None

app = FastAPI(
    title="Alpha Insight Backend API",
    description="Real-time stock price and financial intelligence feed",
    version="1.0.0"
)

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def format_market_cap(value):
    if not value or math.isnan(value):
        return "N/A"
    
    # Check if Korean currency or USD
    if value > 1e12:
        return f"{value / 1e12:.1f}조원" if value > 5e11 else f"${value / 1e12:.2f}T"
    elif value > 1e9:
        return f"{value / 1e9:.1f}억 원" if value > 5e8 else f"${value / 1e9:.2f}B"
    else:
        return f"${value / 1e6:.1f}M"

def get_clean_ticker(ticker: str) -> str:
    ticker = ticker.upper().strip()
    # Check if a raw 6-digit number is passed for Korean stocks and append .KS
    if ticker.isdigit() and len(ticker) == 6:
        return f"{ticker}.KS"
    return ticker

def calculate_rsi(prices, period=14):
    if len(prices) < period + 1:
        return 50.0
    try:
        s = pd.Series(prices)
        delta = s.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        rs = gain / loss.replace(0, 1e-9)
        rsi = 100 - (100 / (1 + rs))
        val = rsi.iloc[-1]
        return 50.0 if math.isnan(val) else float(val)
    except:
        return 50.0

def calculate_macd(prices):
    if len(prices) < 26:
        return "NEUTRAL", "0.00"
    try:
        s = pd.Series(prices)
        ema12 = s.ewm(span=12, adjust=False).mean()
        ema26 = s.ewm(span=26, adjust=False).mean()
        macd_line = ema12 - ema26
        signal_line = macd_line.ewm(span=9, adjust=False).mean()
        
        macd_val = macd_line.iloc[-1]
        sig_val = signal_line.iloc[-1]
        diff = macd_val - sig_val
        
        state = "BULLISH" if diff > 0 else "BEARISH"
        return state, f"{diff:.2f}"
    except:
        return "NEUTRAL", "0.00"

def calculate_sma_cross(prices):
    if len(prices) < 20:
        return "NEUTRAL"
    try:
        s = pd.Series(prices)
        sma5 = s.rolling(window=5).mean().iloc[-1]
        sma20 = s.rolling(window=20).mean().iloc[-1]
        
        if math.isnan(sma5) or math.isnan(sma20):
            return "NEUTRAL"
        return "GOLDEN" if sma5 >= sma20 else "DEATH"
    except:
        return "NEUTRAL"

def calculate_ichimoku_signals(highs, lows, closes):
    if len(closes) < 52:
        return {
            "signal": "HOLD (데이터 부족)",
            "class": "hold",
            "conversion": "NEUTRAL",
            "base": "NEUTRAL",
            "cloud": "NEUTRAL",
            "desc": "데이터가 부족하여 일목균형표를 연산할 수 없습니다."
        }
    
    # Donchian channel midpoint calculations
    # donchian(len) => math.avg(ta.lowest(low, len), ta.highest(high, len))
    def donchian(length):
        sub_highs = highs[-length:]
        sub_lows = lows[-length:]
        return (min(sub_lows) + max(sub_highs)) / 2.0

    try:
        conversion_line = donchian(9)
        base_line = donchian(26)
        lead_line1 = (conversion_line + base_line) / 2.0
        lead_line2 = donchian(52)
        
        cloud_top = max(lead_line1, lead_line2)
        cloud_bottom = min(lead_line1, lead_line2)
        
        current_close = closes[-1]
        
        # Pine Script conditions:
        # buy_signal = (close > conversionLine and close > baseLine and close > cloudTop)
        above_conversion = current_close > conversion_line
        above_base = current_close > base_line
        above_cloud = current_close > cloud_top
        
        # sell_signal = (close < conversionLine and close < baseLine)
        below_conversion = current_close < conversion_line
        below_base = current_close < base_line
        
        if above_conversion and above_base and above_cloud:
            signal_label = "BUY"
            signal_class = "buy"
            desc = (
                f"일목균형표 전략 매수 조건이 완벽히 충족되었습니다! "
                f"현재 주가({current_close:,.2f})가 전환선({conversion_line:,.2f}), 기준선({base_line:,.2f}), "
                f"그리고 선행구름대 상단({cloud_top:,.2f})을 모두 돌파하여 완연한 강세 추세를 증명합니다."
            )
        elif below_conversion and below_base:
            signal_label = "SELL"
            signal_class = "sell"
            desc = (
                f"일목균형표 청산(매도) 조건이 충족되었습니다! "
                f"현재 주가({current_close:,.2f})가 전환선({conversion_line:,.2f}) 및 기준선({base_line:,.2f}) "
                f"두 지지선 아래로 모두 붕괴하여 단기 추세 반전 및 위험 관리가 필요합니다."
            )
        else:
            signal_label = "HOLD"
            signal_class = "hold"
            desc = (
                f"일목균형표 전략 기준 현재는 관망(HOLD) 상태입니다. "
                f"주가가 구름대 내부 또는 전환선({conversion_line:,.2f})과 기준선({base_line:,.2f}) 사이에 "
                f"위치하여 확실한 추세 이탈 방향성(BUY/SELL)이 형성되기를 대기 중입니다."
            )
            
        return {
            "signal": signal_label,
            "class": signal_class,
            "conversion": "BULLISH" if above_conversion else "BEARISH",
            "base": "BULLISH" if above_base else "BEARISH",
            "cloud": "BULLISH" if above_cloud else "BEARISH",
            "desc": desc
        }
    except Exception as e:
        return {
            "signal": "HOLD (오류)",
            "class": "hold",
            "conversion": "NEUTRAL",
            "base": "NEUTRAL",
            "cloud": "NEUTRAL",
            "desc": f"계산 중 오류 발생: {str(e)}"
        }

@app.get("/api/stock/{ticker}")
def get_stock_data(ticker: str, timeframe: str = "1M"):
    clean_ticker = get_clean_ticker(ticker)
    
    try:
        stock = yf.Ticker(clean_ticker)
        
        # 1. Fetch Ticker History based on timeframe
        interval = "1d"
        period = "1mo"
        
        if timeframe == "1D":
            period = "1d"
            interval = "5m"
        elif timeframe == "1W":
            period = "5d"
            interval = "15m"
        elif timeframe == "1M":
            period = "1mo"
            interval = "1d"
        elif timeframe == "1Y":
            period = "1y"
            interval = "1wk"
            
        history = stock.history(period=period, interval=interval)
        
        if history.empty:
            # Fallback to standard 1mo if specific interval fails
            history = stock.history(period="1mo", interval="1d")
            if history.empty:
                raise HTTPException(status_code=404, detail="No price history found for this symbol.")

        # Fetch global VIX index for market fear gauge
        try:
            vix = yf.Ticker("^VIX")
            vix_hist = vix.history(period="1d")
            vix_current = vix_hist["Close"].iloc[-1]
        except:
            vix_current = 15.0  # Safe fallback if ^VIX fetch fails
            
        # Get general stock info
        info = stock.info
        
        # 2. Extract current price and details
        # Try KIS API for Korean stocks first
        is_korean = clean_ticker.endswith(".KS") or clean_ticker.endswith(".KQ")
        current_price = None
        prev_close = None
        change = 0
        change_percent = 0
        
        if is_korean:
            six_digit = clean_ticker.split('.')[0]
            kis_data = get_kis_current_price(six_digit)
            if kis_data:
                current_price = kis_data["price"]
                change = kis_data["change"]
                change_percent = kis_data["change_percent"]
                prev_close = current_price - change
        else:
            # For US stocks
            kis_data = get_kis_us_price(clean_ticker)
            if kis_data:
                current_price = kis_data["price"]
                change = kis_data["change"]
                change_percent = kis_data["change_percent"]
                prev_close = current_price - change

        # Fallback to yfinance if KIS fails or for US stocks
        if current_price is None:
            current_price = info.get("currentPrice") or info.get("regularMarketPrice")
            if current_price is None:
                current_price = history["Close"].iloc[-1]
                
            prev_close = info.get("regularMarketPreviousClose") or info.get("previousClose")
            if prev_close is None and len(history) > 1:
                prev_close = history["Close"].iloc[-2]
            elif prev_close is None:
                prev_close = current_price
                
            change = current_price - prev_close
            change_percent = (change / prev_close) * 100
        
        # 3. Format dynamic currency tags
        currency = "KRW" if is_korean else "USD"
        market = "KOSPI" if clean_ticker.endswith(".KS") else ("KOSDAQ" if clean_ticker.endswith(".KQ") else "NASDAQ/NYSE")

        # 4. Create historical price charts labels
        prices = history["Close"].dropna().tolist()
        
        labels = []
        for index in history.index:
            if timeframe == "1D":
                labels.append(index.strftime("%H:%M"))
            elif timeframe == "1W" or timeframe == "1M":
                labels.append(index.strftime("%m/%d"))
            else:
                labels.append(index.strftime("%Y/%m"))
                
        # Handle zero-division safety
        per = info.get("trailingPE")
        pbr = info.get("priceToBook")
        div_yield = info.get("dividendYield")
        
        # Beautifully structured stats package
        stats = {
            "mktCap": format_market_cap(info.get("marketCap", 0)),
            "vix": f"{vix_current:.2f}",
            "per": f"{per:.2f}배" if per else "N/A",
            "pbr": f"{pbr:.2f}배" if pbr else "N/A",
            "divYield": f"{div_yield * 100:.2f}%" if div_yield else "0.00%"
        }

        # Extract highs and lows for the Ichimoku Donchian calculations
        highs = history["High"].dropna().tolist()
        lows = history["Low"].dropna().tolist()
        
        # ---------------------------------------------
        # 1. MD Quant Signal (Ichimoku Pine Script)
        # ---------------------------------------------
        ichimoku = calculate_ichimoku_signals(highs, lows, prices)
        md_signal_label = ichimoku["signal"]
        md_signal_class = ichimoku["class"]
        md_reason = ichimoku["desc"]
        
        # ---------------------------------------------
        # 2. AI General Signal (RSI, MACD, SMA)
        # ---------------------------------------------
        rsi_val = calculate_rsi(prices)
        macd_state, macd_diff = calculate_macd(prices)
        sma_cross = calculate_sma_cross(prices)
        
        ai_signal_score = 50
        
        if rsi_val < 30:
            ai_signal_score += 25
        elif rsi_val < 45:
            ai_signal_score += 12
        elif rsi_val > 70:
            ai_signal_score -= 25
        elif rsi_val > 55:
            ai_signal_score -= 12
            
        if macd_state == "BULLISH":
            ai_signal_score += 15
        else:
            ai_signal_score -= 15
            
        if sma_cross == "GOLDEN":
            ai_signal_score += 15
        elif sma_cross == "DEATH":
            ai_signal_score -= 15
            
        # VIX fear factor adjustment
        if vix_current > 25:
            ai_signal_score -= 10  # High volatility penalizes buy signals
            
        if ai_signal_score >= 70:
            ai_signal_label = "STRONG BUY"
            ai_signal_class = "strong-buy"
        elif ai_signal_score >= 55:
            ai_signal_label = "BUY"
            ai_signal_class = "buy"
        elif ai_signal_score <= 30:
            ai_signal_label = "STRONG SELL"
            ai_signal_class = "strong-sell"
        elif ai_signal_score <= 45:
            ai_signal_label = "SELL"
            ai_signal_class = "sell"
        else:
            ai_signal_label = "HOLD"
            ai_signal_class = "hold"
            
        trend_direction = "상승세" if change_percent >= 0 else "조정 흐름"
        sma_desc = "5일선이 20일선 위에 위치하여 상승 추세가 견고하게 유지되고 있습니다." if sma_cross == "GOLDEN" else ("5일선이 20일선 아래로 이탈하며 단기 조정 국면을 암시하고 있습니다." if sma_cross == "DEATH" else "단기 이동평균이 밀집하여 강한 추세 전환의 분기점을 형성 중입니다.")
        rsi_desc = f"RSI(14)는 {rsi_val:.1f}로 과매도 구간(BUY 기회)에 인접해 하방 지지력이 매우 높습니다." if rsi_val < 35 else (f"RSI(14)가 {rsi_val:.1f}로 과매수 위험 수준에 도달해 분할 매도를 통한 수익 실현 전략이 안전합니다." if rsi_val > 65 else f"RSI(14)는 {rsi_val:.1f}로 균형을 유지하고 있어 관망 후 분할 진입이 적절합니다.")
        vix_desc = f"현재 공포지수(VIX)가 {vix_current:.2f}로 시장 변동성 경계가 필요한 시점입니다." if vix_current > 20 else f"현재 공포지수(VIX)가 {vix_current:.2f}로 시장 투심이 안정적인 우호적 환경입니다."
        
        fallback_ai_reason = (
            f"기술적 분석 결과, {name}는 최근 {change_percent:.2f}%의 {trend_direction} 속에서 **{ai_signal_label}** 시그널을 나타냅니다. "
            f"{sma_desc} {rsi_desc} 또한 MACD 오실레이터는 현재 **{macd_state}** 국면(격차 {macd_diff})에 처해 있으며, "
            f"{vix_desc} 종합적인 재무 매력지수(PER {stats['per']}, PBR {stats['pbr']})를 감안할 때, "
            f"{'적극적인 매수 및 홀딩 포지션이 유리' if ai_signal_score >= 55 else '보수적인 리스크 관리가 권장'}됩니다."
        )
        ai_keywords = ["일목균형표", "PineScript", "실시간시그널", "차트분석"]

        if GEMINI_API_KEY:
            try:
                model = genai.GenerativeModel('gemini-1.5-flash')
                prompt = f"""
                You are a professional financial AI analyst. Write a highly insightful, realistic, and slightly enthusiastic stock market summary for {name} (Ticker: {clean_ticker}).
                Current price is {current_price}, changing by {change_percent}%.
                RSI is {rsi_val}, MACD is {macd_state}.
                Write a 3-sentence summary in Korean explaining why it's moving and the outlook.
                Then, on a new line, provide exactly 4 relevant keywords separated by commas.
                Format exactly like this:
                [Summary here]
                KEYWORDS: keyword1, keyword2, keyword3, keyword4
                """
                resp = model.generate_content(prompt)
                parts = resp.text.split("KEYWORDS:")
                if len(parts) >= 2:
                    fallback_ai_reason = parts[0].strip()
                    ai_keywords = [k.strip().replace(" ", "") for k in parts[1].split(",")][:4]
                else:
                    fallback_ai_reason = resp.text.strip()
            except Exception as e:
                print("Gemini API Error:", e)

        # Determine sentiment score based on the combined view or AI view
        sentiment_score = int(ai_signal_score)
        sentiment_score = max(15, min(95, sentiment_score))
        
        sentiment_text = "중립"
        if sentiment_score >= 70:
            sentiment_text = f"매우 긍정적 ({sentiment_score}%)"
        elif sentiment_score >= 55:
            sentiment_text = f"긍정적 ({sentiment_score}%)"
        elif sentiment_score <= 30:
            sentiment_text = f"공포/매도 우세 ({sentiment_score}%)"
        elif sentiment_score <= 45:
            sentiment_text = f"조심스러움 ({sentiment_score}%)"

        short_name = info.get("shortName") or info.get("longName") or clean_ticker
        # Translate main names for top symbols to look professional
        translated_names = {
            "005930.KS": "삼성전자",
            "AAPL": "Apple Inc.",
            "TSLA": "Tesla Inc.",
            "NVDA": "NVIDIA Corp.",
            "000660.KS": "SK하이닉스",
            "035720.KS": "카카오",
            "005380.KS": "현대자동차",
            "MSFT": "마이크로소프트",
            "GOOGL": "구글 (Alphabet)"
        }
        name = translated_names.get(clean_ticker, short_name)

        # 5. yfinance News extraction and mock LLM parsing
        news_items = []
        yf_news = stock.news
        if yf_news:
            for item in yf_news[:3]:
                title = item.get("title")
                publisher = item.get("publisher", "글로벌 경제지")
                pub_time = item.get("providerPublishTime", 0)
                time_str = datetime.fromtimestamp(pub_time).strftime("%m/%d %H:%M") if pub_time else "방금 전"
                
                news_items.append({
                    "headline": title,
                    "source": publisher,
                    "time": time_str,
                    "sentiment": "positive" if change_percent >= 0 else "neutral",
                    "bullets": [
                        f"{title[:45]}... 에 따른 글로벌 투자자들의 실시간 매수 거래 분포도 분석 지표 활성화.",
                        f"발행처({publisher})에 따르면 업계 전문가들의 3분기 향후 변동성 대응 목표가 재설정 기조 포착.",
                        "Alpha Insight AI 분석: 거시 경제의 복합 변동성 속에서 안정적 분산 매수 전략이 필요할 것으로 제시."
                    ]
                })
        else:
            # Fallback mock news if news list is empty
            news_items = [
                {
                    "headline": f"{name}, 시장 기대치 상회하는 실적 가속화 전망 및 글로벌 파트너십 강화",
                    "source": "경제데일리",
                    "time": "1시간 전",
                    "sentiment": "positive" if change_percent >= 0 else "neutral",
                    "bullets": [
                        f"{name}의 3분기 플랫폼 수주 확대에 따른 중장기 순이익 가시적 성장 예상.",
                        "글로벌 경제 기관들의 기업 신뢰도 상승 분석 및 하방 지지력 확보.",
                        "핵심 신사업 진출 소식 및 차세대 포트폴리오 다각화에 따른 수혜 전망."
                    ]
                }
            ]

        # 6. DART Mock disclosures (Simulated based on actual stock type)
        dart_grade = "AAA" if sentiment_score > 70 else ("AA" if sentiment_score > 45 else "A")
        
        disclosures = [
            {
                "title": f"분기보고서 및 연결재무제표기준 주요 사업보고서 ({datetime.now().strftime('%Y.%m')})",
                "date": datetime.now().strftime("%Y-%m-%d"),
                "type": "major"
            },
            {
                "title": "주주총회 소집 공고 및 배당 등 중요 사항 의결 고시",
                "date": (pd.Timestamp.now() - pd.Timedelta(days=5)).strftime("%Y-%m-%d"),
                "type": "regular"
            }
        ]

        # Calculate historical datasets for Chart Overlays safely
        conv_s = []
        base_s = []
        lead1_s = []
        lead2_s = []
        
        for i in range(len(highs)):
            if i >= 8:
                c = (max(highs[i-8:i+1]) + min(lows[i-8:i+1])) / 2.0
                conv_s.append(c)
            else:
                conv_s.append(None)
                
            if i >= 25:
                b = (max(highs[i-25:i+1]) + min(lows[i-25:i+1])) / 2.0
                base_s.append(b)
            else:
                base_s.append(None)
                
            if conv_s[-1] is not None and base_s[-1] is not None:
                lead1_s.append((conv_s[-1] + base_s[-1]) / 2.0)
            else:
                lead1_s.append(None)
                
            if i >= 51:
                l2 = (max(highs[i-51:i+1]) + min(lows[i-51:i+1])) / 2.0
                lead2_s.append(l2)
            else:
                lead2_s.append(None)
                
        # RSI Series (Native)
        rsi_s = []
        for i in range(len(prices)):
            if i < 14:
                rsi_s.append(None)
            else:
                gains = 0
                losses = 0
                for j in range(i-13, i+1):
                    diff = prices[j] - prices[j-1]
                    if diff > 0: gains += diff
                    else: losses -= diff
                avg_gain = gains / 14.0
                avg_loss = losses / 14.0
                if avg_loss == 0:
                    rsi_s.append(100.0)
                else:
                    rs = avg_gain / avg_loss
                    rsi_s.append(100.0 - (100.0 / (1.0 + rs)))
                    
        # Elliott Wave (Native ZigZag)
        zigzag_s = [None] * len(prices)
        w = 2 # span of 2 on each side (total 5)
        for i in range(w, len(prices) - w):
            window = prices[i-w:i+w+1]
            if prices[i] == max(window) or prices[i] == min(window):
                zigzag_s[i] = prices[i]
                
        # MD/AI Historical Signals (Mocked via SMA Crossover for visual effect)
        buy_signals = [None] * len(prices)
        sell_signals = [None] * len(prices)
        
        for i in range(20, len(prices)):
            sma5_prev = sum(prices[i-5:i])/5
            sma5_curr = sum(prices[i-4:i+1])/5
            sma20_prev = sum(prices[i-20:i])/20
            sma20_curr = sum(prices[i-19:i+1])/20
            
            if sma5_prev <= sma20_prev and sma5_curr > sma20_curr:
                buy_signals[i] = prices[i] * 0.98 # slight offset below price
            elif sma5_prev >= sma20_prev and sma5_curr < sma20_curr:
                sell_signals[i] = prices[i] * 1.02 # slight offset above price

        return {
            "name": name,
            "symbol": clean_ticker,
            "market": market,
            "currency": currency,
            "logo": name[:2],
            "price": current_price,
            "change": change,
            "changePercent": change_percent,
            "stats": stats,
            "aiSentiment": sentiment_score,
            "aiSentimentText": sentiment_text,
            "aiReason": fallback_ai_reason,
            "aiKeywords": ai_keywords,
            "dartGrade": dart_grade,
            "dartScores": {
                "stability": int(80 + (sentiment_score % 15)),
                "growth": int(75 + (sentiment_score % 20)),
                "profit": int(85 - (sentiment_score % 10)),
                "dividend": int(30 + (sentiment_score % 50))
            },
            "disclosures": disclosures,
            "news": news_items,
            "chart": {
                "labels": labels,
                "prices": prices,
                "ichimoku_conv": conv_s,
                "ichimoku_base": base_s,
                "ichimoku_lead1": ([None]*26) + lead1_s[:-26] if len(lead1_s) > 26 else lead1_s,
                "ichimoku_lead2": ([None]*26) + lead2_s[:-26] if len(lead2_s) > 26 else lead2_s,
                "rsi": rsi_s,
                "elliott": zigzag_s,
                "signals_buy": buy_signals,
                "signals_sell": sell_signals
            },
            "mdSignal": {
                "label": md_signal_label,
                "class": md_signal_class,
                "conversion": ichimoku["conversion"],
                "base": ichimoku["base"],
                "cloud": ichimoku["cloud"]
            },
            "aiSignal": {
                "label": ai_signal_label,
                "class": ai_signal_class,
                "rsi": f"{rsi_val:.1f}",
                "macd": macd_state,
                "sma": "GOLDEN CROSS" if sma_cross == "GOLDEN" else ("DEATH CROSS" if sma_cross == "DEATH" else "NEUTRAL")
            },
            "mdReason": md_reason
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving stock {clean_ticker}: {str(e)}")

# Test status route
@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "Alpha Insight real-time server is fully operational"}

# Serve Frontend HTML
@app.get("/")
def read_root():
    return FileResponse("index.html")

# Serve all other static files (css, js, etc.)
app.mount("/", StaticFiles(directory=".", html=True), name="static")

if __name__ == "__main__":
    print("Starting Alpha Insight API Server on http://localhost:8000 ...")
    # For Render, port is often provided by PORT env var
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("server:app", host="0.0.0.0", port=port, reload=True)
