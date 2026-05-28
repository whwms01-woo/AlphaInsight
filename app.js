/* ==========================================
   ALPHA INSIGHT: CORE INTERACTIVE JAVASCRIPT
   ========================================== */

// --- 1. STOCK DATABASE (Rich Pre-configured Models) ---
const stockDatabase = {
    "005930.KS": {
        name: "삼성전자",
        symbol: "005930.KS",
        market: "KOSPI",
        currency: "KRW",
        logo: "삼성",
        price: 78200,
        change: 1200,
        changePercent: 1.56,
        stats: {
            mktCap: "466.8조원",
            range52w: "86,000 / 65,800",
            per: "18.42배",
            pbr: "1.24배",
            divYield: "2.18%"
        },
        aiSentiment: 82,
        aiSentimentText: "매우 긍정적 (82%)",
        aiReason: "메모리 반도체 공급 부족에 따른 DRAM 가격 상승 기대감과 2분기 어닝 서프라이즈 전망이 우세하며, 외국인 투자자들의 대규모 순매수세가 유입되고 있습니다. 또한 차세대 HBM3E 엔비디아 납품 테스트 통과 임박 소식이 시장 흐름에 매우 긍정적인 신호로 작용하고 있습니다.",
        aiKeywords: ["HBM3E", "어닝서프라이즈", "반도체수급", "외국인순매수"],
        dartGrade: "AAA",
        dartScores: { stability: 95, growth: 88, profit: 92, dividend: 85 },
        disclosures: [
            { title: "분기보고서 (2026.03)", date: "2026-05-15", type: "major" },
            { title: "특허권 취득 (반도체 적층 패키징 신기술)", date: "2026-05-12", type: "regular" },
            { title: "[공시] 연결재무제표기준 영업실적(공정공시)", date: "2026-05-02", type: "major" }
        ],
        news: [
            {
                headline: "삼성전자, 차세대 HBM3E 12단 제품 양산 돌입... 엔비디아 공급망 합류 촉각",
                source: "한국경제",
                time: "20분 전",
                sentiment: "positive",
                bullets: [
                    "삼성전자가 최첨단 HBM3E 12단 적층 제품의 본격적인 양산 일정을 공식화함.",
                    "글로벌 AI 칩 1위 기업인 엔비디아의 퀄 테스트 결과가 6월 중 발표될 예정으로 시장 기대치 고조.",
                    "성공 시 하반기 반도체 부문 영업이익이 전년 대비 120% 이상 급증할 것이란 증권가 분석 제시."
                ]
            },
            {
                headline: "DRAM 고정거래가 3개월 연속 상승세... '슈퍼 사이클' 초입 진입했나",
                source: "매일경제",
                time: "2시간 전",
                sentiment: "positive",
                bullets: [
                    "5월 글로벌 DRAM 고정 거래가격이 전월 대비 8.5% 추가 상승하며 상승 랠리를 지속함.",
                    "클라우드 서비스 제공사(CSP)들의 AI 데이터센터 확장 열풍으로 고성능 메모리 공급 부족 극심.",
                    "삼성전자와 SK하이닉스의 공급자 우위 시장이 최소 내년 상반기까지 이어질 전망."
                ]
            },
            {
                headline: "美 정부 반도체 보조금 확정... 삼성 텍사스 공장 건설 가속도",
                source: "연합뉴스",
                time: "5시간 전",
                sentiment: "neutral",
                bullets: [
                    "미국 상무부가 칩스법(Chips Act)에 따른 삼성전자 텍사스 테일러 공장 보조금을 최종 확정 통보함.",
                    "현지 신공장 가동 시기가 예상보다 3개월 앞당겨진 2026년 초로 조율되어 현지 수주 경쟁력 강화.",
                    "다만 지정학적 리스크 분산 효과 대비 투자 비용 상승에 따른 단기적 감가상각 부담 상존."
                ]
            }
        ]
    },
    "AAPL": {
        name: "Apple Inc.",
        symbol: "AAPL",
        market: "NASDAQ",
        currency: "USD",
        logo: "AAPL",
        price: 189.84,
        change: 4.12,
        changePercent: 2.22,
        stats: {
            mktCap: "$2.98T (약 4,020조원)",
            range52w: "199.62 / 164.08",
            per: "28.5배",
            pbr: "35.8배",
            divYield: "0.51%"
        },
        aiSentiment: 76,
        aiSentimentText: "긍정적 (76%)",
        aiReason: "다음 달 개최될 WWDC 2026에서 공개될 온디바이스 AI(On-Device AI) 및 자체 LLM 탑재 소식이 주가를 강력하게 견인하고 있습니다. 아이폰 16 시리즈에 들어갈 차세대 M5 기반 AI 칩에 대한 신뢰도와 중화권 판매량의 반등 기조가 호재로 작용 중입니다.",
        aiKeywords: ["온디바이스AI", "WWDC2026", "아이폰16", "M5칩"],
        dartGrade: "AA+",
        dartScores: { stability: 98, growth: 79, profit: 96, dividend: 90 },
        disclosures: [
            { title: "Form 10-Q (Quarterly Report to SEC)", date: "2026-05-14", type: "major" },
            { title: "Dividend Declaration Notice ($0.25 per share)", date: "2026-05-09", type: "regular" },
            { title: "Notice of Share Buyback Program Launch", date: "2026-05-01", type: "major" }
        ],
        news: [
            {
                headline: "애플 WWDC서 '애플 인텔리전스' 대규모 업그레이드 예고... 음성 시리(Siri) 비약적 발전",
                source: "Bloomberg",
                time: "1시간 전",
                sentiment: "positive",
                bullets: [
                    "애플의 AI 비서 '시리'가 온디바이스 LLM을 통해 복잡한 화면 인식 및 연속 제어 명령 수행이 가능해질 예정.",
                    "자체 프라이버시 보호 기술인 'Private Cloud Compute'를 도입해 데이터 보안 유출 우려 원천 차단.",
                    "역사상 가장 큰 규모의 소프트웨어 업그레이드가 될 것이라는 소식에 시장 참여자들 매수세 강화."
                ]
            },
            {
                headline: "중국 내 아이폰 판매량 깜짝 반등세... 애국 소비 열풍 꺾였나",
                source: "Reuters",
                time: "4시간 전",
                sentiment: "positive",
                bullets: [
                    "5월 중국 현지 유통 채널 조사 결과 아이폰 15 시리즈의 판매량이 전년 동기 대비 12.4% 반등 증가함.",
                    "현지 리테일러들의 탄력적 가격 할인 프로모션과 신규 색상 출시가 긍정적 효과 유발.",
                    "화웨이 등 로컬 브랜드 추격세 속에서도 프리미엄 스마트폰 지배력이 여전히 견고함을 입증."
                ]
            }
        ]
    },
    "TSLA": {
        name: "Tesla Inc.",
        symbol: "TSLA",
        market: "NASDAQ",
        currency: "USD",
        logo: "TSLA",
        price: 178.60,
        change: -3.85,
        changePercent: -2.11,
        stats: {
            mktCap: "$568.2B (약 770조원)",
            range52w: "299.29 / 138.80",
            per: "45.1배",
            pbr: "8.2배",
            divYield: "N/A (무배당)"
        },
        aiSentiment: 42,
        aiSentimentText: "조심스러움 (42%)",
        aiReason: "중국 내 하이엔드 전기차 경쟁 심화로 인한 영업이익률 둔화세가 이어지고 있습니다. 시장은 8월 공개 예정인 자율주행 '로보택시(Robotaxi)' 프로젝트와 일론 머스크의 560억 달러 규모 보상 패키지 주주총회 승인 가부를 둘러싸고 신중론과 고성장 기대감이 팽팽히 맞서고 있습니다.",
        aiKeywords: ["로보택시", "FSD차이나", "주총승인", "전기차경쟁"],
        dartGrade: "A",
        dartScores: { stability: 82, growth: 80, profit: 75, dividend: 10 },
        disclosures: [
            { title: "Form 8-K (Current Report on Director Salary package)", date: "2026-05-20", type: "major" },
            { title: "SEC FSD Full Safety Investigation Update", date: "2026-05-11", type: "regular" }
        ],
        news: [
            {
                headline: "테슬라 8월 로보택시 공개 행사 일정 연기 루머설... 부품 및 알고리즘 보완 필요성 대두",
                source: "TechCrunch",
                time: "30분 전",
                sentiment: "negative",
                bullets: [
                    "익명의 소식통에 따르면 8월 8일 예정된 테슬라 로보택시 전용 차량의 물리적 목업 완성이 늦어지고 있음.",
                    "차세대 비전 기반 완전 자율주행 FSD V12.5 버전의 엣지 케이스 안전성 확보 작업 지연이 주요인.",
                    "공식 발표가 미뤄질 경우 단기 모멘텀 공백으로 주가 변동성 확대 불가피 의견 제시."
                ]
            },
            {
                headline: "일론 머스크의 주주 서한 발송... '보상안 승인 안 될 시 AI 핵심 개발 사업 분리 유발할 것'",
                source: "Wall Street Journal",
                time: "3시간 전",
                sentiment: "negative",
                bullets: [
                    "일론 머스크가 다가오는 주총에서 본인의 560억 달러 규모 주식 보상 패키지 재승인을 주주들에게 강력 촉구.",
                    "부결될 경우 테슬라 내 인공지능(AI)과 로보틱스 지적재산권을 별도 법인으로 이전해 개발하겠다는 경고성 멘트 포함.",
                    "기업 지배구조 리스크 부각 및 소액 주주들의 집단 소송 조짐으로 투자 심리에 악재 작용."
                ]
            }
        ]
    },
    "NVDA": {
        name: "NVIDIA Corp.",
        symbol: "NVDA",
        market: "NASDAQ",
        currency: "USD",
        logo: "NVDA",
        price: 948.22,
        change: 32.54,
        changePercent: 3.55,
        stats: {
            mktCap: "$2.37T (약 3,200조원)",
            range52w: "974.00 / 366.35",
            per: "68.2배",
            pbr: "42.5배",
            divYield: "0.02%"
        },
        aiSentiment: 91,
        aiSentimentText: "압도적 긍정 (91%)",
        aiReason: "빅테크 기업들의 AI 데이터센터 구축 수요가 상상을 초월하며 차세대 블랙웰(Blackwell) B200 칩의 사전 주문 물량이 이미 2026년 상반기 분까지 완판되었습니다. 10대 1 주식 분할 단행으로 소액 투자자 접근성이 강화된 점도 강세 흐름을 뒷받침합니다.",
        aiKeywords: ["블랙웰B200", "데이터센터", "주식분할", "AI독점력"],
        dartGrade: "AAA",
        dartScores: { stability: 92, growth: 99, profit: 98, dividend: 35 },
        disclosures: [
            { title: "SEC Form 10-Q (Record Breaking Q1 Earnings)", date: "2026-05-22", type: "major" },
            { title: "Notice of 10-for-1 Stock Split Execution", date: "2026-05-18", type: "major" }
        ],
        news: [
            {
                headline: "엔비디아 블랙웰 아키텍처 공식 출하 개시... '예상 뛰어넘는 마진율 달성 전망'",
                source: "CNBC",
                time: "1시간 전",
                sentiment: "positive",
                bullets: [
                    "젠슨 황 CEO는 연설에서 차세대 AI 칩 '블랙웰' 패키징 불량 이슈가 완벽히 종결되어 출하 시작을 선언.",
                    "TSMC의 고성능 CoWoS 패키징 생산 수율 개선으로 하반기 공급 가속화 전망.",
                    "빅테크들의 독점적 선점 경쟁으로 개당 4만 달러에 육박하는 높은 판매가에도 영업 마진 75% 유지 예상."
                ]
            }
        ]
    },
    "TOSS": {
        name: "비바리퍼블리카 (토스)",
        symbol: "MOCK",
        market: "KOSDAQ",
        currency: "KRW",
        logo: "TOSS",
        price: 52000,
        change: 3500,
        changePercent: 7.22,
        stats: {
            mktCap: "8.6조원 (장외 추정)",
            range52w: "62,000 / 38,000",
            per: "42.0배 (전환 기대)",
            pbr: "5.4배",
            divYield: "N/A"
        },
        aiSentiment: 88,
        aiSentimentText: "강력 매수 우세 (88%)",
        aiReason: "토스증권이 해외주식 실시간 수수료 전면 무료 및 AI 기반 해외 뉴스 자동 실시간 번역 요약 서비스 탑재 이후 리테일 브로커리지 시장 점유율 15%를 돌파했습니다. 올해 창사 이래 최초로 연결기준 분기 흑자 전환이 확실시되면서 하반기 IPO(기업공개) 대어로 급부상 중입니다.",
        aiKeywords: ["토스증권흑자", "IPO대어", "브로커리지1위", "장외주식상승"],
        dartGrade: "A+",
        dartScores: { stability: 80, growth: 95, profit: 86, dividend: 0 },
        disclosures: [
            { title: "감사보고서 (2025.12 사업년도)", date: "2026-04-12", type: "major" },
            { title: "주요사항보고서 (신주인수권부사채 발행 결정)", date: "2026-03-20", type: "regular" }
        ],
        news: [
            {
                headline: "토스증권, 가입자 600만 명 돌파... 서학개미 점유율 대형사 턱밑까지 추격",
                source: "파이낸셜뉴스",
                time: "4시간 전",
                sentiment: "positive",
                bullets: [
                    "20~30대 젊은 투자층의 직관적인 UI 만족도로 인해 활성 사용자 수(MAU)가 역대 최고치를 갱신함.",
                    "해외주식 실시간 소수점 거래 편의성 극대화로 주간 해외 거래 대금이 시중 대형 증권사 추월 직전.",
                    "단기 실적 성장이 견고하여 모회사 비바리퍼블리카의 상장 밸류에이션이 10조 원을 상회할 것이란 리포트 쇄도."
                ]
            }
        ]
    }
};

// --- 2. CONFIGURATION & STATE VARIABLES ---
let activeStock = "005930.KS"; // Default Samsung Electronics
let activeTimeframe = "1M"; // Default 1 Month
let activeChart = null; // Chart.js instance holder
let userWatchlist = ["005930.KS", "AAPL", "TSLA"]; // Sidebar Initial Watchlist
let isDarkTheme = true;

// --- 3. HELPER FUNCTIONS ---

// Realistic Stock Price Dynamic Generator (for searched stocks not in DB)
function generateDynamicStockData(query) {
    const symbol = query.toUpperCase().replace(/[^A-Z0-9.]/g, '') || "TEMP";
    const name = query;
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(query);
    const currency = isKorean ? "KRW" : "USD";
    const market = isKorean ? "KOSPI" : "NASDAQ";
    const price = isKorean ? Math.floor(20000 + Math.random() * 150000) : +(10 + Math.random() * 300).toFixed(2);
    const change = isKorean ? Math.floor((Math.random() - 0.45) * 5000) : +((Math.random() - 0.45) * 15).toFixed(2);
    const changePercent = +(change / price * 100).toFixed(2);
    
    const sentiment = Math.floor(40 + Math.random() * 55);
    let sentimentText = "중립";
    if (sentiment > 75) sentimentText = `매우 긍정적 (${sentiment}%)`;
    else if (sentiment > 60) sentimentText = `긍정적 (${sentiment}%)`;
    else if (sentiment < 45) sentimentText = `주의 요망 (${sentiment}%)`;
    
    return {
        name: name,
        symbol: symbol.includes('.') ? symbol : (isKorean ? symbol + ".KS" : symbol),
        market: market,
        currency: currency,
        logo: name.substring(0, 2),
        price: price,
        change: change,
        changePercent: changePercent,
        stats: {
            mktCap: isKorean ? `${(price * 0.007).toFixed(1)}조원` : `$${(price * 0.08).toFixed(1)}B`,
            range52w: isKorean 
                ? `${Math.floor(price * 1.25).toLocaleString()} / ${Math.floor(price * 0.8).toLocaleString()}`
                : `${(price * 1.25).toFixed(2)} / ${(price * 0.8).toFixed(2)}`,
            per: `${(12 + Math.random() * 35).toFixed(2)}배`,
            pbr: `${(0.8 + Math.random() * 4).toFixed(2)}배`,
            divYield: `${(Math.random() * 4.5).toFixed(2)}%`
        },
        aiSentiment: sentiment,
        aiSentimentText: sentimentText,
        aiReason: `${name}에 대한 최근 시장 빅데이터 분석 결과, 기관 투자자들의 지속적인 순매수 흐름과 업계 내 기술 혁신 리포트가 호평을 받고 있습니다. 다만 고금리 기조 유지에 따른 경기 둔화 우려와 핵심 원자재 공급 단가 인상 압박이 장기 성장의 변수로 존재합니다. 향후 발표될 2분기 주요 지표의 가시적 개선 여부가 반등의 핵심 모멘텀이 될 전망입니다.`,
        aiKeywords: ["기관매수세", "기술혁신", "금리변수", "경기방어"],
        dartGrade: sentiment > 80 ? "AAA" : (sentiment > 60 ? "AA" : "A"),
        dartScores: {
            stability: Math.floor(65 + Math.random() * 30),
            growth: Math.floor(65 + Math.random() * 30),
            profit: Math.floor(65 + Math.random() * 30),
            dividend: Math.floor(20 + Math.random() * 75)
        },
        disclosures: [
            { title: "분기 공시 보고서 및 실적 공정 통보", date: "2026-05-18", type: "major" },
            { title: "최대 주주 지분 변동 및 공시 사항", date: "2026-05-10", type: "regular" }
        ],
        news: [
            {
                headline: `${name}, 글로벌 시장 점유율 확장 발표 및 신기술 상용화 추진`,
                source: "머니투데이",
                time: "1시간 전",
                sentiment: sentiment > 55 ? "positive" : "neutral",
                bullets: [
                    `${name}가 차세대 플랫폼 신제품을 전격 론칭하며 공격적인 시장 점유율 확장에 돌입함.`,
                    `글로벌 주요 테크 연합 파트너십 채결 계약 체결 완료 소식으로 중장기 시너지 상승 유도.`,
                    `글로벌 투자 은행(IB)들의 타겟 목표 주가 평균 15% 상향 조정 보고서 공개.`
                ]
            },
            {
                headline: `글로벌 거시 경제 불안 지속... ${name} 리스크 요인 극복할 것인가`,
                source: "연합인포맥스",
                time: "3시간 전",
                sentiment: "neutral",
                bullets: [
                    "미국 연준(Fed)의 추가 고금리 장기화 기조에 따른 글로벌 소비 둔화 리스크 우려 존재.",
                    "공급망 다변화를 통한 생산 공정 효율화와 원가 절감 노력이 3분기 수익 방어의 핵심.",
                    "단기 차익 실현을 노린 기관/외국인 매물 출회에 따른 변동폭 확대 가능성 제시."
                ]
            }
        ]
    };
}

// Get Stock Object from Active State (returns DB entry or generates dynamic data)
function getCurrentStock() {
    if (stockDatabase[activeStock]) {
        return stockDatabase[activeStock];
    }
    // Dynamic stock generated on search
    const generated = generateDynamicStockData(activeStock);
    stockDatabase[activeStock] = generated; // Add to DB cache
    return generated;
}

// Generate Realistic Random Stock Chart Prices
function generateChartData(basePrice, changePercent, timeframe, includeSMA = true, includeBB = false) {
    let dataPoints = 30;
    if (timeframe === "1D") dataPoints = 24;
    else if (timeframe === "1W") dataPoints = 7;
    else if (timeframe === "1M") dataPoints = 30;
    else if (timeframe === "1Y") dataPoints = 12;

    const labels = [];
    const prices = [];
    
    let currentPrice = basePrice * (1 - (changePercent / 100)); // Start from previous close roughly
    const volatility = basePrice * 0.015; // Volatility factor
    
    const now = new Date();
    
    for (let i = 0; i < dataPoints; i++) {
        // Label formatting
        if (timeframe === "1D") {
            labels.push(`${9 + Math.floor(i * 15 / 60)}:${String((i * 15) % 60).padStart(2, '0')}`);
        } else if (timeframe === "1W") {
            const d = new Date();
            d.setDate(now.getDate() - (6 - i));
            labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
        } else if (timeframe === "1M") {
            const d = new Date();
            d.setDate(now.getDate() - (29 - i));
            labels.push(`${d.getMonth() + 1}/${d.getDate()}`);
        } else if (timeframe === "1Y") {
            const d = new Date();
            d.setMonth(now.getMonth() - (11 - i));
            labels.push(`${d.getFullYear().toString().substring(2)}/${String(d.getMonth() + 1).padStart(2, '0')}`);
        }

        // Random Walk with drift toward current price
        const targetWeight = i / (dataPoints - 1);
        const drift = (basePrice - currentPrice) * targetWeight * 0.15;
        const randomChange = (Math.random() - 0.48) * volatility;
        currentPrice += drift + randomChange;
        
        // Final data point must be exactly basePrice
        if (i === dataPoints - 1) {
            prices.push(Number(basePrice.toFixed(2)));
        } else {
            prices.push(Number(currentPrice.toFixed(2)));
        }
    }

    const result = {
        labels: labels,
        prices: prices,
        datasets: []
    };

    // Calculate Indicators
    if (includeSMA) {
        const smaData = [];
        const period = 5;
        for (let i = 0; i < prices.length; i++) {
            if (i < period - 1) {
                smaData.push(null);
            } else {
                let sum = 0;
                for (let j = 0; j < period; j++) {
                    sum += prices[i - j];
                }
                smaData.push(Number((sum / period).toFixed(2)));
            }
        }
        result.sma = smaData;
    }

    if (includeBB) {
        const smaData = [];
        const upperBB = [];
        const lowerBB = [];
        const period = 5;
        
        for (let i = 0; i < prices.length; i++) {
            if (i < period - 1) {
                smaData.push(null);
                upperBB.push(null);
                lowerBB.push(null);
            } else {
                let sum = 0;
                for (let j = 0; j < period; j++) {
                    sum += prices[i - j];
                }
                const avg = sum / period;
                
                // standard deviation
                let varianceSum = 0;
                for (let j = 0; j < period; j++) {
                    varianceSum += Math.pow(prices[i - j] - avg, 2);
                }
                const stdDev = Math.sqrt(varianceSum / period);
                
                smaData.push(Number(avg.toFixed(2)));
                upperBB.push(Number((avg + stdDev * 1.8).toFixed(2)));
                lowerBB.push(Number((avg - stdDev * 1.8).toFixed(2)));
            }
        }
        result.bbUpper = upperBB;
        result.bbLower = lowerBB;
    }

    return result;
}

// --- 4. CORE CONTROLLERS ---

// Render Interactive Chart via Chart.js
function renderChart() {
    const stock = getCurrentStock();
    const isIchimoku = document.getElementById("toggle-ichimoku").checked;
    const isRsi = document.getElementById("toggle-rsi").checked;
    const isElliott = document.getElementById("toggle-elliott").checked;
    
    let chartData;
    
    if (stock.chart) {
        // Use real historical yfinance data from backend
        chartData = stock.chart;
    } else {
        // Fallback to high-fidelity generated mock chart
        chartData = generateChartData(stock.price, stock.changePercent, activeTimeframe, false, false);
    }
    
    // Destroy previous chart if exists
    if (activeChart) {
        activeChart.destroy();
    }

    const ctx = document.getElementById('stockChart').getContext('2d');
    
    // Theme sensitive colors
    const primaryColor = stock.changePercent >= 0 
        ? (isDarkTheme ? '#10b981' : '#059669') 
        : (isDarkTheme ? '#f43f5e' : '#e11d48');
        
    const primaryGlow = stock.changePercent >= 0 
        ? 'rgba(16, 185, 129, 0.08)' 
        : 'rgba(244, 63, 94, 0.08)';

    const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.04)';
    const textColor = isDarkTheme ? '#94a3b8' : '#64748b';

    // Chart Gradient background
    const chartGradient = ctx.createLinearGradient(0, 0, 0, 300);
    chartGradient.addColorStop(0, primaryGlow);
    chartGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    const datasets = [
        {
            label: `${stock.name} 주가`,
            data: chartData.prices,
            borderColor: primaryColor,
            borderWidth: 2.5,
            pointRadius: chartData.prices.length > 15 ? 0 : 3,
            pointHoverRadius: 6,
            pointBackgroundColor: primaryColor,
            backgroundColor: chartGradient,
            fill: true,
            tension: 0.15,
            yAxisID: 'y'
        }
    ];

    if (isIchimoku && chartData.ichimoku_lead1) {
        datasets.push({
            label: '선행스팬1 (구름대 상단)',
            data: chartData.ichimoku_lead1,
            borderColor: 'rgba(16, 185, 129, 0.6)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
            tension: 0.1,
            yAxisID: 'y'
        });
        datasets.push({
            label: '선행스팬2 (구름대 하단)',
            data: chartData.ichimoku_lead2,
            borderColor: 'rgba(244, 63, 94, 0.6)',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: '-1',
            tension: 0.1,
            yAxisID: 'y'
        });
        datasets.push({
            label: '전환선 (9일)',
            data: chartData.ichimoku_conv,
            borderColor: '#3b82f6',
            borderWidth: 1,
            borderDash: [2, 2],
            pointRadius: 0,
            fill: false,
            tension: 0.1,
            yAxisID: 'y'
        });
    }

    if (isElliott && chartData.elliott) {
        datasets.push({
            label: '엘리어트 파동 (ZigZag)',
            data: chartData.elliott,
            borderColor: '#eab308',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: '#eab308',
            fill: false,
            spanGaps: true,
            tension: 0,
            yAxisID: 'y'
        });
    }

    if (isRsi && chartData.rsi) {
        datasets.push({
            label: 'RSI (14)',
            data: chartData.rsi,
            borderColor: '#a855f7',
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
            tension: 0.1,
            yAxisID: 'y1'
        });
    }

    // Render MD/AI Signals on Chart
    if (chartData.signals_buy) {
        datasets.push({
            type: 'line',
            label: 'MD/AI BUY',
            data: chartData.signals_buy,
            pointStyle: 'triangle',
            rotation: 0,
            radius: 7,
            backgroundColor: '#10b981',
            borderColor: '#059669',
            borderWidth: 2,
            showLine: false,
            yAxisID: 'y'
        });
    }

    if (chartData.signals_sell) {
        datasets.push({
            type: 'line',
            label: 'MD/AI SELL',
            data: chartData.signals_sell,
            pointStyle: 'triangle',
            rotation: 180,
            radius: 7,
            backgroundColor: '#f43f5e',
            borderColor: '#e11d48',
            borderWidth: 2,
            showLine: false,
            yAxisID: 'y'
        });
    }

    activeChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartData.labels,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: textColor,
                        font: { size: 10, weight: 600 }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: isDarkTheme ? '#0c101f' : '#ffffff',
                    titleColor: isDarkTheme ? '#f8fafc' : '#0f172a',
                    bodyColor: isDarkTheme ? '#cbd5e1' : '#334155',
                    borderColor: isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
                    borderWidth: 1,
                    padding: 10,
                    callbacks: {
                        label: function(context) {
                            if (context.dataset.yAxisID === 'y1') {
                                return ` ${context.dataset.label}: ${context.raw ? context.raw.toFixed(1) : ''}`;
                            }
                            return ` ${context.dataset.label}: ${context.raw ? context.raw.toLocaleString() : ''} ${stock.currency}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: gridColor },
                    ticks: { color: textColor, font: { size: 9 } }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: { color: gridColor },
                    ticks: {
                        color: textColor,
                        font: { size: 9 },
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                },
                y1: {
                    type: 'linear',
                    display: isRsi,
                    position: 'left',
                    min: 0,
                    max: 100,
                    grid: { drawOnChartArea: false },
                    ticks: {
                        color: '#a855f7',
                        font: { size: 9 }
                    }
                }
            }
        }
    });
}

// Update Watchlist UI in the Sidebar
function renderWatchlist() {
    const container = document.getElementById("sidebar-watchlist");
    container.innerHTML = "";

    userWatchlist.forEach(symbol => {
        let stock = stockDatabase[symbol];
        if (!stock) {
            // Lazy load generated stocks if they are in initial list
            stock = generateDynamicStockData(symbol);
            stockDatabase[symbol] = stock;
        }

        const isPositive = stock.changePercent >= 0;
        const trendClass = isPositive ? "positive" : "negative";
        const sign = isPositive ? "+" : "";

        const item = document.createElement("div");
        item.className = "watchlist-item";
        item.setAttribute("data-symbol", symbol);
        item.innerHTML = `
            <div class="watchlist-item-left">
                <span class="watchlist-item-name">${stock.name}</span>
                <span class="watchlist-item-symbol">${stock.symbol}</span>
            </div>
            <div class="watchlist-item-right">
                <span class="watchlist-item-price ${trendClass}">${stock.price.toLocaleString(undefined, {
                    minimumFractionDigits: stock.currency === "USD" ? 2 : 0,
                    maximumFractionDigits: stock.currency === "USD" ? 2 : 0
                })}</span>
                <span class="watchlist-item-change ${trendClass}">${sign}${stock.changePercent.toFixed(2)}%</span>
            </div>
        `;

        item.addEventListener("click", () => {
            activeStock = symbol;
            updateDashboard();
        });

        container.appendChild(item);
    });
}

// Update Main Dashboard Widgets
async function updateDashboard() {
    // Show Loading State
    document.getElementById("current-stock-name").innerText = "데이터 로딩 중...";
    document.getElementById("current-stock-symbol").innerText = activeStock;
    document.getElementById("current-stock-change").innerText = "서버에서 실시간 데이터를 불러오고 있습니다...";
    
    let stock = getCurrentStock();
    
    // Attempt real-time backend API fetch
    try {
        const response = await fetch(`/api/stock/${activeStock}?timeframe=${activeTimeframe}`);
        if (response.ok) {
            const liveData = await response.json();
            // Cache live data in database
            stockDatabase[activeStock] = liveData;
            stock = liveData;
            console.log(`[Alpha Insight] Real-time yfinance feed connected for ${activeStock}`);
        } else {
            console.log(`[Alpha Insight] Backend returned error. Using cached/mock data.`);
        }
    } catch (err) {
        console.log(`[Alpha Insight] Backend server offline. Seamlessly running in offline simulator mode.`);
    }

    const isPositive = stock.changePercent >= 0;
    const trendClass = isPositive ? "positive" : "negative";
    const sign = isPositive ? "+" : "";

    // Set stock meta information
    document.getElementById("current-stock-name").innerText = stock.name;
    document.getElementById("current-stock-symbol").innerText = stock.symbol;
    document.getElementById("current-stock-market").innerText = stock.market;
    document.getElementById("current-stock-currency").innerText = stock.currency;
    document.getElementById("company-logo").innerText = stock.logo;
    document.getElementById("current-stock-price").innerText = stock.price.toLocaleString();
    
    // Header trend styling
    const changeEl = document.getElementById("current-stock-change");
    changeEl.className = `price-change ${trendClass}`;
    changeEl.innerText = `${sign}${stock.change.toLocaleString()} (${sign}${stock.changePercent}%)`;

    // Toggle color theme for logo holder
    const logoPlaceholder = document.getElementById("company-logo");
    logoPlaceholder.style.background = isPositive
        ? `linear-gradient(135deg, var(--positive), var(--accent-cyan))`
        : `linear-gradient(135deg, var(--negative), var(--accent-purple))`;

    // Stats
    const stats = stock.stats;
    document.getElementById("stat-mkt-cap").innerText = stats.mktCap;
    
    // Bind VIX index value with conditional color highlighting
    const statVix = document.getElementById("stat-vix");
    statVix.innerText = stats.vix;
    if (parseFloat(stats.vix) > 25) {
        statVix.style.color = "var(--negative)";
        statVix.style.textShadow = "0 0 10px rgba(244, 63, 94, 0.5)";
    } else {
        statVix.style.color = "var(--positive)";
        statVix.style.textShadow = "none";
    }
    
    document.getElementById("stat-per").innerText = stats.per;
    document.getElementById("stat-pbr").innerText = stats.pbr;
    document.getElementById("stat-div-yield").innerText = stats.divYield;

    // AI Insight Panel
    const sentimentText = document.getElementById("sentiment-text");
    sentimentText.innerText = stock.aiSentimentText;
    sentimentText.className = `sentiment-label ${stock.aiSentiment >= 50 ? 'positive' : 'negative'}`;
    
    const sentimentBar = document.getElementById("sentiment-bar");
    sentimentBar.style.width = `${stock.aiSentiment}%`;

    // Customize progress bar color dynamically based on score
    if (stock.aiSentiment >= 70) {
        sentimentBar.style.background = `linear-gradient(90deg, #3b82f6, var(--positive))`;
    } else if (stock.aiSentiment >= 45) {
        sentimentBar.style.background = `linear-gradient(90deg, #eab308, #6366f1)`;
    } else {
        sentimentBar.style.background = `linear-gradient(90deg, var(--negative), #ec4899)`;
    }

    document.getElementById("ai-dynamic-reason").innerText = stock.aiReason || "분석 완료 (AI 종합 모델)";

    // MD Quant Signal UI Rendering
    let mdSignal = stock.mdSignal;
    if (!mdSignal) {
        const isUp = stock.changePercent >= 0;
        mdSignal = {
            label: isUp ? "BUY" : "SELL",
            class: isUp ? "buy" : "sell",
            conversion: isUp ? "BULLISH" : "BEARISH",
            base: isUp ? "BULLISH" : "BEARISH",
            cloud: isUp ? "BULLISH" : "BEARISH"
        };
    }

    const mdBadge = document.getElementById("md-signal-badge");
    if (mdBadge) {
        mdBadge.innerText = mdSignal.label;
        mdBadge.className = `signal-badge ${mdSignal.class}`;
    }
    
    const sigConversion = document.getElementById("sig-conversion");
    if (sigConversion) {
        sigConversion.innerText = mdSignal.conversion;
        sigConversion.className = `val ${mdSignal.conversion === 'BULLISH' ? 'positive' : 'negative'}`;
    }
    
    const sigBase = document.getElementById("sig-base");
    if (sigBase) {
        sigBase.innerText = mdSignal.base;
        sigBase.className = `val ${mdSignal.base === 'BULLISH' ? 'positive' : 'negative'}`;
    }
    
    const sigCloud = document.getElementById("sig-cloud");
    if (sigCloud) {
        sigCloud.innerText = mdSignal.cloud;
        sigCloud.className = `val ${mdSignal.cloud === 'BULLISH' ? 'positive' : 'negative'}`;
    }

    // AI General Signal UI Rendering
    let aiSignal = stock.aiSignal;
    if (!aiSignal) {
        const isUp = stock.changePercent >= 0;
        aiSignal = {
            label: isUp ? "BUY" : "SELL",
            class: isUp ? "buy" : "sell",
            rsi: isUp ? "62.4" : "38.1",
            macd: isUp ? "BULLISH" : "BEARISH",
            sma: isUp ? "GOLDEN CROSS" : "DEATH CROSS"
        };
    }

    const aiBadge = document.getElementById("ai-signal-badge");
    if (aiBadge) {
        aiBadge.innerText = aiSignal.label;
        aiBadge.className = `signal-badge ${aiSignal.class}`;
    }
    
    const sigRsi = document.getElementById("sig-rsi");
    if (sigRsi) {
        sigRsi.innerText = aiSignal.rsi;
    }
    
    const sigMacd = document.getElementById("sig-macd");
    if (sigMacd) {
        sigMacd.innerText = aiSignal.macd;
        sigMacd.className = `val ${aiSignal.macd === 'BULLISH' ? 'positive' : 'negative'}`;
    }
    
    const sigSma = document.getElementById("sig-sma");
    if (sigSma) {
        sigSma.innerText = aiSignal.sma;
        sigSma.className = `val ${aiSignal.sma === 'GOLDEN CROSS' ? 'positive' : 'negative'}`;
    }

    // Keywords
    const keywordContainer = document.getElementById("ai-keywords");
    keywordContainer.innerHTML = "";
    stock.aiKeywords.forEach(word => {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.innerText = `#${word}`;
        keywordContainer.appendChild(tag);
    });

    // DART Financial health
    document.getElementById("dart-grade-badge").innerText = stock.dartGrade;
    document.getElementById("dart-grade-badge").style.background = isPositive
        ? `linear-gradient(135deg, var(--accent-cyan), var(--accent-blue))`
        : `linear-gradient(135deg, var(--accent-purple), var(--negative))`;

    // Dynamic Financial Scores
    const scores = ["stability", "growth", "profit", "dividend"];
    scores.forEach(scoreType => {
        const val = stock.dartScores[scoreType];
        document.getElementById(`score-${scoreType}`).innerText = `${val}%`;
        const bar = document.getElementById(`bar-${scoreType}`);
        bar.style.width = `${val}%`;
        
        // Progress bar dynamic glowing accents
        if (val > 85) bar.style.background = `linear-gradient(90deg, var(--accent-cyan), var(--accent-blue))`;
        else if (val > 60) bar.style.background = `linear-gradient(90deg, #eab308, var(--accent-cyan))`;
        else bar.style.background = `linear-gradient(90deg, var(--negative), var(--accent-purple))`;
    });

    // Disclosures DART feed
    const discList = document.getElementById("disclosure-list");
    discList.innerHTML = "";
    stock.disclosures.forEach(disc => {
        const li = document.createElement("li");
        li.className = "disclosure-item";
        li.innerHTML = `
            <div class="disclosure-info">
                <span class="disclosure-title">${disc.title}</span>
                <span class="disclosure-date">${disc.date}</span>
            </div>
            <span class="disclosure-tag ${disc.type === 'major' ? 'tag-major' : 'tag-regular'}">
                ${disc.type === 'major' ? '주요공시' : '일반'}
            </span>
        `;
        discList.appendChild(li);
    });

    // News & Consensus
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";
    stock.news.forEach((item, index) => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        
        let sentimentText = "중립";
        let sentimentClass = "neutral";
        if (item.sentiment === "positive") { sentimentText = "긍정"; sentimentClass = "positive"; }
        else if (item.sentiment === "negative") { sentimentText = "부정"; sentimentClass = "negative"; }

        newsItem.innerHTML = `
            <div class="news-item-summary">
                <div class="news-meta-title">
                    <div class="news-meta">
                        <span class="news-source">${item.source}</span>
                        <span>•</span>
                        <span>${item.time}</span>
                    </div>
                    <h4 class="news-headline">${item.headline}</h4>
                </div>
                <span class="news-sentiment-badge ${sentimentClass}">${sentimentText}</span>
            </div>
            <div class="news-ai-drawer">
                <div class="drawer-content">
                    <div class="drawer-header">
                        <i data-lucide="sparkles"></i>
                        <span>AI 3줄 핵심 요약 및 MD 컨센서스</span>
                    </div>
                    <ul class="drawer-bullets">
                        ${item.bullets.map(b => `<li>${b}</li>`).join("")}
                    </ul>
                </div>
            </div>
        `;

        // Toggle Expandable AI Drawer
        newsItem.querySelector(".news-item-summary").addEventListener("click", () => {
            newsItem.classList.toggle("expanded");
        });

        newsContainer.appendChild(newsItem);
    });

    // Refresh icons inside dynamically rendered elements
    lucide.createIcons();

    // Render Price Chart
    renderChart();
}

// --- 5. INTERACTIVE AUTOCOMPLETE SEARCH ---
const searchInput = document.getElementById("search-input");
const searchSuggestions = document.getElementById("search-suggestions");

const searchPool = [
    { name: "삼성전자", symbol: "005930.KS", market: "KOSPI" },
    { name: "애플 (Apple)", symbol: "AAPL", market: "NASDAQ" },
    { name: "테슬라 (Tesla)", symbol: "TSLA", market: "NASDAQ" },
    { name: "엔비디아 (NVIDIA)", symbol: "NVDA", market: "NASDAQ" },
    { name: "토스증권", symbol: "MOCK", market: "KOSDAQ" },
    { name: "SK하이닉스", symbol: "000660.KS", market: "KOSPI" },
    { name: "카카오", symbol: "035720.KS", market: "KOSPI" },
    { name: "현대자동차", symbol: "005380.KS", market: "KOSPI" },
    { name: "구글 (Alphabet)", symbol: "GOOGL", market: "NASDAQ" },
    { name: "마이크로소프트 (MS)", symbol: "MSFT", market: "NASDAQ" }
];

searchInput.addEventListener("input", (e) => {
    const val = e.target.value.toLowerCase().trim();
    if (!val) {
        searchSuggestions.style.display = "none";
        return;
    }

    const matches = searchPool.filter(item => 
        item.name.toLowerCase().includes(val) || 
        item.symbol.toLowerCase().includes(val)
    );

    if (matches.length === 0) {
        // Show fallback allowing arbitrary search
        searchSuggestions.innerHTML = `
            <div class="suggestion-item" id="btn-custom-search" data-value="${val}">
                <div class="suggestion-left">
                    <span class="suggestion-name">"${val}" 검색 및 AI 대시보드 자동 생성</span>
                    <span class="suggestion-symbol">실시간 시뮬레이션 및 데이터 구축</span>
                </div>
                <span class="suggestion-market">GENERATE</span>
            </div>
        `;
    } else {
        searchSuggestions.innerHTML = matches.map(match => `
            <div class="suggestion-item" data-symbol="${match.symbol}">
                <div class="suggestion-left">
                    <span class="suggestion-name">${match.name}</span>
                    <span class="suggestion-symbol">${match.symbol}</span>
                </div>
                <span class="suggestion-market">${match.market}</span>
            </div>
        `).join("");
    }

    searchSuggestions.style.display = "block";
    
    // Add Click listener to suggestions
    document.querySelectorAll(".suggestion-item").forEach(item => {
        item.addEventListener("click", () => {
            const sym = item.getAttribute("data-symbol");
            if (sym) {
                activeStock = sym;
            } else {
                // Custom ticker search generated on-the-fly
                const customVal = item.getAttribute("data-value");
                activeStock = customVal.toUpperCase();
            }
            updateDashboard();
            searchInput.value = "";
            searchSuggestions.style.display = "none";
        });
    });
});

// Close suggestions on outside click
document.addEventListener("click", (e) => {
    if (e.target !== searchInput) {
        searchSuggestions.style.display = "none";
    }
});

// --- 6. USER WATCHLIST ACTIONS ---
const addWatchlistBtn = document.getElementById("add-watchlist-btn");
addWatchlistBtn.addEventListener("click", () => {
    if (!userWatchlist.includes(activeStock)) {
        userWatchlist.push(activeStock);
        renderWatchlist();
        showNotification(`${getCurrentStock().name}이(가) 나의 관심 종목에 추가되었습니다!`);
    } else {
        // Remove if already exists (toggle action)
        userWatchlist = userWatchlist.filter(item => item !== activeStock);
        renderWatchlist();
        showNotification(`${getCurrentStock().name}이(가) 관심 종목에서 삭제되었습니다.`);
    }
});

// Custom notification pop
function showNotification(msg) {
    const popup = document.createElement("div");
    popup.style.position = "fixed";
    popup.style.bottom = "2rem";
    popup.style.right = "2rem";
    popup.style.backgroundColor = "rgba(12, 16, 31, 0.95)";
    popup.style.color = "var(--text-primary)";
    popup.style.padding = "0.85rem 1.5rem";
    popup.style.borderRadius = "10px";
    popup.style.boxShadow = "var(--shadow-premium)";
    popup.style.border = "1px solid var(--accent-blue)";
    popup.style.fontSize = "0.9rem";
    popup.style.fontWeight = "600";
    popup.style.zIndex = "999";
    popup.style.backdropFilter = "var(--glass-blur)";
    popup.style.transition = "all 0.3s ease";
    popup.innerText = msg;
    
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 300);
    }, 2500);
}

// --- 7. TIMEFRAME & INDICATOR ACTION LISTENERS ---
document.querySelectorAll(".time-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
        document.querySelectorAll(".time-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeTimeframe = btn.getAttribute("data-time");
        renderChart();
    });
});

document.getElementById("toggle-ichimoku").addEventListener("change", renderChart);
document.getElementById("toggle-rsi").addEventListener("change", renderChart);
document.getElementById("toggle-elliott").addEventListener("change", renderChart);

// Theme Toggle Action
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle("dark-theme", isDarkTheme);
    document.body.classList.toggle("light-theme", !isDarkTheme);
    
    // Rerender chart with new theme colors
    renderChart();
});

// --- 8. REAL-TIME TICKER & INDEX SIMULATOR ---
// Flashes elements briefly when pricing changes
function flashValueChange(elementId, isUpward) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const origColor = el.style.color;
    
    el.style.transition = "none";
    el.style.backgroundColor = isUpward ? "rgba(16, 185, 129, 0.25)" : "rgba(244, 63, 94, 0.25)";
    el.style.borderRadius = "4px";
    
    setTimeout(() => {
        el.style.transition = "background-color 0.8s ease";
        el.style.backgroundColor = "transparent";
    }, 100);
}

// Remove the fake random stock ticking. Instead, poll backend for real KIS API updates.
setInterval(() => {
    // Determine if Korean market is open (9AM ~ 3:30PM KST)
    const now = new Date();
    const isMarketOpen = (now.getHours() >= 9 && (now.getHours() < 15 || (now.getHours() === 15 && now.getMinutes() <= 30))) && (now.getDay() >= 1 && now.getDay() <= 5);
    
    const liveDot = document.querySelector(".live-dot-glow");
    const liveLabel = document.querySelector(".live-label");
    
    if (isMarketOpen) {
        if(liveDot) liveDot.style.display = "inline-block";
        if(liveLabel) liveLabel.innerText = "LIVE (KIS API)";
        
        // Poll for real data every 10 seconds during market hours
        if (now.getSeconds() % 10 === 0) {
            updateDashboard();
        }
    } else {
        if(liveDot) liveDot.style.display = "none";
        if(liveLabel) liveLabel.innerText = "장 마감 (CLOSED)";
    }

    // Tick Indices (Kept simulated for indices only, as KIS API is set up for stock prices)
    const indices = [
        { id: "idx-kospi", val: 2682.44, changeId: "idx-kospi-change", isK: true },
        { id: "idx-kosdaq", val: 854.12, changeId: "idx-kosdaq-change", isK: false },
        { id: "idx-nasdaq", val: 16737.20, changeId: "idx-nasdaq-change", isK: true }
    ];

    indices.forEach(idx => {
        const el = document.getElementById(idx.id);
        if (!el) return;
        
        const fluc = (Math.random() - 0.49) * 2;
        const currentVal = parseFloat(el.innerText.replace(/,/g, ''));
        const newVal = currentVal + fluc;
        
        el.innerText = newVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        flashValueChange(idx.id, fluc >= 0);
        
        const changeEl = document.getElementById(idx.changeId);
        if (changeEl) {
            const isPos = fluc >= 0;
            changeEl.className = `index-change ${isPos ? 'positive' : 'negative'}`;
            changeEl.innerText = `${isPos ? '+' : ''}${(fluc / currentVal * 100).toFixed(2)}%`;
        }
    });

}, 4000);

// --- 9. APP INITIALIZATION ---
function initApp() {
    renderWatchlist();
    setupSearch();
    
    // Tab Navigation System
    const navItems = document.querySelectorAll('.nav-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all navs
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active to clicked nav
            item.classList.add('active');
            
            // Hide all tabs
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Show target tab
            const tabId = item.getAttribute('data-tab');
            const targetPane = document.getElementById(`tab-${tabId}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }

            // Specific Tab Logic
            if (tabId === 'watchlist') {
                renderMainWatchlist();
            }
        });
    });
    
    updateDashboard();
}

// Render the main Watchlist Tab Grid
function renderMainWatchlist() {
    const container = document.getElementById("main-watchlist-container");
    if (!container) return;
    container.innerHTML = "";
    
    if (userWatchlist.length === 0) {
        container.innerHTML = "<p style='color:var(--text-muted)'>관심 종목이 없습니다. 검색창에서 추가해보세요!</p>";
        return;
    }
    
    userWatchlist.forEach(symbol => {
        let stock = stockDatabase[symbol];
        if (!stock) return;

        const isPositive = stock.changePercent >= 0;
        const trendClass = isPositive ? "positive" : "negative";
        
        const card = document.createElement("div");
        card.className = "grid-card";
        card.style.cursor = "pointer";
        card.style.transition = "transform 0.2s, box-shadow 0.2s";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3 style="margin:0; font-size:1.1rem;">${stock.name}</h3>
                <span style="font-size:0.75rem; background:rgba(255,255,255,0.1); padding:2px 6px; border-radius:4px;">${stock.symbol}</span>
            </div>
            <p class="${trendClass}" style="font-size:1.8rem; font-family:'Orbitron', sans-serif; font-weight:700; margin-top:1rem; margin-bottom:0.25rem;">
                ${stock.price.toLocaleString()} <span style="font-size:0.8rem">${stock.currency}</span>
            </p>
            <p class="${trendClass}" style="font-size:0.9rem; font-weight:600;">
                ${isPositive ? '▲' : '▼'} ${Math.abs(stock.change).toLocaleString()} (${isPositive ? '+' : ''}${stock.changePercent.toFixed(2)}%)
            </p>
        `;
        
        // Hover effects via JS inline (or could add class)
        card.onmouseenter = () => { card.style.transform = "translateY(-5px)"; card.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)"; };
        card.onmouseleave = () => { card.style.transform = "none"; card.style.boxShadow = "none"; };
        
        // Click to open Dashboard for this stock
        card.addEventListener('click', () => {
            activeStock = symbol;
            updateDashboard();
            // Switch back to Dashboard Tab
            const dashboardNav = document.querySelector('.nav-item[data-tab="dashboard"]');
            if (dashboardNav) dashboardNav.click();
            // On mobile, scroll to top
            window.scrollTo(0,0);
        });
        
        container.appendChild(card);
    });
}

// Initialize Lucide Icons & App
document.addEventListener("DOMContentLoaded", () => {
    initApp();
    lucide.createIcons();
    
    // Refresh news action
    document.getElementById("refresh-news-btn").addEventListener("click", () => {
        showNotification("실시간 경제 뉴스 및 리포트가 성공적으로 동기화되었습니다.");
        updateDashboard();
    });
});
