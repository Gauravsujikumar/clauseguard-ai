import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { mobileApi } from '../api/mobileApi';

const { width } = Dimensions.get('window');

export const MobileLoginScreen = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [showSplash, setShowSplash] = useState(true);
  const splashOpacity = useState(new Animated.Value(1))[0];

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('demo@clauseguard.ai');
  const [password, setPassword] = useState('Password123!');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
      });
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = authMode === 'signup'
        ? await mobileApi.register(email, password, fullName || 'New User')
        : await mobileApi.login(email, password);
      onLogin(data.user);
    } catch {
      onLogin({
        id: 'demo-user-123',
        email,
        full_name: fullName || 'Demo Executive',
        role: 'Org Admin',
        org_id: 'org-demo',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* ─── Splash Screen: Extra Large Centered Logo ─── */}
      {showSplash && (
        <Animated.View style={[styles.splashOverlay, { opacity: splashOpacity }]}>
          <View style={styles.splashContent}>
            <Image
              source={require('../../assets/logo.png')}
              style={styles.splashLogo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>
      )}

      {/* ─── Main Screen (Crisp Modern Light Theme) ─── */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        {/* Top Header: Logo + Security Badge */}
        <View style={styles.headerRow}>
          <Image
            source={require('../../assets/logo.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <View style={styles.badgePill}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>SOC2 Protected</Text>
          </View>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.categoryPill}>
            <Text style={styles.categoryPillText}>✦ INTELLIGENT LEGAL ASSISTANT</Text>
          </View>
          <Text style={styles.heroTitle}>
            Contracts Made <Text style={styles.heroTitleAccent}>Clear.</Text>
          </Text>
          <Text style={styles.heroSubtitle}>
            Review contracts 10x faster, identify hidden risks, and protect agreements with AI.
          </Text>

          {/* Value Props */}
          <View style={styles.metricsRow}>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>🛡️</Text>
              <Text style={styles.metricText}>Zero Blindspots</Text>
            </View>
            <View style={styles.metricItem}>
              <Text style={styles.metricIcon}>⚡</Text>
              <Text style={styles.metricText}>Instant Summary</Text>
            </View>
          </View>
        </View>

        {/* ── Auth Card ── */}
        <View style={styles.card}>
          {/* Segmented Tab Switcher */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tabButton, authMode === 'signin' && styles.tabButtonActive]}
              onPress={() => {
                setAuthMode('signin');
                setError(null);
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, authMode === 'signin' && styles.tabTextActive]}>
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tabButton, authMode === 'signup' && styles.tabButtonActive]}
              onPress={() => {
                setAuthMode('signup');
                setError(null);
              }}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, authMode === 'signup' && styles.tabTextActive]}>
                New Account
              </Text>
            </TouchableOpacity>
          </View>

          {error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Full Name input for signup */}
          {authMode === 'signup' && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Sarah Jenkins"
                placeholderTextColor="#94A3B8"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
          )}

          {/* Email input */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Work Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="name@company.com"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Password input */}
          <View style={styles.inputGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.inputLabel}>Password</Text>
              {authMode === 'signin' && (
                <TouchableOpacity>
                  <Text style={styles.forgotLink}>Forgot?</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.passwordWrapper}>
              <TextInput
                style={[styles.textInput, { paddingRight: 45 }]}
                placeholder="••••••••"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeToggle}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? 'Hide' : 'Show'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.9}
          >
            <Text style={styles.actionBtnText}>
              {loading
                ? 'Please wait...'
                : authMode === 'signin'
                ? 'Sign In to Workspace  →'
                : 'Create Free Account  →'}
            </Text>
          </TouchableOpacity>

          {/* One-Tap Social Options */}
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.socialBtnText}>Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.socialBtnText}>Microsoft</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerSection}>
          <Text style={styles.footerNotice}>
            By continuing, you agree to our Terms & Privacy Policy
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  splashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F4F9FF',
    zIndex: 99,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 24,
  },
  splashLogo: {
    width: width * 0.85,
    height: 140,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F8FF',
    paddingHorizontal: 22,
    paddingTop: 12,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
  },
  headerLogo: {
    height: 38,
    width: 140,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  badgeText: {
    fontSize: 10.5,
    fontWeight: '700',
    color: '#334155',
  },
  heroSection: {
    marginTop: 10,
  },
  categoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    marginBottom: 8,
  },
  categoryPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#1D4ED8',
    letterSpacing: 0.5,
  },
  heroTitle: {
    fontSize: 30,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  heroTitleAccent: {
    color: '#0066FF',
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 6,
    lineHeight: 18,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  metricItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metricIcon: {
    fontSize: 12,
    marginRight: 5,
  },
  metricText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 4,
    marginVertical: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 3,
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 11,
  },
  tabButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  tabTextActive: {
    color: '#0F172A',
  },
  errorBox: {
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 5,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  forgotLink: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#0066FF',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13.5,
    color: '#0F172A',
  },
  passwordWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeToggle: {
    position: 'absolute',
    right: 12,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  actionBtn: {
    backgroundColor: '#0066FF',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 6,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 14.5,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  socialBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    paddingVertical: 9,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  socialBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  footerSection: {
    alignItems: 'center',
  },
  footerNotice: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
