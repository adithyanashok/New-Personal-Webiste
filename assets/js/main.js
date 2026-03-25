(function () {
  "use strict";

  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const navLinks = Array.from(document.querySelectorAll(".site-nav a[href^='#']"));
  const menuToggle = document.querySelector(".menu-toggle");
  const revealItems = document.querySelectorAll(".reveal");
  const sectionTargets = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const closeMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    if (!nav || !menuToggle) return;
    nav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      const expanded = menuToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  const updateHeaderState = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const isMatch = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("is-active", isMatch);
    });
  };

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    {
      threshold: 0.45,
      rootMargin: "-15% 0px -40% 0px",
    }
  );

  sectionTargets.forEach((section) => sectionObserver.observe(section));

  document.addEventListener("click", (event) => {
    if (!nav || !menuToggle) return;
    const clickedInsideNav = nav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", updateHeaderState, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMenu();
    }
  });

  updateHeaderState();
})();
