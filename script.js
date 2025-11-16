// =========================
//  MapaBus - script.js
//  Tema, Login, Avisos
// =========================


// ======== TEMA ESCURO: CARREGAR ESTADO ========
document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("mapabusTheme");
  if (saved === "dark") document.body.classList.add("dark");

  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) toggleBtn.addEventListener("click", toggleTheme);

  // auto login
  const logged = localStorage.getItem("mapabusLogged");
  if (logged === "true" && window.location.pathname.includes("login.html")) {
    window.location.href = "painel.html";
  }

  // atualizar nome
  const stored = JSON.parse(localStorage.getItem("mapabusUser"));
  const badge = document.getElementById("userName");
  if (stored && badge) badge.textContent = stored.nome;

  // botão de sair
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      if (!confirm("Deseja realmente sair?")) return;
      localStorage.removeItem("mapabusLogged");
      localStorage.removeItem("mapabusUser");
      localStorage.removeItem("mapabusUserName");
      window.location.href = "login.html";
    });
  }

  // render avisos (se a página tiver)
  renderAvisosOnPage("avisosList");
});


// ======== FUNÇÃO: alternar tema ========
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("mapabusTheme", isDark ? "dark" : "light");
}



// ======== LOGIN / CRIAR CONTA ========

function criarConta() {
  const nome = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const senha = document.getElementById("signup-password").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos!");
    return;
  }

  const user = { nome, email, senha };
  localStorage.setItem("mapabusUser", JSON.stringify(user));

  alert("Conta criada com sucesso!");
  window.location.href = "login.html";
}


function entrarConta() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-password").value.trim();

  const stored = JSON.parse(localStorage.getItem("mapabusUser"));

  if (!stored) {
    alert("Nenhuma conta cadastrada!");
    return;
  }

  if (email === stored.email && senha === stored.senha) {
    localStorage.setItem("mapabusLogged", "true");
    localStorage.setItem("mapabusUserName", stored.nome);
    window.location.href = "painel.html";
  } else {
    alert("E-mail ou senha incorretos.");
  }
}



// ======== AVISOS ========

function renderAvisosOnPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
  container.innerHTML = "";

  if (avisos.length === 0) {
    container.innerHTML = "<p>Nenhum aviso no momento.</p>";
    return;
  }

  avisos.forEach(av => {
    const div = document.createElement("div");
    div.className = "notice";

    div.innerHTML = `
      <p>${av.texto}</p>
      <small style="color:#667;">
        Postado em ${new Date(av.data).toLocaleString("pt-BR")}
      </small>
    `;

    container.appendChild(div);
  });
}



// ======== ADMIN ========

function adminLoginAndShow() {
  const email = document.getElementById("adminEmail").value.trim();
  const senha = document.getElementById("adminSenha").value.trim();

  const ADMIN_EMAIL = "admin.mapabus@solonopole.gov";
  const ADMIN_PASS = "Mb@2025#Acesso!";

  const formContainer = document.getElementById("formContainer");

  if (email === ADMIN_EMAIL && senha === ADMIN_PASS) {
    alert("Acesso liberado.");
    formContainer.style.display = "block";
    renderAvisosOnPage("avisosList");
  } else {
    alert("Credenciais incorretas.");
  }
}

function publicarAviso() {
  const texto = document.getElementById("novoAviso").value.trim();

  if (!texto) {
    alert("Digite um aviso.");
    return;
  }

  const avisos = JSON.parse(localStorage.getItem("avisos")) || [];
  avisos.unshift({ texto, data: new Date().toISOString() });

  localStorage.setItem("avisos", JSON.stringify(avisos));

  renderAvisosOnPage("avisosList");

  document.getElementById("novoAviso").value = "";
}
