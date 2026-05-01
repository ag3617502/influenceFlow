import React from 'react';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AddIcon from '@mui/icons-material/Add';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import styles from './OverviewPage.module.css';

export default function DashboardPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Dashboard Overview</h1>
          <p>Welcome back, Alex! Here's what's happening today.</p>
        </div>
        <Button variant="primary">
          <AddIcon fontSize="small" />
          <span>New Deal</span>
        </Button>
      </header>

      <section className={styles.stats}>
        <Card className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.revenue}`}>
              <AttachMoneyIcon />
            </div>
            <div className={styles.statTrend}>
              <TrendingUpIcon fontSize="inherit" />
              +12.5%
            </div>
          </div>
          <div className={styles.statValue}>$124,500.00</div>
          <div className={styles.statLabel}>Total Revenue (YTD)</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.deals}`}>
              <ShowChartIcon />
            </div>
            <div className={styles.statTrend}>
              8 active
            </div>
          </div>
          <div className={styles.statValue}>14</div>
          <div className={styles.statLabel}>Total Deals</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.reach}`}>
              <GroupsIcon />
            </div>
            <div className={styles.statTrend}>
              <TrendingUpIcon fontSize="inherit" />
              +5.2k
            </div>
          </div>
          <div className={styles.statValue}>1.2M</div>
          <div className={styles.statLabel}>Total Reach</div>
        </Card>

        <Card className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={`${styles.statIcon} ${styles.engagement}`}>
              <ShowChartIcon />
            </div>
            <div className={styles.statTrend}>
              Stable
            </div>
          </div>
          <div className={styles.statValue}>4.5%</div>
          <div className={styles.statLabel}>Avg. Engagement</div>
        </Card>
      </section>

      <div className={styles.grid}>
        <Card title="Active Deals" className={styles.mainCard}>
          <div className={styles.list}>
            {[
              { name: 'Summer Campaign', client: 'Nike Inc.', value: '$15,000', status: 'In Progress' },
              { name: 'Tech Unboxing', client: 'Samsung', value: '$8,500', status: 'Draft' },
              { name: 'Lifestyle Feature', client: 'Adobe', value: '$4,200', status: 'Paid' },
            ].map((deal, i) => (
              <div key={i} className={styles.listItem}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemName}>{deal.name}</div>
                  <div className={styles.itemMeta}>{deal.client}</div>
                </div>
                <div className={styles.itemRight}>
                  <div className={styles.itemValue}>{deal.value}</div>
                  <div className={`${styles.itemStatus} ${styles[deal.status.toLowerCase().replace(' ', '')]}`}>
                    {deal.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Urgent Tasks" className={styles.sideCard}>
          <div className={styles.list}>
            {[
              'Upload draft for Nike Campaign',
              'Sign contract with Samsung',
              'Send invoice to Adobe',
            ].map((task, i) => (
              <div key={i} className={styles.taskItem}>
                <input type="checkbox" className={styles.checkbox} />
                <span>{task}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
