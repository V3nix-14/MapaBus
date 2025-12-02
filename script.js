// script.js - MapaBus (usa Firebase via window._firebase*)

// ======== TEMA ========
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("mapabusTheme");
  if (saved === "dark") document.body.classList.add("dark");

  // se estiver logado, redireciona do login para painel
  const logged = localStorage.getItem("mapabusLogged");
  if (logged === "true" && window.location.pathname.includes("login.html")) {
    window.location.href = "painel.html";
  }

  // attach submit handlers
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => { e.preventDefault(); entrarConta(); });
  }
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", (e) => { e.preventDefault(); criarConta(); });
  }
});

// toggle tema simples
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("mapabusTheme", isDark ? "dark" : "light");
}

// ======== CRIAR CONTA (Firebase) ========
async function criarConta() {
  const nome = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const senha = document.getElementById("signup-password").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    // funções expostas no login.html
    const createUser = window._firebaseCreateUser;
    const auth = window._auth;

    await createUser(auth, email, senha);

    // salva o nome localmente (você pode migrar para Firestore depois)
    localStorage.setItem("mapabusUserName", nome);

    alert("Conta criada com sucesso. Faça login.");
    window.location.href = "login.html";
  } catch (err) {
    console.error(err);
    alert("Erro ao criar conta: " + (err.message || err));
  }
}

// ======== ENTRAR (Firebase) ========
async function entrarConta() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-password").value.trim();

  try {
    const auth = window._auth;
    const loginFn = window._firebaseLogin;

    const userCred = await loginFn(auth, email, senha);

    // grava estado simples (persistência local)
    localStorage.setItem("mapabusLogged", "true");
    // tenta ler name salvo no signup (se houver)
    const savedName = localStorage.getItem("mapabusUserName") || (userCred.user && userCred.user.email) || "Usuário";
    localStorage.setItem("mapabusUserName", savedName);

    alert("Login realizado com sucesso!");
    window.location.href = "painel.html";
  } catch (err) {
    console.error(err);
    alert("Erro ao entrar: " + (err.message || err));
  }
}

// ======== LOGOUT usando signOut exportado (opcional) ========
async function logout() {
  try {
    if (!window._firebaseSignOut || !window._auth) {
      localStorage.removeItem("mapabusLogged");
      window.location.href = "login.html";
      return;
    }
    await window._firebaseSignOut(window._auth);
    localStorage.removeItem("mapabusLogged");
    localStorage.removeItem("mapabusUserName");
    window.location.href = "login.html";
  } catch (err) {
    console.error(err);
    alert("Erro no logout: " + (err.message || err));
  }
}

// ======== Avisos (continua usando localStorage por enquanto) ========
function renderAvisosOnPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
  container.innerHTML = "";
  if (avisos.length === 0) {
    container.innerHTML = "<p>Nenhum aviso ainda.</p>";
    return;
  }
  avisos.forEach(av => {
    const div = document.createElement("div");
    div.className = "notice";
    div.innerHTML = `<p>${av.texto}</p><small>Postado em ${new Date(av.data).toLocaleString()}</small>`;
    container.appendChild(div);
  });
}

function publicarAviso() {
  const texto = document.getElementById("novoAviso").value.trim();
  if (!texto) return alert("Digite um aviso.");
  const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
  avisos.unshift({ texto, data: new Date().toISOString() });
  localStorage.setItem("avisos", JSON.stringify(avisos));
  renderAvisosOnPage('avisosList');
  document.getElementById("novoAviso").value = "";
      }
