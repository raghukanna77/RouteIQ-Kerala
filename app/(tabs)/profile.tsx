import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { User, Settings, Shield, Bell, Globe, Circle as HelpCircle, LogOut } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const [dataSharing, setDataSharing] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [locationTracking, setLocationTracking] = useState(true);
  const [batteryOptimization, setBatteryOptimization] = useState(true);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <View style={styles.avatar}>
            <User size={32} color="#1E40AF" />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Kerala Traveler</Text>
            <Text style={styles.userEmail}>kerala.traveler@natpac.gov.in</Text>
            <Text style={styles.userStats}>
              {t('memberSince')}: January 2024 • Level 3 Eco Traveler
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>{t('editProfile')}</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy & Data Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('privacyData')}</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Shield size={20} color="#059669" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>{t('dataSharing')}</Text>
              <Text style={styles.settingDescription}>
                {t('shareAnonymousData')}
              </Text>
            </View>
          </View>
          <Switch
            value={dataSharing}
            onValueChange={setDataSharing}
            trackColor={{ false: '#D1D5DB', true: '#059669' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Bell size={20} color="#EA580C" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>{t('notifications')}</Text>
              <Text style={styles.settingDescription}>
                {t('receiveNotifications')}
              </Text>
            </View>
          </View>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#D1D5DB', true: '#EA580C' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Globe size={20} color="#1E40AF" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>{t('locationTracking')}</Text>
              <Text style={styles.settingDescription}>
                {t('allowLocationTracking')}
              </Text>
            </View>
          </View>
          <Switch
            value={locationTracking}
            onValueChange={setLocationTracking}
            trackColor={{ false: '#D1D5DB', true: '#1E40AF' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* App Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('appSettings')}</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Globe size={20} color="#6B7280" />
          <View style={styles.menuText}>
            <Text style={styles.menuLabel}>{t('language')}</Text>
            <Text style={styles.menuValue}>
              {i18n.language === 'ml' ? 'മലയാളം' : 'English'}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Settings size={20} color="#059669" />
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>{t('batteryOptimization')}</Text>
              <Text style={styles.settingDescription}>
                {t('optimizeBatteryUsage')}
              </Text>
            </View>
          </View>
          <Switch
            value={batteryOptimization}
            onValueChange={setBatteryOptimization}
            trackColor={{ false: '#D1D5DB', true: '#059669' }}
            thumbColor="#FFFFFF"
          />
        </View>
      </View>

      {/* Data Management */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('dataManagement')}</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuLabel}>{t('exportMyData')}</Text>
          <Text style={styles.menuDescription}>
            {t('downloadAllTravelData')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuLabel}>{t('deleteMyData')}</Text>
          <Text style={styles.menuDescription}>
            {t('permanentlyDeleteData')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('support')}</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <HelpCircle size={20} color="#6B7280" />
          <Text style={styles.menuLabel}>{t('helpCenter')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuLabel}>{t('contactSupport')}</Text>
          <Text style={styles.menuDescription}>
            support@natpac.gov.in
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuLabel}>{t('privacyPolicy')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuLabel}>{t('termsOfService')}</Text>
        </TouchableOpacity>
      </View>

      {/* App Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('appInfo')}</Text>
        <View style={styles.appInfo}>
          <Text style={styles.appInfoText}>
            NATPAC Travel Data Collection App
          </Text>
          <Text style={styles.appInfoText}>
            Version 1.0.0 • Build 2024.01.15
          </Text>
          <Text style={styles.appInfoText}>
            © 2024 Government of Kerala
          </Text>
        </View>
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutButton}>
        <LogOut size={20} color="#EF4444" />
        <Text style={styles.signOutText}>{t('signOut')}</Text>
      </TouchableOpacity>

      <View style={styles.footer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  userStats: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  editButton: {
    backgroundColor: '#1E40AF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginTop: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuText: {
    marginLeft: 16,
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  menuValue: {
    fontSize: 14,
    color: '#1E40AF',
  },
  menuDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  appInfoText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    margin: 20,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FCA5A5',
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EF4444',
    marginLeft: 8,
  },
  footer: {
    height: 20,
  },
});