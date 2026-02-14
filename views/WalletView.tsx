
import React, { useState, useEffect } from 'react';
import { User, AdminSettings, Transaction } from '../types';
import { firebaseService } from '../services/firebaseService';

interface WalletViewProps {
  user: User;
  onUpdateUser: (u: User) => void;
  settings: AdminSettings;
}

const WalletView: React.FC<WalletViewProps> = ({ user, onUpdateUser, settings }) => {
  const [withdrawMethod, setWithdrawMethod] = useState<'Recharge' | 'Bkash' | 'Nagad'>('Recharge');
  const [accountNumber, setAccountNumber] = useState('');
  const [history, setHistory] = useState<Transaction[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const txs = await firebaseService.getTransactions(user.uid);
      setHistory(txs);
    };
    fetchHistory();
  }, [user.uid]);

  const totalTaka = (user.coins * settings.coinRate).toFixed(2);
  const minLimit = withdrawMethod === 'Recharge' ? settings.minRecharge : settings.minBkashNagad;

  const handleWithdraw = async () => {
    const amountTaka = parseFloat(totalTaka);
    if (amountTaka < minLimit) {
      alert(`Minimum withdrawal for ${withdrawMethod} is ${minLimit} Taka.`);
      return;
    }
    if (!accountNumber) {
      alert("Please enter account number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await firebaseService.createWithdrawRequest({
        userId: user.uid,
        amount: amountTaka,
        coins: user.coins,
        method: withdrawMethod,
        accountNumber,
        status: 'Pending'
      });
      
      onUpdateUser({ ...user, coins: 0 });
      setAccountNumber('');
      const txs = await firebaseService.getTransactions(user.uid);
      setHistory(txs);
      alert("Withdrawal request submitted successfully!");
    } catch (err) {
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-5 space-y-8">
      <div className="bg-gradient-to-br from-violet-700 via-violet-800 to-violet-950 rounded-[2.5rem] p-10 text-white text-center shadow-2xl shadow-violet-200 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl" />
        
        <p className="text-violet-200 text-xs font-black uppercase tracking-[0.2em]">Current Balance</p>
        <div className="flex items-center justify-center space-x-3 mt-3">
          <img src="https://cdn-icons-png.flaticon.com/512/1292/1292744.png" className="w-8 h-8 drop-shadow-lg" alt="coin" />
          <h2 className="text-5xl font-black tracking-tight">{user.coins.toLocaleString()}</h2>
        </div>
        
        <div className="mt-8 bg-white/10 backdrop-blur-md inline-flex items-center px-6 py-2.5 rounded-2xl border border-white/20">
          <span className="text-base font-black text-white">৳ {totalTaka} BDT</span>
        </div>
      </div>

      <div className="bg-white border-2 border-slate-50 rounded-[2.5rem] p-8 shadow-sm">
        <h3 className="text-xl font-black text-slate-800 mb-6">Withdraw Funds</h3>
        
        <div className="flex space-x-2 mb-8 bg-slate-50 p-1.5 rounded-[1.5rem]">
          {(['Recharge', 'Bkash', 'Nagad'] as const).map(m => (
            <button
              key={m}
              onClick={() => setWithdrawMethod(m)}
              className={`flex-1 py-3.5 text-[10px] font-black rounded-2xl transition-all duration-300 ${
                withdrawMethod === m 
                  ? 'bg-white text-violet-600 shadow-md ring-1 ring-violet-50' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {m.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] block mb-2.5 ml-1">Account Credentials</label>
            <input 
              type="text" 
              placeholder={withdrawMethod === 'Recharge' ? "Phone Number" : `${withdrawMethod} Number`}
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full bg-slate-50 border-2 border-transparent px-6 py-4 rounded-[1.5rem] text-sm font-bold focus:outline-none focus:border-violet-100 focus:bg-white transition-all"
            />
          </div>

          <div className="bg-violet-50/50 border border-violet-100 p-5 rounded-[1.5rem] flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Min. Limit</p>
              <p className="text-lg font-black text-violet-700">৳ {minLimit}.00</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fee</p>
              <p className="text-lg font-black text-slate-800">৳ 0.00</p>
            </div>
          </div>

          <button 
            onClick={handleWithdraw}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-violet-600 to-violet-700 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-violet-100 transition-all active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? 'PROCESSING...' : 'CONFIRM WITHDRAW'}
          </button>
        </div>
      </div>

      <div className="px-1 pb-10">
        <h3 className="text-xl font-black text-slate-800 mb-5">History</h3>
        <div className="space-y-4">
          {history.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-100">
              <span className="text-slate-400 font-bold text-sm">No transactions yet</span>
            </div>
          ) : (
            history.map(tx => (
              <div key={tx.id} className="bg-white border-2 border-slate-50 p-5 rounded-[2rem] flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    tx.method === 'Bkash' ? 'bg-pink-100 text-pink-600' : 
                    tx.method === 'Nagad' ? 'bg-orange-100 text-orange-600' : 'bg-violet-100 text-violet-600'
                  }`}>
                    <span className="font-black text-lg">{tx.method[0]}</span>
                  </div>
                  <div>
                    <p className="text-base font-black text-slate-800">৳ {tx.amount}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.method}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                  tx.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 
                  tx.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {tx.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletView;
