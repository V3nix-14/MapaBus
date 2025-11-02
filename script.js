// script.js

// === Criar conta ===
function criarConta() {
  const nome = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const senha = document.getElementById("signup-password").value.trim();

  if (!nome || !email || !senha) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  const userData = { nome, email, senha };
  localStorage.setItem("mapabusUser", JSON.stringify(userData));

  alert("Conta criada com sucesso!");
  window.location.href = "login.html";
}

// === Entrar na conta ===
function entrarConta() {
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-password").value.trim();

  const storedUser = JSON.parse(localStorage.getItem("mapabusUser"));

  if (!storedUser) {
    alert("Nenhuma conta encontrada! Crie uma conta primeiro.");
    return;
  }

  if (email === storedUser.email && senha === storedUser.senha) {
    localStorage.setItem("mapabusUserName", storedUser.nome);
    alert("Login realizado com sucesso!");
    window.location.href = "painel.html";
  } else {
    alert("E-mail ou senha incorretos!");
  }
}

// === Exibir nome e botão sair ===
document.addEventListener("DOMContentLoaded", () => {
  const userNameSpan = document.getElementById("userName");
  const logoutBtn = document.getElementById("logoutBtn");
  const storedUser = JSON.parse(localStorage.getItem("mapabusUser"));

  if (userNameSpan && storedUser) {
    userNameSpan.textContent = storedUser.nome;
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      const confirmar = confirm("Deseja realmente sair da conta?");
      if (confirmar) {
        localStorage.removeItem("mapabusUserName");
        window.location.href = "login.html";
      }
    });
  }
});