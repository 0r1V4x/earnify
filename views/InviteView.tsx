
import React, { useState } from 'react';
import { User, AdminSettings } from '../types';

interface InviteViewProps {
  user: User;
  onUpdateUser: (u: User) => void;
  settings: AdminSettings;
}

const InviteView: React.FC<InviteViewProps> = ({ user, onUpdateUser, settings }) => {
  const [referralInput, setReferralInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const copyInviteCode = () => {
    navigator.clipboard.writeText(user.inviteCode);
    alert('Invite code copied to clipboard!');
  };

  const shareInvite = () => {
    const text = `Join Earnify and earn daily rewards! Use my code: ${user.inviteCode}. Download now: https://earnify.app/invite/${user.inviteCode}`;
    if (navigator.share) {
      navigator.share({ title: 'Earnify Invite', text });
    } else {
      copyInviteCode();
    }
  };

  const handleApplyReferral = () => {
    if (!referralInput.trim()) return;
    if (user.referredBy) {
      alert("You have already used a referral code.");
      return;
    }
    if (referralInput === user.inviteCode) {
      alert("You cannot use your own referral code.");
      return;
    }

    setIsProcessing(true);
    // Simulate API call to check referral
    setTimeout(() => {
      onUpdateUser({
        ...user,
        coins: user.coins + settings.referralReward,
        referredBy: referralInput
      });
      setIsProcessing(false);
      alert(`Referral applied! You received ${settings.referralReward} coins.`);
    }, 1000);
  };

  return (
    <div className="p-4 space-y-4">
      <div className="bg-indigo-600 rounded-3xl p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16" />
        <h2 className="text-xl font-bold">Invite Friends</h2>
        <p className="text-sm opacity-80 mt-1">Earn {settings.inviteReward} coins for every friend who joins!</p>
        
        <div className="mt-6 flex items-center justify-between bg-white/10 p-4 rounded-2xl backdrop-blur-md">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-60">Your Invite Code</span>
            <span className="text-xl font-mono font-bold tracking-widest">{user.inviteCode}</span>
          </div>
          <button 
            onClick={copyInviteCode}
            className="bg-white text-indigo-600 px-4 py-2 rounded-xl font-bold text-sm"
          >
            Copy
          </button>
        </div>

        <button 
          onClick={shareInvite}
          className="w-full mt-4 bg-yellow-400 text-indigo-900 py-3 rounded-2xl font-bold flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 9a3 3 0 100-2.684 3 3 0 000 2.684z" /></svg>
          <span>Invite Friends Now</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6">
        <h3 className="font-bold text-slate-800 mb-4">Have an invite code?</h3>
        {user.referredBy ? (
          <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl flex items-center text-sm font-medium">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
            Referral Code Applied: {user.referredBy}
          </div>
        ) : (
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Enter code here"
              value={referralInput}
              onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
              className="flex-1 bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
              onClick={handleApplyReferral}
              disabled={isProcessing || !referralInput}
              className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm disabled:opacity-50"
            >
              {isProcessing ? '...' : 'Apply'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center">
          <p className="text-2xl font-bold text-slate-800">{user.totalInvites}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Total Invites</p>
        </div>
        <div className="bg-white border border-slate-200 p-4 rounded-2xl text-center">
          <p className="text-2xl font-bold text-emerald-600">{user.activeInvites}</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">Active Users</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between">
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wide">Invite Earnings</p>
          <p className="text-xl font-bold text-indigo-600 mt-1">{user.inviteEarnings.toLocaleString()} Coins</p>
        </div>
        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center">
          <span className="text-xl">💰</span>
        </div>
      </div>
    </div>
  );
};

export default InviteView;
