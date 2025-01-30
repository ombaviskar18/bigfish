"use client";  // Ensure this is a Client Component

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Grid,
  Box,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  IconButton,
  Tooltip as MuiTooltip, // ✅ Renamed Material UI Tooltip
  Chip,
  Avatar,
  Alert,
  CircularProgress,
  Collapse,
} from "@mui/material";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import TimelineIcon from "@mui/icons-material/Timeline";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { aiService } from '../../services/aiService'
import AiAnalysisCard from '../../components/AiAnalysisCard';

// ✅ FIX: Register required Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip as ChartTooltip, // ✅ Renamed Chart.js Tooltip
  Legend,
} from "chart.js";
import { Navbar } from "@/components";

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  ChartTooltip, // ✅ Using renamed Chart.js Tooltip
  Legend
);
const WhaleIdentification = () => {
  const [walletData, setWalletData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  const [apiKeyValid, setApiKeyValid] = useState(true);

  const [blockchain, setBlockchain] = useState("ethereum");
  const [timeRange, setTimeRange] = useState("24h");
  const [sortBy, setSortBy] = useState("volume");
  const [sortOrder, setSortOrder] = useState("desc");

  const [activeChart, setActiveChart] = useState('volume');
  const [whaleMetrics, setWhaleMetrics] = useState({
    totalVolume: 0,
    totalTransactions: 0,
    uniqueWhales: 0,
    avgTransactionSize: 0
  });

  const [aiAnalysis, setAiAnalysis] = useState({
    loading: false,
    error: null,
    data: null
  });

  const fetchWalletAnalytics = async () => {
    const url = `https://api.unleashnfts.com/api/v2/nft/wallet/analytics?blockchain=${blockchain}&time_range=${timeRange}&sort_by=${sortBy}&sort_order=${sortOrder}&offset=0&limit=30`;
    
    setLoading(true);
    setError(null);

    try {
      // Add proxy to handle CORS
      const proxyUrl = process.env.NEXT_PUBLIC_API_PROXY || '';
      const options = {
        method: "GET",
        headers: {
          'accept': "application/json",
          'x-api-key': "30fd38bba8d0f7219b1655b074e59e2c",
          'origin': window.location.origin
        },
        mode: 'cors', // Explicitly set CORS mode
        timeout: 30000 // 30 second timeout
      };

      // Use Promise.race to implement timeout
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timed out')), 30000)
      );

      const response = await Promise.race([
        fetch(proxyUrl + url, options),
        timeoutPromise
      ]);

      if (!response.ok) {
        // Handle specific HTTP errors
        if (response.status === 504) {
          throw new Error('Gateway timeout - please try again');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      
      if (json.data) {
        setWalletData(json.data);
        
        // Calculate metrics after successful data fetch
        const totalVolume = json.data.reduce((sum, wallet) => sum + (Number(wallet.volume) || 0), 0);
        const totalTransactions = json.data.reduce((sum, wallet) => sum + (Number(wallet.transactions) || 0), 0);
        
        setWhaleMetrics({
          totalVolume,
          totalTransactions,
          uniqueWhales: json.data.length,
          avgTransactionSize: totalTransactions > 0 ? totalVolume / totalTransactions : 0
        });
      } else {
        setWalletData([]);
        setWhaleMetrics({
          totalVolume: 0,
          totalTransactions: 0,
          uniqueWhales: 0,
          avgTransactionSize: 0
        });
        console.warn('No data received from API');
      }

    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Failed to fetch wallet analytics. Please try again later.");
      setWalletData([]);
      setWhaleMetrics({
        totalVolume: 0,
        totalTransactions: 0,
        uniqueWhales: 0,
        avgTransactionSize: 0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWalletAnalytics();
  }, [blockchain, timeRange, sortBy, sortOrder]);

  useEffect(() => {
    if (walletData.length > 0) {
      const metrics = walletData.reduce((acc, wallet) => ({
        totalVolume: acc.totalVolume + Number(wallet.sales || 0),
        totalTransactions: acc.totalTransactions + Number(wallet.transactions || 0),
        uniqueWhales: acc.uniqueWhales + 1,
        avgTransactionSize: wallet.sales && wallet.transactions ? 
          acc.avgTransactionSize + (wallet.sales / wallet.transactions) : acc.avgTransactionSize
      }), { totalVolume: 0, totalTransactions: 0, uniqueWhales: 0, avgTransactionSize: 0 });

      metrics.avgTransactionSize = metrics.avgTransactionSize / walletData.length;
      setWhaleMetrics(metrics);
    }
  }, [walletData]);

  useEffect(() => {
    const verifyApiKey = async () => {
      const result = await aiService.testApiKey();
      setApiKeyValid(result);
    };
    verifyApiKey();
  }, []);

  const generateAiAnalysis = async () => {
    if (walletData.length > 0 && whaleMetrics.totalVolume > 0) {
      console.log('Generating AI analysis for whale data:', walletData);
      setAiAnalysis(prev => ({ ...prev, loading: true, error: null }));

      try {
        const metrics = {
          totalVolume: whaleMetrics.totalVolume,
          totalTransactions: whaleMetrics.totalTransactions,
          uniqueWallets: whaleMetrics.uniqueWhales,
          avgTransactionSize: whaleMetrics.avgTransactionSize
        };

        const result = await aiService.analyzeWhaleIdentification(walletData, metrics);
        
        if (!result) {
          throw new Error('Failed to generate analysis');
        }

        setAiAnalysis({
          loading: false,
          error: null,
          data: result
        });

      } catch (error) {
        console.error('Failed to generate AI analysis:', error);
        setAiAnalysis(prev => ({
          ...prev,
          loading: false,
          error: error.message
        }));
      }
    }
  };

  const chartData = {
    volume: {
      labels: walletData.slice(0, 10).map(wallet => wallet.wallet?.slice(0, 8) || 'Unknown'),
      datasets: [{
        label: 'Trading Volume (ETH)',
        data: walletData.slice(0, 10).map(wallet => wallet.sales || 0),
        borderColor: '#4ECDC4',
        backgroundColor: 'rgba(78, 205, 196, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8
      }]
    },
    activity: {
      labels: ['NFTs Bought', 'NFTs Sold', 'Transfers', 'Other Transactions'],
      datasets: [{
        data: [
          walletData.reduce((sum, wallet) => sum + Number(wallet.nft_bought || 0), 0),
          walletData.reduce((sum, wallet) => sum + Number(wallet.nft_sold || 0), 0),
          walletData.reduce((sum, wallet) => sum + Number(wallet.transfers || 0), 0),
          walletData.reduce((sum, wallet) => sum + Number(wallet.transactions || 0), 0)
        ],
        backgroundColor: [
          '#4ECDC4',
          '#FF6B6B',
          '#95A5A6',
          '#45B7D1'
        ],
        borderWidth: 2,
        borderColor: '#1a1f2c'
      }]
    },
    transactions: {
      labels: walletData.slice(0, 10).map(wallet => wallet.wallet?.slice(0, 8) || 'Unknown'),
      datasets: [{
        label: 'Transaction Count',
        data: walletData.slice(0, 10).map(wallet => wallet.transactions || 0),
        backgroundColor: '#FF6B6B',
        borderRadius: 8
      }]
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#fff', font: { size: 12 } }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 31, 44, 0.9)',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: true
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#fff', font: { size: 11 } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#fff', font: { size: 11 } }
      }
    }
  };

  return (
    <Box sx={{ 
      p: 4, 
      background: 'bg-background/40',
      minHeight: '100vh',
      color: '#fff'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar/>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 4,
          mb: 4, 
        }}>
          <Typography variant="h4" sx={{ 
            background: 'linear-gradient(45deg, #4ECDC4, #45B7D1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            fontWeight: 'bold'
          }}>
            <AccountBalanceWalletIcon sx={{ color: '#4ECDC4' }} />
            Whale Identification
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2,
          my: 4 
        }}>
          <Button
            variant="contained"
            onClick={() => {
              setShowAiAnalysis(!showAiAnalysis);
              if (!aiAnalysis.data && !aiAnalysis.loading) {
                generateAiAnalysis();
              }
            }}
            disabled={!apiKeyValid || !walletData?.length}
            startIcon={<AutoFixHighIcon />}
            sx={{
              background: 'linear-gradient(45deg, #60A5FA, #3B82F6)',
              '&:hover': {
                background: 'linear-gradient(45deg, #3B82F6, #60A5FA)'
              }
            }}
          >
            {!apiKeyValid ? 'AI Analysis Unavailable' : showAiAnalysis ? 'Hide Analysis' : 'Analyze Whales'}
          </Button>

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
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              title: 'Total Volume',
              value: `${whaleMetrics.totalVolume.toFixed(2)} ETH`,
              icon: <ShowChartIcon />,
              color: '#4ECDC4'
            },
            {
              title: 'Unique Whales',
              value: whaleMetrics.uniqueWhales,
              icon: <AccountBalanceWalletIcon />,
              color: '#FF6B6B'
            },
            {
              title: 'Total Transactions',
              value: whaleMetrics.totalTransactions,
              icon: <CompareArrowsIcon />,
              color: '#95A5A6'
            },
            {
              title: 'Avg Transaction',
              value: `${whaleMetrics.avgTransactionSize.toFixed(2)} ETH`,
              icon: <TrendingUpIcon />,
              color: '#45B7D1'
            }
          ].map((metric, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 4,
                  border: `1px solid ${metric.color}40`,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 24px ${metric.color}20`
                  }
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Box sx={{ 
                        p: 1.5, 
                        borderRadius: 2, 
                        backgroundColor: `${metric.color}20`
                      }}>
                        {React.cloneElement(metric.icon, { sx: { color: metric.color, fontSize: 28 } })}
                      </Box>
                    </Box>
                    <Typography variant="h4" sx={{ 
                      color: '#fff', 
                      mb: 1,
                      fontWeight: 'bold',
                      fontSize: '1.8rem'
                    }}>
                      {metric.value}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem'
                    }}>
                      {metric.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Blockchain</InputLabel>
              <Select
                value={blockchain}
                onChange={(e) => setBlockchain(e.target.value)}
                label="Blockchain"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                <MenuItem value="ethereum">Ethereum</MenuItem>
                <MenuItem value="binance">Binance</MenuItem>
                <MenuItem value="bitcoin">Bitcoin</MenuItem>
                <MenuItem value="polygon">Polygon</MenuItem>
                <MenuItem value="avalanche">Avalanche</MenuItem>
                <MenuItem value="solana">Solana</MenuItem>
                <MenuItem value="linea">Linea</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Time Range</InputLabel>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                label="Time Range"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                <MenuItem value="15m">15 Minutes</MenuItem>
                <MenuItem value="30m">30 Minutes</MenuItem>
                <MenuItem value="24h">24 Hours</MenuItem>
                <MenuItem value="7d">7 Days</MenuItem>
                <MenuItem value="30d">30 Days</MenuItem>
                <MenuItem value="90d">90 Days</MenuItem>
                <MenuItem value="all">All</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                <MenuItem value="volume">Volume</MenuItem>
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="transactions">Transactions</MenuItem>
                <MenuItem value="transfers">Transfers</MenuItem>
                <MenuItem value="nft_bought">NFT Bought</MenuItem>
                <MenuItem value="nft_sold">NFT Sold</MenuItem>
                <MenuItem value="minted_value">Minted Value</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>Sort Order</InputLabel>
              <Select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                label="Sort Order"
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  }
                }}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '600px'
            }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ 
                    color: '#fff',
                    fontWeight: 'bold'
                  }}>
                    Whale Activity Analysis
                  </Typography>
                  <Box>
                    {['volume', 'transactions', 'activity'].map((chart) => (
                      <IconButton
                        key={chart}
                        onClick={() => setActiveChart(chart)}
                        sx={{ 
                          color: activeChart === chart ? '#4ECDC4' : 'rgba(255, 255, 255, 0.5)',
                          '&:hover': { color: '#4ECDC4' }
                        }}
                      >
                        {chart === 'volume' && <ShowChartIcon />}
                        {chart === 'transactions' && <TimelineIcon />}
                        {chart === 'activity' && <CompareArrowsIcon />}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ height: 500 }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeChart}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      style={{ height: '100%' }}
                    >
                      {activeChart === 'volume' && <Line data={chartData.volume} options={chartOptions} />}
                      {activeChart === 'transactions' && <Bar data={chartData.transactions} options={chartOptions} />}
                      {activeChart === 'activity' && <Doughnut data={chartData.activity} options={chartOptions} />}
                    </motion.div>
                  </AnimatePresence>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '600px'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ 
                  color: '#fff',
                  mb: 3,
                  fontWeight: 'bold'
                }}>
                  Top Whales
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {walletData.slice(0, 5).map((wallet, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Paper sx={{ 
                        p: 2,
                        background: 'rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(10px)',
                          background: 'rgba(255, 255, 255, 0.1)'
                        }
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar sx={{ 
                            bgcolor: index === 0 ? '#4ECDC4' : 
                                     index === 1 ? '#FF6B6B' :
                                     index === 2 ? '#95A5A6' :
                                     '#45B7D1',
                            fontWeight: 'bold'
                          }}>
                            {index + 1}
                          </Avatar>
                          <Box>
                            <Link 
                              href={`/insights/${wallet.wallet}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <Typography sx={{ 
                                color: '#4ECDC4',
                                fontWeight: 'bold',
                                '&:hover': {
                                  color: '#45B7D1'
                                }
                              }}>
                                {wallet.wallet?.slice(0, 8)}...{wallet.wallet?.slice(-6)}
                              </Typography>
                            </Link>
                            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                              {wallet.transactions} transactions
                            </Typography>
                          </Box>
                        </Box>
                        <Chip 
                          label={`${Number(wallet.sales).toFixed(2)} ETH`}
                          sx={{ 
                            bgcolor: 'rgba(78, 205, 196, 0.2)',
                            color: '#fff',
                            '& .MuiChip-label': { 
                              fontWeight: 'bold',
                              fontSize: '0.9rem'
                            }
                          }}
                        />
                      </Paper>
                    </motion.div>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ 
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: 4,
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <CardContent>
            {loading && (
              <Typography variant="body1" sx={{ color: '#4ECDC4', textAlign: 'center' }}>
                Loading wallet analytics...
              </Typography>
            )}
            {error && (
              <Typography variant="body1" sx={{ color: '#FF6B6B', textAlign: 'center' }}>
                {error}
              </Typography>
            )}

            {!loading && !error && walletData.length > 0 && (
              <TableContainer component={Paper} sx={{ 
                background: 'transparent',
                maxHeight: 400
              }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        backgroundColor: 'rgba(26, 31, 44, 0.9)',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>Wallet Address</TableCell>
                      <TableCell sx={{ 
                        backgroundColor: 'rgba(26, 31, 44, 0.9)',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>Total Volume (ETH)</TableCell>
                      <TableCell sx={{ 
                        backgroundColor: 'rgba(26, 31, 44, 0.9)',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>Transactions</TableCell>
                      <TableCell sx={{ 
                        backgroundColor: 'rgba(26, 31, 44, 0.9)',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>Transfers</TableCell>
                      <TableCell sx={{ 
                        backgroundColor: 'rgba(26, 31, 44, 0.9)',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>NFT Bought</TableCell>
                      <TableCell sx={{ 
                        backgroundColor: 'rgba(26, 31, 44, 0.9)',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>NFT Sold</TableCell>
                      <TableCell sx={{ 
                        backgroundColor: 'rgba(26, 31, 44, 0.9)',
                        color: '#fff',
                        fontWeight: 'bold'
                      }}>Last Updated</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {walletData.map((wallet, index) => (
                      <TableRow 
                        key={index}
                        sx={{
                          '&:nth-of-type(odd)': {
                            backgroundColor: 'rgba(255, 255, 255, 0.02)'
                          },
                          '&:hover': {
                            backgroundColor: 'rgba(78, 205, 196, 0.1)'
                          }
                        }}
                      >
                        <TableCell>
                          <Link
                            href={`/insights/${wallet.wallet}`}
                            style={{ 
                              textDecoration: "none", 
                              color: "#4ECDC4",
                              fontWeight: "bold"
                            }}
                          >
                            {wallet.wallet || "N/A"}
                          </Link>
                        </TableCell>
                        <TableCell sx={{ color: '#fff' }}>{wallet.sales || "N/A"}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{wallet.transactions || "N/A"}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{wallet.transfers || "N/A"}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{wallet.nft_bought || "N/A"}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{wallet.nft_sold || "N/A"}</TableCell>
                        <TableCell sx={{ color: '#fff' }}>{wallet.updated_at || "N/A"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {!loading && !error && walletData.length === 0 && (
              <Typography variant="body1" sx={{ 
                color: '#fff',
                textAlign: 'center',
                py: 4
              }}>
                No data available for the selected filters.
              </Typography>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default WhaleIdentification;