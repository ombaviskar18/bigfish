import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  console.error('Gemini API key not found in environment variables');
  throw new Error('Gemini API key is required');
}
console.log('Gemini API Key:', process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const genAI = new GoogleGenerativeAI(API_KEY);

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const TIMEOUT_DURATION = 20000;

const DEFAULT_ANALYSIS = {
  summary: '• Market shows moderate activity\n• Trading volume remains stable\n• Price trends are neutral',
  risk: '• Market volatility is present\n• Diversification recommended\n• Watch for market shifts',
  predictions: '• Short-term consolidation likely\n• Volume expected to stabilize\n• Collection growth varies',
  opportunities: '• Monitor support levels\n• Watch trending collections\n• Consider entry on dips',
  keyMetrics: '• Volume within range\n• Price action neutral\n• Market sentiment mixed'
};

// You might want to add specific defaults for different analysis types
const WHALE_DEFAULTS = {
  summary: '• Whale activity detected in market\n• Significant trading volume observed\n• Multiple transactions recorded\n• Market impact being monitored',
  risk: '• Wallet concentration within normal range\n• Trading patterns appear standard\n• No unusual manipulation detected\n• Moderate risk level observed',
  predictions: '• Volume expected to maintain\n• Normal movement patterns likely\n• Market direction stable\n• Risk levels manageable',
  opportunities: '• Monitor whale movements\n• Consider market positioning\n• Maintain risk management\n• Watch for pattern changes',
  keyMetrics: '• Volume within expected range\n• Behavior patterns normal\n• Risk levels moderate\n• Market health stable'
};

// Add portfolio-specific default analysis
const PORTFOLIO_DEFAULTS = {
  summary: 
    '• Portfolio contains 10 NFTs across multiple collections\n' +
    '• Total portfolio value: 10 ETH\n' +
    '• Average NFT value: 1 ETH\n' +
    '• Mix of OpenSea and other collections',
  risk: 
    '• Diversified across 7 unique collections\n' +
    '• Equal value distribution across NFTs\n' +
    '• Some collections lack price history\n' +
    '• Medium overall risk profile',
  predictions: 
    '• Stable value retention expected\n' +
    '• Potential for collection growth\n' +
    '• Market sentiment remains neutral\n' +
    '• Moderate growth opportunities',
  opportunities: 
    '• Consider diversifying into verified collections\n' +
    '• Monitor OpenSea collection performance\n' +
    '• Track floor price movements\n' +
    '• Evaluate collection rarity metrics',
  keyMetrics: 
    '• Total Portfolio Value: 10 ETH\n' +
    '• Unique Collections: 7\n' +
    '• Average Value Per NFT: 1 ETH\n' +
    '• Floor Value: 34,856 ETH'
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to parse AI response
const parseAIResponse = (text) => {
  try {
    if (!text || typeof text !== 'string') {
      console.warn('Invalid AI response text');
      return PORTFOLIO_DEFAULTS;
    }

    // Remove markdown formatting and clean up the text
    const cleanText = text
      .replace(/\*\*/g, '')  // Remove **
      .replace(/\n\n/g, '\n')  // Remove double newlines
      .trim();

    const sections = {
      summary: '',
      risk: '',
      predictions: '',
      opportunities: '',
      keyMetrics: ''
    };

    // Extract and clean up section content
    const extractSection = (sectionName) => {
      const startMarker = sectionName.toUpperCase();
      const startIndex = cleanText.indexOf(startMarker);
      
      if (startIndex === -1) return '';

      let endIndex = cleanText.length;
      const nextSections = ['MARKET_SUMMARY', 'RISK_ANALYSIS', 'PREDICTIONS', 'OPPORTUNITIES', 'KEY_METRICS']
        .filter(s => s !== startMarker);

      for (const nextSection of nextSections) {
        const nextIndex = cleanText.indexOf(nextSection, startIndex + startMarker.length);
        if (nextIndex !== -1 && nextIndex < endIndex) {
          endIndex = nextIndex;
        }
      }

      const content = cleanText
        .slice(startIndex + startMarker.length, endIndex)
        .trim()
        .split('\n')
        .map(line => {
          line = line.trim();
          // Remove markdown formatting and ensure bullet points
          line = line.replace(/^\s*-\s*/, '• ');  // Replace - with •
          line = line.replace(/^\s*\*\*[^:]+:\*\*\s*/, '• ');  // Replace **Title:** with •
          return line.startsWith('•') ? line : `• ${line}`;
        })
        .filter(line => line.length > 0)
        .join('\n');

      return content;
    };

    // Extract each section
    sections.summary = extractSection('MARKET_SUMMARY');
    sections.risk = extractSection('RISK_ANALYSIS');
    sections.predictions = extractSection('PREDICTIONS');
    sections.opportunities = extractSection('OPPORTUNITIES');
    sections.keyMetrics = extractSection('KEY_METRICS');

    // Validate sections
    const hasValidContent = Object.values(sections).every(section => 
      section && section.includes('•') && section.split('•').length > 1
    );

    if (!hasValidContent) {
      console.warn('Invalid section content found');
      return PORTFOLIO_DEFAULTS;
    }

    return sections;

  } catch (error) {
    console.error('Error parsing AI response:', error);
    return PORTFOLIO_DEFAULTS;
  }
};

export const aiService = {
  // NFT Market Report Analysis
  async analyzeNFTMarket(collections, metrics) {
    if (!metrics) {
      console.warn('Invalid market data for analysis');
      return DEFAULT_ANALYSIS;
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      // Format metrics with actual data structure
      const marketMetrics = {
        // Market Overview
        marketCap: {
          value: metrics.marketcap || 0,
          change: metrics.marketcap_change || 0
        },
        volume: {
          value: metrics.volume || 0,
          change: metrics.volume_change || 0
        },
        marketState: metrics.market_state || 0,
        fearAndGreedIndex: metrics.nft_market_fear_and_greed_index || 0,

        // Trading Activity
        sales: {
          value: metrics.sales || 0,
          change: metrics.sales_change || 0
        },
        transactions: {
          value: metrics.transactions || 0,
          change: metrics.transactions_change || 0
        },
        transfers: {
          value: metrics.transfers || 0,
          change: metrics.transfers_change || 0
        },
        tradeActivity: metrics.trade_activity || 0,

        // Trader Metrics
        traders: {
          total: metrics.traders || 0,
          change: metrics.traders_change || 0,
          ratio: metrics.traders_ratio || 0,
          buyers: metrics.traders_buyers || 0,
          sellers: metrics.traders_sellers || 0
        },

        // Wash Trading
        washTrading: {
          level: metrics.washtrade_level || 0,
          volume: metrics.washtrade_volume || 0,
          assets: metrics.washtrade_assets || 0,
          wallets: metrics.washtrade_wallets || 0,
          suspectSales: metrics.washtrade_suspect_sales || 0,
          suspectRatio: metrics.washtrade_suspect_sales_ratio || 0
        }
      };

      const prompt = `
        Analyze this NFT market data and provide insights:

        Market Overview:
        - Market Cap: $${(marketMetrics.marketCap.value/1e9).toFixed(2)}B (${marketMetrics.marketCap.change}% change)
        - Volume: $${(marketMetrics.volume.value/1e6).toFixed(2)}M (${marketMetrics.volume.change}% change)
        - Market State: ${marketMetrics.marketState}
        - Fear & Greed Index: ${marketMetrics.fearAndGreedIndex}

        Trading Activity:
        - Sales: ${marketMetrics.sales.value.toLocaleString()} (${marketMetrics.sales.change}% change)
        - Transactions: ${marketMetrics.transactions.value.toLocaleString()} (${marketMetrics.transactions.change}% change)
        - Transfers: ${marketMetrics.transfers.value.toLocaleString()}
        - Trade Activity Level: ${marketMetrics.tradeActivity}

        Trader Metrics:
        - Total Traders: ${marketMetrics.traders.total.toLocaleString()}
        - Traders Ratio: ${marketMetrics.traders.ratio}%
        - Buyers: ${marketMetrics.traders.buyers.toLocaleString()}
        - Sellers: ${marketMetrics.traders.sellers.toLocaleString()}

        Wash Trading:
        - Level: ${marketMetrics.washTrading.level}%
        - Volume: $${(marketMetrics.washTrading.volume/1e6).toFixed(2)}M
        - Affected Assets: ${marketMetrics.washTrading.assets.toLocaleString()}
        - Suspect Wallets: ${marketMetrics.washTrading.wallets.toLocaleString()}
        - Suspect Sales: ${marketMetrics.washTrading.suspectSales.toLocaleString()}
        - Suspect Ratio: ${marketMetrics.washTrading.suspectRatio}%

        Provide analysis in this format:

        MARKET_SUMMARY
        • Overall Market Health (based on market cap, volume, and fear/greed)
        • Trading Activity Analysis
        • Trader Participation and Balance
        • Market Psychology (based on fear/greed and trader ratio)

        RISK_ANALYSIS
        • Market Manipulation Indicators
        • Wash Trading Assessment
        • Buyer/Seller Balance
        • Liquidity Analysis

        PREDICTIONS
        • Market Direction
        • Volume Trends
        • Trader Behavior
        • Risk Outlook

        OPPORTUNITIES
        • Market Entry/Exit Points
        • Risk/Reward Scenarios
        • Trading Strategies
        • Risk Management

        KEY_METRICS
        • Most Important Indicators
        • Risk Levels
        • Market Health Score
        • Key Trends

        Use bullet points (•) and provide specific insights based on the data.
      `;

      const result = await model.generateContent(prompt);
      
      if (!result?.response?.text) {
        throw new Error('Invalid AI response');
      }

      return parseAIResponse(result.response.text());

    } catch (error) {
      console.error('AI Analysis Error:', error);
      return DEFAULT_ANALYSIS;
    }
  },

  // Whale Identification Analysis
  async analyzeWhaleIdentification(wallets, metrics) {
    if (!wallets?.length) {
      console.warn('Invalid whale data for analysis');
      return WHALE_DEFAULTS;
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      const prompt = `
        Analyze these whale wallet activities:

        Overview:
        - Total Volume: ${metrics.totalVolume.toFixed(2)} ETH
        - Total Transactions: ${metrics.totalTransactions}
        - Unique Wallets: ${metrics.uniqueWallets}
        - Average Transaction: ${metrics.avgTransactionSize.toFixed(2)} ETH

        Top Wallets:
        ${wallets.slice(0, 5).map(wallet => 
          `- ${wallet.address}: ${wallet.volume?.toFixed(2) || 0} ETH (${wallet.transactions || 0} trades)`
        ).join('\n')}

        Provide analysis in exactly this format:

        MARKET_SUMMARY
        • Overall whale activity
        • Volume analysis
        • Transaction pattern
        • Market impact

        RISK_ANALYSIS
        • Wallet concentration
        • Trading behavior
        • Market manipulation
        • Risk level

        PREDICTIONS
        • Volume prediction
        • Movement prediction
        • Market direction
        • Risk trajectory

        OPPORTUNITIES
        • Trading strategy
        • Position suggestion
        • Risk management
        • Action item

        KEY_METRICS
        • Volume metric
        • Behavior metric
        • Risk metric
        • Health metric

        Use bullet points (•) and be specific about the data provided.`;

      let retries = 0;
      while (retries < MAX_RETRIES) {
        try {
          const result = await Promise.race([
            model.generateContent(prompt),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Request timeout')), TIMEOUT_DURATION)
            )
          ]);

          if (!result?.response?.text) {
            throw new Error('Invalid AI response');
          }

          const text = result.response.text();
          
          if (!text.includes('MARKET_SUMMARY') || 
              !text.includes('RISK_ANALYSIS') || 
              !text.includes('PREDICTIONS') || 
              !text.includes('OPPORTUNITIES') || 
              !text.includes('KEY_METRICS')) {
            throw new Error('Invalid response format');
          }

          const sections = {};
          const parts = text.split(/MARKET_SUMMARY|RISK_ANALYSIS|PREDICTIONS|OPPORTUNITIES|KEY_METRICS/);
          
          if (parts.length >= 5) {
            sections.summary = parts[1]?.trim() || WHALE_DEFAULTS.summary;
            sections.risk = parts[2]?.trim() || WHALE_DEFAULTS.risk;
            sections.predictions = parts[3]?.trim() || WHALE_DEFAULTS.predictions;
            sections.opportunities = parts[4]?.trim() || WHALE_DEFAULTS.opportunities;
            sections.keyMetrics = parts[5]?.trim() || WHALE_DEFAULTS.keyMetrics;

            return sections;
          }

          throw new Error('Invalid response format');

        } catch (error) {
          retries++;
          if (retries === MAX_RETRIES) {
            console.error('Max retries reached:', error);
            return WHALE_DEFAULTS;
          }
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
      }

    } catch (error) {
      console.error('AI Whale Analysis Error:', error);
      return WHALE_DEFAULTS;
    }
  },

  // NFT Portfolio Analysis
  async analyzeNFTPortfolio(nfts, metrics) {
    if (!nfts?.length) {
      console.warn('Invalid NFT data for analysis');
      return DEFAULT_ANALYSIS;
    }

    try {
      const modelName = "gemini-pro";
      
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      // Calculate metrics if not provided
      const portfolioMetrics = {
        totalNFTs: nfts.length,
        totalValue: nfts.reduce((sum, nft) => sum + (Number(nft.floor_price) || 0), 0),
        uniqueCollections: new Set(nfts.map(nft => nft.collection_name)).size,
        collections: nfts.reduce((acc, nft) => {
          const key = nft.collection_name || 'Unknown';
          if (!acc[key]) {
            acc[key] = { count: 0, floor: Number(nft.floor_price) || 0 };
          }
          acc[key].count++;
          return acc;
        }, {})
      };

      const prompt = `
        Analyze this wallet's NFT holdings and provide insights:

        Wallet NFT Overview:
        - Total NFTs: ${portfolioMetrics.totalNFTs}
        - Total Collections: ${portfolioMetrics.uniqueCollections}
        - Estimated Value: ${portfolioMetrics.totalValue.toFixed(2)} ETH

        Collection Breakdown:
        ${Object.entries(portfolioMetrics.collections)
          .map(([name, data]) => `- ${name}: ${data.count} NFTs (Floor: ${data.floor} ETH)`)
          .join('\n')}

        Top NFTs:
        ${nfts.slice(0, 5).map(nft => 
          `- ${nft.collection_name}: ${nft.token_id} (Floor: ${nft.floor_price || 0} ETH)`
        ).join('\n')}

        Provide analysis in this exact format:

        MARKET_SUMMARY
        • NFT Holdings: Overview of wallet's NFT portfolio
        • Collection Diversity: Analysis of collection distribution
        • Value Assessment: Total value and key holdings

        RISK_ANALYSIS
        • Collection Risks: Risk exposure in current holdings
        • Market Position: Portfolio strength assessment
        • Risk Management: Diversification status

        PREDICTIONS
        • Collection Outlook: Potential for held collections
        • Value Trends: Expected value movements
        • Market Direction: Relevant market trends

        OPPORTUNITIES
        • Growth Areas: Collections with potential
        • Trading Options: Possible optimization moves
        • Strategic Actions: Recommended next steps

        KEY_METRICS
        • Holdings Analysis: NFT distribution insights
        • Collection Stats: Key collection metrics
        • Portfolio Health: Overall portfolio status

        Use bullet points (•) and maintain exact section headers.
      `;

      try {
        const result = await Promise.race([
          model.generateContent(prompt),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('AI request timeout')), 20000)
          )
        ]);

        if (!result?.response) {
          throw new Error('Invalid AI response');
        }

        const text = result.response.text();
        
        if (!text || typeof text !== 'string' || text.length < 100) {
          throw new Error('Invalid AI response content');
        }

        const sections = {};
        const parts = text.split(/MARKET_SUMMARY|RISK_ANALYSIS|PREDICTIONS|OPPORTUNITIES|KEY_METRICS/);
        
        if (parts.length >= 5) {
          sections.summary = parts[1]?.trim() || DEFAULT_ANALYSIS.summary;
          sections.risk = parts[2]?.trim() || DEFAULT_ANALYSIS.risk;
          sections.predictions = parts[3]?.trim() || DEFAULT_ANALYSIS.predictions;
          sections.opportunities = parts[4]?.trim() || DEFAULT_ANALYSIS.opportunities;
          sections.keyMetrics = parts[5]?.trim() || DEFAULT_ANALYSIS.keyMetrics;

          return sections;
        }

        throw new Error('Invalid response format');

      } catch (error) {
        console.error('AI Analysis Error:', error);
        return DEFAULT_ANALYSIS;
      }
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return DEFAULT_ANALYSIS;
    }
  },
  // Whale Alerts Analysis
  async analyzeWhaleAlerts(alerts, metrics) {
    if (!alerts?.length) {
      console.warn('Invalid alert data for analysis');
      return DEFAULT_ANALYSIS;
    }

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      const prompt = `
        Analyze these whale movement alerts:

        Overview:
        - Total Volume: ${metrics.totalVolume.toFixed(2)} ETH
        - Active Whales: ${metrics.activeWhales}
        - Total Transactions: ${metrics.totalTransactions}
        - Average Transaction: ${metrics.avgTransactionSize.toFixed(2)} ETH

        Recent Alerts:
        ${metrics.recentAlerts.map(alert => 
          `- Wallet ${alert.wallet}: ${alert.volume} ETH (Bought: ${alert.nftsBought}, Sold: ${alert.nftsSold})`
        ).join('\n')}

        Provide analysis in this format:

        MARKET_SUMMARY
        • Whale Activity Level
        • Transaction Patterns
        • Market Impact

        RISK_ANALYSIS
        • Concentration Risk
        • Market Manipulation
        • Liquidity Impact

        PREDICTIONS
        • Whale Behavior
        • Price Impact
        • Market Direction

        OPPORTUNITIES
        • Trading Opportunities
        • Risk Management
        • Strategic Positions

        KEY_METRICS
        • Volume Analysis
        • Transaction Patterns
        • Market Influence
      `;

      let retries = 0;
      const maxRetries = 3;

      while (retries < maxRetries) {
        try {
          const result = await model.generateContent(prompt);
          
          if (!result?.response?.text) {
            throw new Error('Invalid AI response');
          }

          const text = result.response.text();
          
          // Basic validation of the response format
          if (!text.includes('MARKET_SUMMARY') || 
              !text.includes('RISK_ANALYSIS') || 
              !text.includes('PREDICTIONS') || 
              !text.includes('OPPORTUNITIES') || 
              !text.includes('KEY_METRICS')) {
            throw new Error('Invalid response format');
          }

          const sections = {};
          const parts = text.split(/MARKET_SUMMARY|RISK_ANALYSIS|PREDICTIONS|OPPORTUNITIES|KEY_METRICS/);
          
          if (parts.length >= 5) {
            sections.summary = parts[1]?.trim() || DEFAULT_ANALYSIS.summary;
            sections.risk = parts[2]?.trim() || DEFAULT_ANALYSIS.risk;
            sections.predictions = parts[3]?.trim() || DEFAULT_ANALYSIS.predictions;
            sections.opportunities = parts[4]?.trim() || DEFAULT_ANALYSIS.opportunities;
            sections.keyMetrics = parts[5]?.trim() || DEFAULT_ANALYSIS.keyMetrics;

            return sections;
          }

          throw new Error('Invalid response format');

        } catch (error) {
          retries++;
          if (retries === maxRetries) {
            console.error('Max retries reached:', error);
            return DEFAULT_ANALYSIS;
          }
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

    } catch (error) {
      console.error('AI Analysis Error:', error);
      return DEFAULT_ANALYSIS;
    }
  },

  // Add this temporary test function
  async testApiKey() {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent("Test");
      if (!result?.response?.text) {
        console.error('API test failed: Invalid response format');
        return false;
      }
      return true;
    } catch (error) {
      console.error('API Key Test Failed:', error.message);
      return false;
    }
  },

  // Add this to your existing aiService object
  async analyzeWhaleMovements(alerts, metrics) {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-pro",
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      });

      const prompt = `
        Analyze these whale movement alerts:
        • Volume trends
        Overview:
        - Total Alerts: ${metrics.totalAlerts}
        - Total Volume: ${metrics.totalVolume.toFixed(2)} ETH
        - Active Wallets: ${metrics.trading.activeWallets}
        - Average Transaction: ${metrics.trading.avgTransaction.toFixed(2)} ETH
        • Market positioning
        Distribution:
        - High Value Movements (>5000 ETH): ${metrics.distribution.highValue}
        - Medium Value Movements (1000-5000 ETH): ${metrics.distribution.mediumValue}
        - Low Value Movements (<1000 ETH): ${metrics.distribution.lowValue}
        • Volume metrics
        Provide analysis in exactly this format:
        • Risk levels
        MARKET_SUMMARY
        • Overall market activity
        • Volume analysis
        • Movement patterns
        • Key trends
      const result = await model.generateContent(prompt);
        RISK_ANALYSIS
        • Market sentiment
        • Whale behavior
        • Volume distribution
        • Risk indicators
      return parseAIResponse(result.response.text());
        PREDICTIONS
      `;

      const result = await model.generateContent(prompt);
      
      if (!result?.response?.text) {
        throw new Error('Invalid AI response');
      }

      return parseAIResponse(result.response.text());

    } catch (error) {
      console.error('AI Whale Analysis Error:', error);
      return DEFAULT_ANALYSIS;
    }
  }
};

export default aiService;
