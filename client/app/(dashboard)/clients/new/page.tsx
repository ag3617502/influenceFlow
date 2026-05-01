'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import styles from './NewClientPage.module.css';
import api from '@/lib/axios';
import { ROUTES } from '@/lib/constants';

const NewClientPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    industry: 'Fashion',
    website: '',
    location: '',
    contactPerson: '',
    phone: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/clients', formData);
      if (response.data.success) {
        router.push(ROUTES.clients);
      }
    } catch (error) {
      console.error('Failed to create client', error);
      alert('Failed to create client. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Create New Client</h1>
          <p className={styles.subtitle}>Add a brand partner to your database</p>
        </div>
        <div className={styles.actions}>
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Creating...' : <><SaveIcon fontSize="small" /> Save Client</>}
          </Button>
        </div>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <Card title="Basic Information" subtitle="IDENTIFICATION & CONTACT">
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Client / Brand Name *</label>
                <div className={styles.inputWrapper}>
                  <BusinessIcon className={styles.inputIcon} />
                  <input 
                    name="name" 
                    className={styles.input} 
                    placeholder="e.g. Nike Global" 
                    required 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Contact Email *</label>
                <div className={styles.inputWrapper}>
                  <EmailIcon className={styles.inputIcon} />
                  <input 
                    name="email" 
                    type="email" 
                    className={styles.input} 
                    placeholder="contact@brand.com" 
                    required 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Industry *</label>
                <select 
                  name="industry" 
                  className={styles.select} 
                  value={formData.industry}
                  onChange={handleChange}
                >
                  <option>Fashion</option>
                  <option>Tech</option>
                  <option>Sports</option>
                  <option>Food</option>
                  <option>Lifestyle</option>
                  <option>Music</option>
                  <option>Media</option>
                  <option>Other</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Website</label>
                <div className={styles.inputWrapper}>
                  <PublicIcon className={styles.inputIcon} />
                  <input 
                    name="website" 
                    className={styles.input} 
                    placeholder="https://brand.com" 
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.formSection}>
          <Card title="Relationship Details" subtitle="LOCATION & POINT OF CONTACT">
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Location / HQ</label>
                <div className={styles.inputWrapper}>
                  <LocationOnIcon className={styles.inputIcon} />
                  <input 
                    name="location" 
                    className={styles.input} 
                    placeholder="e.g. Portland, USA" 
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Contact Person Name</label>
                <div className={styles.inputWrapper}>
                  <PersonIcon className={styles.inputIcon} />
                  <input 
                    name="contactPerson" 
                    className={styles.input} 
                    placeholder="e.g. Sarah Jenkins" 
                    value={formData.contactPerson}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <div className={styles.inputWrapper}>
                  <PhoneIcon className={styles.inputIcon} />
                  <input 
                    name="phone" 
                    className={styles.input} 
                    placeholder="+1 (555) 000-0000" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className={styles.formSection}>
          <Card title="Notes & Strategy" subtitle="INTERNAL USE ONLY">
            <div className={styles.formGroup}>
              <textarea 
                name="notes" 
                className={styles.textarea} 
                rows={4} 
                placeholder="Any special requirements, brand guidelines, or strategy notes for this client..."
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
          </Card>
        </div>

        <div className={styles.formFooter}>
          <div className={styles.footerNote}>* Required fields must be completed</div>
          <div className={styles.footerActions}>
            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Processing...' : 'Create Client Profile'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewClientPage;
