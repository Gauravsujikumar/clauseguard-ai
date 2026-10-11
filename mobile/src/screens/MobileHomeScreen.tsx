import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import { mobileApi } from '../api/mobileApi';

export const MobileHomeScreen = ({ navigation }: { navigation: any }) => {
  const [recentContracts, setRecentContracts] = useState<any[]>([]);

  useEffect(() => {
    mobileApi.listDocuments()
      .then((docs) => {
        if (docs && docs.length > 0) {
          const formatted = docs.map((d: any) => ({
            id: d.id,
            title: d.original_filename || d.title,
            date: 'Uploaded',
            pages: `${d.page_count || 1} pages`,
            risk: d.review_status === 'Approved' ? 'Low Risk' : 'Medium Risk',
            badgeColor: d.review_status === 'Approved' ? '#D1FAE5' : '#FEF3C7',
            textColor: d.review_status === 'Approved' ? '#065F46' : '#92400E'
          }));
          setRecentContracts(formatted);
        } else {
          setRecentContracts([]);
        }
      })
      .catch(() => setRecentContracts([]));
  }, []);

  const featureCards = [
    { title: 'Summarize', desc: 'TL;DR executive summary', color: '#EFF6FF', textColor: '#0066FF', route: 'Insights', tab: 'summary' },
    { title: 'Identify Risks', desc: 'Red flags & liabilities', color: '#FEF2F2', textColor: '#DC2626', route: 'Insights', tab: 'risks' },
    { title: 'Key Clauses', desc: 'Indemnity, terms & gov', color: '#EEF2FF', textColor: '#4F46E5', route: 'Insights', tab: 'clauses' },
    { title: 'Compliance', desc: 'Audit against standards', color: '#ECFDF5', textColor: '#059669', route: 'Insights', tab: 'obligations' }
  ];

  const handleUploadContract = () => {
    Alert.alert(
      "Upload Contract",
      "Select a document from your files or capture via camera to analyze with ClauseGuard AI.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Camera Scan", onPress: () => navigation.navigate('My Contracts') },
        { text: "Browse PDF", onPress: () => navigation.navigate('My Contracts') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>🛡️</Text>
          </View>
          <Text style={styles.brandTitle}>ClauseGuard <Text style={styles.brandAi}>AI</Text></Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.bellBtn}>
            <Text style={{ fontSize: 16 }}>🔔</Text>
            <View style={styles.redDot} />
          </TouchableOpacity>
          <View style={styles.avatarPill}>
            <Text style={styles.avatarText}>CG</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 1. Hero Card */}
        <View style={styles.heroBanner}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flex: 1, paddingRight: 10 }}>
              <View style={styles.heroPill}>
                <Text style={styles.heroPillText}>✨ Gemini Contract Intelligence</Text>
              </View>
              <Text style={styles.heroTitle}>Turn Contracts into Clarity</Text>
              <Text style={styles.heroSubtitle}>
                Scan via camera or upload PDF to uncover risks in seconds.
              </Text>
              <TouchableOpacity style={styles.heroButton} onPress={handleUploadContract}>
                <Text style={styles.heroButtonText}>Upload / Scan Contract →</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: 70, height: 70, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontSize: 38 }}>🛡️</Text>
            </View>
          </View>
        </View>

        {/* 2. 4 Feature Grid Cards */}
        <View style={styles.featureGrid}>
          {featureCards.map((card, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.featureCard, { backgroundColor: '#FFFFFF' }]}
              onPress={() => navigation.navigate(card.route, { tab: card.tab })}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 10 }}>
                <View style={[styles.featureIconBadge, { backgroundColor: card.color, marginBottom: 0 }]}>
                  <Text style={{ color: card.textColor, fontWeight: '800' }}>⚡</Text>
                </View>
                <Text style={{ fontSize: 13, color: '#CBD5E1', fontWeight: '800' }}>→</Text>
              </View>
              <Text style={styles.featureTitle}>{card.title}</Text>
              <Text style={styles.featureDesc}>{card.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Contracts Section */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Contracts</Text>
          <TouchableOpacity onPress={() => navigation.navigate('My Contracts')}>
            <Text style={styles.viewAllText}>View All →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contractsList}>
          {recentContracts.length > 0 ? (
            recentContracts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.contractCard}
                onPress={() => navigation.navigate('My Contracts')}
              >
                <View style={[styles.contractLeft, { flex: 1, marginRight: 8 }]}>
                  <View style={styles.fileIconBox}>
                    <Text style={{ fontSize: 18 }}>📄</Text>
                  </View>
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={styles.contractTitle} numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                    <Text style={styles.contractSub}>{item.date} • {item.pages}</Text>
                  </View>
                </View>
                <View style={[styles.riskBadge, { backgroundColor: item.badgeColor, shrink: 0 }]}>
                  <Text style={[styles.riskBadgeText, { color: item.textColor }]}>{item.risk}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ padding: 24, backgroundColor: '#FFFFFF', borderRadius: 16, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0', borderStyle: 'dashed' }}>
              <Text style={{ fontSize: 32, marginBottom: 8 }}>📄</Text>
              <Text style={{ fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 4 }}>No contracts uploaded yet</Text>
              <Text style={{ fontSize: 12, color: '#64748B', textAlign: 'center', marginBottom: 14 }}>Upload a PDF or scan a contract with your camera to begin.</Text>
              <TouchableOpacity
                onPress={handleUploadContract}
                style={{ backgroundColor: '#0066FF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12 }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>Upload / Scan Contract</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC'
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9'
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoIcon: {
    fontSize: 18
  },
  brandTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A'
  },
  brandAi: {
    color: '#0066FF'
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  bellBtn: {
    padding: 6,
    position: 'relative'
  },
  redDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 4,
    right: 4
  },
  avatarPill: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800'
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40
  },
  heroBanner: {
    backgroundColor: '#0066FF',
    borderRadius: 24,
    padding: 22,
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    elevation: 8,
    marginBottom: 20
  },
  heroPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10
  },
  heroPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700'
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 6
  },
  heroSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 18,
    marginBottom: 16
  },
  heroButton: {
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20
  },
  heroButtonText: {
    color: '#0066FF',
    fontSize: 12,
    fontWeight: '800'
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24
  },
  featureCard: {
    width: '48%',
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2
  },
  featureIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12
  },
  featureTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4
  },
  featureDesc: {
    fontSize: 10,
    color: '#64748B',
    lineHeight: 14
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A'
  },
  viewAllText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0066FF'
  },
  contractsList: {
    gap: 10
  },
  contractCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2
  },
  contractLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fileIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contractTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A'
  },
  contractSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12
  },
  riskBadgeText: {
    fontSize: 10,
    fontWeight: '800'
  }
});
