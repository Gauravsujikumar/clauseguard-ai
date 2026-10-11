import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Switch,
  Alert
} from 'react-native';

export const MobileSettingsScreen = ({ navigation }: { navigation: any }) => {
  const [notifications, setNotifications] = useState(true);
  const [autoAnalyze, setAutoAnalyze] = useState(true);

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
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
            <Text style={styles.avatarText}>GS</Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Page Title */}
        <View style={styles.titleRow}>
          <Text style={styles.pageTitle}>Settings</Text>
          <Text style={styles.pageSubtitle}>Personal account & security controls</Text>
        </View>

        {/* User Card */}
        <TouchableOpacity
          style={styles.profileCard}
          onPress={() => showAlert("Profile", "Gaurav Sujikumar\ngaurav.sujikumar@example.com")}
        >
          <View style={styles.profileLeft}>
            <View style={styles.bigAvatar}>
              <Text style={styles.bigAvatarText}>GS</Text>
            </View>
            <View style={{ marginLeft: 14 }}>
              <Text style={styles.profileName}>Gaurav Sujikumar</Text>
              <Text style={styles.profileEmail}>gaurav.sujikumar@example.com</Text>
              <View style={styles.memberBadge}>
                <Text style={styles.memberBadgeText}>Pro Member</Text>
              </View>
            </View>
          </View>
          <Text style={{ color: '#94A3B8', fontSize: 16 }}>›</Text>
        </TouchableOpacity>

        {/* Section: Account */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionHeader}>ACCOUNT</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Edit Profile", "Open edit profile screen")}>
              <Text style={styles.menuLabel}>👤  Edit Profile</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Password", "Open password change modal")}>
              <Text style={styles.menuLabel}>🔑  Change Password</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Subscription", "Pro Plan Active - Renews Nov 2026")}>
              <View>
                <Text style={styles.menuLabel}>💳  Manage Subscription</Text>
                <Text style={styles.menuSub}>Renews Nov 15, 2026</Text>
              </View>
              <View style={styles.planPill}>
                <Text style={styles.planPillText}>Pro Plan</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section: Preferences */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionHeader}>PREFERENCES</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuLabel}>🌓  Theme</Text>
              <Text style={styles.valueText}>System ▾</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem}>
              <Text style={styles.menuLabel}>🌐  Language</Text>
              <Text style={styles.valueText}>English ▾</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <View style={styles.menuItem}>
              <Text style={styles.menuLabel}>🔔  Notifications</Text>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E2E8F0', true: '#0066FF' }}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.menuItem}>
              <View>
                <Text style={styles.menuLabel}>✨  Auto-analyze uploaded documents</Text>
                <Text style={styles.menuSub}>Trigger AI processing immediately</Text>
              </View>
              <Switch
                value={autoAnalyze}
                onValueChange={setAutoAnalyze}
                trackColor={{ false: '#E2E8F0', true: '#0066FF' }}
              />
            </View>
          </View>
        </View>

        {/* Section: Data & Privacy */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionHeader}>DATA & PRIVACY</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Policy", "ClauseGuard Enterprise Data Security Policy")}>
              <Text style={styles.menuLabel}>🔒  Data & Privacy</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Storage", "14.8 MB of 10 GB used")}>
              <View>
                <Text style={styles.menuLabel}>💾  Manage Stored Files</Text>
                <Text style={styles.menuSub}>14.8 MB of 10 GB used</Text>
              </View>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Export", "Download request queued")}>
              <Text style={styles.menuLabel}>📥  Export My Data</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Notice", "Please contact support to delete your account")}>
              <Text style={[styles.menuLabel, { color: '#EF4444' }]}>🗑️  Delete Account</Text>
              <Text style={[styles.menuArrow, { color: '#EF4444' }]}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section: Support */}
        <View style={styles.sectionBox}>
          <Text style={styles.sectionHeader}>SUPPORT</Text>
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Help", "Opening Help Center")}>
              <Text style={styles.menuLabel}>❓  Help Center</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Contact", "support@clauseguard.ai")}>
              <Text style={styles.menuLabel}>✉️  Contact Us</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity style={styles.menuItem} onPress={() => showAlert("Thank You!", "Thank you for rating ClauseGuard AI!")}>
              <Text style={styles.menuLabel}>⭐  Rate the App</Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section: Session / Log Out */}
        <View style={styles.sectionBox}>
          <View style={[styles.menuContainer, { borderWidth: 1, borderColor: '#FEE2E2' }]}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => {
                Alert.alert(
                  "Log Out",
                  "Are you sure you want to log out of ClauseGuard AI?",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Log Out",
                      style: "destructive",
                      onPress: () => navigation.navigate("Login")
                    }
                  ]
                );
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 16 }}>🚪</Text>
                <View style={{ marginLeft: 10 }}>
                  <Text style={[styles.menuLabel, { color: '#EF4444' }]}>Log Out</Text>
                  <Text style={[styles.menuSub, { marginLeft: 0 }]}>Sign out of active session</Text>
                </View>
              </View>
              <Text style={[styles.menuArrow, { color: '#EF4444' }]}>›</Text>
            </TouchableOpacity>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  bigAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#0066FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bigAvatarText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800'
  },
  profileName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F172A'
  },
  profileEmail: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 2
  },
  memberBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 4
  },
  memberBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#0066FF'
  },
  sectionBox: {
    marginBottom: 18
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
    marginBottom: 8,
    paddingHorizontal: 4
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 8,
    elevation: 1
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  menuLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A'
  },
  menuSub: {
    fontSize: 10,
    color: '#94A3B8',
    marginTop: 2,
    marginLeft: 26
  },
  menuArrow: {
    fontSize: 18,
    color: '#CBD5E1'
  },
  valueText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B'
  },
  planPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12
  },
  planPillText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#059669'
  },
  divider: {
    height: 1,
    backgroundColor: '#F8FAFC'
  }
});
