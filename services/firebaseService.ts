
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  increment, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  getDocs,
  serverTimestamp 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { auth, db } from "../firebase";
import { User, Transaction } from "../types";

// Helper to map phone to dummy email for Firebase Auth
const getEmailFromPhone = (phone: string) => `${phone}@earnify.app`;

export const firebaseService = {
  signUp: async (data: any): Promise<User> => {
    const email = getEmailFromPhone(data.phoneNumber);
    const userCredential = await createUserWithEmailAndPassword(auth, email, data.password);
    const uid = userCredential.user.uid;

    const newUser: User = {
      uid,
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

    await setDoc(doc(db, "users", uid), newUser);
    return newUser;
  },

  login: async (phoneNumber: string, password: string): Promise<User> => {
    const email = getEmailFromPhone(phoneNumber);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
    
    if (!userDoc.exists()) throw new Error("User data not found");
    return userDoc.data() as User;
  },

  logout: () => signOut(auth),

  updateUserCoins: async (uid: string, amount: number) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      coins: increment(amount)
    });
  },

  updateUser: async (uid: string, data: Partial<User>) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, data);
  },

  getUserData: async (uid: string): Promise<User | null> => {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() ? (userDoc.data() as User) : null;
  },

  createWithdrawRequest: async (tx: Omit<Transaction, 'id' | 'timestamp'>) => {
    const txCollection = collection(db, "transactions");
    await addDoc(txCollection, {
      ...tx,
      timestamp: serverTimestamp()
    });
    // Deduct coins
    await updateDoc(doc(db, "users", tx.userId), {
      coins: 0
    });
  },

  getTransactions: async (uid: string): Promise<Transaction[]> => {
    const q = query(
      collection(db, "transactions"), 
      where("userId", "==", uid),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Transaction));
  }
};
