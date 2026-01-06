// ===== SCROLL REVEAL ANIMATION =====
const reveals = document.querySelectorAll(".reveal");

// Trigger animation on load for elements already in view (like top sections)
// or use IntersectionObserver for ones that scroll into view
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1 }
);

reveals.forEach((element) => revealObserver.observe(element));

// ===== MOBILE MENU TOGGLE =====
const mobileBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (mobileBtn && navLinks) {
  mobileBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const icon = mobileBtn.querySelector("i");
    if (navLinks.classList.contains("open")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-xmark");
    } else {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  });

  // Close menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      const icon = mobileBtn.querySelector("i");
      if (icon) {
        icon.classList.replace("fa-xmark", "fa-bars");
      }
    });
  });
}

// ===== TYPING EFFECT =====
const typingText = document.querySelector("#typing-text");

if (typingText) {
  const roles = [
    "Software Engineer",
    "Frontend Developer",
    "Web Developer",
    "Tech Enthusiast"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 100;
  let eraseDelay = 50;
  let newTextDelay = 2000;

  function type() {
    if (roleIndex >= roles.length) roleIndex = 0;
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingText.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeDelay = eraseDelay;
    } else {
      typingText.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeDelay = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typeDelay = newTextDelay;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex++;
      typeDelay = 500;
    }

    setTimeout(type, typeDelay);
  }

  document.addEventListener("DOMContentLoaded", type);
}

// ===== MOUSE MOVE EFFECT FOR CARDS =====
const cards = document.querySelectorAll(".card");
if (cards.length > 0) {
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });
}

// ===== CUSTOM CURSOR =====
const cursorDot = document.createElement("div");
cursorDot.classList.add("cursor-dot");

const cursorOutline = document.createElement("div");
cursorOutline.classList.add("cursor-outline");

document.body.appendChild(cursorDot);
document.body.appendChild(cursorOutline);

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  // Dot follows immediately
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Outline follows with slight delay (animation handled by CSS transition or simple JS)
  cursorOutline.animate({
    left: `${posX}px`,
    top: `${posY}px`
  }, { duration: 500, fill: "forwards" });
});
