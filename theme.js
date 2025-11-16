// ==== SALVAR/PEGAR TEMA DO USUÁRIO ====

function aplicarTemaEscuro(ativado) {
  if (ativado) {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}

// Carrega o tema salvo ao abrir qualquer página
document.addEventListener("DOMContentLoaded", () => {
  const temaSalvo = localStorage.getItem("theme");
  if (temaSalvo === "dark") {
    aplicarTemaEscuro(true);
  }
});

// Botão só existe no INDEX, então verificamos antes
function toggleTheme() {
  const isDark = document.body.classList.contains("dark");
  aplicarTemaEscuro(!isDark);
}