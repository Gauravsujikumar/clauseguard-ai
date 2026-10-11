import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { mobileApi } from '../api/mobileApi';

export const MobileRiskScreen = () => {
  const [risks, setRisks] = useState<any[]>([
    {
      id: 'r1',
      title: 'Unlimited Liability Exposure for Indemnification',
      category: 'Liability',
      severity: 'High',
      explanation: 'The indemnification clause explicitly carves out IP infringement from the standard aggregate limitation of liability cap ($125,000).',
      supporting_passage: 'Neither party\'s liability under Section 14 (Indemnification) shall be subject to the limitation of liability.',
      section_ref: 'Section 12.2',
      review_status: 'Unreviewed'
    },
    {
      id: 'r2',
      title: 'Short Notice Window for Auto-Renewal Cancellation',
      category: 'Renewal',
      severity: 'Medium',
      explanation: 'The contract automatically locks into a mandatory 12-month renewal term unless non-renewal notice is served 60 days prior to expiration.',
      supporting_passage: 'Agreement automatically renews for 12 months unless notice is provided 60 days prior.',
      section_ref: 'Section 4.1',
      review_status: 'Unreviewed'
    }
  ]);

  const handleAction = (riskId: string, status: string) => {
    setRisks(prev => prev.map(r => r.id === riskId ? { ...r, review_status: status } : r));
    Alert.alert("Risk Status Updated", `Risk marked as ${status}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mobile Risk Intelligence Center</Text>
        <Text style={styles.sub}>Automated contract risk detection & mitigation actions</Text>
      </View>

      <FlatList
        data={risks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={[styles.severityBadge, item.severity === 'High' ? styles.highBadge : styles.mediumBadge]}>
                {item.severity} Severity
              </Text>
              <Text style={styles.sectionRef}>{item.section_ref}</Text>
            </View>

            <Text style={styles.riskTitle}>{item.title}</Text>
            <Text style={styles.explanation}>{item.explanation}</Text>

            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>"{item.supporting_passage}"</Text>
            </View>

            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.actionBtn, item.review_status === 'Approved' && styles.approvedBtn]}
                onPress={() => handleAction(item.id, 'Approved')}
              >
                <Text style={styles.actionText}>Accept Risk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionBtn, item.review_status === 'Mitigated' && styles.mitigatedBtn]}
                onPress={() => handleAction(item.id, 'Mitigated')}
              >
                <Text style={styles.actionText}>Mitigate</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E4E7EC',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#071B45',
  },
  sub: {
    fontSize: 11,
    color: '#667085',
    marginTop: 2,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  severityBadge: {
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  highBadge: {
    color: '#991B1B',
    backgroundColor: '#FEE2E2',
  },
  mediumBadge: {
    color: '#92400E',
    backgroundColor: '#FEF3C7',
  },
  sectionRef: {
    fontSize: 11,
    fontWeight: '600',
    color: '#667085',
  },
  riskTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#101828',
    marginBottom: 6,
  },
  explanation: {
    fontSize: 12,
    color: '#475467',
    lineHeight: 18,
    marginBottom: 10,
  },
  quoteBox: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E4E7EC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 11,
    fontStyle: 'italic',
    color: '#344054',
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  approvedBtn: {
    backgroundColor: '#059669',
  },
  mitigatedBtn: {
    backgroundColor: '#155EEF',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#101828',
  },
});
