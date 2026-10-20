// ===== 1. Mobile menu toggle =====
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = menuBtn.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

// Close menu after clicking a link (mobile)
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    const icon = menuBtn.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

// ===== 2. Typing effect (rotating roles under the heading) =====
const headerText = document.querySelector(".header-text");
const typedLine = document.createElement("h2");
typedLine.className = "typed-line";
typedLine.innerHTML = '<span id="typed"></span><span class="cursor">|</span>';
headerText.querySelector("h1").after(typedLine);

const roles = [
  "Full Stack (MERN) Developer",
  "React.js Developer",
  "Node.js Developer",
  "MCA '27 Student",
];
const typedEl = document.getElementById("typed");
let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const current = roles[roleIndex];
  typedEl.textContent = current.substring(0, charIndex);

  if (!deleting && charIndex < current.length) {
    charIndex++;
    setTimeout(typeLoop, 90);
  } else if (!deleting) {
    deleting = true;
    setTimeout(typeLoop, 1500); // pause at full word
  } else if (charIndex > 0) {
    charIndex--;
    setTimeout(typeLoop, 45);
  } else {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(typeLoop, 300);
  }
}
typeLoop();

// ===== 3. Scroll reveal animation =====
const revealTargets = document.querySelectorAll(
  ".profile-img, .about-text, .skills-card, .work-card, .contact-form"
);
revealTargets.forEach((el) => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// ===== 4. Scroll progress bar + back-to-top button =====
const progress = document.createElement("div");
progress.id = "progress-bar";
document.body.appendChild(progress);

const topBtn = document.createElement("button");
topBtn.id = "top-btn";
topBtn.setAttribute("aria-label", "Back to top");
topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(topBtn);

topBtn.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" })
);

// ===== 5. Navbar shadow + active link highlight (scroll spy) =====
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("header[id], section[id]");
const links = document.querySelectorAll(".nav-links a");

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  // progress bar
  progress.style.width = (scrollTop / docHeight) * 100 + "%";

  // navbar shadow
  navbar.classList.toggle("scrolled", scrollTop > 50);

  // back-to-top visibility
  topBtn.classList.toggle("visible", scrollTop > 400);

  // active nav link
  let currentId = "home";
  sections.forEach((sec) => {
    if (scrollTop >= sec.offsetTop - 120) currentId = sec.id;
  });
  links.forEach((a) => {
    const target = a.getAttribute("href").replace("#", "");
    // supports both #work and #works
    const isActive =
      target === currentId || (target === "work" && currentId === "works");
    a.classList.toggle("active", isActive);
  });
}
window.addEventListener("scroll", onScroll);
onScroll();

// ===== 6. Contact form validation =====
const form = document.querySelector(".contact-form");
const msgBox = document.createElement("p");
msgBox.className = "form-msg";
form.appendChild(msgBox);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name || !email || !message) {
    showMsg("Please fill in all fields.", "error");
  } else if (!emailOk) {
    showMsg("Please enter a valid email address.", "error");
  } else {
    // TODO: connect to EmailJS / Formspree / your Node.js backend here
    showMsg(`Thanks ${name}! Your message has been sent.`, "success");
    form.reset();
  }
});

function showMsg(text, type) {
  msgBox.textContent = text;
  msgBox.className = "form-msg " + type;
  setTimeout(() => (msgBox.textContent = ""), 4000);
}

// ===== 7. Auto-update footer year =====
const footerText = document.querySelector(".footer p");
footerText.innerHTML = footerText.innerHTML.replace(
  /\d{4}/,
  new Date().getFullYear()
);