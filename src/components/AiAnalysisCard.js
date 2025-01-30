import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, Skeleton, IconButton, Collapse, CircularProgress, Alert } from '@mui/material';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import WarningIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { motion, AnimatePresence } from 'framer-motion';

const TypewriterText = ({ text, delay = 30 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, delay]);

  return displayedText;
};

const AiAnalysisCard = ({ data, onClose, loading, error }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!data) {
    return null;
  }

  const [expandedSections, setExpandedSections] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTypingEffect, setShowTypingEffect] = useState({});

  const sections = [
    {
      title: 'Market Summary',
      description: 'Current market state and whale activity',
      content: data?.summary,
      color: '#4ECDC4',
      icon: <AutoFixHighIcon />,
      gridSize: 12
    },
    {
      title: 'Risk Analysis',
      description: 'Market risks and mitigation strategies',
      content: data?.risk,
      color: '#FF6B6B',
      icon: <WarningIcon />,
      gridSize: 6
    },
    {
      title: 'Predictions',
      description: 'Market forecasts and trends',
      content: data?.predictions,
      color: '#45B7D1',
      icon: <TrendingUpIcon />,
      gridSize: 6
    },
    {
      title: 'Opportunities',
      description: 'Trading opportunities and entry points',
      content: data?.opportunities,
      color: '#96CEB4',
      icon: <WorkIcon />,
      gridSize: 6
    },
    {
      title: 'Key Metrics',
      description: 'Important market indicators',
      content: data?.keyMetrics,
      color: '#FFEEAD',
      icon: <AssessmentIcon />,
      gridSize: 6
    }
  ];

  const toggleSection = (index) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
    setShowTypingEffect(prev => ({
      ...prev,
      [index]: true
    }));
  };

  const formatContent = (content, sectionIndex) => {
    if (!content) return '';
    
    const points = content.split('\n').filter(point => point.trim());
    
    return (
      <Box component="div" sx={{ m: 0, pl: 2 }}>
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
          >
            <Box
              sx={{
                position: 'relative',
                mb: 2,
                pl: 2,
                '&:before': {
                  content: '"•"',
                  position: 'absolute',
                  left: 0,
                  color: 'inherit',
                  fontWeight: 'bold'
                }
              }}
            >
              <Typography 
                variant="body1" 
                component="div" 
                sx={{ 
                  color: '#fff',
                  fontWeight: point.includes(':') ? 'bold' : 'normal',
                  lineHeight: 1.6
                }}
              >
                {showTypingEffect[sectionIndex] ? (
                  <TypewriterText text={point.replace(/^[•\-]\s*/, '').trim()} />
                ) : (
                  point.replace(/^[•\-]\s*/, '').trim()
                )}
              </Typography>
            </Box>
          </motion.div>
        ))}
      </Box>
    );
  };

  return (
    <Card sx={{ 
      background: 'rgba(255, 255, 255, 0.05)',
      backdropFilter: 'blur(10px)',
      borderRadius: 4,
      border: '1px solid rgba(255, 255, 255, 0.1)',
      mb: 4,
      overflow: 'visible',
      maxHeight: isFullscreen ? '80vh' : 'auto',
      transition: 'all 0.3s ease',
      position: isFullscreen ? 'fixed' : 'relative',
      top: isFullscreen ? '10vh' : 'auto',
      left: isFullscreen ? '10vw' : 'auto',
      width: isFullscreen ? '80vw' : 'auto',
      zIndex: isFullscreen ? 1000 : 1,
    }}>
      <CardContent sx={{
        maxHeight: isFullscreen ? 'calc(80vh - 32px)' : 'auto',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(255, 255, 255, 0.3)',
          },
        },
      }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3 
        }}>
          <Typography variant="h5" sx={{ 
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 'bold'
          }}>
            <AutoFixHighIcon sx={{ color: '#4ECDC4', fontSize: 30 }} />
            AI Market Analysis
          </Typography>
          <IconButton 
            onClick={() => setIsFullscreen(!isFullscreen)}
            sx={{ color: '#4ECDC4' }}
          >
            {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
          </IconButton>
        </Box>

        <Grid container spacing={3}>
          {sections.map((section, index) => (
            <Grid item xs={12} md={isFullscreen ? 6 : section.gridSize} key={section.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Box sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: `${section.color}10`,
                  border: `1px solid ${section.color}30`,
                  height: '100%',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: `0 8px 24px ${section.color}20`
                  }
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    mb: 2 
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {React.cloneElement(section.icon, { sx: { color: section.color } })}
                      <Box>
                        <Typography variant="h6" sx={{ color: section.color, fontWeight: 'bold' }}>
                          {section.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                          {section.description}
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton 
                      onClick={() => toggleSection(index)}
                      sx={{ color: section.color }}
                    >
                      {expandedSections[index] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </Box>
                  
                  <Collapse in={expandedSections[index]}>
                    {loading ? (
                      <>
                        <Skeleton animation="wave" height={24} sx={{ bgcolor: `${section.color}20`, mb: 1 }} />
                        <Skeleton animation="wave" height={24} sx={{ bgcolor: `${section.color}20`, mb: 1 }} />
                        <Skeleton animation="wave" height={24} sx={{ bgcolor: `${section.color}20` }} />
                      </>
                    ) : (
                      <Box sx={{ mt: 2 }}>
                        {formatContent(section.content, index)}
                      </Box>
                    )}
                  </Collapse>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default AiAnalysisCard; 