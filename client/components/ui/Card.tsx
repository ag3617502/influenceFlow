import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string; // Standardizing from 'description' to 'subtitle' as used in dashboard
  description?: string;
  footer?: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  glass?: boolean;
  topAccent?: string; // Hex color or CSS variable
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  description,
  footer,
  className = '',
  hoverable = false,
  glass = false,
  topAccent,
}) => {
  const descText = subtitle || description;

  return (
    <div className={`
      ${styles.card} 
      ${hoverable ? styles.hoverable : ''} 
      ${glass ? 'glass' : ''} 
      ${className}
    `}>
      {topAccent && (
        <div 
          className={styles.topAccent} 
          style={{ backgroundColor: topAccent }} 
        />
      )}
      
      {title && (
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {descText && <p className={styles.description}>{descText}</p>}
        </div>
      )}
      <div className={styles.content}>
        {children}
      </div>
      {footer && (
        <div className={styles.footer}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
