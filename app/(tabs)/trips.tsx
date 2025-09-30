import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, Clock, DollarSign, Leaf } from 'lucide-react-native';
import { TripCard } from '@/components/TripCard';
import { TripAnalytics } from '@/components/TripAnalytics';
import { useTranslation } from 'react-i18next';

interface Trip {
  id: string;
  origin: string;
  destination: string;
  mode: string;
  purpose: string;
  duration: number;
  distance: number;
  cost: number;
  carbonSaved: number;
  timestamp: Date;
}

export default function TripsScreen() {
  const { t } = useTranslation();
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    // Load trips from local storage or API
    const mockTrips: Trip[] = [
      {
        id: '1',
        origin: 'Trivandrum Central',
        destination: 'Technopark',
        mode: 'bus',
        purpose: 'work',
        duration: 45,
        distance: 12.5,
        cost: 15,
        carbonSaved: 2.3,
        timestamp: new Date(),
      },
      {
        id: '2',
        origin: 'Kochi Marine Drive',
        destination: 'Fort Kochi',
        mode: 'ferry',
        purpose: 'tourism',
        duration: 20,
        distance: 3.2,
        cost: 5,
        carbonSaved: 0.8,
        timestamp: new Date(Date.now() - 86400000),
      },
    ];
    setTrips(mockTrips);
  };

  const totalStats = trips.reduce((acc, trip) => ({
    distance: acc.distance + trip.distance,
    cost: acc.cost + trip.cost,
    carbonSaved: acc.carbonSaved + trip.carbonSaved,
    time: acc.time + trip.duration,
  }), { distance: 0, cost: 0, carbonSaved: 0, time: 0 });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('myTrips')}</Text>
        <View style={styles.periodSelector}>
          {['week', 'month', 'year'].map((period) => (
            <TouchableOpacity
              key={period}
              style={[
                styles.periodButton,
                selectedPeriod === period && styles.periodButtonActive,
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text
                style={[
                  styles.periodText,
                  selectedPeriod === period && styles.periodTextActive,
                ]}
              >
                {t(period)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Analytics Summary */}
      <View style={styles.analyticsContainer}>
        <Text style={styles.analyticsTitle}>{t('travelSummary')}</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <MapPin size={20} color="#059669" />
            <Text style={styles.statValue}>{totalStats.distance.toFixed(1)} km</Text>
            <Text style={styles.statLabel}>{t('totalDistance')}</Text>
          </View>
          
          <View style={styles.statCard}>
            <Clock size={20} color="#EA580C" />
            <Text style={styles.statValue}>{Math.round(totalStats.time / 60)}h</Text>
            <Text style={styles.statLabel}>{t('totalTime')}</Text>
          </View>
          
          <View style={styles.statCard}>
            <DollarSign size={20} color="#1E40AF" />
            <Text style={styles.statValue}>₹{totalStats.cost}</Text>
            <Text style={styles.statLabel}>{t('totalCost')}</Text>
          </View>
          
          <View style={styles.statCard}>
            <Leaf size={20} color="#059669" />
            <Text style={styles.statValue}>{totalStats.carbonSaved.toFixed(1)} kg</Text>
            <Text style={styles.statLabel}>{t('carbonSaved')}</Text>
          </View>
        </View>
      </View>

      {/* Trip Analytics */}
      <TripAnalytics trips={trips} />

      {/* Trip List */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('recentTrips')}</Text>
        {trips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
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
    backgroundColor: '#FFFFFF',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  periodButtonActive: {
    backgroundColor: '#1E40AF',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  periodTextActive: {
    color: '#FFFFFF',
  },
  analyticsContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  analyticsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginVertical: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 12,
  },
});