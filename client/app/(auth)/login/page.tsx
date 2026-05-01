import React from 'react';
import Link from 'next/link';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import styles from './LoginPage.module.css';
import { APP_CONFIG, ROUTES } from '@/lib/constants';

export const metadata = {
  title: `Login | ${APP_CONFIG.name}`,
  description: `Sign in to your ${APP_CONFIG.name} account.`,
};

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href={ROUTES.home} className={styles.logo}>
            <FlashOnIcon className={styles.logoIcon} />
            {APP_CONFIG.name.replace('Flow', '')}<span>Flow</span>
          </Link>
          <h1>Welcome Back</h1>
          <p>Enter your credentials to access your dashboard</p>
        </div>

        <Card className={styles.card}>
          <form className={styles.form}>
            <Input 
              label="Email Address" 
              type="email" 
              placeholder="name@example.com" 
              icon={<EmailIcon fontSize="small" />}
              required 
            />
            <Input 
              label="Password" 
              type="password" 
              placeholder="••••••••" 
              icon={<LockIcon fontSize="small" />}
              required 
            />
            
            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" /> Remember me
              </label>
              <Link href="#" className={styles.forgot}>
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" className={styles.submit}>
              Sign In
            </Button>
          </form>
        </Card>

        <p className={styles.footer}>
          Don't have an account? <Link href={ROUTES.signup}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
