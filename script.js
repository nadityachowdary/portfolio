const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navWrap = document.querySelector(".nav-wrap");

navToggle.addEventListener("click", () => {
  const open = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!open));
  navLinks.classList.toggle("is-open", !open);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }
});

const onScroll = () => {
  navWrap.classList.toggle("is-scrolled", window.scrollY > 12);
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const filterButtons = document.querySelectorAll(".filter");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("is-active"));
    button.classList.add("is-active");

    const filter = button.dataset.filter;
    projectCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("is-hidden", !show);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  revealObserver.observe(el);
});

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navItems.forEach((link) => {
        link.classList.toggle(
          "is-active",
          link.getAttribute("href") === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

const form = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

const CONTACT_EMAIL = "adithyachowdaryNallamothu@gmail.com";

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const message = form.querySelector("#message").value.trim();

  const subject = `Portfolio enquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodedSubject}&body=${encodedBody}`;

  formNote.innerHTML = `Thanks${name ? `, ${name}` : ""}! Choose how to send: <a href="${mailto}">open your email app</a> or <a href="${gmail}" target="_blank" rel="noopener">send with Gmail</a>.`;
});

document.getElementById("year").textContent = new Date().getFullYear();
