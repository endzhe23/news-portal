'use client';

import { useState, useEffect, useCallback } from 'react';
import { IMaskInput } from 'react-imask';
import type { ContactFormData } from '@/src/types/news';
import styles from './ContactForm.module.scss';

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  agreement?: string;
}

const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ContactForm = ({ isOpen, onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    agreement: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен для заполнения';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email';
    }

    if (!formData.agreement) {
      newErrors.agreement = 'Необходимо согласие на обработку данных';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      console.log('Форма отправлена:', formData);
      setFormData({
        name: '',
        phone: '',
        email: '',
        agreement: false,
      });
      setErrors({});
      onClose();
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Связаться с нами</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">
              Имя
            </label>
            <input
              type="text"
              id="name"
              className={`${styles.input} ${errors.name ? styles.error : ''}`}
              placeholder="Имя"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="phone">
              Телефон
            </label>
            <IMaskInput
              mask="+7 (000) 000-00-00"
              id="phone"
              className={`${styles.input} ${errors.phone ? styles.error : ''}`}
              placeholder="+7 (___) ___-__-__"
              value={formData.phone}
              onAccept={(value: string) => setFormData({ ...formData, phone: value })}
            />
            {errors.phone && <p className={styles.errorMessage}>{errors.phone}</p>}
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              E-mail
            </label>
            <input
              type="email"
              id="email"
              className={`${styles.input} ${errors.email ? styles.error : ''}`}
              placeholder="E-mail"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="agreement"
                className={styles.checkbox}
                checked={formData.agreement}
                onChange={(e) => setFormData({ ...formData, agreement: e.target.checked })}
              />
              <label className={styles.checkboxLabel} htmlFor="agreement">
                Я согласен(-а) на обработку персональных данных
              </label>
            </div>
            {errors.agreement && <p className={styles.checkboxError}>{errors.agreement}</p>}
          </div>

          <button type="submit" className={styles.submitButton}>
            Отправить
          </button>
        </form>
      </div>
    </div>
  );
};
