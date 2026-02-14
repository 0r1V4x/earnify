
import React, { useState } from 'react';
import { User, AdminSettings } from '../types';
import { COIN_REWARDS_SPIN } from '../constants';
import AdOverlay from '../components/AdOverlay';

interface EarnViewProps {
  user: User;
  onUpdateUser: (u: User) => void;
  settings: AdminSettings;
}

const EarnView: React.FC<EarnViewProps> = ({ user, onUpdateUser, settings }) => {
  const [activeTask, setActiveTask] = useState<'none' | 'watch' | 'click' | 'visit' | 'spin'>('none');
  const [spinning, setSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState<number | null>(null);

  const handleDailyCheckIn = () => {
    const today = new Date().toDateString();
    if (user.lastDailyCheckIn === today) {
      alert("Already checked in today!");
      return;
    }
    const updated = {
      ...user,
      coins: user.coins + settings.dailyCheckInReward,
      lastDailyCheckIn: today
    };
    onUpdateUser(updated);
    alert(`Success! You earned ${settings.dailyCheckInReward} coins.`);
  };

  const completeTask = (reward: number) => {
    onUpdateUser({ ...user, coins: user.coins + reward });
    setActiveTask('none');
  };

  const handleSpin = () => {
    if (spinning) return;
    
    const canSpin = user.dailySpinsUsed < 2 || user.extraSpinsAvailable > 0;
    if (!canSpin) {
      alert("No spins left! Watch ads to unlock more.");
      return;
    }

    setSpinning(true);
    setSpinResult(null);
    
    // Simulate spin animation delay
    setTimeout(() => {
      const resultIndex = Math.floor(Math.random() * COIN_REWARDS_SPIN.length);
      const reward = COIN_REWARDS_SPIN[resultIndex];
      setSpinResult(reward);
      setSpinning(false);
      
      const updated = {
        ...user,
        coins: user.coins + reward,
        dailySpinsUsed: user.dailySpinsUsed < 2 ? user.dailySpinsUsed + 1 : user.dailySpinsUsed,
        extraSpinsAvailable: user.dailySpinsUsed >= 2 ? user.extraSpinsAvailable - 1 : user.extraSpinsAvailable
      };
      onUpdateUser(updated);
    }, 2000);
  };

  const unlockSpin = () => {
    if (user.extraSpinsAvailable >= 5) {
      alert("Maximum extra spins reached (5)");
      return;
    }
    setActiveTask('spin');
  };

  return (
    <div className="p-4 space-y-4">
      {activeTask === 'watch' && (
        <AdOverlay duration={settings.adDuration} onComplete={() => completeTask(settings.watchAdReward)} title="Watch Ad & Earn" />
      )}
      {activeTask === 'click' && (
        <AdOverlay duration={settings.adDuration} onComplete={() => completeTask(settings.clickEarnReward)} title="Click Task" />
      )}
      {activeTask === 'visit' && (
        <AdOverlay duration={settings.websiteVisitTime} onComplete={() => completeTask(settings.websiteVisitReward)} title="Visiting Partner Website" />
      )}
      {activeTask === 'spin' && (
        <AdOverlay duration={settings.adDuration} onComplete={() => {
          onUpdateUser({ ...user, extraSpinsAvailable: user.extraSpinsAvailable + 1 });
          setActiveTask('none');
        }} title="Unlocking Extra Spin" />
      )}

      <h2 className="text-xl font-bold text-slate-800 mb-2">Earning Center</h2>

      {/* Main Task List */}
      <div className="grid grid-cols-1 gap-3">
        <button 
          onClick={handleDailyCheckIn}
          className="flex items-center p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl text-white shadow-lg shadow-yellow-200"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl">📅</span>
          </div>
          <div className="text-left">
            <p className="font-bold">Daily Check-in</p>
            <p className="text-xs opacity-90">Get free {settings.dailyCheckInReward} coins daily</p>
          </div>
        </button>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setActiveTask('watch')}
            className="p-4 bg-white border border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center space-y-2"
          >
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <p className="font-semibold text-sm">Watch Ad</p>
            <span className="text-[10px] text-indigo-500 font-bold">+{settings.watchAdReward} Coins</span>
          </button>

          <button 
            onClick={() => setActiveTask('click')}
            className="p-4 bg-white border border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center space-y-2"
          >
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg>
            </div>
            <p className="font-semibold text-sm">Click & Earn</p>
            <span className="text-[10px] text-emerald-500 font-bold">+{settings.clickEarnReward} Coins</span>
          </button>
        </div>

        <button 
          onClick={() => setActiveTask('visit')}
          className="flex items-center p-4 bg-indigo-600 rounded-2xl text-white"
        >
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl">🌐</span>
          </div>
          <div className="text-left flex-1">
            <p className="font-bold">Visit Website</p>
            <p className="text-xs opacity-90">Stay for {settings.websiteVisitTime}s and earn</p>
          </div>
          <span className="font-bold text-yellow-300">+{settings.websiteVisitReward}</span>
        </button>
      </div>

      {/* Lucky Spin Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-6 overflow-hidden relative">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Lucky Spin Wheel</h3>
          <div className="bg-slate-100 px-3 py-1 rounded-full">
            <span className="text-xs font-medium text-slate-500">Left: {Math.max(0, 2 - user.dailySpinsUsed)} Free</span>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className={`w-40 h-40 rounded-full border-4 border-indigo-600 flex items-center justify-center relative ${spinning ? 'animate-spin-slow' : ''}`}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[15px] border-t-indigo-600 z-10" />
            <div className="grid grid-cols-2 grid-rows-2 w-full h-full rounded-full overflow-hidden rotate-45">
              <div className="bg-indigo-500 flex items-center justify-center text-white font-bold text-xs -rotate-45">5</div>
              <div className="bg-indigo-400 flex items-center justify-center text-white font-bold text-xs -rotate-45">10</div>
              <div className="bg-indigo-300 flex items-center justify-center text-white font-bold text-xs -rotate-45">20</div>
              <div className="bg-indigo-600 flex items-center justify-center text-white font-bold text-xs -rotate-45">50</div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center font-bold text-indigo-600">
                {spinResult !== null ? spinResult : '?'}
              </div>
            </div>
          </div>

          <div className="w-full flex space-x-2">
            <button 
              onClick={handleSpin}
              disabled={spinning}
              className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg ${spinning ? 'bg-slate-400' : 'bg-indigo-600 shadow-indigo-200'}`}
            >
              {spinning ? 'Spinning...' : 'Spin Now'}
            </button>
            <button 
              onClick={unlockSpin}
              className="px-4 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl font-medium text-xs flex flex-col items-center justify-center"
            >
              <span>Extra Spin</span>
              <span className="text-[9px] font-bold">Watch Ad ({user.extraSpinsAvailable}/5)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarnView;
