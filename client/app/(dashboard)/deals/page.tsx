'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ROUTES } from '@/lib/constants';
import styles from './DealsPage.module.css';

// Mock data based on the provided design
const mockDeals = [
  {
    id: '1',
    title: 'Nike Fitness Campaign Q2',
    client: 'Nike',
    clientAvatar: 'NK',
    value: 8500,
    status: 'Active',
    platforms: ['Instagram', 'TikTok'],
    startDate: '2026-04-15',
    endDate: '2026-05-30',
    color: '#6366f1',
    color2: '#8b5cf6',
    partner: 'Alex Creative'
  },
  {
    id: '2',
    title: 'Samsung Galaxy S25 Launch',
    client: 'Samsung',
    clientAvatar: 'SM',
    value: 12000,
    status: 'Completed',
    platforms: ['YouTube'],
    startDate: '2026-03-01',
    endDate: '2026-04-20',
    color: '#10b981',
    color2: '#059669',
    partner: 'None'
  },
  {
    id: '3',
    title: 'Zara Summer Collection',
    client: 'Zara',
    clientAvatar: 'ZR',
    value: 5200,
    status: 'Negotiating',
    platforms: ['Instagram'],
    startDate: '2026-05-01',
    endDate: '2026-05-07',
    color: '#f59e0b',
    color2: '#d97706',
    partner: 'Maria Agency'
  },
  {
    id: '4',
    title: 'Apple Vision Pro Review',
    client: 'Apple',
    clientAvatar: 'AP',
    value: 15000,
    status: 'Active',
    platforms: ['YouTube', 'Instagram'],
    startDate: '2026-05-01',
    endDate: '2026-05-15',
    color: '#374151',
    color2: '#111827',
    partner: 'None'
  },
  {
    id: '5',
    title: 'Spotify Podcast Sponsorship',
    client: 'Spotify',
    clientAvatar: 'SP',
    value: 3800,
    status: 'Draft',
    platforms: ['Podcast'],
    startDate: '2026-05-10',
    endDate: '2026-05-20',
    color: '#3b82f6',
    color2: '#1d4ed8',
    partner: 'Alex Creative'
  }
];

export default function DealsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const stats = [
    { label: 'Active Deals', value: '12', icon: <BusinessCenterIcon />, color: 'var(--primary)' },
    { label: 'Total Value', value: '$84.5k', icon: <AttachMoneyIcon />, color: '#10b981' },
    { label: 'Avg. Deal Size', value: '$7,040', icon: <TrendingUpIcon />, color: '#6366f1' },
    { label: 'Success Rate', value: '94%', icon: <CheckCircleOutlinedIcon />, color: '#f59e0b' },
  ];

  const filteredDeals = mockDeals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         deal.client.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'All' || deal.status === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return '#6366f1';
      case 'Completed': return '#10b981';
      case 'Negotiating': return '#f59e0b';
      case 'Cancelled': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>Deals Management</h1>
          <p>Track your active campaigns, negotiations, and revenue.</p>
        </div>
        <div className={styles.actions}>
          <Link href={ROUTES.dealNew}>
            <Button variant="primary">
              <AddIcon fontSize="small" /> New Deal
            </Button>
          </Link>
        </div>
      </header>

      {/* Search & Filter Bar - Identical to HTML */}
      <div className={styles.filtersBar}>
        <div className={styles.searchContainer}>
          <SearchIcon className={styles.searchIcon} />
          <input 
            className={styles.searchInput}
            placeholder="Search by title, client..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className={styles.filterSelect} value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Negotiating">Negotiating</option>
          <option value="Completed">Completed</option>
          <option value="Draft">Draft</option>
        </select>
        <select className={styles.filterSelect}>
          <option>All Clients</option>
          <option>Nike</option>
          <option>Samsung</option>
        </select>
        <select className={styles.filterSelect}>
          <option>All Platforms</option>
          <option>Instagram</option>
          <option>TikTok</option>
          <option>YouTube</option>
        </select>
        <div className={styles.filterRight}>
          <span className={styles.sortLabel}>Sort:</span>
          <select className={styles.filterSelect}>
            <option>Newest First</option>
            <option>Value: High-Low</option>
          </select>
          <div className={styles.viewToggle}>
            <button 
              className={view === 'grid' ? styles.activeView : ''} 
              onClick={() => setView('grid')}
              title="Grid View"
            >
              <GridViewIcon fontSize="small" />
            </button>
            <button 
              className={view === 'list' ? styles.activeView : ''} 
              onClick={() => setView('list')}
              title="List View"
            >
              <ViewListIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row - 5 Cards like HTML */}
      <div className={styles.statsRow}>
        <div className={styles.statMiniCard}>
          <div className={styles.statMiniValue} style={{ color: 'var(--primary)' }}>12</div>
          <div className={styles.statMiniLabel}>Total</div>
        </div>
        <div className={styles.statMiniCard}>
          <div className={styles.statMiniValue} style={{ color: '#10b981' }}>5</div>
          <div className={styles.statMiniLabel}>Active</div>
        </div>
        <div className={styles.statMiniCard}>
          <div className={styles.statMiniValue} style={{ color: '#6366f1' }}>3</div>
          <div className={styles.statMiniLabel}>Completed</div>
        </div>
        <div className={styles.statMiniCard}>
          <div className={styles.statMiniValue} style={{ color: '#f59e0b' }}>2</div>
          <div className={styles.statMiniLabel}>Negotiating</div>
        </div>
        <div className={styles.statMiniCard}>
          <div className={styles.statMiniValue} style={{ color: '#94a3b8' }}>2</div>
          <div className={styles.statMiniLabel}>Draft</div>
        </div>
      </div>

      {/* Deals List - CARD VIEW (Horizontal Rows in HTML) */}
      {view === 'grid' ? (
        <div className={styles.dealsContainer}>
          {filteredDeals.map(deal => (
            <Link href={ROUTES.dealDetail(deal.id)} key={deal.id} className={styles.dealCardRow}>
              <div className={styles.dealAvatar} style={{ 
                background: `linear-gradient(135deg, ${deal.color}, ${deal.color2})`,
                color: 'white'
              }}>
                {deal.clientAvatar}
              </div>
              <div className={styles.dealInfo}>
                <div className={styles.dealTitleText}>{deal.title}</div>
                <div className={styles.dealMetaLine}>
                  <span><BusinessIcon fontSize="inherit" /> {deal.client}</span>
                  <span><CalendarTodayIcon fontSize="inherit" /> Due {new Date(deal.endDate).toLocaleDateString()}</span>
                  <span><HandshakeIcon fontSize="inherit" /> {deal.partner || 'No Partner'}</span>
                </div>
                <div className={styles.dealPlatformsList}>
                  {deal.platforms.map(p => (
                    <span key={p} className={styles.platformTag}>{p}</span>
                  ))}
                </div>
              </div>
              <div className={styles.dealFinancials}>
                <div className={styles.dealAmountText}>${deal.value.toLocaleString()}</div>
                <div className={styles.dealProfitText}>Profit: ${(deal.value * 0.8).toLocaleString()}</div>
              </div>
              <div className={styles.dealStatusBadge}>
                <span className={styles.statusBadge} style={{ 
                  backgroundColor: `${getStatusColor(deal.status)}15`, 
                  color: getStatusColor(deal.status) 
                }}>
                  {deal.status}
                </span>
              </div>
              <div className={styles.dealActionsButtons}>
                <button className={styles.actionBtn}><EditIcon fontSize="inherit" /></button>
                <button className={styles.actionBtn}><DeleteIcon fontSize="inherit" /></button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* TABLE VIEW (Standard Table in HTML) */
        <Card className={styles.tableCard}>
          <div className={styles.tableWrapper}>
            <table className={styles.dealsTable}>
              <thead>
                <tr>
                  <th>Deal</th>
                  <th>Client</th>
                  <th>Partner</th>
                  <th>Platform</th>
                  <th>Deadline</th>
                  <th>Value</th>
                  <th>Profit</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDeals.map(deal => (
                  <tr key={deal.id}>
                    <td className={styles.tableTitle}>{deal.title}</td>
                    <td>{deal.client}</td>
                    <td>{deal.partner || 'None'}</td>
                    <td>
                      <div className={styles.dealPlatformsList} style={{ marginTop: 0 }}>
                        {deal.platforms.map(p => (
                          <span key={p} className={styles.platformTag}>{p}</span>
                        ))}
                      </div>
                    </td>
                    <td>{new Date(deal.endDate).toLocaleDateString()}</td>
                    <td className={styles.tableAmount}>${deal.value.toLocaleString()}</td>
                    <td className={styles.tableProfit}>${(deal.value * 0.8).toLocaleString()}</td>
                    <td>
                      <span className={styles.statusBadge} style={{ 
                        backgroundColor: `${getStatusColor(deal.status)}15`, 
                        color: getStatusColor(deal.status) 
                      }}>
                        {deal.status}
                      </span>
                    </td>
                    <td>
                      <div className={styles.tableActions} style={{ justifyContent: 'flex-end' }}>
                        <button className={styles.actionBtn}><EditIcon fontSize="inherit" /></button>
                        <button className={styles.actionBtn}><DeleteIcon fontSize="inherit" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
