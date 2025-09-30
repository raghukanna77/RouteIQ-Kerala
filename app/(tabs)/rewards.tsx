import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Award, Star, Target, Gift, Zap, Leaf } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  progress: number;
  maxProgress: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  target: number;
  endDate: Date;
}

export default function RewardsScreen() {
  const { t } = useTranslation();
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(3);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);

  useEffect(() => {
    loadRewardsData();
  }, []);

  const loadRewardsData = () => {
    // Load badges and challenges
    const mockBadges: Badge[] = [
      {
        id: '1',
        name: 'Eco Warrior',
        description: 'Saved 10kg of CO2',
        icon: 'leaf',
        earned: true,
        progress: 12,
        maxProgress: 10,
      },
      {
        id: '2',
        name: 'Public Transport Champion',
        description: 'Use public transport 50 times',
        icon: 'bus',
        earned: false,
        progress: 32,
        maxProgress: 50,
      },
      {
        id: '3',
        name: 'Kerala Explorer',
        description: 'Visit 20 different locations in Kerala',
        icon: 'map',
        earned: false,
        progress: 15,
        maxProgress: 20,
      },
    ];

    const mockChallenges: Challenge[] = [
      {
        id: '1',
        title: 'Weekly Eco Challenge',
        description: 'Take 5 eco-friendly trips this week',
        reward: 100,
        progress: 3,
        target: 5,
        endDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      },
      {
        id: '2',
        title: 'Data Quality Hero',
        description: 'Complete trip details for 10 consecutive trips',
        reward: 200,
        progress: 7,
        target: 10,
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    ];

    setBadges(mockBadges);
    setChallenges(mockChallenges);
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'leaf':
        return <Leaf size={24} color="#059669" />;
      case 'bus':
        return <Zap size={24} color="#1E40AF" />;
      case 'map':
        return <Target size={24} color="#EA580C" />;
      default:
        return <Award size={24} color="#6B7280" />;
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header with Points and Level */}
      <View style={styles.header}>
        <View style={styles.userStats}>
          <View style={styles.statContainer}>
            <Star size={32} color="#F59E0B" />
            <Text style={styles.statValue}>{userPoints}</Text>
            <Text style={styles.statLabel}>{t('points')}</Text>
          </View>
          <View style={styles.statContainer}>
            <Award size={32} color="#059669" />
            <Text style={styles.statValue}>{t('level')} {userLevel}</Text>
            <Text style={styles.statLabel}>{t('ecoTraveler')}</Text>
          </View>
        </View>
      </View>

      {/* Current Challenges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('activeChallenges')}</Text>
        {challenges.map((challenge) => (
          <View key={challenge.id} style={styles.challengeCard}>
            <View style={styles.challengeHeader}>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeTitle}>{challenge.title}</Text>
                <Text style={styles.challengeDescription}>{challenge.description}</Text>
              </View>
              <View style={styles.rewardBadge}>
                <Text style={styles.rewardPoints}>+{challenge.reward}</Text>
              </View>
            </View>
            
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill,
                    { width: `${(challenge.progress / challenge.target) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {challenge.progress}/{challenge.target}
              </Text>
            </View>
            
            <Text style={styles.challengeEndDate}>
              {t('endsIn')} {Math.ceil((challenge.endDate.getTime() - Date.now()) / (24 * 60 * 60 * 1000))} {t('days')}
            </Text>
          </View>
        ))}
      </View>

      {/* Badges Collection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('badges')}</Text>
        <View style={styles.badgesGrid}>
          {badges.map((badge) => (
            <View key={badge.id} style={[styles.badgeCard, badge.earned && styles.badgeEarned]}>
              <View style={styles.badgeIcon}>
                {getBadgeIcon(badge.icon)}
              </View>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
              
              {!badge.earned && (
                <View style={styles.badgeProgress}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill,
                        { width: `${(badge.progress / badge.maxProgress) * 100}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.badgeProgressText}>
                    {badge.progress}/{badge.maxProgress}
                  </Text>
                </View>
              )}
              
              {badge.earned && (
                <View style={styles.earnedBadge}>
                  <Text style={styles.earnedText}>{t('earned')}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </View>

      {/* Leaderboard Teaser */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.leaderboardCard}>
          <Target size={24} color="#1E40AF" />
          <View style={styles.leaderboardInfo}>
            <Text style={styles.leaderboardTitle}>{t('weeklyLeaderboard')}</Text>
            <Text style={styles.leaderboardSubtitle}>
              {t('yourRank')}: #47 {t('inKerala')}
            </Text>
          </View>
          <Text style={styles.leaderboardCTA}>{t('viewAll')}</Text>
        </TouchableOpacity>
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
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  userStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statContainer: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#93C5FD',
    marginTop: 4,
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
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  challengeInfo: {
    flex: 1,
    marginRight: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  rewardBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rewardPoints: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6B7280',
  },
  challengeEndDate: {
    fontSize: 12,
    color: '#EA580C',
    fontWeight: '500',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  badgeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeEarned: {
    borderWidth: 2,
    borderColor: '#059669',
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  badgeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  badgeProgress: {
    width: '100%',
  },
  badgeProgressText: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
  earnedBadge: {
    backgroundColor: '#059669',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  earnedText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  leaderboardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  leaderboardInfo: {
    flex: 1,
    marginLeft: 16,
  },
  leaderboardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  leaderboardSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  leaderboardCTA: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E40AF',
  },
});