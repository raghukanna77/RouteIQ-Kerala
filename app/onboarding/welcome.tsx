import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MapPin, Shield, Award, Users } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <MapPin size={48} color="#1E40AF" />
          </View>
          <Text style={styles.title}>NATPAC Travel Data Collection</Text>
          <Text style={styles.subtitle}>
            Kerala's Transportation Planning Initiative
          </Text>
        </View>

        {/* Features */}
        <View style={styles.features}>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <MapPin size={24} color="#059669" />
            </View>
            <Text style={styles.featureTitle}>Automatic Trip Detection</Text>
            <Text style={styles.featureDescription}>
              AI-powered detection of your travel modes and routes
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Shield size={24} color="#1E40AF" />
            </View>
            <Text style={styles.featureTitle}>Privacy First</Text>
            <Text style={styles.featureDescription}>
              Your data is anonymized and used only for transportation planning
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Award size={24} color="#EA580C" />
            </View>
            <Text style={styles.featureTitle}>Earn Rewards</Text>
            <Text style={styles.featureDescription}>
              Get points and badges for contributing to Kerala's smart transportation
            </Text>
          </View>

          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Users size={24} color="#7C3AED" />
            </View>
            <Text style={styles.featureTitle}>Community Impact</Text>
            <Text style={styles.featureDescription}>
              Help improve public transportation for all Kerala residents
            </Text>
          </View>
        </View>

        {/* Kerala Specific Message */}
        <View style={styles.keralaMessage}>
          <Text style={styles.keralaTitle}>Built for Kerala</Text>
          <Text style={styles.keralaDescription}>
            Specially designed to understand Kerala's unique transportation landscape including 
            KSRTC buses, auto-rickshaws, ferries, and local travel patterns.
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => router.push('/onboarding/permissions')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            By National Transportation Planning and Research Centre (NATPAC)
          </Text>
          <Text style={styles.footerText}>
            Government of Kerala
          </Text>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  features: {
    marginBottom: 40,
  },
  feature: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
    flex: 1,
  },
  featureDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    flex: 1,
  },
  keralaMessage: {
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    padding: 20,
    marginBottom: 40,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  keralaTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#92400E',
    marginBottom: 8,
  },
  keralaDescription: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
  getStartedButton: {
    backgroundColor: '#1E40AF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  getStartedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },
});