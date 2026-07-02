// ==========================================================
// GRAB COMMONLY USED ELEMENTS
// ==========================================================
const navLinks = document.getElementById("navLinks");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const navLinkItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");


// ==========================================================
// MOBILE MENU TOGGLE
// ==========================================================
function toggleMobileMenu() {
  navLinks.classList.toggle("show");
}

hamburgerBtn.addEventListener("click", toggleMobileMenu);

// close the mobile menu after a link is clicked
navLinkItems.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("show");
  });
});


// ==========================================================
// DARK / LIGHT MODE TOGGLE
// ==========================================================
function applySavedTheme() {
  const savedTheme = localStorage.getItem("portfolioTheme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggleBtn.textContent = "☀️";
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "☀️";
    localStorage.setItem("portfolioTheme", "dark");
  } else {
    themeToggleBtn.textContent = "🌙";
    localStorage.setItem("portfolioTheme", "light");
  }
}

themeToggleBtn.addEventListener("click", toggleTheme);
applySavedTheme();


// ==========================================================
// ACTIVE NAVIGATION LINK ON SCROLL
// ==========================================================
function highlightActiveNavLink() {
  let currentSectionId = "";

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSectionId = section.getAttribute("id");
    }
  });

  navLinkItems.forEach(function (link) {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + currentSectionId) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", highlightActiveNavLink);


// ==========================================================
// TYPING EFFECT (HERO SECTION)
// ==========================================================
const typedTextEl = document.getElementById("typedText");

const typingPhrases = [
  "Aspiring Software Developer",
  "Web Development Enthusiast",
  "Final Year B.Tech Student"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function runTypingEffect() {
  const currentPhrase = typingPhrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedTextEl.textContent = currentPhrase.substring(0, charIndex);

  let typingSpeed = isDeleting ? 60 : 110;

  // finished typing the full phrase, pause then start deleting
  if (!isDeleting && charIndex === currentPhrase.length) {
    typingSpeed = 1500;
    isDeleting = true;
  }
  // finished deleting, move to the next phrase
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    typingSpeed = 400;
  }

  setTimeout(runTypingEffect, typingSpeed);
}

runTypingEffect();


// ==========================================================
// SCROLL TO TOP BUTTON
// ==========================================================
function handleScrollTopButton() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add("show");
  } else {
    scrollTopBtn.classList.remove("show");
  }
}

window.addEventListener("scroll", handleScrollTopButton);

scrollTopBtn.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// ==========================================================
// REVEAL SECTIONS ON SCROLL (using IntersectionObserver)
// ==========================================================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});


// ==========================================================
// PROJECT FILTER (All / Web / Java)
// ==========================================================
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // update active button styling
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    const selectedFilter = button.getAttribute("data-filter");

    projectCards.forEach(function (card) {
      const cardCategory = card.getAttribute("data-category");

      if (selectedFilter === "all" || selectedFilter === cardCategory) {
        card.classList.remove("hidden-project");
      } else {
        card.classList.add("hidden-project");
      }
    });
  });
});


// ==========================================================
// CONTACT FORM VALIDATION
// ==========================================================
const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const formSuccess = document.getElementById("formSuccess");

// simple email format check
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateName() {
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    nameInput.classList.add("input-error");
    return false;
  }
  nameError.textContent = "";
  nameInput.classList.remove("input-error");
  return true;
}

function validateEmail() {
  if (emailInput.value.trim() === "") {
    emailError.textContent = "Please enter your email.";
    emailInput.classList.add("input-error");
    return false;
  }
  if (!isValidEmail(emailInput.value.trim())) {
    emailError.textContent = "Please enter a valid email address.";
    emailInput.classList.add("input-error");
    return false;
  }
  emailError.textContent = "";
  emailInput.classList.remove("input-error");
  return true;
}

function validateMessage() {
  if (messageInput.value.trim() === "") {
    messageError.textContent = "Please enter a message.";
    messageInput.classList.add("input-error");
    return false;
  }
  if (messageInput.value.trim().length < 10) {
    messageError.textContent = "Message should be at least 10 characters.";
    messageInput.classList.add("input-error");
    return false;
  }
  messageError.textContent = "";
  messageInput.classList.remove("input-error");
  return true;
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isMessageValid = validateMessage();

  if (isNameValid && isEmailValid && isMessageValid) {
    formSuccess.textContent = "Thanks for reaching out! I will get back to you soon.";
    contactForm.reset();

    // clear the success message after a few seconds
    setTimeout(function () {
      formSuccess.textContent = "";
    }, 4000);
  } else {
    formSuccess.textContent = "";
  }
});


// ==========================================================
// FOOTER - CURRENT YEAR
// ==========================================================
document.getElementById("currentYear").textContent = new Date().getFullYear();
