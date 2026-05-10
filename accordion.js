window.addEventListener('load', () => {
  const topnavRight = document.querySelector('.topnav-right');
  const menuIcon = document.querySelector('.menu-icon');
  const body = document.body;

  // Toggle menu
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
  // MENU BUILDER (NEW CORE)
  // =========================

  const MENU = [
    {
      title: "Jokes & Fun",
      items: [
        ["Jokes", "jokes.html"],
        ["Memes", "memes.html"],
        ["Quizzes", "quizzes.html"],
        ["Would You Rather", "wouldyourather.html"]
      ]
    },
    {
      title: "Knowledge & Facts",
      items: [
        ["Advice", "advice.html"],
        ["Facts", "facts.html"],
        ["Pages", "pages.html"],
        ["People", "people.html"],
        ["Quotes", "quotes.html"]
      ]
    },
    {
      title: "Music & Videos",
      items: [
        ["Songs", "songs.html"],
        ["Videos", "videos.html"]
      ]
    },
    {
      title: "Words, Letters & Numbers",
      items: [
        ["Letters", "letters.html"],
        ["Numbers", "numbers.html"],
        ["Passwords", "passwords.html"],
        ["Words", "words.html"]
      ]
    }
  ];

  const nav = document.querySelector('.topnav-right');

  if (nav) {
    nav.innerHTML = ""; // clears old HTML menu

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

      section.items.forEach(([name, link]) => {
        const a = document.createElement("a");
        a.href = link;
        a.textContent = name;
        content.appendChild(a);
      });

      sectionDiv.appendChild(button);
      sectionDiv.appendChild(content);
      nav.appendChild(sectionDiv);
    });

    // Reattach accordion logic AFTER building menu
    const toggles = document.querySelectorAll('.accordion-toggle');

    toggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const section = btn.closest('.accordion-section');
        const isOpen = section.classList.contains('open');

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
  }

  // Clickable section
  document.querySelectorAll('.clickable-section').forEach(cs => {
    cs.addEventListener('click', () => {
      window.location.href = 'randomsoftheday.html';
    });

    cs.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        cs.click();
      }
    });
  });

  // Footer year
  const yearEl = document.querySelector('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
