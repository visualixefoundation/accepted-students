const students = [
  { name: "Makayla Lawal", program: "AddisCoder 2023", url: "addiscoder2023.html" },
  { name: "Filmawit Mebhrahtom", program: "AddisCoder 2026", url: "addiscoder2026.html" },
  { name: "Kala Motlhatlhedi", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Ashelly Adeline Mwisha", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Bua Nyama Moto", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Christabel", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Jelica Hamza", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Judy Ismail", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Salma Mahmoud Hassany", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Angela Aziseh Ayem", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Eliel Kawel", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Hiryakos Kassahun", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Filemon Richard", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Fadel Malam Moumouni", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Bashiru Hamisi", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Eyob Ayalew", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Nadine Mostafa", program: "YYAS 2026", url: "yyas2026.html" },
  { name: "Om Gulsom Naimi", program: "UWC East Africa Class of 2027", url: "uwceastafrica2027.html" },
  { name: "Roque Desouza", program: "SVF Applied 2026", url: "svf2026applied.html" }
];

// Theme
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const btn = document.getElementById("themeToggle");
  if (btn) btn.textContent = theme === "dark" ? "☀️" : "🌙";
}

(function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") setTheme(saved);
  else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) setTheme("light");
  else setTheme("dark");
})();

document.getElementById("themeToggle").addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  setTheme(current === "dark" ? "light" : "dark");
});

// Views + remember last category
function showView(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const target = document.getElementById("view-" + id);
  if (target) target.classList.add("active");
  if (id !== "home") sessionStorage.setItem("lastView", id);
  else sessionStorage.removeItem("lastView");
}

// Restore last view on load
(function restoreView() {
  const last = sessionStorage.getItem("lastView");
  if (last && document.getElementById("view-" + last)) showView(last);
})();

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.target));
});

document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => showView("home"));
});

// Year filters
document.querySelectorAll(".year-filters").forEach(group => {
  const listId = group.dataset.list;
  const list = document.getElementById(listId);
  if (!list) return;

  group.querySelectorAll(".year-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      group.querySelectorAll(".year-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      const year = chip.dataset.year;
      list.querySelectorAll("li").forEach(li => {
        const years = (li.dataset.years || "all").split(/\s+/);
        const show = year === "all" || years.includes("all") || years.includes(year);
        li.style.display = show ? "" : "none";
      });
    });
  });
});

// Search
const searchBox = document.getElementById("searchBox");
const resultsDiv = document.getElementById("results");
const searchCount = document.getElementById("searchCount");
let currentMatches = [];

function renderResults(query) {
  resultsDiv.innerHTML = "";
  currentMatches = [];
  if (query.length > 1) {
    currentMatches = students.filter(s => s.name.toLowerCase().includes(query));
    resultsDiv.style.display = "block";
    searchCount.classList.add("visible");
    if (currentMatches.length) {
      searchCount.textContent = currentMatches.length + " match" + (currentMatches.length === 1 ? "" : "es");
      currentMatches.forEach(s => {
        const item = document.createElement("p");
        item.innerHTML = `<strong>${s.name}</strong> — <a href="${s.url}">${s.program}</a>`;
        item.addEventListener("click", (e) => {
          if (e.target.tagName !== "A") window.location.href = s.url;
        });
        resultsDiv.appendChild(item);
      });
    } else {
      searchCount.textContent = "0 matches";
      resultsDiv.innerHTML = '<p style="color:var(--text-dim)">No matches found.</p>';
    }
  } else {
    resultsDiv.style.display = "none";
    searchCount.classList.remove("visible");
    searchCount.textContent = "";
  }
}

searchBox.addEventListener("input", function () {
  renderResults(this.value.toLowerCase().trim());
});

// Enter opens first match
searchBox.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && currentMatches.length > 0) {
    e.preventDefault();
    window.location.href = currentMatches[0].url;
  }
});

document.addEventListener("click", e => {
  if (!e.target.closest(".search-wrap")) {
    resultsDiv.style.display = "none";
  }
});
