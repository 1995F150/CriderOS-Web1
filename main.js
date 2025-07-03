import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { firebaseConfig } from './firebaseConfig.js';
import { checkTokenLimit } from './checkTokenLimit.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

window.login = async function () {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const tokenResponse = await checkTokenLimit(user.uid, 100);
    document.getElementById("status").innerText = tokenResponse.allowed ? "Access granted ✅" : tokenResponse.message;
  } catch (error) {
    document.getElementById("status").innerText = "Login failed ❌";
  }
}
