(function () {
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll("[data-theme-value]");
  const savedTheme = localStorage.getItem("health-theme");
  const defaultTheme = savedTheme || "mint";

  function setTheme(theme) {
    if (theme === "mint") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("health-theme", theme);
    themeButtons.forEach((button) => {
      const active = button.dataset.themeValue === theme;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  setTheme(defaultTheme);

  themeButtons.forEach((button) => {
    button.addEventListener("click", () => setTheme(button.dataset.themeValue));
  });

  const yearTarget = document.getElementById("year");
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }
})();
