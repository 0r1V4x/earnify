
export interface User {
  uid: string;
  name: string;
  username: string;
  phoneNumber: string;
  coins: number;
  inviteCode: string;
  referredBy?: string;
  totalInvites: number;
  activeInvites: number;
  inviteEarnings: number;
  createdAt: string;
  lastDailyCheckIn?: string;
  dailySpinsUsed: number;
  extraSpinsAvailable: number;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number; // in Taka
  coins: number;
  method: 'Recharge' | 'Bkash' | 'Nagad';
  accountNumber: string;
  status: 'Pending' | 'Success' | 'Rejected';
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface AdminSettings {
  coinRate: number; // 1000 coins = X Taka
  minRecharge: number;
  minBkashNagad: number;
  dailyCheckInReward: number;
  watchAdReward: number;
  clickEarnReward: number;
  inviteReward: number;
  websiteVisitReward: number;
  websiteVisitTime: number; // seconds
  adDuration: number; // seconds
  referralReward: number;
  supportTelegram: string;
  supportFB: string;
  channelTelegram: string;
  adminContact: {
    facebook: string;
    telegram: string;
  };
}

export type View = 'home' | 'earn' | 'invite' | 'wallet' | 'profile';
