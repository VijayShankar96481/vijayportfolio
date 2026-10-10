/* =========================================================
   script.js
   Handles: mobile menu, project pop-ups, footer year,
   and screen-reader text for the skill bars.
   You normally do not need to edit this file.
   ========================================================= */

(() => {
  "use strict";

  /* ---------- Footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Mobile menu ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("nav-links");

  function setMenu(open) {
    if (!toggle || !links) return;
    toggle.setAttribute("aria-expanded", String(open));
    links.classList.toggle("open", open);
  }

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close the menu after choosing a link, pressing Escape, or clicking elsewhere
    links.addEventListener("click", (event) => {
      if (event.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenu(false);
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest(".site-nav")) setMenu(false);
    });
    window.matchMedia("(min-width: 861px)").addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });
  }

  /* ---------- Project pop-ups ----------
     Each card has data-project="project-1"; the matching <template id="project-1">
     in index.html holds the text that appears in the pop-up. */
  const dialog = document.getElementById("project-dialog");
  const dialogBody = dialog ? dialog.querySelector(".dialog-body") : null;

  if (dialog && dialogBody) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => {
        const template = document.getElementById(card.dataset.project);
        if (!template) return;

        dialogBody.replaceChildren(template.content.cloneNode(true));
        const heading = dialogBody.querySelector("h3");
        dialog.setAttribute("aria-label", heading ? heading.textContent : "Project details");

        document.documentElement.classList.add("modal-open");
        if (typeof dialog.showModal === "function") {
          dialog.showModal();
        } else {
          dialog.setAttribute("open", "");
        }
        dialog.scrollTop = 0;
      });
    });

    dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());

    // Clicking the dark area outside the box closes it
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener("close", () => {
      document.documentElement.classList.remove("modal-open");
    });
  }

  /* ---------- Skill bars: add the percentage for screen readers ---------- */
  document.querySelectorAll(".skill").forEach((skill) => {
    const level = skill.style.getPropertyValue("--level").trim();
    const label = skill.querySelector(".skill-fill");
    if (!level || !label) return;

    const hidden = document.createElement("span");
    hidden.className = "visually-hidden";
    hidden.textContent = `, ${level} percent`;
    label.appendChild(hidden);
  });
})();
