'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import styles from './InvoicesPage.module.css';

// Mock data based on the provided design
const mockInvoices = [
  {
    id: 'INV-0042',
    deal: 'Samsung S24 Ultra Review',
    client: 'Samsung',
    amount: 12000,
    status: 'Paid',
    dueDate: '2026-04-10',
    issueDate: '2026-03-25'
  },
  {
    id: 'INV-0043',
    deal: 'Nike Fitness Campaign Q2',
    client: 'Nike',
    amount: 4250,
    status: 'Overdue',
    dueDate: '2026-04-30',
    issueDate: '2026-04-15'
  },
  {
    id: 'INV-0044',
    deal: 'Zara Summer Collection',
    client: 'Zara',
    amount: 5200,
    status: 'Sent',
    dueDate: '2026-05-15',
    issueDate: '2026-05-01'
  },
  {
    id: 'INV-0045',
    deal: 'Nike Fitness Campaign Q2',
    client: 'Nike',
    amount: 4250,
    status: 'Draft',
    dueDate: '2026-05-30',
    issueDate: '2026-05-15'
  }
];

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return '#10b981';
      case 'Sent': return '#6366f1';
      case 'Overdue': return '#ef4444';
      case 'Draft': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Invoices</h1>
          <p>Manage your billing, track payments, and export data.</p>
        </div>
        <div className={styles.actions}>
          <Link href={ROUTES.invoiceNew}>
            <Button variant="primary">
              <AddIcon fontSize="small" /> Create Invoice
            </Button>
          </Link>
        </div>
      </header>

      {/* Invoice Overview */}
      <div className={styles.overviewGrid}>
        <Card className={styles.overviewCard}>
          <span className={styles.label}>Total Pending</span>
          <span className={styles.value}>$18,450</span>
          <div className={styles.indicator} style={{ background: '#f59e0b' }} />
        </Card>
        <Card className={styles.overviewCard}>
          <span className={styles.label}>Overdue</span>
          <span className={styles.value}>$4,250</span>
          <div className={styles.indicator} style={{ background: '#ef4444' }} />
        </Card>
        <Card className={styles.overviewCard}>
          <span className={styles.label}>Paid (This Month)</span>
          <span className={styles.value}>$32,100</span>
          <div className={styles.indicator} style={{ background: '#10b981' }} />
        </Card>
      </div>

      <Card className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div className={styles.searchWrapper}>
            <SearchIcon className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search invoices, clients..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm">
            <FilterListIcon fontSize="small" /> Filters
          </Button>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Client / Deal</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockInvoices.map(inv => (
                <tr key={inv.id}>
                  <td className={styles.idCell}>
                    <DescriptionIcon className={styles.fileIcon} />
                    <span>{inv.id}</span>
                  </td>
                  <td>
                    <div className={styles.clientCell}>
                      <span className={styles.clientName}>{inv.client}</span>
                      <span className={styles.dealName}>{inv.deal}</span>
                    </div>
                  </td>
                  <td className={styles.amountCell}>${inv.amount.toLocaleString()}</td>
                  <td>
                    <span className={styles.statusBadge} style={{ 
                      backgroundColor: `${getStatusColor(inv.status)}15`, 
                      color: getStatusColor(inv.status) 
                    }}>
                      {inv.status}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{new Date(inv.dueDate).toLocaleDateString()}</td>
                  <td className={styles.actionCell}>
                    <div className={styles.actionGroup}>
                      <button className={styles.iconBtn} title="Download"><FileDownloadIcon fontSize="small" /></button>
                      <button className={styles.iconBtn} title="More"><MoreVertIcon fontSize="small" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
