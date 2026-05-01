'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import styles from './LoginPage.module.css';
import { ROUTES } from '@/lib/constants';
import api from '@/lib/axios';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', formData);

      if (response.data.success) {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Hits the root /auth/google to match console settings
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className={styles.wrapper}>
      {/* Left Section - Branding & Features */}
      <div className={styles.left}>
        <Logo size="lg" className={styles.logo} />
        
        <h1 className={styles.headline}>
          Manage your<br/><span>Influencer deals</span><br/>like a pro.
        </h1>
        <p className={styles.subtext}>
          Track deals, invoices, expenses, partners and profit — all in one powerful dashboard built for modern creators.
        </p>
        
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <BusinessCenterIcon fontSize="small" />
            </div>
            Smart Deal Management
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <DescriptionIcon fontSize="small" />
            </div>
            Invoice & Payment Tracking
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <BarChartIcon fontSize="small" />
            </div>
            Profit & Analytics Reports
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <HandshakeIcon fontSize="small" />
            </div>
            Partner Commission Tracking
          </div>
        </div>
        
        <div className={styles.floatingCard}>
          <div className={styles.fcLabel}>Total Revenue (MTD)</div>
          <div className={styles.fcValue}>$48,200.00</div>
          <div className={styles.fcChange}>↑ 23.4% vs last month</div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className={styles.right}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1>Welcome back 👋</h1>
            <p>
              Sign in to your account. Don't have one? <Link href={ROUTES.signup}>Create account →</Link>
            </p>
          </div>

          {error && <div className={styles.errorAlert} style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <Input 
              name="email"
              label="Email Address" 
              type="email" 
              placeholder="you@example.com" 
              icon={<EmailIcon fontSize="small" />}
              required 
              value={formData.email}
              onChange={handleChange}
            />
            <Input 
              name="password"
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={<LockIcon fontSize="small" />}
              required 
              value={formData.password}
              onChange={handleChange}
            />
            
            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" defaultChecked /> Remember me for 30 days
              </label>
              <Link href="#" className={styles.forgot}>
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In to Dashboard →'}
            </Button>
          </form>

          <div className={styles.divider}>or continue with</div>
          
          <Button variant="outline" className={styles.socialBtn} onClick={handleGoogleLogin}>
            <svg width="18" height="18" viewBox="0 0 48 48" style={{ marginRight: '8px' }}>
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9L37.1 10C34 7.2 29.2 5.5 24 5.5 13.2 5.5 4.5 14.2 4.5 25S13.2 44.5 24 44.5c11 0 19.5-7.7 19.5-19.5 0-1.3-.1-2.6-.4-3.8-.1-.4-.3-.7-.5-1.2z"/>
              <path fill="#FF3D00" d="M6.3 15.7l6.6 4.8C14.5 17 19 14 24 14c3 0 5.7 1.1 7.8 2.9L37.1 10C34 7.2 29.2 5.5 24 5.5c-7.6 0-14.2 4.3-17.7 10.2z"/>
              <path fill="#4CAF50" d="M24 44.5c5.2 0 9.9-1.8 13.5-4.8l-6.2-5.2C29.3 36 26.8 37 24 37c-5.2 0-9.6-3-11.3-7.3l-6.6 5C9.8 40.2 16.4 44.5 24 44.5z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.4 4.2-4.5 5.5l6.2 5.2C40.9 35.5 43.5 30 43.5 25c0-1.3-.1-2.6-.4-3.8l.5-1.2z"/>
            </svg>
            Continue with Google
          </Button>

          <div className={styles.formFooter}>
            By signing in you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}
