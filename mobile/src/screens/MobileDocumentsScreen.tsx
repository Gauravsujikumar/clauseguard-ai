import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert
} from 'react-native';

export const MobileDocumentsScreen = ({ navigation }: { navigation: any }) => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [starred, setStarred] = useState<string[]>(['1', '3']);

  const filterTabs = ['All', 'Recent', 'Low Risk', 'Medium Risk', 'High Risk', 'Starred'];

  const contracts = [
    {
      id: '1',
      title: 'Employment_Agreement.pdf',
      type: 'PDF',
      date: 'May 12, 2026',
      pages: '12 pages',
      risk: 'Low Risk',
      badgeColor: '#D1FAE5',
      textColor: '#065F46',
      iconColor: '#FEE2E2',
      tag: 'HR & Legal'
    },
    {
      id: '2',
      title: 'NDA_Company.pdf',
      type: 'PDF',
      date: 'May 10, 2026',
      pages: '4 pages',
      risk: 'Medium Risk',
      badgeColor: '#FEF3C7',
      textColor: '#92400E',
      iconColor: '#FEE2E2',
      tag: 'Corporate'
    },
    {
      id: '3',
      title: 'Lease_Agreement.pdf',
      type: 'PDF',
      date: 'May 08, 2026',
      pages: '18 pages',
      risk: 'High Risk',
      badgeColor: '#FEE2E2',
      textColor: '#991B1B',
      iconColor: '#FEE2E2',
      tag: 'Real Estate'
    },
    {
      id: '4',
      title: 'Vendor_Contract.xlsx',
      type: 'XLSX',
      date: 'May 05, 2026',
      pages: '3 sheets',
      risk: 'Low Risk',
      badgeColor: '#D1FAE5',
      textColor: '#065F46',
      iconColor: '#D1FAE5',
      tag: 'Procurement'
    },
    {
      id: '5',
      title: 'Service_Agreement.docx',
      type: 'DOCX',
      date: 'Apr 28, 2026',
      pages: '9 pages',
      risk: 'Medium Risk',
      badgeColor: '#FEF3C7',
      textColor: '#92400E',
      iconColor: '#DBEAFE',
      tag: 'Operations'
    }
  ];

  const toggleStar = (id: string) => {
    setStarred(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredContracts = contracts.filter((c) => {
    if (!c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilter === 'Starred') return starred.includes(c.id);
    if (activeFilter === 'Low Risk') return c.risk === 'Low Risk';
    if (activeFilter === 'Medium Risk') return c.risk === 'Medium Risk';
    if (activeFilter === 'High Risk') return c.risk === 'High Risk';
    return true;
  });

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
        {/* Title + Upload Contract Button */}
        <View style={styles.titleRow}>
          <View>
            <Text style={styles.pageTitle}>My Contracts</Text>
            <Text style={styles.pageSubtitle}>All your analyzed documents</Text>
          </View>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => Alert.alert("Upload Document", "Choose a contract to analyze")}
          >
            <Text style={styles.uploadBtnText}>+ Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar + Filter Icon */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Text style={{ fontSize: 14, marginRight: 8 }}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search contracts..."
              placeholderTextColor="#94A3B8"
              value={search}
              onChangeText={setSearch}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Text style={{ fontSize: 16 }}>⚡</Text>
          </TouchableOpacity>
        </View>

        {/* Filter Chips Horizontal */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipScroll}>
          {filterTabs.map((tab) => {
            const active = activeFilter === tab;
            return (
              <TouchableOpacity
                key={tab}
                style={[styles.chip, active && styles.chipActive]}
                onPress={() => setActiveFilter(tab)}
              >
                <Text style={[styles.chipText, active && styles.chipTextActive]}>{tab}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Contracts Cards List */}
        <View style={styles.contractsList}>
          {filteredContracts.map((item) => {
            const isStar = starred.includes(item.id);
            return (
              <TouchableOpacity key={item.id} style={styles.contractCard}>
                <View style={styles.cardLeft}>
                  <View style={[styles.fileIconBox, { backgroundColor: item.iconColor }]}>
                    <Text style={{ fontSize: 18 }}>📄</Text>
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.contractTitle}>{item.title}</Text>
                    <Text style={styles.contractSub}>{item.tag} • {item.date} • {item.pages}</Text>
                  </View>
                </View>
                <View style={styles.cardRight}>
                  <View style={[styles.riskBadge, { backgroundColor: item.badgeColor }]}>
                    <Text style={[styles.riskBadgeText, { color: item.textColor }]}>{item.risk}</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleStar(item.id)} style={{ padding: 4 }}>
                    <Text style={{ fontSize: 16 }}>{isStar ? '⭐' : '☆'}</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          })}
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
  uploadBtn: {
    backgroundColor: '#0066FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20
  },
  uploadBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800'
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1
  },
  searchInput: {
    flex: 1,
    fontSize: 12,
    color: '#0F172A',
    padding: 0
  },
  filterBtn: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1
  },
  chipScroll: {
    marginBottom: 16
  },
  chip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1
  },
  chipActive: {
    backgroundColor: '#0066FF'
  },
  chipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B'
  },
  chipTextActive: {
    color: '#FFFFFF'
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
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  fileIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
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
  cardRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  riskBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12
  },
  riskBadgeText: {
    fontSize: 10,
    fontWeight: '800'
  }
});
