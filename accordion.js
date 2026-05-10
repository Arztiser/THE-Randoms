window.addEventListener('load', () => {
  const topnavRight = document.querySelector('.topnav-right');
  const menuIcon = document.querySelector('.menu-icon');
  const body = document.body;

  // =========================
  // MENU DATA (EDIT ONLY THIS)
  // =========================

  const MENU = [
    {
      title: "Jokes & Fun",
      items: [
        { name: "Jokes", link: "jokes.html" },
        { name: "Memes", link: "memes.html" },
        { name: "Quizzes", link: "quizzes.html" },
        { name: "Would You Rather", link: "wouldyourather.html" }
      ]
    },
    {
      title: "Knowledge & Facts",
      items: [
        { name: "Advice", link: "advice.html" },
        { name: "Facts", link: "facts.html" },
        { name: "Pages", link: "pages.html" },
        { name: "People", link: "people.html" },
        { name: "Quotes", link: "quotes.html" }
      ]
    },
    {
      title: "Music & Videos",
      items: [
        { name: "Songs", link: "songs.html" },
        { name: "Videos", link: "videos.html" }
      ]
    },
    {
      title: "Words, Letters & Numbers",
      items: [
        { name: "Letters", link: "letters.html" },
        { name: "Numbers", link: "numbers.html" },
        { name: "Passwords", link: "passwords.html" },
        { name: "Words", link: "words.html" }
      ]
    }
  ];

  const SPECIAL_LINKS = [
    { name: "Randoms Of The Day", link: "randomsoftheday.html" }
  ];

  // =========================
  // MENU TOGGLE (TOP NAV)
  // =========================

  if (topnavRight && menuIcon) {
    const toggleMenu = () => {
      topnavRight.classList.toggle('active');
      body.classList.toggle('menu-open');
    };

    menuIcon.addEventListener('click', toggleMenu);
    menuIcon.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMenu();
      }
    });
  }

  // =========================
  // BUILD MENU UI
  // =========================

  if (topnavRight) {
    topnavRight.innerHTML = "";

    // Build accordion sections
    MENU.forEach(section => {
      const sectionDiv = document.createElement("div");
      sectionDiv.className = "accordion-section";

      const button = document.createElement("button");
      button.className = "accordion-toggle";
      button.setAttribute("aria-expanded", "false");
      button.textContent = section.title;

      const content = document.createElement("div");
      content.className = "accordion-content";
      content.hidden = true;

      section.items.forEach(item => {
        const a = document.createElement("a");
        a.href = item.link;
        a.textContent = item.name;
        content.appendChild(a);
      });

      sectionDiv.appendChild(button);
      sectionDiv.appendChild(content);
      topnavRight.appendChild(sectionDiv);
    });

    // Build special links (like Randoms Of The Day)
    SPECIAL_LINKS.forEach(item => {
      const div = document.createElement("div");
      div.className = "clickable-section";
      div.tabIndex = 0;
      div.role = "link";
      div.title = item.name;
      div.textContent = item.name;

      div.addEventListener("click", () => {
        window.location.href = item.link;
      });

      div.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          div.click();
        }
      });

      topnavRight.appendChild(div);
    });
  }

  // =========================
  // ACCORDION LOGIC
  // =========================

  const toggles = document.querySelectorAll('.accordion-toggle');

  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.closest('.accordion-section');
      const isOpen = section.classList.contains('open');

      // close others
      document.querySelectorAll('.accordion-section').forEach(s => {
        if (s !== section) {
          s.classList.remove('open');
          const tBtn = s.querySelector('.accordion-toggle');
          const content = s.querySelector('.accordion-content');

          if (tBtn) tBtn.setAttribute('aria-expanded', 'false');
          if (content) content.hidden = true;
        }
      });

      const content = section.querySelector('.accordion-content');

      if (!isOpen) {
        section.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        content.hidden = false;
      } else {
        section.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        content.hidden = true;
      }
    });
  });

  // =========================
  // FOOTER YEAR
  // =========================

  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
