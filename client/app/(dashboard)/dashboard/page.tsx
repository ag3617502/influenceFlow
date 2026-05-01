import React from 'react';
import Link from 'next/link';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DescriptionIcon from '@mui/icons-material/Description';
import PaymentsIcon from '@mui/icons-material/Payments';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import HandshakeIcon from '@mui/icons-material/Handshake';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import styles from './OverviewPage.module.css';
import { ROUTES } from '@/lib/constants';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      {/* Welcome Header */}
      <header className={styles.header}>
        <h1 className={styles.greeting}>Welcome back, <span>Jane</span> 👋</h1>
        <p className={styles.subtitle}>Here's what's happening with your influencer business today.</p>
      </header>

      {/* Critical Alert */}
      <div className={styles.overdueAlert}>
        <WarningAmberIcon className={styles.overdueIcon} />
        <div className={styles.overdueText}>
          <strong>2 invoices are overdue</strong> — $4,800 at risk. 
          <Link href="#" style={{ marginLeft: '8px', textDecoration: 'underline' }}>Review now →</Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Link href="#" className={styles.actionBtn}>
          <BusinessCenterIcon fontSize="small" /> New Deal
        </Link>
        <Link href="#" className={styles.actionBtn}>
          <DescriptionIcon fontSize="small" /> Add Invoice
        </Link>
        <Link href="#" className={styles.actionBtn}>
          <AccountBalanceWalletIcon fontSize="small" /> Log Expense
        </Link>
        <Link href="#" className={styles.actionBtn}>
          <GroupAddIcon fontSize="small" /> Add Client
        </Link>
        <Link href="#" className={styles.actionBtn}>
          <HandshakeIcon fontSize="small" /> Add Partner
        </Link>
      </div>

      {/* Statistics Grid */}
      <div className={styles.stats}>
        <Card className={styles.statCard} topAccent="var(--primary)">
          <div className={styles.statHeader}>
            <div className={styles.statLabel}>Revenue (MTD)</div>
            <div className={styles.statIcon}><PaymentsIcon /></div>
          </div>
          <div className={styles.statValue}>$48,200</div>
          <div className={styles.statFooter}>
            <span className={styles.trendUp}>↑ 23.4%</span> vs last month
          </div>
        </Card>

        <Card className={styles.statCard} topAccent="#ef4444">
          <div className={styles.statHeader}>
            <div className={styles.statLabel}>Expenses (MTD)</div>
            <div className={styles.statIcon} style={{ color: '#ef4444' }}><AccountBalanceWalletIcon /></div>
          </div>
          <div className={styles.statValue}>$12,750</div>
          <div className={styles.statFooter}>
            <span className={styles.trendDown}>↑ 8.1%</span> vs last month
          </div>
        </Card>

        <Card className={styles.statCard} topAccent="#10b981">
          <div className={styles.statHeader}>
            <div className={styles.statLabel}>Net Profit</div>
            <div className={styles.statIcon} style={{ color: '#10b981' }}><TrendingUpIcon /></div>
          </div>
          <div className={styles.statValue}>$35,450</div>
          <div className={styles.statFooter}>
            <span className={styles.trendUp}>↑ 31.2%</span> vs last month
          </div>
        </Card>

        <Card className={styles.statCard} topAccent="#f59e0b">
          <div className={styles.statHeader}>
            <div className={styles.statLabel}>Pending</div>
            <div className={styles.statIcon} style={{ color: '#f59e0b' }}><DescriptionIcon /></div>
          </div>
          <div className={styles.statValue}>$18,600</div>
          <div className={styles.statFooter}>
            6 invoices outstanding
          </div>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <div className={styles.mainGrid}>
        <div className={styles.column}>
          {/* Insight Card */}
          <Card className={styles.insightCard}>
            <div className={styles.statLabel} style={{ color: 'rgba(255,255,255,0.8)' }}>Profit Margin</div>
            <div className={styles.insightValue}>73.5%</div>
            <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>Your best month yet! Keep it up.</p>
            <div className={styles.miniChart}>
              {[30, 50, 40, 65, 55, 70, 90].map((h, i) => (
                <div 
                  key={i} 
                  className={`${styles.miniBar} ${i === 6 ? styles.miniBarActive : ''}`} 
                  style={{ height: `${h}%` }} 
                />
              ))}
            </div>
          </Card>

          {/* Recent Deals */}
          <Card title="Recent Deals" subtitle="Your latest 5 active deals">
            <div className={styles.listItem}>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>NF</div>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>Nike Fitness Campaign Q2</div>
                <div className={styles.itemSub}>Nike • Instagram, TikTok</div>
              </div>
              <div>
                <div className={styles.itemAmount}>$8,500</div>
                <span className={`${styles.badge} ${styles.badgeActive}`}>Active</span>
              </div>
            </div>
            <div className={styles.listItem}>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}>SA</div>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>Samsung Product Launch</div>
                <div className={styles.itemSub}>Samsung • YouTube</div>
              </div>
              <div>
                <div className={styles.itemAmount}>$12,000</div>
                <span className={`${styles.badge} ${styles.badgeCompleted}`}>Completed</span>
              </div>
            </div>
            <div className={styles.listItem}>
              <div className={styles.avatar} style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>ZR</div>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>Zara Summer Collection</div>
                <div className={styles.itemSub}>Zara • Instagram</div>
              </div>
              <div>
                <div className={styles.itemAmount}>$5,200</div>
                <span className={`${styles.badge} ${styles.badgeNegotiating}`}>Negotiating</span>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card title="Recent Activity">
            <div className={styles.listItem}>
              <div className={styles.statIcon} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                <PaymentsIcon fontSize="small" />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}><strong>Samsung</strong> paid invoice #INV-0042 — $12,000</div>
                <div className={styles.itemSub}>2 hours ago</div>
              </div>
            </div>
            <div className={styles.listItem}>
              <div className={styles.statIcon} style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)' }}>
                <BusinessCenterIcon fontSize="small" />
              </div>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>New deal created: <strong>Apple Vision Pro Review</strong></div>
                <div className={styles.itemSub}>Yesterday, 4:32 PM</div>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.column}>
          {/* Upcoming Deadlines */}
          <Card title="Upcoming Deadlines">
            <div className={styles.listItem}>
              <div className={styles.deadlineDot} style={{ background: '#ef4444' }} />
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>Nike Campaign – Posting</div>
                <div className={styles.itemSub}>May 3, 2026</div>
              </div>
              <span className={`${styles.deadlineTag} ${styles.urgent}`}>2 days</span>
            </div>
            <div className={styles.listItem}>
              <div className={styles.deadlineDot} style={{ background: '#f59e0b' }} />
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>Zara Invoice Due</div>
                <div className={styles.itemSub}>May 7, 2026</div>
              </div>
              <span className={`${styles.deadlineTag} ${styles.soon}`}>6 days</span>
            </div>
            <div className={styles.listItem}>
              <div className={styles.deadlineDot} style={{ background: 'var(--primary)' }} />
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>Apple Deal Deadline</div>
                <div className={styles.itemSub}>May 15, 2026</div>
              </div>
              <span className={`${styles.deadlineTag} ${styles.ok}`}>14 days</span>
            </div>
          </Card>

          {/* Pending Invoices */}
          <Card title="Pending Invoices" subtitle="Awaiting payment">
            <div className={styles.listItem}>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>#INV-0038</div>
                <div className={styles.itemSub}>Nike • Due Apr 27</div>
              </div>
              <div>
                <div className={styles.itemAmount}>$4,200</div>
                <span className={`${styles.badge} ${styles.badgeOverdue}`}>Overdue</span>
              </div>
            </div>
            <div className={styles.listItem}>
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>#INV-0041</div>
                <div className={styles.itemSub}>Zara • Due May 7</div>
              </div>
              <div>
                <div className={styles.itemAmount}>$5,200</div>
                <span className={`${styles.badge} ${styles.badgeDraft}`}>Pending</span>
              </div>
            </div>
          </Card>

          {/* Revenue by Platform */}
          <Card title="Revenue by Platform">
            <div className={styles.progressGroup}>
              <div className={styles.progressLabel}>
                <span>Instagram</span>
                <span>$21,400</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '72%' }} />
              </div>
            </div>
            <div className={styles.progressGroup}>
              <div className={styles.progressLabel}>
                <span>YouTube</span>
                <span>$18,000</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '58%', background: '#10b981' }} />
              </div>
            </div>
            <div className={styles.progressGroup}>
              <div className={styles.progressLabel}>
                <span>TikTok</span>
                <span>$6,400</span>
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: '28%', background: '#f59e0b' }} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
