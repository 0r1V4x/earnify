
import React, { useState, useEffect } from 'react';
import { User, View } from './types';
import { auth } from './firebase';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { firebaseService } from './services/firebaseService';
import { DEFAULT_ADMIN_SETTINGS } from './constants';
import Layout from './components/Layout';
import HomeView from './views/HomeView';
import EarnView from './views/EarnView';
import InviteView from './views/InviteView';
import WalletView from './views/WalletView';
import ProfileView from './views/ProfileView';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phoneNumber: '',
    password: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await firebaseService.getUserData(firebaseUser.uid);
        setUser(userData);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await firebaseService.signUp(formData);
    } catch (err: any) {
      alert(err.message);
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await firebaseService.login(formData.phoneNumber, formData.password);
    } catch (err: any) {
      alert(err.message);
      setIsLoading(false);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    setUser(updatedUser);
    await firebaseService.updateUser(updatedUser.uid, updatedUser);
  };

  const handleLogout = async () => {
    await firebaseService.logout();
    setCurrentView('home');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-violet-600">
        <div className="relative text-white flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="mt-6 font-black text-2xl tracking-[0.2em] uppercase">Earnify</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#fdfcfe] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-violet-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-400/5 rounded-full blur-3xl" />

        <div className="w-full max-w-sm relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-5xl font-black bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent mb-3">Earnify</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Premium Reward Platform</p>
          </div>

          <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-violet-100/50 p-8 border border-slate-50">
            <div className="flex bg-slate-50 p-1.5 rounded-[1.5rem] mb-8">
              <button 
                onClick={() => setAuthMode('login')}
                className={`flex-1 py-3 text-[10px] font-black rounded-[1.1rem] transition-all duration-300 uppercase tracking-widest ${authMode === 'login' ? 'bg-white text-violet-600 shadow-md ring-1 ring-violet-50' : 'text-slate-400'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setAuthMode('signup')}
                className={`flex-1 py-3 text-[10px] font-black rounded-[1.1rem] transition-all duration-300 uppercase tracking-widest ${authMode === 'signup' ? 'bg-white text-violet-600 shadow-md ring-1 ring-violet-50' : 'text-slate-400'}`}
              >
                Join
              </button>
            </div>

            <form onSubmit={authMode === 'login' ? handleLogin : handleSignUp} className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <input 
                    type="text" 
                    placeholder="FULL NAME"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-[1.2rem] text-sm font-bold focus:outline-none focus:border-violet-100 focus:bg-white transition-all"
                  />
                  <input 
                    type="text" 
                    placeholder="USERNAME"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-[1.2rem] text-sm font-bold focus:outline-none focus:border-violet-100 focus:bg-white transition-all"
                  />
                </>
              )}
              <input 
                type="tel" 
                placeholder="PHONE NUMBER"
                required
                value={formData.phoneNumber}
                onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
                className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-[1.2rem] text-sm font-bold focus:outline-none focus:border-violet-100 focus:bg-white transition-all"
              />
              <input 
                type="password" 
                placeholder="PASSWORD"
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-50 border-2 border-transparent px-5 py-4 rounded-[1.2rem] text-sm font-bold focus:outline-none focus:border-violet-100 focus:bg-white transition-all"
              />
              
              <button className="w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white py-4.5 rounded-[1.2rem] font-black text-base shadow-xl shadow-violet-100 transition-all active:scale-95 mt-4 hover:brightness-110">
                {authMode === 'login' ? 'SIGN IN' : 'GET STARTED'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout currentView={currentView} onViewChange={setCurrentView} userCoins={user.coins}>
      {currentView === 'home' && <HomeView />}
      {currentView === 'earn' && <EarnView user={user} onUpdateUser={handleUpdateUser} settings={DEFAULT_ADMIN_SETTINGS} />}
      {currentView === 'invite' && <InviteView user={user} onUpdateUser={handleUpdateUser} settings={DEFAULT_ADMIN_SETTINGS} />}
      {currentView === 'wallet' && <WalletView user={user} onUpdateUser={handleUpdateUser} settings={DEFAULT_ADMIN_SETTINGS} />}
      {currentView === 'profile' && <ProfileView user={user} onLogout={handleLogout} onUpdateUser={handleUpdateUser} settings={DEFAULT_ADMIN_SETTINGS} />}
    </Layout>
  );
};

export default App;
