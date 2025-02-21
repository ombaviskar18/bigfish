"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Tooltip,
  Chip,
  Avatar,
  LinearProgress,
  Paper,
  Link,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useSpring, animated } from "react-spring";
import { 
  Doughnut, 
  Line, 
  Bar,
  Radar 
} from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  ArcElement, 
  Tooltip as ChartTooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale
} from "chart.js";
import TimelineIcon from '@mui/icons-material/Timeline';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SearchIcon from '@mui/icons-material/Search';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AiAnalysisCard from '../../components/AiAnalysisCard';
import { aiService } from '../../services/aiService';
import { Navbar } from "@/components";
import { useRouter } from 'next/navigation';

// Register Chart.js components
ChartJS.register(
  ArcElement, 
  ChartTooltip, 
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale
);

// Add this rate limiter implementation
const createRateLimiter = (maxRequests, timeWindow) => {
  const queue = [];
  let requestsInWindow = 0;
  let windowStart = Date.now();

  const executeRequest = async () => {
    if (queue.length === 0) return;

    const now = Date.now();
    if (now - windowStart >= timeWindow) {
      requestsInWindow = 0;
      windowStart = now;
    }

    if (requestsInWindow < maxRequests) {
      requestsInWindow++;
      const { url, options, resolve, reject } = queue.shift();
      
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        resolve(json);
      } catch (error) {
        reject(error);
      }

      if (queue.length > 0) {
        setTimeout(executeRequest, timeWindow / maxRequests);
      }
    } else {
      setTimeout(executeRequest, timeWindow - (now - windowStart));
    }
  };

  return (url, options) => {
    return new Promise((resolve, reject) => {
      queue.push({ url, options, resolve, reject });
      if (queue.length === 1) {
        executeRequest();
      }
    });
  };
};

// Create rate-limited fetch function (5 requests per second)
const rateLimitedFetch = createRateLimiter(5, 1000);

const NftPortfolio = () => {
  const { walletAddress: paramWalletAddress } = useParams();
  const navigate = useRouter();
  const [walletAddress, setWalletAddress] = useState(paramWalletAddress || '');
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [loadingRows, setLoadingRows] = useState({});
  const [activeChart, setActiveChart] = useState('doughnut');
  const [portfolioStats, setPortfolioStats] = useState({
    totalValue: 0,
    totalNFTs: 0,
    avgRarity: 0,
    highestValue: 0
  });
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({
    loading: false,
    error: null,
    data: null
  });
  const [apiKeyValid, setApiKeyValid] = useState(true);

  useEffect(() => {
    const verifyApiKey = async () => {
      const result = await aiService.testApiKey();
      setApiKeyValid(result);
    };
    verifyApiKey();
  }, []);

  // Fetch NFT scores for a specific token
  const fetchNftScore = async (tokenId) => {
    const scoreUrl = 'https://api.unleashnfts.com/api/v2/nft/scores';
    const params = new URLSearchParams({
      token_id: tokenId.toString(),
      blockchain: 'ethereum',
      time_range: '24h',
      sort_by: 'price_ceiling',
      sort_order: 'desc',
      offset: '0',
      limit: '30'
    }).toString();

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-api-key': '30fd38bba8d0f7219b1655b074e59e2c'
      }
    };

    try {
      const response = await rateLimitedFetch(`${scoreUrl}?${params}`, options);
      
      if (!response.data || response.error) {
        console.warn(`No score data for token ${tokenId}`);
        return {
          all_time_low: "N/A",
          estimated_price: "N/A",
          max_price: "N/A",
          price: "N/A",
          price_ceiling: "N/A",
          rarity_rank: "N/A",
          rarity_score: "N/A",
          start_price: "N/A",
          washtrade_status: "N/A"
        };
      }

      return response.data[0] || null;
    } catch (error) {
      console.error('Error fetching NFT score:', error);
      return null;
    }
  };

  // Fetch wallet NFT portfolio data and their scores
  const fetchWalletNftPortfolio = async () => {
    const url = `https://api.unleashnfts.com/api/v1/wallet/balance/nft?address=${walletAddress}&offset=${
      (page - 1) * pageSize
    }&limit=${pageSize}`;
    
    const options = {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': '30fd38bba8d0f7219b1655b074e59e2c',
        'Authorization': 'Bearer 30fd38bba8d0f7219b1655b074e59e2c'
      }
    };

    setLoading(true);
    setError(null);

    try {
      const json = await rateLimitedFetch(url, options);

      if (json.metrics && json.metrics.length > 0) {
        setTotalItems(json.total || json.metrics.length);

        // Initialize loading states
        const newLoadingRows = {};
        json.metrics.forEach((item) => {
          newLoadingRows[item.token_id] = true;
        });
        setLoadingRows(newLoadingRows);

        // Process each NFT and fetch its score
        const nftsWithScores = await Promise.all(
          json.metrics.map(async (item) => {
            try {
              const scoreData = await fetchNftScore(item.token_id);
              
              return {
                token_id: item.token_id,
                collection_name: item.collection || "Unknown Collection",
                value: item.quantity,
                contract_address: item.contract_address,
                all_time_low: scoreData?.all_time_low || "N/A",
                estimated_price: scoreData?.estimated_price || "N/A",
                max_price: scoreData?.max_price || "N/A",
                price: scoreData?.price || "N/A",
                price_ceiling: scoreData?.price_ceiling || "N/A",
                rarity_rank: scoreData?.rarity_rank || "N/A",
                rarity_score: scoreData?.rarity_score || "N/A",
                start_price: scoreData?.start_price || "N/A",
                washtrade_status: scoreData?.washtrade_status || "N/A"
              };
            } catch (error) {
              console.error("Error processing NFT:", error);
              return {
                ...item,
                all_time_low: "N/A",
                estimated_price: "N/A",
                max_price: "N/A",
                price: "N/A",
                price_ceiling: "N/A",
                rarity_rank: "N/A",
                rarity_score: "N/A",
                start_price: "N/A",
                washtrade_status: "N/A"
              };
            } finally {
              setLoadingRows(prev => ({
                ...prev,
                [item.token_id]: false
              }));
            }
          })
        );

        setNftData(nftsWithScores);
      } else {
        setError("No NFT portfolio data found.");
      }
    } catch (err) {
      setError("Failed to fetch NFT portfolio.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paramWalletAddress) {
      fetchWalletNftPortfolio();
    }
  }, [paramWalletAddress, page, pageSize]);

  // Calculate portfolio statistics
  const calculatePortfolioStats = (data) => {
    const stats = data.reduce((acc, nft) => {
      const price = nft.price === "N/A" ? 0 : Number(nft.price);
      return {
        totalValue: acc.totalValue + price,
        totalNFTs: acc.totalNFTs + Number(nft.value),
        avgRarity: acc.avgRarity + (nft.rarity_score === "N/A" ? 0 : Number(nft.rarity_score)),
        highestValue: Math.max(acc.highestValue, price)
      };
    }, { totalValue: 0, totalNFTs: 0, avgRarity: 0, highestValue: 0 });

    stats.avgRarity = stats.avgRarity / (data.length || 1);
    setPortfolioStats(stats);
  };

  useEffect(() => {
    if (nftData.length > 0) {
      calculatePortfolioStats(nftData);
    }
  }, [nftData]);

  // Chart data preparations
  const chartData = {
    doughnut: {
      labels: nftData.map((nft) => nft.collection_name),
      datasets: [{
        data: nftData.map((nft) => nft.value),
        backgroundColor: [
          "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4",
          "#FFEEAD", "#D4A5A5", "#9B6B9E"
        ],
        borderColor: "#1a1f2c",
        borderWidth: 2
      }]
    },
    line: {
      labels: nftData.map((nft) => nft.collection_name),
      datasets: [{
        label: 'Price History',
        data: nftData.map((nft) => nft.price === "N/A" ? 0 : Number(nft.price)),
        borderColor: "#FF6B6B",
        tension: 0.4,
        fill: true,
        backgroundColor: 'rgba(255, 107, 107, 0.1)'
      }]
    },
    bar: {
      labels: nftData.map((nft) => nft.collection_name),
      datasets: [{
        label: 'Rarity Scores',
        data: nftData.map((nft) => nft.rarity_score === "N/A" ? 0 : Number(nft.rarity_score)),
        backgroundColor: "#4ECDC4",
        borderColor: "#45B7D1",
        borderWidth: 1
      }]
    },
    radar: {
      labels: ['Price', 'Rarity', 'Volume', 'Market Cap', 'Liquidity'],
      datasets: [{
        label: 'Portfolio Metrics',
        data: [85, 90, 75, 80, 70],
        backgroundColor: 'rgba(150, 206, 180, 0.2)',
        borderColor: '#96CEB4',
        pointBackgroundColor: '#4ECDC4'
      }]
    }
  };

  const pulseAnimation = useSpring({
    from: { opacity: 0.6, transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ opacity: 1, transform: 'scale(1.2)' });
        await next({ opacity: 0.6, transform: 'scale(1)' });
      }
    }
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };

  const handleSearch = () => {
    if (walletAddress) {
      navigate.push(`/insights/${walletAddress}`);
    }
  };

  const generatePortfolioAnalysis = async () => {
    if (!showAiAnalysis || !nftData?.length) return;
    
    setAiAnalysis(prev => ({ ...prev, loading: true, error: null }));
    try {
      const metrics = {
        totalNFTs: nftData.length,
        totalValue: nftData.reduce((sum, nft) => {
          const value = nft.estimated_price !== 'N/A' ? Number(nft.estimated_price) : 0;
          return sum + value;
        }, 0),
        uniqueCollections: new Set(nftData.map(nft => nft.collection_name)).size,
        avgValue: nftData.reduce((sum, nft) => {
          const value = nft.estimated_price !== 'N/A' ? Number(nft.estimated_price) : 0;
          return sum + value;
        }, 0) / nftData.length,
        highestValue: Math.max(...nftData.map(nft => 
          nft.estimated_price !== 'N/A' ? Number(nft.estimated_price) : 0
        ))
      };

      const analysis = await aiService.analyzeNFTPortfolio(nftData, metrics);
      
      if (!analysis || Object.values(analysis).every(v => !v)) {
        throw new Error('Invalid AI response received');
      }
      
      setAiAnalysis({
        loading: false,
        error: null,
        data: analysis
      });
    } catch (err) {
      console.error('Portfolio Analysis Error:', err);
      setAiAnalysis(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'Failed to generate portfolio analysis'
      }));
    }
  };

  useEffect(() => {
    if (showAiAnalysis && nftData?.length) {
      generatePortfolioAnalysis();
    }
  }, [showAiAnalysis, nftData]);

  return (
    <Box sx={{ 
      p: 4, 
      background: 'bg-background/40',
      minHeight: '100vh',
      color: '#fff'
    }}>
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 4,
          mb: 4 
        }}>
          <Typography variant="h4" sx={{ 
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontWeight: 'bold'
          }}>
            <AccountBalanceWalletIcon sx={{ color: '#FF6B6B' }} />
            NFT Portfolio Analytics
          </Typography>
          
          <Chip
            avatar={<Avatar sx={{ bgcolor: '#4ECDC4' }}>{walletAddress.slice(0, 2)}</Avatar>}
            label={`${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`}
            variant="outlined"
            sx={{ 
              color: '#fff',
              borderColor: '#4ECDC4',
              '& .MuiChip-avatar': { color: '#fff' }
            }}
          />
        </Box>

        <Card sx={{
          mb: 4,
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center'
          }}>
            <TextField
              fullWidth
              placeholder="Enter wallet address"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' }
                }
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #00f2fe 20%, #4facfe 80%)'
                }
              }}
            >
              {loading ? <CircularProgress size={24} /> : <SearchIcon />}
            </Button>
          </CardContent>
        </Card>

        <Box sx={{ mb: 4 }}>
          <Button
            variant="contained"
            onClick={() => setShowAiAnalysis(!showAiAnalysis)}
            startIcon={<AutoFixHighIcon />}
            endIcon={showAiAnalysis ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            disabled={!apiKeyValid || !nftData?.length}
            sx={{
              background: 'linear-gradient(45deg, #60A5FA, #3B82F6)',
              mb: 2,
              '&:hover': {
                background: 'linear-gradient(45deg, #3B82F6, #60A5FA)'
              }
            }}
          >
            {!apiKeyValid ? 'AI Analysis Unavailable' : showAiAnalysis ? 'Hide Analysis' : 'Analyze Portfolio'}
          </Button>

          <Collapse in={showAiAnalysis}>
            <Card sx={{ 
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
        </Box>

        {/* Portfolio Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { 
              title: 'Total Portfolio Value', 
              value: `${portfolioStats.totalValue.toFixed(2)} ETH`,
              icon: <ShowChartIcon sx={{ color: '#FF6B6B' }} />,
              change: '+12.5%',
              gradient: 'linear-gradient(135deg, #FF6B6B22 0%, #FF6B6B11 100%)'
            },
            { 
              title: 'Total NFTs', 
              value: portfolioStats.totalNFTs,
              icon: <PieChartIcon sx={{ color: '#4ECDC4' }} />,
              change: '+3',
              gradient: 'linear-gradient(135deg, #4ECDC422 0%, #4ECDC411 100%)'
            },
            { 
              title: 'Average Rarity', 
              value: portfolioStats.avgRarity.toFixed(2),
              icon: <LocalFireDepartmentIcon sx={{ color: '#45B7D1' }} />,
              change: '+5.2%',
              gradient: 'linear-gradient(135deg, #45B7D122 0%, #45B7D111 100%)'
            },
            { 
              title: 'Highest Value NFT', 
              value: `${portfolioStats.highestValue.toFixed(2)} ETH`,
              icon: <TimelineIcon sx={{ color: '#96CEB4' }} />,
              change: '+8.7%',
              gradient: 'linear-gradient(135deg, #96CEB422 0%, #96CEB411 100%)'
            }
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  background: stat.gradient,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: 3,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                  height: '100%',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      {stat.icon}
                      <Chip 
                        label={stat.change} 
                        size="small"
                        sx={{ 
                          bgcolor: stat.change.startsWith('+') ? 'rgba(78, 205, 196, 0.2)' : 'rgba(255, 107, 107, 0.2)',
                          color: stat.change.startsWith('+') ? '#4ECDC4' : '#FF6B6B'
                        }}
                      />
                    </Box>
                    <Typography variant="h4" sx={{ 
                      color: '#fff', 
                      mb: 1,
                      fontWeight: 'bold',
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)'
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              height: '100%',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ 
                    color: '#fff',
                    fontWeight: 'bold'
                  }}>
                    Portfolio Analysis
                  </Typography>
                  <Box>
                    {['line', 'bar', 'radar', 'doughnut'].map((chartType) => (
                      <IconButton
                        key={chartType}
                        onClick={() => setActiveChart(chartType)}
                        sx={{ 
                          color: activeChart === chartType ? '#4ECDC4' : 'rgba(255, 255, 255, 0.5)',
                          '&:hover': { color: '#FF6B6B' },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        {chartType === 'line' && <ShowChartIcon />}
                        {chartType === 'bar' && <TimelineIcon />}
                        {chartType === 'radar' && <PieChartIcon />}
                        {chartType === 'doughnut' && <PieChartIcon />}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ height: 500, position: 'relative' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeChart}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.5 }}
                      style={{ height: '100%' }}
                    >
                      {activeChart === 'doughnut' && <Doughnut data={chartData.doughnut} options={{ 
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              color: '#fff',
                              font: {
                                size: 12
                              }
                            }
                          }
                        }
                      }} />}
                      {activeChart === 'line' && <Line data={chartData.line} options={{ 
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: {
                              color: '#fff'
                            }
                          }
                        },
                        scales: {
                          y: {
                            grid: {
                              color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                              color: '#fff'
                            }
                          },
                          x: {
                            grid: {
                              color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                              color: '#fff'
                            }
                          }
                        }
                      }} />}
                      {activeChart === 'bar' && <Bar data={chartData.bar} options={{ 
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: {
                              color: '#fff'
                            }
                          }
                        },
                        scales: {
                          y: {
                            grid: {
                              color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                              color: '#fff'
                            }
                          },
                          x: {
                            grid: {
                              color: 'rgba(255, 255, 255, 0.1)'
                            },
                            ticks: {
                              color: '#fff'
                            }
                          }
                        }
                      }} />}
                      {activeChart === 'radar' && <Radar data={chartData.radar} options={{ 
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            labels: {
                              color: '#fff'
                            }
                          }
                        },
                        scales: {
                          r: {
                            grid: {
                              color: 'rgba(255, 255, 255, 0.1)'
                            },
                            pointLabels: {
                              color: '#fff'
                            },
                            ticks: {
                              color: '#fff'
                            }
                          }
                        }
                      }} />}
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* NFT List */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 3,
              height: '600px',
              overflow: 'auto',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              '&::-webkit-scrollbar': {
                width: '8px'
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px'
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#4ECDC4',
                borderRadius: '4px'
              }
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff', 
                  mb: 2,
                  fontWeight: 'bold'
                }}>
                  Top NFTs
                </Typography>
                {nftData.slice(0, 5).map((nft, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Paper sx={{ 
                      p: 2, 
                      mb: 2, 
                      background: 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderRadius: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(5px)',
                        background: 'rgba(255, 255, 255, 0.08)'
                      }
                    }}>
                      <Box>
                        <Typography variant="subtitle1" sx={{ 
                          color: '#fff',
                          fontWeight: 'bold'
                        }}>
                          {nft.collection_name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          ID: {nft.token_id}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ 
                          color: '#4ECDC4',
                          fontWeight: 'bold'
                        }}>
                          {nft.price === "N/A" ? "N/A" : `${Number(nft.price).toFixed(4)} ETH`}
                        </Typography>
                        <Chip 
                          label={`Rank: ${nft.rarity_rank}`}
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(78, 205, 196, 0.2)', 
                            color: '#4ECDC4',
                            fontWeight: 'bold'
                          }}
                        />
                      </Box>
                    </Paper>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Pagination Controls */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4,
          '& .MuiPaginationItem-root': {
            color: '#fff',
            borderColor: '#4ECDC4',
            '&.Mui-selected': {
              backgroundColor: '#4ECDC4'
            },
            '&:hover': {
              backgroundColor: 'rgba(78, 205, 196, 0.2)'
            }
          }
        }}>
          <Pagination
            count={Math.ceil(totalItems / pageSize)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      </motion.div>
    </Box>
  );
};

export default NftPortfolio;
