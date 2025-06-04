"use strict";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("students");
  const searchInput = document.getElementById("search");

  // Carga el JSON local
  const response = await fetch('./file.json');
  const data = await response.json();

  // Renderiza estudiantes
  const render = (filter = "") => {
    container.innerHTML = "";
    data
      .filter(s => s.student.toLowerCase().includes(filter.toLowerCase()))
      .forEach(student => {
        const card = document.createElement("div");
        card.className = "card";

        const imgSrc = student.usernameGithub
          ? `https://github.com/${student.usernameGithub}.png`
          : "images/placeholder.png";

        const projectsHTML = student.projects.map(project => `
          <h4>${project.name} 
            <span class="score">(${project.score.join(", ")})</span>
          </h4>
        `).join("");

        card.innerHTML = `
          <img src="${imgSrc}" alt="Foto de ${student.student}">
          <h3>${student.student}</h3>
          <div class="intensity">${student.intensity}</div>
          <div class="projects">${projectsHTML}</div>
        `;
        container.appendChild(card);
      });
  };

  // Buscador
  searchInput.addEventListener("input", e => render(e.target.value));

  render(); // Primera carga
});
