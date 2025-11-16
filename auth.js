// auth.js — Controle de Login
import { app } from "./firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const auth = getAuth(app);

// --- Criar Conta ---
export function criarConta() {
  const nome = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const senha = document.getElementById("signup-password").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, senha)
    .then(() => {
      localStorage.setItem("mapabusUserName", nome);
      alert("Conta criada com sucesso!");
      window.location.href = "painel.html";
    })
    .catch((error) => {
      alert("Erro ao criar conta: " + error.message);
    });
}

// --- Entrar ---
export function entrarConta() {
  const email = document.getElementById("login-email").value;
  const senha = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      localStorage.setItem("uid", user.uid);
      alert("Login realizado!");
      window.location.href = "painel.html";
    })
    .catch((error) => {
      alert("Erro ao entrar: " + error.message);
    });
}

// --- Logout ---
export function sairDaConta() {
  signOut(auth).then(() => {
    localStorage.clear();
    window.location.href = "login.html";
  });
}

// --- Impedir acesso sem login ---
export function protegerPagina() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "login.html";
    }
  });
}