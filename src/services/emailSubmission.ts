/**
 * Email Submission Service
 * Handles sending recording submissions via email
 * Uses EmailJS for client-side email sending (no backend required)
 * Alternative: Can be replaced with Firebase Functions or custom backend API
 */

import { RecordingMetadata } from './recordingStorage';

// EmailJS Configuration
// Get your credentials from https://www.emailjs.com/
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || '';
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || '';

// Admin email configuration
const ADMIN_EMAIL =
  process.env.REACT_APP_ADMIN_EMAIL || 'admin@roofer-training.com';
const MANAGER_EMAIL =
  process.env.REACT_APP_MANAGER_EMAIL || 'manager@roofer-training.com';

interface EmailSubmissionData {
  userName: string;
  userEmail: string;
  moduleName: string;
  moduleId: string;
  recordingType: 'audio' | 'video';
  duration: number;
  timestamp: string;
  recordingUrl?: string; // If uploaded to cloud storage
  recordingId: string;
}

interface EmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailSubmissionService {
  private emailJsLoaded = false;

  /**
   * Initialize EmailJS library
   */
  async initializeEmailJS(): Promise<void> {
    if (this.emailJsLoaded) return;

    try {
      // Dynamically load EmailJS
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.async = true;

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });

      // Initialize EmailJS with public key
      if ((window as any).emailjs && EMAILJS_PUBLIC_KEY) {
        (window as any).emailjs.init(EMAILJS_PUBLIC_KEY);
        this.emailJsLoaded = true;
      }
    } catch (error) {
      console.error('Error loading EmailJS:', error);
      throw new Error('Failed to initialize email service');
    }
  }

  /**
   * Send recording submission email
   */
  async sendSubmissionEmail(
    data: EmailSubmissionData
  ): Promise<EmailResponse> {
    try {
      // For demo purposes, we'll use a simulated email service
      // In production, replace this with actual EmailJS or backend API

      console.log('Sending submission email:', data);

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store submission data in localStorage for admin dashboard
      this.storeSubmissionNotification(data);

      return {
        success: true,
        messageId: `msg_${Date.now()}`,
      };

      /*
      // UNCOMMENT THIS FOR ACTUAL EMAILJS INTEGRATION:

      await this.initializeEmailJS();

      const emailParams = {
        to_email: ADMIN_EMAIL,
        cc_email: MANAGER_EMAIL,
        user_name: data.userName,
        user_email: data.userEmail,
        module_name: data.moduleName,
        module_id: data.moduleId,
        recording_type: data.recordingType,
        duration: this.formatDuration(data.duration),
        submission_date: new Date(data.timestamp).toLocaleString(),
        recording_id: data.recordingId,
        review_link: `${window.location.origin}/admin/recordings/${data.recordingId}`,
      };

      const response = await (window as any).emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        emailParams
      );

      return {
        success: true,
        messageId: response.text,
      };
      */
    } catch (error) {
      console.error('Error sending email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Send feedback email to user
   */
  async sendFeedbackEmail(
    userEmail: string,
    userName: string,
    moduleName: string,
    feedback: string,
    status: 'approved' | 'needs_improvement'
  ): Promise<EmailResponse> {
    try {
      console.log('Sending feedback email:', {
        userEmail,
        userName,
        moduleName,
        feedback,
        status,
      });

      // Simulate email sending
      await new Promise(resolve => setTimeout(resolve, 1000));

      return {
        success: true,
        messageId: `feedback_${Date.now()}`,
      };

      /*
      // UNCOMMENT FOR ACTUAL EMAILJS:

      await this.initializeEmailJS();

      const emailParams = {
        to_email: userEmail,
        user_name: userName,
        module_name: moduleName,
        feedback_message: feedback,
        status: status === 'approved' ? 'Approved ✓' : 'Needs Improvement',
        status_color: status === 'approved' ? 'green' : 'orange',
      };

      const response = await (window as any).emailjs.send(
        EMAILJS_SERVICE_ID,
        'feedback_template_id', // Create separate template for feedback
        emailParams
      );

      return {
        success: true,
        messageId: response.text,
      };
      */
    } catch (error) {
      console.error('Error sending feedback email:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Store submission notification for admin dashboard
   */
  private storeSubmissionNotification(data: EmailSubmissionData): void {
    const notifications =
      JSON.parse(
        localStorage.getItem('admin_notifications') || '[]'
      ) as any[];

    notifications.unshift({
      id: `notif_${Date.now()}`,
      type: 'new_submission',
      recordingId: data.recordingId,
      userName: data.userName,
      moduleName: data.moduleName,
      timestamp: new Date().toISOString(),
      read: false,
    });

    // Keep only last 50 notifications
    if (notifications.length > 50) {
      notifications.length = 50;
    }

    localStorage.setItem('admin_notifications', JSON.stringify(notifications));
  }

  /**
   * Get admin notifications
   */
  getAdminNotifications(): any[] {
    return JSON.parse(localStorage.getItem('admin_notifications') || '[]');
  }

  /**
   * Mark notification as read
   */
  markNotificationRead(notificationId: string): void {
    const notifications = this.getAdminNotifications();
    const notification = notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      localStorage.setItem('admin_notifications', JSON.stringify(notifications));
    }
  }

  /**
   * Clear all notifications
   */
  clearNotifications(): void {
    localStorage.removeItem('admin_notifications');
  }

  /**
   * Format duration in seconds to readable string
   */
  private formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * Validate email configuration
   */
  isConfigured(): boolean {
    return !!(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
  }

  /**
   * Get configuration status
   */
  getConfigStatus() {
    return {
      emailJsConfigured: this.isConfigured(),
      adminEmail: ADMIN_EMAIL,
      managerEmail: MANAGER_EMAIL,
      serviceId: EMAILJS_SERVICE_ID ? '✓ Set' : '✗ Not Set',
      templateId: EMAILJS_TEMPLATE_ID ? '✓ Set' : '✗ Not Set',
      publicKey: EMAILJS_PUBLIC_KEY ? '✓ Set' : '✗ Not Set',
    };
  }
}

// Export singleton instance
export const emailSubmissionService = new EmailSubmissionService();

// Export types
export type { EmailSubmissionData, EmailResponse, EmailSubmissionService };
