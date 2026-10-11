import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

export const MobileAnalysisScreen = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'risks' | 'clauses'>('summary');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Acme Master SaaS Agreement</Text>
        <Text style={styles.sub}>Commercial Agreement • 14 Pages • AI Analyzed</Text>
      </View>

      {/* Touch Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'summary' && styles.activeTab]}
          onPress={() => setActiveTab('summary')}
        >
          <Text style={[styles.tabText, activeTab === 'summary' && styles.activeTabText]}>Summary</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'risks' && styles.activeTab]}
          onPress={() => setActiveTab('risks')}
        >
          <Text style={[styles.tabText, activeTab === 'risks' && styles.activeTabText]}>Risks (2)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'clauses' && styles.activeTab]}
          onPress={() => setActiveTab('clauses')}
        >
          <Text style={[styles.tabText, activeTab === 'clauses' && styles.activeTabText]}>Clauses (4)</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'summary' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Executive AI Summary</Text>
            <Text style={styles.cardBody}>
              Commercial agreement between Acme Global Solutions and Enterprise Client Corp valued at $125,000 USD. Includes annual auto-renewal with 60-day notice and uncapped indemnification liability.
            </Text>
          </View>
        )}

        {activeTab === 'risks' && (
          <View style={styles.card}>
            <Text style={styles.riskBadge}>HIGH SEVERITY</Text>
            <Text style={styles.cardTitle}>Unlimited Liability for Indemnification</Text>
            <Text style={styles.cardBody}>
              Section 12.2 explicitly excludes indemnification claims from the 12-month fee cap ($125,000).
            </Text>
            <Text style={styles.quote}>"Neither party's liability under Section 14 (Indemnification) shall be subject to the cap."</Text>
          </View>
        )}

        {activeTab === 'clauses' && (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Payment Terms (Section 3.1)</Text>
            <Text style={styles.cardBody}>Invoices due Net 30. Late payments accrue 1.5% monthly interest.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 18,
    backgroundColor: '#071B45',
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  sub: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E7EC',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#155EEF',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#667085',
  },
  activeTabText: {
    color: '#155EEF',
    fontWeight: '800',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#101828',
    marginBottom: 6,
  },
  cardBody: {
    fontSize: 12,
    color: '#344054',
    lineHeight: 18,
  },
  riskBadge: {
    fontSize: 9,
    fontWeight: '800',
    color: '#991B1B',
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  quote: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#475467',
    marginTop: 8,
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 8,
  },
});
