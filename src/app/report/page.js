"use client";

import React, { useState, useEffect } from "react";
import {Box,Typography,Card,CardContent, Grid,Select, MenuItem,IconButton,CircularProgress,Switch,FormControlLabel,Button,Collapse,Alert
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated, config } from "react-spring";
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip as RechartsTooltip,ResponsiveContainer,PieChart,Pie,Cell,RadarChart,Radar,PolarGrid,PolarAngleAxis,PolarRadiusAxis,Legend,LineChart,Line,BarChart,Bar,ScatterChart,Scatter,ZAxis
} from "recharts";
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TimelineIcon from '@mui/icons-material/Timeline';
import PieChartIcon from '@mui/icons-material/PieChart';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import WarningIcon from '@mui/icons-material/Warning';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ErrorIcon from '@mui/icons-material/Error';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import TokenIcon from '@mui/icons-material/Token';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import HexagonIcon from '@mui/icons-material/Hexagon';
import BoltIcon from '@mui/icons-material/Bolt';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { aiService } from '../../services/aiService'
import AiAnalysisCard from '../../components/AiAnalysisCard';
import { Navbar } from "@/components";

// Enhanced color palette
const COLORS = ['#00f2fe', '#4facfe', '#0ea5e9', '#38bdf8', '#7dd3fc', '#0284c7', '#0369a1'];
const GRADIENT_COLORS = {
  primary: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
  secondary: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 100%)',
  accent: 'linear-gradient(135deg, #7dd3fc 0%, #0284c7 100%)'
};

const timeRanges = [
  { value: "15m", label: "15 Minutes" },
  { value: "30m", label: "30 Minutes" },
  { value: "24h", label: "24 Hours" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "all", label: "All Time" }
];

// Group metrics by category for better organization
const METRIC_CATEGORIES = {
  market: {
    title: 'Market Overview',
    metrics: [
      { key: 'marketcap', label: 'Market Cap', icon: <MonetizationOnIcon />, prefix: '$', hasChange: true },
      { key: 'volume', label: 'Volume', icon: <ShowChartIcon />, prefix: '$', hasChange: true },
      { key: 'marketstate', label: 'Market State', icon: <TrendingUpIcon /> },
      { key: 'nft_market_fear_and_greed_index', label: 'Fear & Greed Index', icon: <PieChartIcon /> }
    ]
  },
  trading: {
    title: 'Trading Activity',
    metrics: [
      { key: 'sales', label: 'Sales', icon: <StorefrontIcon />, hasChange: true },
      { key: 'transactions', label: 'Transactions', icon: <CompareArrowsIcon />, hasChange: true },
      { key: 'transfers', label: 'Transfers', icon: <SwapHorizIcon />, hasChange: true },
      { key: 'trade_activity', label: 'Trade Activity', icon: <TimelineIcon /> }
    ]
  },
  traders: {
    title: 'Trader Metrics',
    metrics: [
      { key: 'traders', label: 'Total Traders', icon: <PeopleIcon />, hasChange: true },
      { key: 'traders_ratio', label: 'Traders Ratio', icon: <PieChartIcon />, hasChange: true, isPercentage: true },
      { key: 'traders_buyers', label: 'Buyers', icon: <TrendingUpIcon />, hasChange: true },
      { key: 'traders_sellers', label: 'Sellers', icon: <TrendingDownIcon />, hasChange: true }
    ]
  },
  washtrading: {
    title: 'Wash Trading Analysis',
    metrics: [
      { key: 'washtrade_level', label: 'Wash Trade Level', icon: <WarningIcon />, isPercentage: true },
      { key: 'washtrade_volume', label: 'Wash Trade Volume', icon: <MoneyOffIcon />, prefix: '$', hasChange: true },
      { key: 'washtrade_assets', label: 'Wash Trade Assets', icon: <BrokenImageIcon />, hasChange: true },
      { key: 'washtrade_wallets', label: 'Wash Trade Wallets', icon: <AccountBalanceWalletIcon />, hasChange: true },
      { key: 'washtrade_suspect_sales', label: 'Suspect Sales', icon: <ErrorIcon />, hasChange: true },
      { key: 'washtrade_suspect_sales_ratio', label: 'Suspect Sales Ratio', icon: <PieChartIcon />, isPercentage: true, hasChange: true }
    ]
  },
  whales: {
    title: 'Whale Activity',
    metrics: [
      { key: 'whales', label: 'Whales', icon: <WhatshotIcon />, hasChange: true }
    ]
  }
};

// First, let's enhance the AnimatedValue component for better number animations
const AnimatedValue = ({ value, prefix = "", suffix = "" }) => {
  const { val } = useSpring({
    from: { val: 0 },
    to: { val: Number(value) || 0 },
    delay: 0,
    config: {
      mass: 1,
      tension: 20,
      friction: 10,
      clamp: true,
    }
  });

  const formatValue = (v) => {
    if (v >= 1e9) return `${(v / 1e9).toFixed(2)}B`;
    if (v >= 1e6) return `${(v / 1e6).toFixed(2)}M`;
    if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
    return v.toFixed(0);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <animated.div style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        background: GRADIENT_COLORS.primary,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        display: 'inline-block'
      }}>
        {prefix}
        <animated.span>
          {val.to(formatValue)}
        </animated.span>
        {suffix}
      </animated.div>
    </Box>
  );
};

// Enhanced change indicator component with animations
const ChangeIndicator = ({ value, isPercentage }) => {
  if (!value) return null;
  
  const change = Number(value);
  const isPositive = change > 0;
  
  const { val } = useSpring({
    from: { val: 0 },
    to: { val: change },
    config: { tension: 20, friction: 10 }
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        color: isPositive ? '#10b981' : '#ef4444',
        fontSize: '0.875rem',
        fontWeight: 500,
        gap: 0.5,
        background: isPositive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        padding: '4px 8px',
        borderRadius: '4px',
        transition: 'all 0.3s ease'
      }}>
        {isPositive ? (
          <ArrowUpwardIcon sx={{ fontSize: '1rem' }} />
        ) : (
          <ArrowDownwardIcon sx={{ fontSize: '1rem' }} />
        )}
        <animated.span>
          {val.to(v => `${Math.abs(v).toFixed(2)}${isPercentage ? '%' : ''}`)}
        </animated.span>
      </Box>
    </motion.div>
  );
};

// Update the formatValue function to handle all cases
const formatValue = (value) => {
  // Handle null, undefined, or non-numeric values
  if (!value || isNaN(Number(value))) return '0';
  
  // Convert to number and format
  const num = Number(value);
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
  
  // Handle decimal numbers
  if (Number.isInteger(num)) {
    return num.toString();
  }
  return num.toFixed(2);
};

// Enhanced MetricCard with better animations and visuals
const MetricCard = ({ metric, data }) => {
  const value = data[metric.key];
  const change = metric.hasChange ? data[`${metric.key}_change`] : null;
  const [isHovered, setIsHovered] = useState(false);

  const springProps = useSpring({
    scale: isHovered ? 1.05 : 1,
    shadow: isHovered ? 30 : 0,
    config: { tension: 300, friction: 20 }
  });

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <animated.div
        style={{
          transform: springProps.scale.to(s => `scale(${s})`),
          boxShadow: springProps.shadow.to(s => `0 ${s}px ${s * 2}px rgba(0,0,0,0.1)`)
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Card sx={{
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          height: '100%',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: GRADIENT_COLORS.primary,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }
        }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <IconButton
                sx={{
                  color: COLORS[0],
                  background: `${COLORS[0]}15`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: `${COLORS[0]}25`,
                    transform: 'rotate(15deg)'
                  }
                }}
              >
                {metric.icon}
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  ml: 2,
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: '1rem'
                }}
              >
                {metric.label}
              </Typography>
            </Box>

            <Box sx={{ position: 'relative' }}>
              <AnimatedValue
                value={value}
                prefix={metric.prefix}
                suffix={metric.isPercentage ? '%' : ''}
              />
              {change !== null && (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: 1,
                    opacity: 0.8
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ChangeIndicator
                      value={change}
                      isPercentage={metric.isPercentage}
                    />
                  </motion.div>
                </Box>
              )}
            </Box>
          </CardContent>
        </Card>
      </animated.div>
    </Grid>
  );
};

// Enhanced MetricSection with better organization


        console.log('Formatted metrics:', metrics);

        // Validate essential metrics
        if (!metrics.marketcap && !metrics.totalVolume) {
          throw new Error('Insufficient market data');
        }

        const sections = await aiService.analyzeNFTMarket([], {
          ...metrics,
          // Add derived metrics
          avgPrice: metrics.totalVolume > 0 ? metrics.marketcap / metrics.totalVolume : 0,
          topCollections: marketData.collections || []
        });
        
        if (!sections || Object.values(sections).every(v => !v)) {
          throw new Error('Invalid AI response received');
        }
        
        setAiAnalysis({
          loading: false,
          error: null,
          data: sections
        });
      } catch (error) {
        console.error('AI Analysis Error:', error);
        setAiAnalysis(prev => ({
          ...prev,
          loading: false,
          error: error.message || 'Failed to generate AI analysis'
        }));
      }
    };

    // Only generate analysis when showAiAnalysis is true and we have data
    if (showAiAnalysis && marketData) {
      generateAiAnalysis();
    }
  }, [showAiAnalysis, marketData]);

  // Add near the top of your component
  useEffect(() => {
    const verifyApiKey = async () => {
      const result = await aiService.testApiKey();
      console.log('API Key Test Result:', result);
    };
    
    verifyApiKey();
  }, []);

  return (
    <Box sx={{ 
      p: 4, 
      background: "bg-background/40",
      minHeight: '100vh',
      width: '100%',
      maxWidth: '1920px',
      margin: '0 auto',
      boxSizing: 'border-box'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      > 
      <Navbar/>
        <Typography variant="h3" sx={{ 
          mb: 4, 
          mt: 4,
          textAlign: 'center',
          background: GRADIENT_COLORS.primary,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
          letterSpacing: '1px',
          textShadow: '0 0 30px rgba(0, 242, 254, 0.3)',
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
        }}>
          NFT Market Analytics
        </Typography>

        <Card sx={{ 
          mb: 4, 
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          width: '100%'
        }}>
          <CardContent sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            padding: { xs: 2, sm: 3 }
          }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <BlockchainSelector />
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{ 
                  minWidth: 200, 
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.1)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: COLORS[0]
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: COLORS[0]
                  }
                }}
              >
                {timeRanges.map((range) => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={includeWashTrade}
                  onChange={(e) => setIncludeWashTrade(e.target.checked)}
                  sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': {
                      color: COLORS[0]
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                      backgroundColor: COLORS[0]
                    }
                  }}
                />
              }
              label="Include Wash Trading"
              sx={{ 
                color: '#fff',
                '& .MuiTypography-root': {
                  fontWeight: 500
                }
              }}
            />
            <Button
              variant="contained"
              onClick={() => setShowAiAnalysis(!showAiAnalysis)}
              startIcon={<AutoFixHighIcon />}
              sx={{
                background: showAiAnalysis ? 'linear-gradient(45deg, #60A5FA, #3B82F6)' : 'transparent',
                border: '1px solid #60A5FA',
                '&:hover': {
                  background: 'linear-gradient(45deg, #3B82F6, #60A5FA)'
                }
              }}
            >
              AI Analysis
            </Button>
          </CardContent>
        </Card>

        <Collapse in={showAiAnalysis}>
          <Card sx={{ 
            mb: 4, 
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <CardContent>
              {aiAnalysis.loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                  <CircularProgress />
                </Box>
              ) : aiAnalysis.error ? (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {aiAnalysis.error}
                </Alert>
              ) : aiAnalysis.data ? (
                <AiAnalysisCard
                  data={aiAnalysis.data}
                  onClose={() => setShowAiAnalysis(false)}
                />
              ) : null}
            </CardContent>
          </Card>
        </Collapse>

        {!loading && (
          <>
            <MetricSectionWithChart 
              title="Market Overview"
              metrics={METRIC_CATEGORIES.market.metrics}
              data={marketData}
              chart={<MarketOverviewChart data={marketData} />}
            />

            <MetricSectionWithChart 
              title="Trading Activity"
              metrics={METRIC_CATEGORIES.trading.metrics}
              data={marketData}
              chart={<TradingActivityChart data={marketData} />}
            />

            <MetricSectionWithChart 
              title="Trader Metrics"
              metrics={METRIC_CATEGORIES.traders.metrics}
              data={marketData}
              chart={<TraderMetricsChart data={marketData} />}
            />

            <MetricSectionWithChart 
              title="Wash Trading Analysis"
              metrics={METRIC_CATEGORIES.washtrading.metrics}
              data={marketData}
              chart={<WashTradingChart data={marketData} />}
            />

            <MetricSection 
              title="Whale Activity" 
              metrics={METRIC_CATEGORIES.whales.metrics} 
              data={marketData} 
            />
          </>
        )}
      </motion.div>
    </Box>
  );
};

export default NFTMarketReport;
