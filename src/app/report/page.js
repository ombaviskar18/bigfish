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
const MetricSection = ({ title, metrics, data }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            color: '#fff',
            background: GRADIENT_COLORS.primary,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 600,
            display: 'inline-block',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -8,
              left: 0,
              width: '100%',
              height: '2px',
              background: GRADIENT_COLORS.primary,
              opacity: 0.5
            }
          }}
        >
          {title}
        </Typography>
        <Grid container spacing={3}>
          {metrics.map(metric => (
            <MetricCard
              key={metric.key}
              metric={metric}
              data={data}
            />
          ))}
        </Grid>
      </Box>
    </motion.div>
  );
};

// Update the MetricSectionWithChart component for better layout
const MetricSectionWithChart = ({ title, metrics, data, chart }) => {
  if (!data) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: '#00f2fe',
            fontWeight: 600,
            fontSize: '1.25rem'
          }}
        >
          {title}
        </Typography>
        <Grid container spacing={2}>
          {/* Metrics */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              {metrics.map(metric => (
                <Grid item xs={12} sm={6} lg={3} key={metric.key}>
                  <Card sx={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    height: '100%',
                    p: 2
                  }}>
                    <Box sx={{ mb: 1 }}>
                      <IconButton
                        size="small"
                        sx={{
                          color: '#00f2fe',
                          background: 'rgba(0, 242, 254, 0.1)',
                          p: 1
                        }}
                      >
                        {metric.icon}
                      </IconButton>
                    </Box>
                    <Typography sx={{ color: '#fff', fontSize: '0.875rem', mb: 1 }}>
                      {metric.label}
                    </Typography>
                    <Typography sx={{ color: '#00f2fe', fontSize: '1.5rem', fontWeight: 'bold' }}>
                      {metric.prefix}
                      {formatValue(data[metric.key])}
                      {metric.isPercentage ? '%' : ''}
                    </Typography>
                    {metric.hasChange && (
                      <Box sx={{ mt: 1 }}>
                        <ChangeIndicator
                          value={data[`${metric.key}_change`]}
                          isPercentage={metric.isPercentage}
                        />
                      </Box>
                    )}
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          
          {/* Chart */}
          <Grid item xs={12} md={4}>
            <Card sx={{
              background: 'rgba(15, 23, 42, 0.8)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '100%',
              minHeight: 200
            }}>
              {chart}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
};

// Update chart styles
const chartContainerStyles = {
  p: 2,
  height: '100%',
  '& .recharts-text': {
    fill: 'rgba(255, 255, 255, 0.7)',
    fontSize: '0.7rem'
  },
  '& .recharts-cartesian-grid-horizontal line, & .recharts-cartesian-grid-vertical line': {
    stroke: 'rgba(255, 255, 255, 0.1)'
  }
};

// Update MarketOverviewChart
const MarketOverviewChart = ({ data }) => (
  <Box sx={chartContainerStyles}>
    <ResponsiveContainer width="100%" height={180}>
      <BarChart 
        data={[
          { name: 'Market Cap', value: data?.marketcap || 0 },
          { name: 'Volume', value: data?.volume || 0 }
        ]}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <XAxis 
          dataKey="name" 
          fontSize={10} 
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          fontSize={10}
          width={50}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => formatValue(value)}
        />
        <Bar dataKey="value" fill="#00f2fe" radius={[4, 4, 0, 0]} maxBarSize={40} />
      </BarChart>
    </ResponsiveContainer>
  </Box>
);

// Update the TradingActivityChart
const TradingActivityChart = ({ data }) => (
  <Box sx={chartContainerStyles}>
    <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, fontSize: '0.75rem' }}>
      Activity Trends
    </Typography>
    <ResponsiveContainer width="100%" height={160}>
      <LineChart 
        data={[
          { name: 'Sales', value: data?.sales || 0 },
          { name: 'Trans', value: data?.transactions || 0 },
          { name: 'Transfer', value: data?.transfers || 0 }
        ]}
        margin={{ top: 10, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis 
          dataKey="name" 
          fontSize={10}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          fontSize={10}
          width={45}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={COLORS[0]} 
          strokeWidth={2}
          dot={{ r: 2 }}
          activeDot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Box>
);

// Update the TraderMetricsChart
const TraderMetricsChart = ({ data }) => (
  <Box sx={chartContainerStyles}>
    <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, fontSize: '0.75rem' }}>
      Trader Distribution
    </Typography>
    <ResponsiveContainer width="100%" height={160}>
      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <Pie
          data={[
            { name: 'Buyers', value: data?.traders_buyers || 0 },
            { name: 'Sellers', value: data?.traders_sellers || 0 }
          ]}
          cx="50%"
          cy="50%"
          innerRadius={25}
          outerRadius={40}
          paddingAngle={2}
          dataKey="value"
        >
          {[COLORS[0], COLORS[1]].map((color, index) => (
            <Cell key={`cell-${index}`} fill={color} />
          ))}
        </Pie>
        <Legend
          verticalAlign="bottom"
          height={20}
          content={({ payload }) => (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
              {payload.map((entry, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: entry.color }} />
                  <Typography sx={{ color: '#fff', fontSize: '0.65rem' }}>
                    {`${entry.value}: ${Number(entry.payload.value).toLocaleString()}`}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  </Box>
);

// Update the WashTradingChart
const WashTradingChart = ({ data }) => (
  <Box sx={chartContainerStyles}>
    <Typography variant="subtitle2" sx={{ color: '#fff', mb: 1, fontSize: '0.75rem' }}>
      Wash Trading Metrics
    </Typography>
    <ResponsiveContainer width="100%" height={160}>
      <BarChart
        data={[
          { name: 'Volume', value: data?.washtrade_volume || 0 },
          { name: 'Assets', value: data?.washtrade_assets || 0 },
          { name: 'Wallets', value: data?.washtrade_wallets || 0 }
        ]}
        layout="vertical"
        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
      >
        <XAxis 
          type="number" 
          fontSize={10}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          dataKey="name" 
          type="category" 
          fontSize={10} 
          width={50}
          axisLine={false}
          tickLine={false}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
        <Bar 
          dataKey="value" 
          fill={COLORS[0]} 
          radius={[0, 4, 4, 0]}
          maxBarSize={20}
        />
      </BarChart>
    </ResponsiveContainer>
  </Box>
);

// Update the blockchain options to use Material-UI icons instead of images
const BLOCKCHAIN_OPTIONS = [
  { 
    value: 1, 
    label: 'Ethereum', 
    icon: <CurrencyBitcoinIcon />,  // Using Material-UI icon
    color: '#627EEA'
  },
  { 
    value: 137, 
    label: 'Polygon', 
    icon: <HexagonIcon />,  // Using Material-UI icon
    color: '#8247E5'
  },
  { 
    value: 56, 
    label: 'BSC', 
    icon: <AccountBalanceWalletIcon />,  // Using Material-UI icon
    color: '#F3BA2F'
  },
  { 
    value: 43114, 
    label: 'Avalanche', 
    icon: <TimelineIcon />,  // Using Material-UI icon
    color: '#E84142'
  },
  { 
    value: 900, 
    label: 'Solana', 
    icon: <BoltIcon />,  // Using Material-UI icon
    color: '#14F195'
  }
];

// Update the NFTMarketReport component to include blockchain state
const NFTMarketReport = () => {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("24h");
  const [blockchain, setBlockchain] = useState(1); // Default to Ethereum
  const [includeWashTrade, setIncludeWashTrade] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({
    loading: false,
    error: null,
    data: null
  });

  // Add this debug useEffect
  useEffect(() => {
    console.log('Market Data:', marketData);
  }, [marketData]);

  // Update the fetchMarketData function to use the blockchain parameter
  const fetchMarketData = async () => {
    try {
      setLoading(true);
      
      const baseUrl = 'https://api.unleashnfts.com/api/v1/market/metrics';
      const queryParams = new URLSearchParams({
        currency: 'usd',
        blockchain: blockchain.toString(), // Use the selected blockchain
        time_range: timeRange,
        include_washtrade: includeWashTrade.toString()
      });

      // Only use the valid metrics according to the API error message
      const validMetrics = [
        'holders',
        'holders_change',
        'marketcap',
        'marketcap_change',
        'marketstate',
        'sales',
        'sales_change',
        'trade_activity',
        'traders',
        'traders_change',
        'traders_ratio',
        'traders_ratio_change',
        'traders_buyers',
        'traders_buyers_change',
        'traders_sellers',
        'traders_sellers_change',
        'transactions',
        'transactions_change',
        'transfers',
        'transfers_change',
        'volume',
        'volume_change',
        'washtrade_assets',
        'washtrade_assets_change',
        'washtrade_level',
        'washtrade_suspect_sales',
        'washtrade_suspect_sales_change',
        'washtrade_suspect_sales_ratio',
        'washtrade_suspect_sales_ratio_change',
        'washtrade_volume',
        'washtrade_volume_change',
        'washtrade_wallets',
        'washtrade_wallets_change',
        'whales',
        'whales_change',
        'nft_market_fear_and_greed_index'
      ];

      // Add valid metrics to query params
      validMetrics.forEach(metric => queryParams.append('metrics', metric));

      const url = `${baseUrl}?${queryParams.toString()}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-api-key': '30fd38bba8d0f7219b1655b074e59e2c'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(`API error: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('API Response:', result);

      if (result.metric_values) {
        // Transform the nested data structure
        const transformedData = {};
        Object.entries(result.metric_values).forEach(([key, data]) => {
          transformedData[key] = data.value;
          if (data.change !== undefined) {
            transformedData[`${key}_change`] = data.change;
          }
        });
        setMarketData(transformedData);
      } else {
        console.error('Invalid response structure:', result);
        setMarketData(null);
      }
    } catch (error) {
      console.error('Error fetching market data:', error);
      setMarketData(null);
    } finally {
      setLoading(false);
    }
  };

  // Update useEffect to include blockchain in dependencies
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        await fetchMarketData();
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    if (mounted) {
      fetchData();
    }

    return () => {
      mounted = false;
    };
  }, [timeRange, blockchain, includeWashTrade]); // Add blockchain to dependencies

  // Update the BlockchainSelector component to use icons instead of images
  const BlockchainSelector = () => (
    <Select
      value={blockchain}
      onChange={(e) => setBlockchain(e.target.value)}
      sx={{ 
        minWidth: 150,
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
      renderValue={(selected) => {
        const chain = BLOCKCHAIN_OPTIONS.find(opt => opt.value === selected);
        return (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1
          }}>
            <Box sx={{ 
              color: chain.color,
              display: 'flex',
              alignItems: 'center'
            }}>
              {chain.icon}
            </Box>
            <Typography sx={{ 
              color: chain.color,
              fontWeight: 500
            }}>
              {chain.label}
            </Typography>
          </Box>
        );
      }}
    >
      {BLOCKCHAIN_OPTIONS.map((chain) => (
        <MenuItem 
          key={chain.value} 
          value={chain.value}
          sx={{
            '&:hover': {
              backgroundColor: `${chain.color}15`
            },
            '&.Mui-selected': {
              backgroundColor: `${chain.color}20`,
              '&:hover': {
                backgroundColor: `${chain.color}30`
              }
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1
          }}>
            <Box sx={{ 
              color: chain.color,
              display: 'flex',
              alignItems: 'center'
            }}>
              {chain.icon}
            </Box>
            <Typography sx={{ 
              color: chain.color,
              fontWeight: 500
            }}>
              {chain.label}
            </Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );

  // Update the AI analysis useEffect
  useEffect(() => {
    const generateAiAnalysis = async () => {
      // Check if we have valid market data with the correct structure
      if (!marketData || typeof marketData !== 'object') {
        console.warn('Market data not available');
        return;
      }

      console.log('Generating AI analysis with data:', marketData);
      setAiAnalysis(prev => ({ ...prev, loading: true, error: null }));
      
      try {
        // Format metrics based on the actual data structure
        const metrics = {
          // Convert string values to numbers and handle all available metrics
          marketcap: Number(marketData.marketcap),
          marketcap_change: Number(marketData.marketcap_change),
          volume: Number(marketData.volume),
          volume_change: Number(marketData.volume_change),
          sales: Number(marketData.sales),
          sales_change: Number(marketData.sales_change),
          transactions: Number(marketData.transactions),
          transactions_change: Number(marketData.transactions_change),
          transfers: Number(marketData.transfers),
          transfers_change: Number(marketData.transfers_change),
          traders: Number(marketData.traders),
          traders_change: Number(marketData.traders_change),
          traders_ratio: Number(marketData.traders_ratio),
          traders_buyers: Number(marketData.traders_buyers),
          traders_sellers: Number(marketData.traders_sellers),
          washtrade_level: Number(marketData.washtrade_level),
          washtrade_volume: Number(marketData.washtrade_volume),
          washtrade_assets: Number(marketData.washtrade_assets),
          washtrade_wallets: Number(marketData.washtrade_wallets),
          washtrade_suspect_sales: Number(marketData.washtrade_suspect_sales),
          washtrade_suspect_sales_ratio: Number(marketData.washtrade_suspect_sales_ratio),
          nft_market_fear_and_greed_index: Number(marketData.nft_market_fear_and_greed_index),
          marketstate: Number(marketData.marketstate),
          whales: Number(marketData.whales),
          whales_change: Number(marketData.whales_change)
        };

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
