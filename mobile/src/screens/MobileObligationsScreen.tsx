import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

export const MobileObligationsScreen = () => {
  const [obligations] = useState([
    {
      id: 'o1',
      description: 'Provide written notice of non-renewal to prevent automatic 12-month extension.',
      responsible_party: 'Enterprise Client Corp',
      calculated_deadline: '2027-07-26',
      status: 'Pending'
    },
    {
      id: 'o2',
      description: 'Submit annual SOC 2 Type II compliance audit report.',
      responsible_party: 'Acme Global Solutions Inc.',
      calculated_deadline: '2027-03-24',
      status: 'In Progress'
    },
    {
      id: 'o3',
      description: 'Pay annual SaaS platform licensing invoice of $125,000 USD.',
      responsible_party: 'Enterprise Client Corp',
      calculated_deadline: '2026-10-24',
      status: 'Completed'
    }
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mobile Obligations & Deadlines</Text>
        <Text style={styles.sub}>Track contract milestones and renewal target dates</Text>
      </View>

      <FlatList
        data={obligations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.party}>{item.responsible_party}</Text>
              <Text style={[styles.status, item.status === 'Completed' ? styles.statusCompleted : styles.statusPending]}>
                {item.status}
              </Text>
            </View>

            <Text style={styles.desc}>{item.description}</Text>

            <View style={styles.deadlineRow}>
              <Text style={styles.deadlineLabel}>Calculated Deadline:</Text>
              <Text style={styles.deadlineValue}>{item.calculated_deadline}</Text>
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
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E4E7EC',
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  party: {
    fontSize: 13,
    fontWeight: '800',
    color: '#101828',
  },
  status: {
    fontSize: 9,
    fontWeight: '800',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusCompleted: {
    color: '#065F46',
    backgroundColor: '#D1FAE5',
  },
  statusPending: {
    color: '#92400E',
    backgroundColor: '#FEF3C7',
  },
  desc: {
    fontSize: 12,
    color: '#344054',
    lineHeight: 18,
    marginBottom: 10,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  deadlineLabel: {
    fontSize: 11,
    color: '#667085',
    marginRight: 6,
  },
  deadlineValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#071B45',
  },
});
