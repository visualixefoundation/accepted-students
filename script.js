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

function showView(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const target = document.getElementById("view-" + id);
  if (target) target.classList.add("active");
}

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => showView(btn.dataset.target));
});

document.querySelectorAll("[data-back]").forEach(btn => {
  btn.addEventListener("click", () => showView("home"));
});

const searchBox = document.getElementById("searchBox");
const resultsDiv = document.getElementById("results");

searchBox.addEventListener("input", function () {
  const query = this.value.toLowerCase().trim();
  resultsDiv.innerHTML = "";
  if (query.length > 1) {
    const matches = students.filter(s => s.name.toLowerCase().includes(query));
    resultsDiv.style.display = "block";
    if (matches.length) {
      matches.forEach(s => {
        const item = document.createElement("p");
        item.innerHTML = `<strong>${s.name}</strong> — <a href="${s.url}">${s.program}</a>`;
        resultsDiv.appendChild(item);
      });
    } else {
      resultsDiv.innerHTML = '<p style="color:#888">No matches found.</p>';
    }
  } else {
    resultsDiv.style.display = "none";
  }
});

document.addEventListener("click", e => {
  if (!e.target.closest(".search-wrap")) {
    resultsDiv.style.display = "none";
  }
});
