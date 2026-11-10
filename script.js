
document.addEventListener("DOMContentLoaded", function () {

  "use strict";

  /* ==============================
     Loading Screen
  ============================== */

  const loader = document.getElementById("loader");

  window.addEventListener("load", function () {
    setTimeout(function () {
      loader?.classList.add("hide");
    }, 500);
  });

  // احتياطًا لو تأخر تحميل صورة أو مورد
  setTimeout(function () {
    loader?.classList.add("hide");
  }, 3000);


  /* ==============================
     Sticky Header
  ============================== */

  const header = document.getElementById("header");

  function handleHeader() {
    if (window.scrollY > 50) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleHeader);
  handleHeader();


  /* ==============================
     Mobile Menu
  ============================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  function closeMenu() {
    nav?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
  }

  menuToggle?.addEventListener("click", function () {

    const isOpen = nav.classList.toggle("open");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

  });

  nav?.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (event) {

    if (
      nav &&
      menuToggle &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }

  });


  /* ==============================
     Reveal Animation
  ============================== */

  const revealElements = document.querySelectorAll(".reveal");

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    "IntersectionObserver" in window &&
    !reduceMotion
  ) {

    const observer = new IntersectionObserver(

      function (entries, obs) {

        entries.forEach(function (entry) {

          if (entry.isIntersecting) {

            entry.target.classList.add("is-visible");

            obs.unobserve(entry.target);

          }

        });

      },

      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }

    );

    revealElements.forEach(function (element) {
      observer.observe(element);
    });

  } else {

    revealElements.forEach(function (element) {
      element.classList.add("is-visible");
    });

  }


  /* ==============================
     Gallery Filtering
  ============================== */

  const filterButtons = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

      const filter = button.dataset.filter;

      filterButtons.forEach(function (btn) {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      galleryItems.forEach(function (item) {

        const category = item.dataset.category;

        const shouldShow =
          filter === "all" || filter === category;

        item.hidden = !shouldShow;

      });

    });

  });


  /* ==============================
     Gallery Lightbox
  ============================== */

  const lightbox = document.getElementById("lightbox");

  const lightboxImage = lightbox?.querySelector("img");

  const lightboxClose = lightbox?.querySelector(
    ".lightbox-close"
  );

  galleryItems.forEach(function (item) {

    item.addEventListener("click", function () {

      const image = item.querySelector("img");

      if (!image || !lightbox || !lightboxImage) return;

      lightboxImage.src = image.src;

      lightboxImage.alt = image.alt;

      lightbox.classList.add("active");

      document.body.style.overflow = "hidden";

    });

  });


  function closeLightbox() {

    lightbox?.classList.remove("active");

    document.body.style.overflow = "";

    if (lightboxImage) {
      lightboxImage.src = "";
    }

  }

  lightboxClose?.addEventListener("click", closeLightbox);

  lightbox?.addEventListener("click", function (event) {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeLightbox();
      closeMenu();
    }

  });


  /* ==============================
     FAQ
  ============================== */

  const faqItems = document.querySelectorAll(
    ".faq-list details"
  );

  faqItems.forEach(function (item) {

    item.addEventListener("toggle", function () {

      if (item.open) {

        faqItems.forEach(function (other) {

          if (other !== item) {
            other.open = false;
          }

        });

      }

    });

  });


  /* ==============================
     Current Year
  ============================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* ==============================
     Image Error Handling
  ============================== */

  document.querySelectorAll("img").forEach(function (img) {

    img.addEventListener("error", function () {

      console.warn(
        "الصورة غير موجودة أو لم يتم تحميلها:",
        img.getAttribute("src")
      );

    });

  });


  /* ==============================
     Contact Number Validation
  ============================== */

  document.querySelectorAll(
    'a[href^="tel:"], a[href*="wa.me"]'
  ).forEach(function (link) {

    link.setAttribute("rel", "noopener");

  });

});
