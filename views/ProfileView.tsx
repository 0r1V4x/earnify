
import React, { useState } from 'react';
import { User, AdminSettings } from '../types';

interface ProfileViewProps {
  user: User;
  onLogout: () => void;
  onUpdateUser: (u: User) => void;
  settings: AdminSettings;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, onLogout, onUpdateUser, settings }) => {
  const [giftCode, setGiftCode] = useState('');

  const handleApplyGiftCode = () => {
    if (giftCode.toUpperCase() === 'WELCOME500') {
      onUpdateUser({ ...user, coins: user.coins + 500 });
      alert("Gift code applied! 500 coins added.");
    } else {
      alert("Invalid gift code.");
    }
    setGiftCode('');
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 text-center">
        <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto flex items-center justify-center border-4 border-white shadow-sm overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="avatar" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mt-4">{user.name}</h2>
        <p className="text-sm text-slate-500">ID: {user.uid}</p>
        <div className="flex justify-center mt-2 space-x-2">
           <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">{user.phoneNumber}</span>
           <span className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Since {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-slate-800 mb-4">Gift Code</h3>
        <div className="flex space-x-2">
          <input 
            type="text" 
            placeholder="Enter code"
            value={giftCode}
            onChange={(e) => setGiftCode(e.target.value)}
            className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button 
            onClick={handleApplyGiftCode}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold text-sm"
          >
            Redeem
          </button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800 text-sm">Notifications</h3>
          <span className="bg-indigo-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold">1</span>
        </div>
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex-shrink-0 flex items-center justify-center text-indigo-600">
              🔔
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">Welcome to Earnify!</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Start earning coins by watching videos and inviting your friends today.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <a href={settings.supportTelegram} target="_blank" className="bg-sky-50 p-4 rounded-2xl flex flex-col items-center justify-center text-sky-700 border border-sky-100">
          <span className="text-2xl mb-1">✈️</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Telegram Group</span>
        </a>
        <a href={settings.supportFB} target="_blank" className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center justify-center text-blue-700 border border-blue-100">
          <span className="text-2xl mb-1">👥</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">FB Group</span>
        </a>
        <a href={settings.channelTelegram} target="_blank" className="bg-slate-50 p-4 rounded-2xl flex flex-col items-center justify-center text-slate-700 border border-slate-100">
          <span className="text-2xl mb-1">📢</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Channel</span>
        </a>
        <a href={settings.adminContact.telegram} target="_blank" className="bg-emerald-50 p-4 rounded-2xl flex flex-col items-center justify-center text-emerald-700 border border-emerald-100">
          <span className="text-2xl mb-1">👔</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Contact Admin</span>
        </a>
      </div>

      <button 
        onClick={onLogout}
        className="w-full bg-rose-50 text-rose-600 py-4 rounded-2xl font-bold border border-rose-100 flex items-center justify-center space-x-2 active:bg-rose-100"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        <span>Logout Account</span>
      </button>
    </div>
  );
};

export default ProfileView;
