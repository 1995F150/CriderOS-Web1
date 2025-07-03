import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { firebaseConfig } from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const DAILY_LIMIT = 1500;
const todayDate = new Date().toISOString().split('T')[0];

export async function checkTokenLimit(uid, tokensRequested) {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      tokenUsage: tokensRequested,
      lastReset: todayDate
    });
    return { allowed: true };
  }

  const data = userSnap.data();

  if (data.lastReset !== todayDate) {
    await setDoc(userRef, {
      tokenUsage: tokensRequested,
      lastReset: todayDate
    });
    return { allowed: true };
  }

  if ((data.tokenUsage + tokensRequested) > DAILY_LIMIT) {
    return {
      allowed: false,
      message: `Daily token cap (${DAILY_LIMIT}) reached. Try again tomorrow.`
    };
  }

  await setDoc(userRef, {
    tokenUsage: data.tokenUsage + tokensRequested,
    lastReset: todayDate
  });

  return { allowed: true };
}
