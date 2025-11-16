// ==========================================
//  MapaBus - script.js (Firebase + Tema)
// ==========================================


// ======== APLICAR TEMA SALVO ========
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("mapabusTheme");
  if (savedTheme === "dark") document.body.classList.add("dark");

  const btn = document.getElementById("themeToggle");
  if (btn) btn.addEventListener("click", toggleTheme);

  // auto redirecionar se já logado
  const logged = localStorage.getItem("mapabusLogged");
  if (logged === "true" && window.location.pathname.includes("login.html")) {
    window.location.href = "painel.html";
  }

  // atualizar nome no painel
  const userBadge = document.getElementById("userName");
  const storedUser = localStorage.getItem("userName");

  if (userBadge && storedUser) {
    userBadge.textContent = storedUser;
  }

  // botão sair
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const auth = window._firebaseAuth;
      auth.signOut().then(() => {
        localStorage.removeItem("mapabusLogged");
        localStorage.removeItem("userName");
        window.location.href = "login.html";
      });
    });
  }

  // avisos
  renderAvisosOnPage("avisosList");
});


// ======== FUNÇÃO TEMA ========
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark");
  localStorage.setItem("mapabusTheme", isDark ? "dark" : "light");
}



// ======================================================================
//                         LOGIN COM FIREBASE 
// ======================================================================

// CRIAR CONTA
async function criarConta() {
  const nome = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const senha = document.getElementById("signup-password").value.trim();

  if (!nome || !email || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  try {
    const auth = window._firebaseAuth;
    const createUser = window._firebaseCreateUser;

    const userCredential = await createUser(auth, email, senha);

    // salva nome localmente
    localStorage.setItem("userName", nome);

    alert("Conta criada com sucesso!");
    window.location.href = "login.html";

  } catch (error) {
    alert("Erro ao criar conta: " + error.message);
  }
}



// LOGIN
async function entrarConta() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-password").value.trim();

  try {
    const auth = window._firebaseAuth;
    const login = window._firebaseLogin;

    const userCredential = await login(auth, email, senha);

    // pega nome salvo quando criou conta
    const storedName = localStorage.getItem("userName") || "Usuário";

    localStorage.setItem("mapabusLogged", "true");

    alert("Login realizado com sucesso!");
    window.location.href = "painel.html";

  } catch (error) {
    alert("Erro ao entrar: " + error.message);
  }
}



// ======================================================================
//                         AVISOS (AINDA LOCAL)
// ======================================================================
function renderAvisosOnPage(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const avisos = JSON.parse(localStorage.getItem("avisos")) || [];

  if (avisos.length === 0) {
    container.innerHTML = "<p>Nenhum aviso ainda.</p>";
    return;
  }

  container.innerHTML = "";

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



// ADMIN
function adminLoginAndShow() {
  const email = document.getElementById("adminEmail").value.trim();
  const senha = document.getElementById("adminSenha").value.trim();

  const ADMIN_EMAIL = "admin.mapabus@solonopole.gov";
  const ADMIN_PASS = "Mb@2025#Acesso!";

  if (email === ADMIN_EMAIL && senha === ADMIN_PASS) {
    alert("Acesso liberado.");
    document.getElementById("formContainer").style.display = "block";
    renderAvisosOnPage("avisosList");
  } else {
    alert("Credenciais incorretas.");
  }
}

function publicarAviso() {
  const texto = document.getElementById("novoAviso").value.trim();
  if (!texto) return alert("Digite um aviso.");

  const avisos = JSON.parse(localStorage.getItem("avisos")) || [];

  avisos.unshift({
    texto,
    data: new Date().toISOString()
  });

  localStorage.setItem("avisos", JSON.stringify(avisos));

  renderAvisosOnPage("avisosList");
  document.getElementById("novoAviso").value = "";
}
