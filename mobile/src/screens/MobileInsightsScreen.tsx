import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

export const MobileInsightsScreen = ({ navigation }: { navigation: any }) => {
  const [timeframe, setTimeframe] = useState('Last 6 Months');

  const riskDistribution = [
    { label: 'Low Risk', percent: '42%', count: '10 contracts', color: '#10B981' },
    { label: 'Medium Risk', percent: '33%', count: '8 contracts', color: '#F59E0B' },
    { label: 'High Risk', percent: '25%', count: '6 contracts', color: '#EF4444' }
  ];

  const commonRisks = [
    { title: 'Unlimited Liability', pct: '75%', color: '#EF4444' },
    { title: 'Strict IP Assignment', pct: '60%', color: '#F59E0B' },
    { title: 'Ambiguous Termination', pct: '45%', color: '#3B82F6' },
    { title: 'Short Cure Period', pct: '30%', color: '#6366F1' }
  ];

  const keyClauses = [
    { name: 'Indemnity Clauses', count: 32 },
    { name: 'Governing Law (Delaware)', count: 24 },
    { name: 'Non-Compete & Covenants', count: 14 },
    { name: 'Data Privacy / GDPR', count: 18 }
  ];

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
            <Text style={styles.avatarText}>GS</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Title + Timeframe Dropdown */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.pageTitle}>Insights</Text>
            <Text style={styles.pageSubtitle}>Risk distribution & benchmarks</Text>
          </View>
          <TouchableOpacity style={styles.timeframePill}>
            <Text style={styles.timeframeText}>📅 {timeframe} ▾</Text>
          </TouchableOpacity>
        </View>

        {/* 4 Metric Summary Cards */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Total</Text>
            <Text style={styles.kpiValue}>24</Text>
            <Text style={[styles.kpiTrend, { color: '#059669' }]}>+12%</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Low Risk</Text>
            <Text style={[styles.kpiValue, { color: '#10B981' }]}>10</Text>
            <Text style={styles.kpiTrend}>42%</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>Medium</Text>
            <Text style={[styles.kpiValue, { color: '#F59E0B' }]}>8</Text>
            <Text style={styles.kpiTrend}>33%</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>High</Text>
            <Text style={[styles.kpiValue, { color: '#EF4444' }]}>6</Text>
            <Text style={[styles.kpiTrend, { color: '#EF4444' }]}>Action</Text>
          </View>
        </View>

        {/* Risk Distribution Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardHeaderTitle}>Risk Distribution</Text>

          {/* Donut representation */}
          <View style={styles.donutVisualBox}>
            <View style={styles.donutRing}>
              <Text style={styles.donutCenterNumber}>24</Text>
              <Text style={styles.donutCenterSub}>Contracts</Text>
            </View>
          </View>

          <View style={styles.distributionList}>
            {riskDistribution.map((item, idx) => (
              <View key={idx} style={styles.distRow}>
                <View style={styles.distLeft}>
                  <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                  <Text style={styles.distLabel}>{item.label}</Text>
                </View>
                <View style={styles.distRight}>
                  <Text style={styles.distPercent}>{item.percent}</Text>
                  <Text style={styles.distCount}>({item.count})</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Common Risk Types Horizontal Bars */}
        <View style={styles.sectionCard}>
          <Text style={styles.cardHeaderTitle}>Common Risk Types</Text>
          <View style={{ marginTop: 12, gap: 12 }}>
            {commonRisks.map((item, idx) => (
              <View key={idx}>
                <View style={styles.barLabelRow}>
                  <Text style={styles.barTitle}>{item.title}</Text>
                  <Text style={styles.barPct}>{item.pct}</Text>
                </View>
                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: item.pct, backgroundColor: item.color }]} />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Key Clauses Found */}
        <View style={styles.sectionCard}>
          <View style={styles.barLabelRow}>
            <Text style={styles.cardHeaderTitle}>Key Clauses Found</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 12, gap: 8 }}>
            {keyClauses.map((clause, idx) => (
              <View key={idx} style={styles.clauseRow}>
                <Text style={styles.clauseName}>{clause.name}</Text>
                <View style={styles.clausePill}>
                  <Text style={styles.clauseCount}>{clause.count}</Text>
                </View>
              </View>
            ))}
          </View>
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
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A'
  },
  pageSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2
  },
  timeframePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1
  },
  timeframeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0066FF'
  },
  kpiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18
  },
  kpiCard: {
    width: '23%',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1
  },
  kpiLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B'
  },
  kpiValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    marginVertical: 4
  },
  kpiTrend: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8'
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2
  },
  cardHeaderTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  donutVisualBox: {
    alignItems: 'center',
    marginVertical: 14
  },
  donutRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 10,
    borderColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF'
  },
  donutCenterNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F172A'
  },
  donutCenterSub: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '700'
  },
  distributionList: {
    gap: 8
  },
  distRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  distLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  distLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155'
  },
  distRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  distPercent: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F172A'
  },
  distCount: {
    fontSize: 10,
    color: '#94A3B8'
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  barTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155'
  },
  barPct: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B'
  },
  barTrack: {
    height: 8,
    backgroundColor: '#F1F5F9',
    borderRadius: 4,
    marginTop: 4,
    overflow: 'hidden'
  },
  barFill: {
    height: 8,
    borderRadius: 4
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0066FF'
  },
  clauseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12
  },
  clauseName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155'
  },
  clausePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10
  },
  clauseCount: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F172A'
  }
});
