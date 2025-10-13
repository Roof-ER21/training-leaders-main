/**
 * Admin Setup Utility
 * Provides functions to set up the first admin account
 */

import authService from '../services/authService';
import { User } from '../types/user';

/**
 * Make current user an admin (for initial setup)
 * This function can be called from the browser console
 */
export async function makeCurrentUserAdmin(): Promise<void> {
  const user = authService.getCurrentUser();

  if (!user) {
    console.error('[AdminSetup] No user logged in');
    alert('Please log in first');
    return;
  }

  try {
    // Directly update the role in localStorage for mock mode
    const mockUser: User = {
      ...user,
      role: 'admin',
    };

    localStorage.setItem('mock_user', JSON.stringify(mockUser));

    console.log('[AdminSetup] User upgraded to admin:', user.email);
    alert(`Success! ${user.email} is now an admin.\n\nPlease refresh the page for changes to take effect.`);

    // Refresh the page
    window.location.reload();
  } catch (error: any) {
    console.error('[AdminSetup] Error:', error);
    alert(`Error: ${error.message}`);
  }
}

/**
 * Create a mock admin user (for testing)
 */
export function createMockAdmin(email: string = 'admin@roofer.com'): void {
  const mockAdmin: User = {
    uid: `mock_admin_${Date.now()}`,
    email,
    displayName: 'Admin User',
    role: 'admin',
    company: 'RoofER Training Academy',
    createdAt: Date.now(),
    lastActive: Date.now(),
  };

  localStorage.setItem('mock_user', JSON.stringify(mockAdmin));

  console.log('[AdminSetup] Mock admin created:', email);
  alert(`Mock admin created!\n\nEmail: ${email}\nRole: admin\n\nRefreshing page...`);

  window.location.reload();
}

/**
 * Check if current user is admin
 */
export function checkAdminStatus(): void {
  const user = authService.getCurrentUser();

  if (!user) {
    console.log('[AdminSetup] No user logged in');
    alert('No user logged in');
    return;
  }

  console.log('[AdminSetup] Current user:', {
    email: user.email,
    role: user.role,
    isAdmin: user.role === 'admin',
  });

  alert(`User: ${user.email}\nRole: ${user.role}\nIs Admin: ${user.role === 'admin'}`);
}

/**
 * Generate sample training data for testing
 */
export async function generateSampleData(): Promise<void> {
  const trainingService = await import('../services/trainingService');

  // Create sample sessions for testing
  const sampleModules = [
    { id: 1, name: 'Module 1: Introduction' },
    { id: 2, name: 'Module 2: Basics' },
    { id: 3, name: 'Module 3: Advanced' },
  ];

  for (const module of sampleModules) {
    await trainingService.default.startTrainingSession(
      'sample_user',
      module.id,
      module.name
    );

    // Simulate some time passing
    await new Promise(resolve => setTimeout(resolve, 100));

    await trainingService.default.endTrainingSession(
      Math.floor(Math.random() * 30) + 70, // 70-100 score
      true
    );
  }

  console.log('[AdminSetup] Sample data generated');
  alert('Sample training data generated successfully!');
}

// Make functions available globally for console access
if (typeof window !== 'undefined') {
  (window as any).adminSetup = {
    makeCurrentUserAdmin,
    createMockAdmin,
    checkAdminStatus,
    generateSampleData,
  };
}
