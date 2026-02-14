
import { User, Transaction, Notification } from '../types';

// Simple storage simulation
const STORAGE_KEYS = {
  USERS: 'earnify_users',
  CURRENT_USER: 'earnify_current_user',
  TRANSACTIONS: 'earnify_tx',
  NOTIFICATIONS: 'earnify_notif'
};

export const mockDb = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  saveUsers: (users: User[]) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users)),
  
  getTransactions: (): Transaction[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.TRANSACTIONS) || '[]'),
  saveTransactions: (txs: Transaction[]) => localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(txs)),

  getNotifications: (): Notification[] => JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]'),
  saveNotifications: (notif: Notification[]) => localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notif))
};

export const authService = {
  signUp: async (data: any): Promise<User> => {
    const users = mockDb.getUsers();
    if (users.find(u => u.phoneNumber === data.phoneNumber)) throw new Error('Phone number already exists');
    
    const newUser: User = {
      uid: Math.random().toString(36).substr(2, 9),
      name: data.name,
      username: data.username,
      phoneNumber: data.phoneNumber,
      coins: 0,
      inviteCode: (data.username + Math.floor(Math.random() * 1000)).toUpperCase(),
      totalInvites: 0,
      activeInvites: 0,
      inviteEarnings: 0,
      createdAt: new Date().toISOString(),
      dailySpinsUsed: 0,
      extraSpinsAvailable: 0
    };

    users.push(newUser);
    mockDb.saveUsers(users);
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));
    return newUser;
  },

  login: async (phoneNumber: string, password: string): Promise<User> => {
    // In a real app, password hashing and auth would happen
    const users = mockDb.getUsers();
    const user = users.find(u => u.phoneNumber === phoneNumber);
    if (!user) throw new Error('User not found');
    
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  },

  updateUser: (updatedUser: User) => {
    const users = mockDb.getUsers();
    const index = users.findIndex(u => u.uid === updatedUser.uid);
    if (index !== -1) {
      users[index] = updatedUser;
      mockDb.saveUsers(users);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updatedUser));
    }
  }
};
