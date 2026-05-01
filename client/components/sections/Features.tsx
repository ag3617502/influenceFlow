import React from 'react';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShieldIcon from '@mui/icons-material/Shield';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PublicIcon from '@mui/icons-material/Public';
import LayersIcon from '@mui/icons-material/Layers';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import styles from './Features.module.css';

const features = [
  {
    title: 'Analytics & Insights',
    description: 'Track your growth across all platforms with real-time data and actionable insights.',
    icon: <BarChartIcon />,
    color: 'var(--primary)',
  },
  {
    title: 'Secure Payments',
    description: 'Get paid on time, every time. Our secure escrow system protects your hard-earned revenue.',
    icon: <ShieldIcon />,
    color: '#10b981',
  },
  {
    title: 'AI Matching',
    description: 'Our proprietary AI matches you with brands that align with your audience and values.',
    icon: <FlashOnIcon />,
    color: '#f59e0b',
  },
  {
    title: 'Global Campaigns',
    description: 'Access exclusive deals from world-class brands across 150+ countries.',
    icon: <PublicIcon />,
    color: '#3b82f6',
  },
  {
    title: 'Brand Assets',
    description: 'Manage all your media kits, contracts, and creative assets in one centralized vault.',
    icon: <LayersIcon />,
    color: 'var(--secondary)',
  },
  {
    title: 'Mobile First',
    description: 'Manage your business on the go with our lightning-fast mobile dashboard.',
    icon: <SmartphoneIcon />,
    color: '#8b5cf6',
  },
];

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Powerful Features</span>
          <h2>Everything you need to <br /><span>scale your influence</span></h2>
          <p>Stop juggling spreadsheets. InfluenceFlow gives you the tools to professionalize your content business.</p>
        </div>

        <div className={styles.grid}>
          {features.map((feature, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon} style={{ color: feature.color, backgroundColor: `${feature.color}15` }}>
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
