// firebase.js  (módulo ES)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDF_wuc7k-J39LtzCtos8E9ukMvEKRiWs0",
  authDomain: "mapabus-2c7fd.firebaseapp.com",
  projectId: "mapabus-2c7fd",
  storageBucket: "mapabus-2c7fd.firebasestorage.app",
  messagingSenderId: "716001390512",
  appId: "1:716001390512:web:66514bb7962485e23a3075"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// exporta as funções que vamos usar (nomes simples)
export { auth, createUserWithEmailAndPassword
