// holiday-theme.js

// Calculate Easter Sunday for given year (returns Date)
function calculateEaster(year) {
  const f = Math.floor,
    G = year % 19,
    C = f(year / 100),
    H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30,
    I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11)),
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    L = I - J,
    month = 3 + f((L + 40) / 44),
    day = L + 28 - 31 * f(month / 4);
  return new Date(year, month - 1, day);
}

function getThemeClass() {
  const now = new Date();
  const year = now.getFullYear();

  // Fourth of July: July 3-5 inclusive
  if (now.getMonth() === 6 && now.getDate() >= 10 && now.getDate() <= 15) {
    return "fourth-of-july";
  }

  // Easter: between Good Friday (2 days before Easter) and Easter Monday (1 day after Easter)
  const easter = calculateEaster(year);
  const goodFriday = new Date(easter);
  goodFriday.setDate(easter.getDate() - 2);
  const easterMonday = new Date(easter);
  easterMonday.setDate(easter.getDate() + 1);

  if (now >= goodFriday && now <= easterMonday) {
    return "easter";
  }

  // St. Patrick's Day: March 16-18 inclusive (give some wiggle room)
  if (now.getMonth() === 2 && now.getDate() >= 16 && now.getDate() <= 18) {
    return "st-patricks";
  }

  return null;
}

const themeClass = getThemeClass();

if (themeClass) {
  // Inject CSS dynamically
  const style = document.createElement("style");
  style.textContent = `
    body { transition: background 0.5s ease, color 0.5s ease; }
    body.fourth-of-july {
      background-color: #001f3f;
      color: white;
    }
    body.fourth-of-july header {
      background-color: #ff4136;
      color: white;
    }
    body.easter {
      background-color: #fff0f5;
      color: #ff69b4;
    }
    body.easter header {
      background-color: #ffd700;
      color: #663399;
    }
    body.st-patricks {
      background-color: #003300;
      color: #ccffcc;
    }
    body.st-patricks header {
      background-color: #228B22;
      color: white;
    }
  `;
  document.head.appendChild(style);

  // Add class on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      document.body.classList.add(themeClass);
    });
  } else {
    document.body.classList.add(themeClass);
  }
}
