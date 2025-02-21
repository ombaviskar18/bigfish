"use client";

import React from 'react';
import { useState, useEffect, useRef } from 'react';
import {Box,Typography,Card,CardContent,TextField,Button,Select,MenuItem,FormControl,InputLabel,Grid,Alert,CircularProgress,Badge, IconButton,Tooltip,Switch,Dialog,DialogTitle,DialogContent, DialogActions,Snackbar,Zoom,Fade,Chip,Collapse,
} from '@mui/material';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import notificationService from '../../services/notificationService';
import { toast } from 'react-hot-toast';
import telegramService from '../../services/telegramService';
import TelegramIcon from '@mui/icons-material/Telegram';
import CloseIcon from '@mui/icons-material/Close';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from 'react-spring';
import {  Line, Bar, Radar 
} from "react-chartjs-2";
import { CategoryScale,LinearScale, PointElement,LineElement,BarElement,RadialLinearScale,Filler
} from "chart.js";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PieChartIcon from '@mui/icons-material/PieChart';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { Chart as ChartJS } from 'chart.js';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AiAnalysisCard from '../../components/AiAnalysisCard';
import { aiService } from '../../services/aiService';
import { Navbar } from '@/components';

// Add to existing Chart.js registration
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Filler
);

const WhaleMovementAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [threshold, setThreshold] = useState(100);
  const [blockchain, setBlockchain] = useState("ethereum");
  const [timeRange, setTimeRange] = useState("15m");
  const [notifications, setNotifications] = useState({});
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const [showPulse, setShowPulse] = useState(false);
  const alertsRef = useRef(null);
  const [whaleStats, setWhaleStats] = useState({
    totalVolume: 0,
    avgTransactionSize: 0,
    activeWhales: 0,
    totalTransactions: 0
  });
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState({
    loading: false,
    error: null,
    data: null
  });
  const [apiKeyValid, setApiKeyValid] = useState(true);

  const pulseAnimation = useSpring({
    from: { opacity: 0.6, transform: 'scale(1)' },
    to: async (next) => {
      while (true) {
        await next({ opacity: 1, transform: 'scale(1.2)' });
        await next({ opacity: 0.6, transform: 'scale(1)' });
      }
    },
  });

  const fetchWhaleAlerts = async () => {
    setLoading(true);
    setError(null);
    setShowPulse(true);

    try {
      const url = `https://api.unleashnfts.com/api/v2/nft/wallet/analytics?blockchain=${blockchain}&time_range=${timeRange}&sort_by=volume&sort_order=desc&offset=0&limit=30`;
      
      const response = await fetch(url, {
        headers: {
          'accept': 'application/json',
          'x-api-key': '30fd38bba8d0f7219b1655b074e59e2c'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch whale movements');
      }

      const data = await response.json();
      
      const whaleMovements = data.data.filter(movement => 
        movement.volume >= threshold
      ).map(alert => ({
        ...alert,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now()
      }));

      setAlerts(prev => {
        const newAlerts = [...whaleMovements];
        // Keep only alerts from last 24 hours
        const cutoff = Date.now() - 24 * 60 * 60 * 1000;
        return newAlerts.filter(alert => alert.timestamp > cutoff);
      });

      setLastUpdate(Date.now());

      if (telegramEnabled) {
        whaleMovements.forEach(async alert => {
          if (alert.nft_bought > 0 || alert.nft_sold > 0) {
            try {
              await telegramService.sendWhaleAlert(
                alert.wallet,
                alert.volume,
                alert.nft_bought,
                alert.nft_sold
              );
              
              toast.success('Transaction alert sent to Telegram!', {
                icon: '🐋',
                duration: 4000
              });
            } catch (err) {
              console.error('Failed to send Telegram alert:', err);
              toast.error('Failed to send Telegram alert');
            }
          }
        });
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      setTimeout(() => setShowPulse(false), 1000);
    }
  };

  useEffect(() => {
    fetchWhaleAlerts();
    const interval = setInterval(fetchWhaleAlerts, 30000); // Fetch every 30 seconds
    return () => clearInterval(interval);
  }, [blockchain, timeRange, threshold, telegramEnabled]);

  useEffect(() => {
    if (alerts.length > 0) {
      calculateWhaleStats(alerts);
    }
  }, [alerts]);

  const calculateWhaleStats = (alerts) => {
    const stats = alerts.reduce((acc, alert) => ({
      totalVolume: acc.totalVolume + Number(alert.volume || 0),
      totalTransactions: acc.totalTransactions + Number(alert.transactions || 0),
      activeWhales: acc.activeWhales + 1,
      avgTransactionSize: acc.avgTransactionSize + (Number(alert.volume || 0) / (alert.transactions || 1))
    }), { totalVolume: 0, totalTransactions: 0, activeWhales: 0, avgTransactionSize: 0 });

    stats.avgTransactionSize = stats.avgTransactionSize / (alerts.length || 1);
    setWhaleStats(stats);
  };

  const generateAiAnalysis = async (alerts) => {
    if (!alerts || !alerts.length) {
      console.warn('No whale alerts available for analysis');
      return;
    }

    console.log('Generating AI analysis for whale alerts:', alerts);
    setAiAnalysis(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Format metrics for AI analysis
      const metrics = {
        totalAlerts: alerts.length,
        totalVolume: alerts.reduce((sum, alert) => sum + (alert.buy_volume || 0), 0),
        
        // Trading metrics
        trading: {
          buyVolume: alerts.reduce((sum, alert) => sum + (alert.buy_volume || 0), 0),
          avgTransaction: alerts.reduce((sum, alert) => sum + (alert.buy_volume || 0), 0) / 
            alerts.filter(alert => alert.buy_volume).length,
          activeWallets: new Set(alerts.map(alert => alert.wallet)).size
        },

        // Distribution metrics
        distribution: {
          highValue: alerts.filter(alert => (alert.buy_volume || 0) > 5000).length,
          mediumValue: alerts.filter(alert => (alert.buy_volume || 0) > 1000 && (alert.buy_volume || 0) <= 5000).length,
          lowValue: alerts.filter(alert => (alert.buy_volume || 0) <= 1000).length
        }
      };

      const result = await aiService.analyzeWhaleMovements(alerts, metrics);
      
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
  };

  useEffect(() => {
    if (showAiAnalysis && alerts.length > 0) {
      generateAiAnalysis(alerts);
    }
  }, [showAiAnalysis, alerts]);

  const toggleNotification = (walletAddress) => {
    setNotifications(prev => ({
      ...prev,
      [walletAddress]: !prev[walletAddress]
    }));
  };

  const handleNotificationToggle = (walletAddress) => {
    if (!notifications[walletAddress]) {
      notificationService.subscribe(walletAddress, (notification) => {
        toast.success(`New transaction from ${notification.walletAddress}`, {
          duration: 4000
        });
      });
    } else {
      notificationService.unsubscribe(walletAddress);
    }
    toggleNotification(walletAddress);
  };

  const handleTelegramToggle = async (alert) => {
    try {
      const result = await telegramService.sendWhaleAlert(
        alert.wallet,
        alert.volume,
        alert.nft_bought,
        alert.nft_sold
      );
      
      if (result.ok) {
        toast.success('Whale movement alert sent to Telegram!', {
          icon: '🐋',
          duration: 4000
        });
      } else {
        throw new Error(result.description || 'Failed to send alert');
      }
    } catch (error) {
      console.error('Failed to send Telegram alert:', error);
      toast.error(error.message || 'Failed to send Telegram alert');
    }
  };

  const getTimeSince = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  // Enhanced chart data with more vibrant colors and animations
  const chartData = {
    volumeOverTime: {
      labels: alerts.slice(-10).map(alert => new Date(alert.timestamp).toLocaleTimeString()),
      datasets: [{
        label: 'Transaction Volume (ETH)',
        data: alerts.slice(-10).map(alert => alert.volume),
        borderColor: 'rgba(147, 51, 234, 1)', // Vibrant purple
        backgroundColor: 'rgba(147, 51, 234, 0.3)',
        fill: true,
        tension: 0.6,
        pointRadius: 8,
        pointHoverRadius: 12,
        pointBackgroundColor: 'rgba(147, 51, 234, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(147, 51, 234, 1)',
        borderWidth: 4
      }]
    },
    transactionDistribution: {
      labels: alerts.slice(-5).map(alert => alert.wallet.slice(0, 8)),
      datasets: [{
        label: 'NFTs Bought/Sold',
        data: alerts.slice(-5).map(alert => alert.nft_bought + alert.nft_sold),
        backgroundColor: [
          'rgba(236, 72, 153, 0.9)', // Pink
          'rgba(59, 130, 246, 0.9)', // Blue
          'rgba(16, 185, 129, 0.9)', // Green
          'rgba(245, 158, 11, 0.9)', // Orange
          'rgba(139, 92, 246, 0.9)'  // Purple
        ],
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ffffff50'
      }]
    },
    whaleMetrics: {
      labels: ['Volume', 'Transactions', 'NFTs Bought', 'NFTs Sold', 'Market Impact'],
      datasets: [{
        label: 'Whale Activity Metrics',
        data: [85, 65, 75, 70, 80],
        backgroundColor: 'rgba(56, 189, 248, 0.6)', // Bright blue
        borderColor: 'rgba(56, 189, 248, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(56, 189, 248, 1)',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(56, 189, 248, 1)',
        pointHoverRadius: 10
      }]
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart'
    },
    plugins: {
      legend: {
        position: 'bottom',
        labels: { 
          color: '#fff',
          font: { 
            size: 14,
            weight: 'bold'
          },
          padding: 20
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleFont: { size: 16, weight: 'bold' },
        bodyFont: { size: 14 },
        padding: 16,
        cornerRadius: 12,
        displayColors: true,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: 'rgba(255, 255, 255, 0.8)',
        callbacks: {
          label: function(context) {
            return `  ${context.parsed.y} ETH`;
          }
        }
      }
    },
    scales: {
      r: {
        angleLines: { 
          color: 'rgba(255, 255, 255, 0.3)',
          lineWidth: 2
        },
        grid: { 
          color: 'rgba(255, 255, 255, 0.3)',
          circular: true
        },
        pointLabels: { 
          color: '#fff',
          font: { 
            size: 14,
            weight: 'bold'
          }
        },
        ticks: { 
          color: '#fff',
          backdropColor: 'transparent',
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: { 
          color: 'rgba(255, 255, 255, 0.2)',
          borderDash: [5, 5]
        },
        ticks: { 
          color: '#fff',
          font: { 
            size: 14,
            weight: 'bold'
          }
        }
      },
      y: {
        grid: { 
          color: 'rgba(255, 255, 255, 0.2)',
          borderDash: [5, 5]
        },
        ticks: { 
          color: '#fff',
          font: { 
            size: 14,
            weight: 'bold'
          }
        }
      }
    },
    elements: {
      line: {
        tension: 0.4
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  };

  useEffect(() => {
    const verifyApiKey = async () => {
      const result = await aiService.testApiKey();
      setApiKeyValid(result);
    };
    verifyApiKey();
  }, []);

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
        {/* Header Section */}
        <Navbar/>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mt: 4,
          mb: 4 
        }}>
          <Typography variant="h4" sx={{ 
            background: 'linear-gradient(45deg, #FF6384, #36A2EB)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: 2
          }}>
            <TimelineIcon sx={{ color: '#FF6384' }} />
            Whale Movement Alerts
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <Select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                sx={{
                  color: '#fff',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.2)'
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#FF6384'
                  }
                }}
              >
                <MenuItem value="15m">15 Minutes</MenuItem>
                <MenuItem value="30m">30 Minutes</MenuItem>
                <MenuItem value="1h">1 Hour</MenuItem>
                <MenuItem value="24h">24 Hours</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Add AI Analysis Button and Card at the top */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          gap: 2,
          mb: 4 
        }}>
          <Button
            variant="contained"
            onClick={() => setShowAiAnalysis(!showAiAnalysis)}
            startIcon={<AutoFixHighIcon />}
            disabled={!apiKeyValid || !alerts?.length}
            sx={{
              background: 'linear-gradient(45deg, #60A5FA, #3B82F6)',
              '&:hover': {
                background: 'linear-gradient(45deg, #3B82F6, #60A5FA)'
              }
            }}
          >
            {showAiAnalysis ? 'Hide Analysis' : 'Analyze Movements'}
          </Button>

          <Collapse in={showAiAnalysis} sx={{ width: '100%' }}>
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

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            {
              title: 'Total Volume',
              value: `${whaleStats.totalVolume.toFixed(2)} ETH`,
              icon: <ShowChartIcon sx={{ color: '#FF6384', fontSize: '2rem' }} />,
              change: '+15.8%',
              gradient: 'linear-gradient(135deg, #FF6384 0%, #FF8C94 100%)'
            },
            {
              title: 'Active Whales',
              value: whaleStats.activeWhales,
              icon: <AccountBalanceWalletIcon sx={{ color: '#36A2EB', fontSize: '2rem' }} />,
              change: '+3',
              gradient: 'linear-gradient(135deg, #36A2EB 0%, #72C1F5 100%)'
            },
            {
              title: 'Avg Transaction',
              value: `${whaleStats.avgTransactionSize.toFixed(2)} ETH`,
              icon: <PieChartIcon sx={{ color: '#FFCE56', fontSize: '2rem' }} />,
              change: '+7.2%',
              gradient: 'linear-gradient(135deg, #FFCE56 0%, #FFE083 100%)'
            },
            {
              title: 'Total Transactions',
              value: whaleStats.totalTransactions,
              icon: <LocalFireDepartmentIcon sx={{ color: '#4BC0C0', fontSize: '2rem' }} />,
              change: '+12',
              gradient: 'linear-gradient(135deg, #4BC0C0 0%, #7CD7D7 100%)'
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
                  borderRadius: 4,
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)' }
                }}>
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      {stat.icon}
                      <Chip 
                        label={stat.change} 
                        size="small"
                        sx={{ 
                          bgcolor: 'rgba(255, 255, 255, 0.2)',
                          color: '#fff',
                          fontWeight: 'bold'
                        }}
                      />
                    </Box>
                    <Typography variant="h4" sx={{ 
                      color: '#fff', 
                      mb: 1,
                      fontWeight: 'bold',
                      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
                    }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                      {stat.title}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>

        {/* Charts Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              background: 'rgba(17, 25, 40, 0.75)',
              backdropFilter: 'blur(16px)',
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '500px'
            }}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ 
                  color: '#fff', 
                  mb: 3,
                  fontWeight: 'bold',
                  fontSize: '1.5rem'
                }}>
                  Volume Trends
                </Typography>
                <Box sx={{ height: 400 }}>
                  <Line data={chartData.volumeOverTime} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ 
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 3 }}>
                  Whale Metrics
                </Typography>
                <Box sx={{ height: 300 }}>
                  <Radar data={chartData.whaleMetrics} options={chartOptions} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Alerts List */}
        <AnimatePresence>
          <Grid container spacing={3}>
            {alerts.map((alert, index) => (
              <Grid item xs={12} key={alert.id || index}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card sx={{ 
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 4,
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-5px)' }
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                          <Typography variant="subtitle1" sx={{ color: '#60A5FA' }}>
                            Wallet Address
                          </Typography>
                          <Typography 
                            variant="body2" 
                            sx={{ 
                              wordBreak: 'break-all',
                              color: '#fff',
                              cursor: 'pointer',
                              '&:hover': { color: '#60A5FA' }
                            }}
                            onClick={() => window.open(`/insights/${alert.wallet}`, '_blank')}
                          >
                            {alert.wallet}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                            {getTimeSince(alert.timestamp)}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography variant="subtitle1" sx={{ color: '#60A5FA' }}>
                            Volume
                          </Typography>
                          <Typography variant="body1" sx={{ 
                            fontWeight: 'bold', 
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                          }}>
                            <TrendingUpIcon sx={{ color: '#60A5FA' }} />
                            {alert.volume?.toFixed(2)} ETH
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography variant="subtitle1" sx={{ color: '#60A5FA' }}>
                            Transactions
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#fff' }}>
                            {alert.transactions}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <Typography variant="subtitle1" sx={{ color: '#60A5FA' }}>
                            NFTs Bought/Sold
                          </Typography>
                          <Typography variant="body1" sx={{ color: '#fff' }}>
                            {alert.nft_bought} / {alert.nft_sold}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={2} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Watch this wallet">
                              <IconButton
                                size="small"
                                onClick={() => handleNotificationToggle(alert.wallet)}
                                sx={{ 
                                  color: notifications[alert.wallet] ? '#60A5FA' : '#fff',
                                  background: notifications[alert.wallet] ? 'rgba(96, 165, 250, 0.2)' : 'transparent'
                                }}
                              >
                                <NotificationsIcon />
                              </IconButton>
                            </Tooltip>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Tooltip title="Send to Telegram">
                              <IconButton
                                size="small"
                                onClick={() => handleTelegramToggle(alert)}
                                sx={{ 
                                  color: '#60A5FA',
                                  '&:hover': { background: 'rgba(96, 165, 250, 0.2)' }
                                }}
                              >
                                <TelegramIcon />
                              </IconButton>
                            </Tooltip>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                              variant="contained"
                              sx={{
                                background: 'linear-gradient(45deg, #60A5FA, #3B82F6)',
                                '&:hover': {
                                  background: 'linear-gradient(45deg, #3B82F6, #60A5FA)'
                                }
                              }}
                              startIcon={<ShoppingCartIcon />}
                              onClick={() => window.open(`https://opensea.io/${alert.wallet}`, '_blank')}
                              size="small"
                            >
                              View NFTs
                            </Button>
                          </motion.div>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </AnimatePresence>
      </motion.div>
    </Box>
  );
};

export default WhaleMovementAlerts;
