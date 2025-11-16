// script.js - MapaBus (login persistente, logout, theme toggle, avisos simples)

/* THEME: read/save */
(function(){
  const saved = localStorage.getItem('mapabusTheme');
  if (saved === 'dark') document.body.classList.add('dark');
})();

/* theme toggle helper */
function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('mapabusTheme', isDark ? 'dark' : 'light');
}

/* AUTLOGIN: se já logado e estiver na tela login, redireciona */
document.addEventListener("DOMContentLoaded", () => {
  const logged = localStorage.getItem("mapabusLogged");
  if (logged === "true" && window.location.pathname.includes("login.html")) {
    window.location.href = "painel.html";
  }

  // atualiza userName badge
  const stored = JSON.parse(localStorage.getItem("mapabusUser"));
  const badge = document.getElementById("userName");
  if (stored && badge) badge.textContent = stored.nome;

  // attach logout if exists
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (!confirm("Deseja realmente sair da conta?")) return;
      localStorage.removeItem("mapabusLogged");
      localStorage.removeItem("mapabusUser");
      localStorage.removeItem("mapabusUserName");
      window.location.href = "login.html";
    });
  }

  // attach theme toggle if exists (button with id themeToggle)
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) themeToggle.addEventListener("click", toggleTheme);
});

/* Criar conta */
function criarConta() {
  const nome = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const senha = document.getElementById("signup-password").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  // simples validação
  const user = { nome, email, senha };
  localStorage.setItem("mapabusUser", JSON.stringify(user));
  alert("Conta criada com sucesso. Faça login.");
  window.location.href = "login.html";
}

/* Entrar na conta */
function entrarConta() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-password").value.trim();

  const stored = JSON.parse(localStorage.getItem("mapabusUser"));
  if (!stored) { alert("Nenhuma conta encontrada. Crie uma conta."); return; }
  if (email === stored.email && senha === stored.senha) {
    localStorage.setItem("mapabusLogged", "true");
    localStorage.setItem("mapabusUserName", stored.nome);
    alert("Login realizado.");
    window.location.href = "painel.html";
  } else {
    alert("E-mail ou senha incorretos.");
  }
}

/* Avisos: helpers leves (usado na avisos.html) */
function renderAvisosOnPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
  container.innerHTML = '';
  if (avisos.length === 0) container.innerHTML = '<p>Nenhum aviso por enquanto.</p>';
  avisos.forEach((av, i) => {
    const div = document.createElement('div');
    div.className = 'notice';
    div.innerHTML = <p>${av.texto}</p><small style="color:#667">Postado em ${new Date(av.data).toLocaleString()}</small>;
    container.appendChild(div);
  });
}

/* Admin de avisos - simples (no avisos.html) */
function adminLoginAndShow() {
  const email = document.getElementById("adminEmail").value.trim();
  const senha = document.getElementById("adminSenha").value.trim();
  const ADMIN_EMAIL = "admin.mapabus@solonopole.gov";
  const ADMIN_PASS = "Mb@2025#Acesso!";
  const formContainer = document.getElementById("formContainer");
  if (email === ADMIN_EMAIL && senha === ADMIN_PASS) {
    alert("Acesso administrativo liberado.");
    formContainer.style.display = 'block';
    renderAvisosOnPage('avisosList');
  } else alert("Credenciais incorretas.");
}

function publicarAviso() {
  const texto = document.getElementById("novoAviso").value.trim();
  if (!texto) { alert("Digite o aviso."); return; }
  const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
  avisos.unshift({ texto, data: new Date().toISOString() });
  localStorage.setItem("avisos", JSON.stringify(avisos));
  renderAvisosOnPage('avisosList');
  document.getElementById("novoAviso").value = '';
}

/* Helper para páginas - init render */
function initPage() {
  // se existir avisosList, renderiza
  renderAvisosOnPage('avisosList');
}function toggleTheme() {
  const body = document.body;
  const isDark = body.classList.toggle("dark");

  localStorage.setItem("mapabusTheme", isDark ? "dark" : "light");
}

// aplica tema salvo
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("mapabusTheme");
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
});
