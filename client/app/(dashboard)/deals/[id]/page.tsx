'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import styles from './DealDetailPage.module.css';

// Mock data for a single deal
const mockDeal = {
  id: '1',
  title: 'Nike Fitness Campaign Q2',
  status: 'Active',
  value: 8500,
  client: {
    id: 'c1',
    name: 'Nike',
    avatar: 'N',
    industry: 'Fashion'
  },
  partner: {
    id: 'p1',
    name: 'WME Agency',
    category: 'Agency'
  },
  description: 'Promote the new summer fitness collection across Instagram and TikTok. Deliverables include 3 IG Reels, 2 TikToks, and 5 Story posts.',
  platforms: ['Instagram', 'TikTok'],
  startDate: '2026-04-15',
  endDate: '2026-05-30',
  invoices: [
    { id: 'INV-0043', amount: 4250, status: 'Overdue', dueDate: '2026-04-30' },
    { id: 'INV-0045', amount: 4250, status: 'Draft', dueDate: '2026-05-30' }
  ],
  expenses: [
    { id: 'e1', title: 'Gym Rental', amount: 200, date: '2026-04-20', category: 'Production' },
    { id: 'e2', title: 'Video Editor', amount: 500, date: '2026-04-22', category: 'Outsourcing' }
  ]
};

export default function DealDetailPage() {
  const params = useParams();
  const router = useRouter();
  
  // In a real app, fetch deal by id
  const deal = mockDeal;

  const totalInvoiced = deal.invoices.reduce((acc, inv) => acc + inv.amount, 0);
  const totalExpenses = deal.expenses.reduce((acc, exp) => acc + exp.amount, 0);
  const profit = totalInvoiced - totalExpenses;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={ROUTES.deals} className={styles.backBtn}>
          <ArrowBackIcon fontSize="small" /> Back to Deals
        </Link>
        <div className={styles.headerContent}>
          <div className={styles.titleArea}>
            <h1>{deal.title}</h1>
            <span className={styles.statusBadge}>{deal.status}</span>
          </div>
          <div className={styles.headerActions}>
            <Button variant="outline" size="sm">Edit Deal</Button>
            <Button variant="primary" size="sm">Complete Campaign</Button>
          </div>
        </div>
      </header>

      <div className={styles.grid}>
        {/* Left Column: Details & Finance */}
        <div className={styles.mainColumn}>
          <Card title="Deal Overview" className={styles.infoCard}>
            <p className={styles.description}>{deal.description}</p>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Client</span>
                <div className={styles.entityLink}>
                  <div className={styles.smallAvatar}>{deal.client.avatar}</div>
                  <span>{deal.client.name}</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Strategic Partner</span>
                <div className={styles.entityLink}>
                  <HandshakeIcon style={{ fontSize: '1rem', color: 'var(--primary)' }} />
                  <span>{deal.partner.name}</span>
                </div>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Platforms</span>
                <span className={styles.platformTags}>{deal.platforms.join(', ')}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Timeline</span>
                <span className={styles.timelineText}>
                  {new Date(deal.startDate).toLocaleDateString()} – {new Date(deal.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Card>

          <div className={styles.financialSection}>
            <div className={styles.sectionHeader}>
              <h2>Invoices</h2>
              <Button variant="outline" size="sm">
                <AddIcon fontSize="small" /> New Invoice
              </Button>
            </div>
            <div className={styles.invoiceList}>
              {deal.invoices.map(inv => (
                <Card key={inv.id} className={styles.financialItem}>
                  <div className={styles.itemMain}>
                    <DescriptionIcon className={styles.itemIcon} />
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{inv.id}</span>
                      <span className={styles.itemSub}>Due {new Date(inv.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemAmount}>${inv.amount.toLocaleString()}</span>
                    <span className={styles.itemStatus} data-status={inv.status}>{inv.status}</span>
                    <button className={styles.moreBtn}><MoreVertIcon fontSize="small" /></button>
                  </div>
                </Card>
              ))}
            </div>

            <div className={styles.sectionHeader} style={{ marginTop: '32px' }}>
              <h2>Project Expenses</h2>
              <Button variant="outline" size="sm">
                <AddIcon fontSize="small" /> Log Expense
              </Button>
            </div>
            <div className={styles.expenseList}>
              {deal.expenses.map(exp => (
                <Card key={exp.id} className={styles.financialItem}>
                  <div className={styles.itemMain}>
                    <AccountBalanceWalletIcon className={styles.itemIcon} style={{ color: '#ef4444' }} />
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{exp.title}</span>
                      <span className={styles.itemSub}>{exp.category} • {new Date(exp.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className={styles.itemMeta}>
                    <span className={styles.itemAmount} style={{ color: '#ef4444' }}>-${exp.amount.toLocaleString()}</span>
                    <button className={styles.moreBtn}><MoreVertIcon fontSize="small" /></button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Summary Widgets */}
        <div className={styles.sideColumn}>
          <Card className={styles.financialSummary}>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Deal Value</span>
              <span className={styles.summaryValue}>${deal.value.toLocaleString()}</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Total Invoiced</span>
              <span className={styles.summaryValue}>${totalInvoiced.toLocaleString()}</span>
            </div>
            <div className={styles.summaryItem}>
              <span className={styles.summaryLabel}>Expenses Paid</span>
              <span className={styles.summaryValue} style={{ color: '#ef4444' }}>-${totalExpenses.toLocaleString()}</span>
            </div>
            <div className={styles.netProfit}>
              <span className={styles.profitLabel}>Net Project Profit</span>
              <span className={styles.profitValue}>${profit.toLocaleString()}</span>
            </div>
          </Card>

          <Card title="Project Progress" className={styles.progressCard}>
            <div className={styles.progressHeader}>
              <span>Milestones</span>
              <span>65%</span>
            </div>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: '65%' }} />
            </div>
            <div className={styles.milestoneList}>
              <div className={styles.milestoneItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Contract Finalized</span>
              </div>
              <div className={styles.milestoneItem}>
                <CheckCircleIcon className={styles.checkIcon} />
                <span>Concept Approved</span>
              </div>
              <div className={styles.milestoneItem} data-pending="true">
                <div className={styles.pendingDot} />
                <span>Video Draft 1</span>
              </div>
              <div className={styles.milestoneItem} data-pending="true">
                <div className={styles.pendingDot} />
                <span>Final Delivery</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Simple Handshake icon mock since it's not imported
function HandshakeIcon(props: any) {
  return (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M11 17a2.5 2.5 0 0 0 5 0v-4" />
      <path d="M18 9a1.5 1.5 0 0 0-3 0v4.5" />
      <path d="M12 10.5a1.5 1.5 0 0 0-3 0v4.5" />
      <path d="m3 11 1.5-1.5a1.5 1.5 0 0 1 2.12 0L11 14" />
      <path d="M3 11v5a1.5 1.5 0 0 0 1.5 1.5h1" />
      <path d="m15 8-1.5-1.5a1.5 1.5 0 0 0-2.12 0L8 10.5" />
      <path d="M17 11V6a1.5 1.5 0 0 1 1.5-1.5h1" />
      <path d="M17 11c.308.205.546.513.666.877L19 16a2 2 0 0 1-2 2h-1.5" />
    </svg>
  );
}
