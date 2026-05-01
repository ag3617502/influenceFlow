'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Logo from '@/components/ui/Logo';
import styles from './SignupPage.module.css';
import { APP_CONFIG, ROUTES } from '@/lib/constants';
import api from '@/lib/axios';

const PREDEFINED_PLATFORMS = [
  'Instagram', 'YouTube', 'TikTok', 'Facebook', 'Twitter / X', 
  'Twitch', 'LinkedIn', 'Pinterest', 'Snapchat'
];

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram']);
  const [customPlatform, setCustomPlatform] = useState('');
  const [allPlatforms, setAllPlatforms] = useState(PREDEFINED_PLATFORMS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platform) 
        ? prev.filter(p => p !== platform) 
        : [...prev, platform]
    );
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPlatform && !allPlatforms.includes(customPlatform)) {
      setAllPlatforms(prev => [...prev, customPlatform]);
      setSelectedPlatforms(prev => [...prev, customPlatform]);
      setCustomPlatform('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/register', {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        password: formData.password,
        // platforms: selectedPlatforms, // If you want to store these in the model later
      });

      if (response.data.success) {
        router.push(ROUTES.login);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong during signup');
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
      {/* Left Section - Branding & Plans */}
      <div className={styles.left}>
        <Logo size="lg" className={styles.logo} />
        
        <div className={styles.leftContent}>
          <h1 className={styles.headline}>
            Start managing<br/><span>deals smarter</span><br/>today.
          </h1>
          <p className={styles.subtext}>
            Join thousands of influencers and creators who use InfluenceFlow to manage their business efficiently.
          </p>
          
          <div className={styles.plans}>
            <div className={`${styles.planCard} ${styles.planFeatured}`}>
              <div className={styles.planName}>
                Pro Plan <span className={styles.planBadge}>Most Popular</span>
              </div>
              <div className={styles.planDesc}>Unlimited deals, invoices, partners & analytics. $29/mo</div>
            </div>
            <div className={`${styles.planCard}`}>
              <div className={styles.planName}>Starter Plan</div>
              <div className={styles.planDesc}>Up to 10 active deals, basic analytics. Free forever.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className={styles.right}>
        <div className={styles.formContainer}>
          <div className={styles.formHeader}>
            <h1>Create your account</h1>
            <p>
              Already have one? <Link href={ROUTES.login}>Sign in →</Link>
            </p>
          </div>

          {error && <div className={styles.errorAlert}>{error}</div>}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.sectionLabel}>PERSONAL INFORMATION</div>
            <div className={styles.row}>
              <Input 
                name="firstName"
                label="First Name" 
                placeholder="Jane" 
                icon={<PersonIcon fontSize="small" />}
                required 
                value={formData.firstName}
                onChange={handleChange}
              />
              <Input 
                name="lastName"
                label="Last Name" 
                placeholder="Doe" 
                icon={<PersonIcon fontSize="small" />}
                required 
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>

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
              placeholder="Min. 8 characters" 
              icon={<LockIcon fontSize="small" />}
              required 
              value={formData.password}
              onChange={handleChange}
            />

            <div className={styles.sectionLabel}>PRIMARY PLATFORMS (MULTI-SELECT)</div>
            <div className={styles.platformsGrid}>
              {allPlatforms.map(platform => (
                <div 
                  key={platform} 
                  className={`${styles.platformChip} ${selectedPlatforms.includes(platform) ? styles.platformSelected : ''}`}
                  onClick={() => togglePlatform(platform)}
                >
                  {platform}
                </div>
              ))}
            </div>

            <div className={styles.customPlatform}>
              <Input 
                placeholder="Add other platform (e.g. Threads)" 
                value={customPlatform}
                onChange={(e) => setCustomPlatform(e.target.value)}
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddCustom}
                style={{ height: '44px', marginTop: 'auto' }}
              >
                <AddIcon fontSize="small" />
              </Button>
            </div>

            <div className={styles.tos}>
              <input type="checkbox" id="tos" required />
              <label htmlFor="tos">
                I agree to {APP_CONFIG.name}'s <Link href="#">Terms of Service</Link> and <Link href="#">Privacy Policy</Link>. I consent to receiving product updates.
              </label>
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account →'}
            </Button>
          </form>

          <div className={styles.divider}>or sign up with</div>
          
          <Button variant="outline" className={styles.socialBtn} onClick={handleGoogleLogin}>
            <svg width="18" height="18" viewBox="0 0 48 48" style={{ marginRight: '8px' }}>
              <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.6 33 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9L37.1 10C34 7.2 29.2 5.5 24 5.5 13.2 5.5 4.5 14.2 4.5 25S13.2 44.5 24 44.5c11 0 19.5-7.7 19.5-19.5 0-1.3-.1-2.6-.4-3.8-.1-.4-.3-.7-.5-1.2z"/>
              <path fill="#FF3D00" d="M6.3 15.7l6.6 4.8C14.5 17 19 14 24 14c3 0 5.7 1.1 7.8 2.9L37.1 10C34 7.2 29.2 5.5 24 5.5c-7.6 0-14.2 4.3-17.7 10.2z"/>
              <path fill="#4CAF50" d="M24 44.5c5.2 0 9.9-1.8 13.5-4.8l-6.2-5.2C29.3 36 26.8 37 24 37c-5.2 0-9.6-3-11.3-7.3l-6.6 5C9.8 40.2 16.4 44.5 24 44.5z"/>
              <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.3-2.4 4.2-4.5 5.5l6.2 5.2C40.9 35.5 43.5 30 43.5 25c0-1.3-.1-2.6-.4-3.8l.5-1.2z"/>
            </svg>
            Continue with Google
          </Button>
        </div>
      </div>
    </div>
  );
}
