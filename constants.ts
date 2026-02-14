
import { AdminSettings } from './types';

export const DEFAULT_ADMIN_SETTINGS: AdminSettings = {
  coinRate: 0.01, // 100 coins = 1 Taka
  minRecharge: 20,
  minBkashNagad: 50,
  dailyCheckInReward: 10,
  watchAdReward: 5,
  clickEarnReward: 15,
  inviteReward: 100,
  websiteVisitReward: 20,
  websiteVisitTime: 15,
  adDuration: 5,
  referralReward: 50,
  supportTelegram: 'https://t.me/earnify_support',
  supportFB: 'https://facebook.com/groups/earnify',
  channelTelegram: 'https://t.me/earnify_official',
  adminContact: {
    facebook: 'https://facebook.com/admin_earnify',
    telegram: 'https://t.me/admin_earnify'
  }
};

export const MOCK_VIDEOS = [
  'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-dancing-2922-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-ocean-near-the-shore-3136-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-young-man-skateboarding-in-the-city-at-night-1164-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-leaves-in-autumn-172-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-curvy-road-in-the-middle-of-a-forest-441-large.mp4',
  'https://assets.mixkit.co/videos/preview/mixkit-clipping-a-plant-on-a-sunny-afternoon-42571-large.mp4'
];

export const COIN_REWARDS_SPIN = [5, 10, 15, 20, 50, 0, 10, 5];
