/**
 * Authentication Service
 * Handles user authentication, role management, and user profiles
 */

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../config/firebase';
import { User, UserRole } from '../types/user';

class AuthService {
  private currentUser: User | null = null;
  private authListeners: ((user: User | null) => void)[] = [];

  /**
   * Initialize auth state listener
   */
  initialize(): void {
    if (!isFirebaseConfigured || !auth) {
      // Silent mode - mock authentication works perfectly without Firebase
      // Uncomment below for debugging:
      // console.info('[AuthService] Running in mock authentication mode');
      this.loadMockUser();
      return;
    }

    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const user = await this.getUserProfile(firebaseUser.uid);
        this.currentUser = user;
        this.notifyListeners(user);
      } else {
        this.currentUser = null;
        this.notifyListeners(null);
      }
    });
  }

  /**
   * Load mock user for development
   */
  private loadMockUser(): void {
    const mockUserData = localStorage.getItem('mock_user');
    if (mockUserData) {
      this.currentUser = JSON.parse(mockUserData);
      this.notifyListeners(this.currentUser);
    }
  }

  /**
   * Register a new user
   */
  async registerUser(
    email: string,
    password: string,
    displayName: string,
    company?: string
  ): Promise<User> {
    if (!isFirebaseConfigured || !auth || !db) {
      // Mock registration
      const mockUser: User = {
        uid: `mock_${Date.now()}`,
        email,
        displayName,
        role: 'user',
        company,
        createdAt: Date.now(),
        lastActive: Date.now(),
      };
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      this.currentUser = mockUser;
      this.notifyListeners(mockUser);
      return mockUser;
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;

    // Update profile
    await updateProfile(firebaseUser, { displayName });

    // Create user document in Firestore
    const user: User = {
      uid: firebaseUser.uid,
      email: firebaseUser.email!,
      displayName,
      role: 'user',
      company,
      createdAt: Date.now(),
      lastActive: Date.now(),
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), user);

    this.currentUser = user;
    this.notifyListeners(user);
    return user;
  }

  /**
   * Sign in user
   */
  async signIn(email: string, password: string): Promise<User> {
    if (!isFirebaseConfigured || !auth || !db) {
      // Mock sign in
      const domain = (email.split('@')[1] || '').toLowerCase();
      if (domain !== 'theroofdocs.com') {
        throw new Error('Access restricted to theroofdocs.com accounts');
      }
      const isAdmin = email.toLowerCase() === 'ahmed.mahmoud@theroofdocs.com';
      const mockUser: User = {
        uid: `mock_${Date.now()}`,
        email,
        displayName: email.split('@')[0],
        role: (isAdmin ? 'admin' : 'user') as UserRole,
        createdAt: Date.now(),
        lastActive: Date.now(),
      };
      localStorage.setItem('mock_user', JSON.stringify(mockUser));
      this.currentUser = mockUser;
      this.notifyListeners(mockUser);
      return mockUser;
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await this.getUserProfile(userCredential.user.uid);

    // Update last active
    await this.updateLastActive(user.uid);

    this.currentUser = user;
    this.notifyListeners(user);
    return user;
  }

  /**
   * Sign out user
   */
  async signOutUser(): Promise<void> {
    if (!isFirebaseConfigured || !auth) {
      localStorage.removeItem('mock_user');
      this.currentUser = null;
      this.notifyListeners(null);
      return;
    }

    await signOut(auth);
    this.currentUser = null;
    this.notifyListeners(null);
  }

  /**
   * Get user profile from Firestore
   */
  async getUserProfile(uid: string): Promise<User> {
    if (!isFirebaseConfigured || !db) {
      const mockUserData = localStorage.getItem('mock_user');
      if (mockUserData) {
        return JSON.parse(mockUserData);
      }
      throw new Error('User not found');
    }

    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      throw new Error('User profile not found');
    }
    return userDoc.data() as User;
  }

  /**
   * Update user role (admin only)
   */
  async updateUserRole(
    targetUserId: string,
    newRole: UserRole
  ): Promise<void> {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    if (!isFirebaseConfigured || !db) {
      // Mock update
      if (this.currentUser.uid === targetUserId) {
        this.currentUser.role = newRole;
        localStorage.setItem('mock_user', JSON.stringify(this.currentUser));
        this.notifyListeners(this.currentUser);
      }
      return;
    }

    await updateDoc(doc(db, 'users', targetUserId), {
      role: newRole,
    });

    // If updating self, refresh current user
    if (targetUserId === this.currentUser.uid) {
      this.currentUser = await this.getUserProfile(targetUserId);
      this.notifyListeners(this.currentUser);
    }
  }

  /**
   * Update last active timestamp
   */
  async updateLastActive(uid: string): Promise<void> {
    const now = Date.now();

    if (!isFirebaseConfigured || !db) {
      if (this.currentUser && this.currentUser.uid === uid) {
        this.currentUser.lastActive = now;
        localStorage.setItem('mock_user', JSON.stringify(this.currentUser));
      }
      return;
    }

    await updateDoc(doc(db, 'users', uid), {
      lastActive: now,
    });
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Check if current user is admin
   */
  isAdmin(): boolean {
    return this.currentUser?.role === 'admin';
  }

  /**
   * Subscribe to auth state changes
   */
  onAuthStateChange(callback: (user: User | null) => void): () => void {
    this.authListeners.push(callback);
    // Immediately call with current user
    callback(this.currentUser);

    // Return unsubscribe function
    return () => {
      this.authListeners = this.authListeners.filter((cb) => cb !== callback);
    };
  }

  /**
   * Notify all listeners of auth state change
   */
  private notifyListeners(user: User | null): void {
    this.authListeners.forEach((callback) => callback(user));
  }

  /**
   * Get all users (admin only)
   */
  async getAllUsers(): Promise<User[]> {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    if (!isFirebaseConfigured || !db) {
      // Return mock users
      const mockUser = this.currentUser;
      return [mockUser];
    }

    const usersSnapshot = await getDocs(collection(db, 'users'));
    return usersSnapshot.docs.map((doc) => doc.data() as User);
  }

  /**
   * Get users by team (admin only)
   */
  async getUsersByTeam(teamId: string): Promise<User[]> {
    if (!this.currentUser || this.currentUser.role !== 'admin') {
      throw new Error('Unauthorized: Admin access required');
    }

    if (!isFirebaseConfigured || !db) {
      return [this.currentUser];
    }

    const q = query(collection(db, 'users'), where('teamId', '==', teamId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data() as User);
  }
}

// Export singleton instance
const authService = new AuthService();
export default authService;
