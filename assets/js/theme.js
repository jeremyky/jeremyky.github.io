<script>
  // Set year
  document.getElementById("year").textContent = new Date().getFullYear();

  const root = document.documentElement;
  const btn = document.querySelector(".theme-toggle");

  const saved = localStorage.getItem("theme");
  if (saved) {
    root.setAttribute("data-theme", saved);
  }

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "light";
    const next = current === "bw" ? "light" : "bw";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
</script>
