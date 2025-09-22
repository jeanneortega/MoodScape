// assets/contexts/EntriesContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../../firebaseConfig';
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

// Create the context
const EntriesContext = createContext();

// Hook to use the context
export const useEntries = () => useContext(EntriesContext);

// Provider component
export const EntriesProvider = ({ children }) => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubEntries = null;

    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setEntries([]);
        setLoading(false);
        if (unsubEntries) unsubEntries();
        return;
      }

      const q = query(
        collection(db, 'entries'),
        where('uid', '==', user.uid),
        orderBy('createdAt', 'desc')
      );

      unsubEntries = onSnapshot(q, (snapshot) => {
        const userEntries = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setEntries(userEntries);
        setLoading(false);
      });
    });

    return () => {
      unsubAuth();
      if (unsubEntries) unsubEntries();
    };
  }, []);

const addEntry = async (text) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not logged in');

  await addDoc(collection(db, 'entries'), {
    text, // ✅ plain string
    uid: user.uid,
    createdAt: serverTimestamp(), // ✅ Firestore timestamp
  });
};


  // Update entry
  const updateEntry = async (id, newText) => {
    const ref = doc(db, 'entries', id);
    await updateDoc(ref, {
      text: newText,
    });
  };

  // Delete entry
  const deleteEntry = async (id) => {
    const ref = doc(db, 'entries', id);
    await deleteDoc(ref);
  };

  return (
    <EntriesContext.Provider
      value={{ entries, addEntry, updateEntry, deleteEntry, loading }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
