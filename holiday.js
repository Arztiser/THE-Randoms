(function() {
  function getEaster(year) {
    const f = Math.floor,
          G = year % 19,
          C = f(year / 100),
          H = (C - f(C/4) - f((8*C + 13)/25) + 19*G + 15) % 30,
          I = H - f(H/28)*(1 - f(29/(H+1))*f((21-G)/11)),
          J = (year + f(year/4) + I + 2 - C + f(C/4)) % 7,
          L = I - J,
          month = 3 + f((L + 40) / 44),
          day = L + 28 - 31*f(month/4);
    return { month, day };
  }

  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const year = today.getFullYear();
  const easter = getEaster(year);

  const holidays = {
    "christmas":  month === 12 && day === 25,
    "halloween":  month === 10 && day === 31,
    "st-patricks": month === 3 && day === 17,
    "fourth-of-july": month === 7 && day === 4,
    "easter": month === easter.month && day === easter.day
  };

  for (const [name, isToday] of Object.entries(holidays)) {
    if (isToday) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "holiday-theme.css";
      link.setAttribute("data-holiday", name);
      document.head.appendChild(link);
      document.documentElement.setAttribute("data-holiday", name);
      break;
    }
  }
})();
