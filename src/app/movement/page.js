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

  
    </Box>
  );
};

export default WhaleMovementAlerts;
