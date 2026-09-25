// Firebase Client Authentication SDK Module
// JK Realty Luxury Real Estate Platform
import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';

/**
 * Retrieves the Firebase configuration either from Next.js environment variables
 * or custom local overrides saved in the browser.
 */
export function getFirebaseConfig() {
  if (typeof window !== 'undefined') {
    try {
      const localOverride = localStorage.getItem('aura_firebase_custom_config');
      if (localOverride) {
        const parsed = JSON.parse(localOverride);
        if (parsed && parsed.apiKey) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Could not read local Firebase custom config:', e);
    }
  }

  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || ''
  };
}

/**
 * Checks if the minimal required Firebase credentials are set.
 */
export function isFirebaseConfigured() {
  const config = getFirebaseConfig();
  return Boolean(
    config.apiKey &&
    config.apiKey.length > 5 &&
    config.projectId &&
    config.appId
  );
}

/**
 * Returns detailed breakdown of Firebase config status.
 */
export function getFirebaseConfigStatus() {
  const config = getFirebaseConfig();
  const isConfigured = isFirebaseConfigured();
  return {
    isConfigured,
    hasApiKey: Boolean(config.apiKey),
    hasAuthDomain: Boolean(config.authDomain),
    hasProjectId: Boolean(config.projectId),
    hasAppId: Boolean(config.appId),
    projectId: config.projectId || 'Not Configured',
    authDomain: config.authDomain || 'Not Configured'
  };
}

// Singleton Firebase instances
let firebaseApp = null;
let firebaseAuth = null;
let googleAuthProvider = null;

export function getFirebaseApp() {
  const config = getFirebaseConfig();
  if (!config.apiKey || !config.projectId) {
    return null;
  }

  if (getApps().length > 0) {
    firebaseApp = getApp();
  } else {
    try {
      firebaseApp = initializeApp(config);
    } catch (err) {
      console.error('Firebase initialization error:', err);
      return null;
    }
  }
  return firebaseApp;
}

export function getFirebaseAuth() {
  if (firebaseAuth) return firebaseAuth;
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    firebaseAuth = getAuth(app);
    return firebaseAuth;
  } catch (err) {
    console.error('Failed to get Firebase Auth instance:', err);
    return null;
  }
}

export function getGoogleProvider() {
  if (googleAuthProvider) return googleAuthProvider;
  googleAuthProvider = new GoogleAuthProvider();
  googleAuthProvider.setCustomParameters({
    prompt: 'select_account'
  });
  return googleAuthProvider;
}

/**
 * Standardizes a Firebase User object into the platform's currentUser format.
 */
export function formatFirebaseUser(user, additionalData = {}) {
  if (!user) return null;
  const displayName = user.displayName || user.email?.split('@')[0] || 'Verified Client';
  const role = additionalData.role || 'buyer';
  
  return {
    id: `firebase-${user.uid}`,
    uid: user.uid,
    name: displayName,
    email: user.email || '',
    avatar: user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}&backgroundColor=1e3a5f,d4af37`,
    role,
    authProvider: 'firebase',
    emailVerified: user.emailVerified ?? false,
    phoneNumber: user.phoneNumber || null,
    isAnonymous: user.isAnonymous ?? false,
    createdAt: user.metadata?.creationTime || new Date().toISOString(),
    lastLoginAt: user.metadata?.lastSignInTime || new Date().toISOString()
  };
}

/**
 * Human-friendly error translation for common Firebase Authentication errors.
 */
export function translateFirebaseError(error) {
  if (!error) return 'An unexpected authentication error occurred.';
  const code = error.code || '';
  const message = error.message || '';

  switch (code) {
    case 'auth/invalid-email':
      return 'The email address is improperly formatted.';
    case 'auth/user-disabled':
      return 'This user account has been disabled by security administrators.';
    case 'auth/user-not-found':
      return 'No account exists with this email address. Please register first.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please verify and try again.';
    case 'auth/invalid-credential':
      return 'Invalid credentials. Please verify your email and password.';
    case 'auth/email-already-in-use':
      return 'An account already exists with this email address. Sign in instead.';
    case 'auth/weak-password':
      return 'Password is too weak. Please use at least 6 characters.';
    case 'auth/popup-closed-by-user':
      return 'Google sign-in popup was closed before completing authentication.';
    case 'auth/popup-blocked':
      return 'The sign-in popup was blocked by your browser. Please allow popups for this site.';
    case 'auth/cancelled-popup-request':
      return 'Multiple popup requests opened simultaneously. Only one can be processed.';
    case 'auth/operation-not-allowed':
      return 'This sign-in method is not enabled in Firebase Console. Enable Email/Password or Google under Auth > Sign-in method.';
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized in Firebase Console. Add localhost or your domain in Firebase Auth Settings.';
    case 'auth/network-request-failed':
      return 'Network connection failed. Please check your internet connection.';
    case 'auth/too-many-requests':
      return 'Access to this account has been temporarily disabled due to many failed attempts. Try again later or reset password.';
    case 'auth/invalid-phone-number':
      return 'Invalid phone number format. Please provide a valid country code (e.g., +91 98765 43210 or +1 310 555 0192).';
    case 'auth/missing-phone-number':
      return 'Please enter a valid mobile phone number.';
    case 'auth/quota-exceeded':
      return 'SMS OTP quota exceeded for today. Please try again later or use Email login.';
    case 'auth/invalid-verification-code':
      return 'Invalid or incorrect OTP code entered. Please verify and re-enter.';
    case 'auth/code-expired':
      return 'The OTP verification code has expired. Please tap "Send OTP" to receive a fresh code.';
    case 'auth/captcha-check-failed':
      return 'Security verification check failed. Please refresh and try again.';
    default:
      if (message.includes('API key not valid')) {
        return 'Firebase API key is invalid. Please verify your credentials in .env.local.';
      }
      return message.replace('Firebase: ', '') || 'Authentication failed. Please try again.';
  }
}

/**
 * Sign in with Email and Password using Firebase.
 */
export async function firebaseLoginWithEmail(email, password) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth is not configured. Please supply Firebase credentials in .env.local.');
  }
  try {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
    return formatFirebaseUser(cred.user);
  } catch (error) {
    throw new Error(translateFirebaseError(error));
  }
}

/**
 * Register a new user with Email and Password using Firebase.
 */
export async function firebaseRegisterWithEmail(email, password, displayName = '', role = 'buyer') {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth is not configured. Please supply Firebase credentials in .env.local.');
  }
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    const cleanedName = displayName.trim() || email.split('@')[0];
    const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanedName)}&backgroundColor=1e3a5f,d4af37`;

    // Update Firebase Auth user profile
    try {
      await updateProfile(cred.user, {
        displayName: cleanedName,
        photoURL: avatarUrl
      });
    } catch (profileErr) {
      console.warn('Profile update warning:', profileErr);
    }

    return formatFirebaseUser(cred.user, { role });
  } catch (error) {
    throw new Error(translateFirebaseError(error));
  }
}

/**
 * Sign in with Google Popup using Firebase.
 */
export async function firebaseLoginWithGoogle(role = 'buyer') {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth is not configured. Please supply Firebase credentials in .env.local.');
  }
  const provider = getGoogleProvider();
  try {
    const cred = await signInWithPopup(auth, provider);
    return formatFirebaseUser(cred.user, { role });
  } catch (error) {
    throw new Error(translateFirebaseError(error));
  }
}

/**
 * Send password reset email using Firebase.
 */
export async function firebasePasswordReset(email) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth is not configured. Please supply Firebase credentials in .env.local.');
  }
  try {
    await sendPasswordResetEmail(auth, email.trim());
    return true;
  } catch (error) {
    throw new Error(translateFirebaseError(error));
  }
}

/**
 * Sign out of Firebase.
 */
export async function firebaseLogout() {
  const auth = getFirebaseAuth();
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Firebase sign-out error:', error);
  }
}

/**
 * Subscribe to Firebase Auth state changes.
 */
export function subscribeToFirebaseAuthState(callback) {
  const auth = getFirebaseAuth();
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, (user) => {
    if (user) {
      callback(formatFirebaseUser(user));
    } else {
      callback(null);
    }
  });
}

/**
 * Creates or retrieves a Firebase RecaptchaVerifier for Phone OTP verification.
 */
export function createRecaptchaVerifier(containerId = 'recaptcha-container') {
  if (typeof window === 'undefined') return null;
  const auth = getFirebaseAuth();
  if (!auth) return null;

  try {
    if (window.firebaseRecaptchaVerifier) {
      return window.firebaseRecaptchaVerifier;
    }
    const container = document.getElementById(containerId);
    if (!container) return null;

    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {
        // reCAPTCHA solved
      },
      'expired-callback': () => {
        console.warn('reCAPTCHA expired, user action required');
      }
    });

    window.firebaseRecaptchaVerifier = verifier;
    return verifier;
  } catch (err) {
    console.warn('Recaptcha initialization note:', err);
    return null;
  }
}

/**
 * Send SMS OTP to phone number using Firebase Authentication.
 */
export async function firebaseSendPhoneOtp(phoneNumber, appVerifier) {
  const auth = getFirebaseAuth();
  if (!auth) {
    throw new Error('Firebase Auth is not configured. Please supply Firebase credentials in .env.local.');
  }
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber.trim(), appVerifier);
    return confirmationResult;
  } catch (error) {
    throw new Error(translateFirebaseError(error));
  }
}

/**
 * Confirm SMS OTP and sign in user using Firebase Authentication.
 */
export async function firebaseVerifyPhoneOtp(confirmationResult, otpCode, additionalData = {}) {
  if (!confirmationResult || typeof confirmationResult.confirm !== 'function') {
    throw new Error('No active OTP session found. Please click "Send OTP" to receive a code.');
  }
  try {
    const result = await confirmationResult.confirm(otpCode.trim());
    return formatFirebaseUser(result.user, additionalData);
  } catch (error) {
    throw new Error(translateFirebaseError(error));
  }
}

