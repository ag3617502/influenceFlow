'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BusinessIcon from '@mui/icons-material/Business';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import styles from '../ClientsPage.module.css';
import api from '@/lib/axios';
import { ROUTES } from '@/lib/constants';

interface Client {
  _id: string;
  name: string;
  industry: string;
  totalRevenue: number;
  totalDeals: number;
  paymentBehavior: string;
  avatar?: string;
  email: string;
}

const ClientsListPage = () => {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [industryFilter, setIndustryFilter] = useState('All Industries');

  const fetchClients = async () => {
    try {
      const response = await api.get('/clients');
      if (response.data.success) {
        setClients(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch clients', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(search.toLowerCase()) || 
                         client.email.toLowerCase().includes(search.toLowerCase());
    const matchesIndustry = industryFilter === 'All Industries' || client.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  const getBehaviorColor = (behavior: string) => {
    switch (behavior.toLowerCase()) {
      case 'early': return styles.early;
      case 'on time': return styles.ontime;
      case 'late': return styles.late;
      case 'overdue': return styles.overdue;
      default: return styles.new;
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'linear-gradient(135deg, #6366f1, #8b5cf6)',
      'linear-gradient(135deg, #10b981, #059669)',
      'linear-gradient(135deg, #f59e0b, #d97706)',
      'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      'linear-gradient(135deg, #ef4444, #dc2626)',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Clients</h1>
          <p className={styles.subtitle}>
            {clients.length} clients · ${clients.reduce((acc, c) => acc + c.totalRevenue, 0).toLocaleString()} total revenue
          </p>
        </div>
        <div className={styles.actions}>
          <Link href="/dashboard/clients/new">
            <Button variant="primary">
              <AddIcon fontSize="small" /> Add Client
            </Button>
          </Link>
        </div>
      </header>

      <div className={styles.filters}>
        <div style={{ position: 'relative', flex: 1 }}>
          <SearchIcon style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', fontSize: '1.25rem' }} />
          <input 
            className={styles.searchInput} 
            placeholder="Search clients by name or email..." 
            style={{ paddingLeft: '2.5rem' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select 
          className={styles.filterSelect}
          value={industryFilter}
          onChange={(e) => setIndustryFilter(e.target.value)}
        >
          <option>All Industries</option>
          <option>Fashion</option>
          <option>Tech</option>
          <option>Sports</option>
          <option>Food</option>
          <option>Lifestyle</option>
          <option>Music</option>
          <option>Media</option>
        </select>
        <Button variant="outline" size="sm">
          <FilterListIcon fontSize="small" /> Sort: Revenue
        </Button>
      </div>

      {loading ? (
        <div className={styles.empty}>Loading clients...</div>
      ) : filteredClients.length > 0 ? (
        <div className={styles.grid}>
          {filteredClients.map((client) => (
            <Card 
              key={client._id} 
              className={styles.clientCard}
              hoverable
              topAccent="#6366f1"
              onClick={() => router.push(ROUTES.clientDetail(client._id))}
            >
              <div className={styles.clientHeader}>
                <div 
                  className={styles.avatar} 
                  style={{ background: getAvatarColor(client.name) }}
                >
                  {client.name.substring(0, 2).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div className={styles.clientName}>{client.name}</div>
                  <div className={styles.clientIndustry}>{client.industry}</div>
                </div>
                <MoreVertIcon style={{ color: 'var(--muted-foreground)' }} />
              </div>
              
              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Total Revenue</div>
                  <div className={styles.statValue}>${client.totalRevenue.toLocaleString()}</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Total Deals</div>
                  <div className={styles.statValue}>{client.totalDeals} deals</div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Avg. Deal</div>
                  <div className={styles.statValue}>
                    ${client.totalDeals > 0 ? Math.round(client.totalRevenue / client.totalDeals).toLocaleString() : '0'}
                  </div>
                </div>
                <div className={styles.statItem}>
                  <div className={styles.statLabel}>Pay Behavior</div>
                  <div className={`${styles.behavior} ${getBehaviorColor(client.paymentBehavior)}`}>
                    <div className={styles.behaviorDot} style={{ backgroundColor: 'currentColor' }} />
                    {client.paymentBehavior}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <CorporateFareIcon className={styles.emptyIcon} />
          <h3>No clients found</h3>
          <p>Start by adding your first brand client to track deals and revenue.</p>
          <Link href="/dashboard/clients/new">
            <Button variant="primary">Add Your First Client</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ClientsListPage;
