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
const CONTACT_ENDPOINT = `https://flowform.to/${CONTACT_EMAIL}`;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = form.querySelector("#name").value.trim();
  const email = form.querySelector("#email").value.trim();
  const message = form.querySelector("#message").value.trim();
  const submitButton = form.querySelector('button[type="submit"]');
  const originalLabel = submitButton.textContent;

  const subject = `Portfolio enquiry from ${name}`;
  const bodyText = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(bodyText);
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`;
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}&su=${encodedSubject}&body=${encodedBody}`;

  formNote.classList.remove("is-error");
  formNote.classList.add("is-pending");
  formNote.textContent = "Sending your message...";
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  try {
    const payload = new URLSearchParams(new FormData(form));
    payload.set("_subject", subject);
    payload.set("_replyto", email);
    payload.set("_next", `${window.location.href.split("#")[0]}#contact`);

    const response = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });
    const data = await response.json().catch(() => ({}));

    if (!response.ok || data.success !== true) {
      throw new Error(data.message || "Message could not be sent");
    }

    formNote.classList.remove("is-pending");
    formNote.textContent = `Thanks${name ? `, ${name}` : ""}! Your message was sent directly to my inbox.`;
    form.reset();
  } catch (error) {
    formNote.classList.remove("is-pending");
    formNote.classList.add("is-error");
    formNote.innerHTML = `Couldn't send automatically. <a href="${mailto}">Open your email app</a> or <a href="${gmail}" target="_blank" rel="noopener">send with Gmail</a>.`;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalLabel;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
