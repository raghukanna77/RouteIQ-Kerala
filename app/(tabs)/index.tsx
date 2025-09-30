import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { MapPin, Navigation, Phone, Shield, Zap } from 'lucide-react-native';
import { locationService } from '@/services/LocationService';
import { TripTracker } from '@/components/TripTracker';
import { EmergencyButton } from '@/components/EmergencyButton';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useTranslation } from 'react-i18next';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [isTracking, setIsTracking] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [batteryOptimized, setBatteryOptimized] = useState(true);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    try {
      const location = await locationService.getCurrentLocation();
      setCurrentLocation(location);
    } catch (error) {
      console.error('Location initialization error:', error);
    }
  };

  const startTripTracking = () => {
    setIsTracking(true);
    // Initialize trip tracking with sensor fusion
  };

  const stopTripTracking = () => {
    setIsTracking(false);
    // Stop tracking and save trip data
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.welcomeText}>{t('welcome')}</Text>
            <Text style={styles.subtitleText}>NATPAC Travel Data Collection</Text>
          </View>
          <LanguageSelector />
        </View>
        
        {/* Status Cards */}
        <View style={styles.statusCards}>
          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <MapPin size={20} color="#059669" />
            </View>
            <Text style={styles.statusLabel}>{t('location')}</Text>
            <Text style={styles.statusValue}>
              {currentLocation ? t('connected') : t('connecting')}
            </Text>
          </View>
          
          <View style={styles.statusCard}>
            <View style={styles.statusIcon}>
              <Zap size={20} color="#EA580C" />
            </View>
            <Text style={styles.statusLabel}>{t('battery')}</Text>
            <Text style={styles.statusValue}>
              {batteryOptimized ? t('optimized') : t('normal')}
            </Text>
          </View>
        </View>
      </View>

      {/* Trip Tracking Section */}
      <View style={styles.section}>
        <TripTracker 
          isTracking={isTracking}
          onStart={startTripTracking}
          onStop={stopTripTracking}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Navigation size={24} color="#1E40AF" />
            <Text style={styles.actionText}>{t('findRoute')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={24} color="#1E40AF" />
            <Text style={styles.actionText}>{t('nearbyHospitals')}</Text>
          </TouchableOpacity>
          
          <EmergencyButton />
        </View>
      </View>

      {/* Kerala Transport Modes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('transportModes')}</Text>
        <View style={styles.transportModes}>
          {['bus', 'autoRickshaw', 'ferry', 'walk', 'car'].map((mode) => (
            <View key={mode} style={styles.modeCard}>
              <Text style={styles.modeText}>{t(mode)}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    backgroundColor: '#1E40AF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 14,
    color: '#93C5FD',
  },
  statusCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statusCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontSize: 12,
    color: '#BFDBFE',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
  },
  transportModes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  modeCard: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  modeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});