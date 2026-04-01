// ======================================================
// 1. PRE-PAINT THEME FIX (NO FLASH)
// ======================================================
(function () {
  try {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark-mode");
      document.documentElement.style.backgroundColor = "#121212";
    } else {
      document.documentElement.style.backgroundColor = "#ffffff";
    }
  } catch (e) {}
})();


// ======================================================
// 2. FOOTER CREATION + STICKY FOOTER WRAPPER
// ======================================================
function ensureFooter() {

  let footer = document.querySelector(".site-footer");

  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "site-footer";

    footer.innerHTML = `
      <div class="footer-left">
        <p>&copy; <span id="year"></span> THE Randoms</p>
      </div>
      <div class="footer-right">
        <a href="randuino.html" title="Randuino">
          <img id="footer-mascot" src="img/Mascot.png" alt="Randuino">
        </a>
      </div>
    `;

    document.body.appendChild(footer);
    document.getElementById("year").textContent = new Date().getFullYear();
  }


  let wrapper = document.querySelector(".randoms-wrapper");

  if (!wrapper) {
    wrapper = document.createElement("div");
    wrapper.className = "randoms-wrapper";

    const children = [...document.body.children];

    children.forEach(el => {
      if (el !== footer && el.tagName !== "SCRIPT" && el.tagName !== "STYLE") {
        wrapper.appendChild(el);
      }
    });

    document.body.insertBefore(wrapper, footer);
  }


  if (!document.getElementById("randoms-footer-style")) {

    const style = document.createElement("style");
    style.id = "randoms-footer-style";

    style.textContent = `
      * { box-sizing: border-box; }

      html, body {
        margin:0;
        padding:0;
        height:100%;
        width:100%;
        overflow-x:hidden;
        font-family:'Jersey 10', sans-serif;
      }

      body{
        display:flex;
        flex-direction:column;
        min-height:100vh;
        min-height:100svh;
        transition:background-color .4s ease;
      }

      .randoms-wrapper{
        flex:1 0 auto;
        display:flex;
        flex-direction:column;
        width:100%;
      }

      .randoms-wrapper > *:first-child { margin-top:0; }
      .randoms-wrapper > *:last-child { margin-bottom:0; }

      .site-footer{
        flex-shrink:0;
        min-height:60px;
        width:100%;
        background:#333;
        color:#f2f2f2;
        display:flex;
        justify-content:space-between;
        align-items:center;
        padding:8px 20px;
        font-size:20px;
      }

      #footer-mascot{
        height:50px;
        display:block;
        cursor:pointer;
        transition:transform .2s ease;
      }

      #footer-mascot:hover{
        transform:scale(1.1) rotate(-5deg);
      }
    `;

    document.head.appendChild(style);
  }

  return footer;
}



// ======================================================
// 3. CONFETTI & SNOW ENGINES
// ======================================================

function triggerBirthdayConfetti() {

  const isHomepage =
    location.pathname === "/" ||
    location.pathname.endsWith("index.html");

  if (isHomepage) {

    const script = document.createElement("script");

    script.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";

    script.onload = () => {

      let duration = 3000;
      let animationEnd = Date.now() + duration;

      let interval = setInterval(() => {

        let timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          particleCount:50,
          startVelocity:30,
          spread:360,
          ticks:60,
          zIndex:9999,
          origin:{
            x:Math.random(),
            y:Math.random() - .2
          }
        });

      },250);

    };

    document.head.appendChild(script);
  }
}



function startSnow(){

  const snowContainer = document.createElement("div");

  snowContainer.style.cssText =
  "position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9998;overflow:hidden;";

  document.body.appendChild(snowContainer);


  const style = document.createElement("style");

  style.textContent = `
    .snowflake{
      position:absolute;
      top:-10px;
      background:white;
      border-radius:50%;
      opacity:.8;
      animation:fall linear infinite;
    }

    @keyframes fall{
      0%{transform:translateY(0) translateX(0)}
      100%{transform:translateY(100vh) translateX(20px)}
    }
  `;

  document.head.appendChild(style);


  for(let i=0;i<50;i++){

    let flake = document.createElement("div");
    flake.className = "snowflake";

    let size = Math.random()*5 + 2 + "px";

    flake.style.width = size;
    flake.style.height = size;

    flake.style.left = Math.random()*100 + "vw";
    flake.style.animationDuration = Math.random()*3 + 2 + "s";
    flake.style.animationDelay = Math.random()*5 + "s";

    snowContainer.appendChild(flake);
  }
}



// ======================================================
// 4. HOLIDAY THEME ENGINE
// ======================================================

function applyHolidayTheme(){

  const footer = ensureFooter();
  const mascot = footer.querySelector("#footer-mascot");

  const now = new Date();

  const m = now.getMonth() + 1;
  const d = now.getDate();


  let theme = {

    class:"",

    mascot:"Mascot.png",

    bgColor:"#fff",
    textColor:"#000",

    linkColor:"#000",

    navBg:"#333",
    navText:"#f2f2f2",

    menuBg:"#333",
    menuText:"#f2f2f2",

    hoverBg:"rgba(255,255,255,.1)",
    hoverText:"#fff",

    mainBg:"#E82B38",
    mainText:"#fff",

    footerBg:"#333",
    footerText:"#f2f2f2"

  };



  // Christmas
  if(m === 12){

    theme = {
      ...theme,
      class:"holiday-christmas",
      mascot:"christmasmascot.png",

      bgColor:"#00A53C",
      textColor:"#ffffff",

      linkColor:"#ffffff",

      navBg:"#E82B38",
      navText:"#ffffff",

      menuBg:"#00A53C",
      menuText:"#ffffff",

      hoverBg:"rgba(255,255,255,.2)",

      mainBg:"#E82B38",

      footerBg:"#E82B38",
      footerText:"#ffffff"
    };

    startSnow();
  }



  // Halloween
  else if(m === 10 && d >= 25){

    theme = {
      ...theme,
      class:"holiday-halloween",
      mascot:"halloweenmascot.png",

      bgColor:"orange",
      textColor:"black",

      linkColor:"black",

      navBg:"black",
      navText:"white",

      menuBg:"black",
      menuText:"white",

      hoverBg:"orange",

      mainBg:"orange",
      mainText:"black",

      footerBg:"black",
      footerText:"white"
    };
  }



  // St Patrick
  else if(m === 3 && d === 17){

    theme = {
      ...theme,
      class:"holiday-stpatricks",
      mascot:"stpatricksmascot.png",

      bgColor:"#009E60",
      textColor:"#FFD700",

      linkColor:"#FFD700",

      navBg:"#008551",
      navText:"#FFD700",

      menuBg:"#009E60",
      menuText:"#FFD700",

      hoverBg:"#00A53C",

      mainBg:"#008551",
      mainText:"#FFD700",

      footerBg:"#008551",
      footerText:"#FFD700"
    };
  }



  // Fourth of July
  else if(m === 7 && d === 4){

    theme = {
      ...theme,
      class:"holiday-fourthofjuly",
      mascot:"fourthofjulymascot.png",

      bgColor:"#1F61C5",
      textColor:"white",

      linkColor:"#bf0a30",

      navBg:"#E82B38",
      navText:"#fff",

      menuBg:"#1F61C5",
      menuText:"#fff",

      hoverBg:"#bf0a30",

      mainBg:"#E82B38",

      footerBg:"#E82B38",
      footerText:"#fff"
    };
  }



  // Valentines
  else if(m === 2 && d === 14){

    theme = {
      ...theme,
      class:"holiday-valentinesday",
      mascot:"valentinesmascot.png",

      bgColor:"#E3A8C6",
      textColor:"white",

      linkColor:"#E54551",

      navBg:"#E82B38",
      navText:"#fff",

      menuBg:"#E3A8C6",
      menuText:"#fff",

      hoverBg:"#E54551",

      mainBg:"#E82B38",

      footerBg:"#E82B38",
      footerText:"#fff"
    };
  }



  // Birthday
  else if(m === 3 && d === 10){

    theme = {
      ...theme,
      class:"holiday-birthday",
      mascot:"birthdaymascot.png",

      bgColor:"#F3E5AB",
      textColor:"#333",

      linkColor:"#E54551",

      navBg:"#ADCFE9",
      navText:"#2C5E7B",

      menuBg:"#ADCFE9",
      menuText:"#2C5E7B",

      hoverBg:"#8CC4E0",

      mainBg:"#F3E5AB",
      mainText:"#333",

      footerBg:"#ADCFE9",
      footerText:"#2C5E7B"
    };

    triggerBirthdayConfetti();
  }



  // Easter
  else if(m === 4 && d <= 7){

    theme = {
      ...theme,
      class:"holiday-easter",
      mascot:"Mascot.png",

      bgColor:"#FFF0F5",
      textColor:"#6A0DAD",

      linkColor:"#6A0DAD",

      navBg:"#FFF49B",
      navText:"#6A0DAD",

      menuBg:"#FFF0F5",
      menuText:"#6A0DAD",

      hoverBg:"#FFC0CB",

      mainBg:"#FFF49B",
      mainText:"#6A0DAD",

      footerBg:"FFF49B",
      footerText:"#6A0DAD"
    };
  }



  if(theme.class){

    document.body.classList.remove(
      "holiday-christmas",
      "holiday-halloween",
      "holiday-stpatricks",
      "holiday-fourthofjuly",
      "holiday-valentinesday",
      "holiday-birthday",
      "holiday-easter"
    );

    document.body.classList.add(theme.class);

    document.body.style.setProperty(
      "background-color",
      theme.bgColor,
      "important"
    );


    let styleSheet = document.getElementById("holiday-style");

    if(!styleSheet){

      styleSheet = document.createElement("style");
      styleSheet.id = "holiday-style";
      document.head.appendChild(styleSheet);

    }


    styleSheet.textContent = `
      body.${theme.class}{color:${theme.textColor}!important}
      body.${theme.class} a{color:${theme.linkColor}!important}

      body.${theme.class} .topnav{
        background:${theme.navBg}!important;
        color:${theme.navText}!important
      }

      body.${theme.class} .topnav a.logo,
      body.${theme.class} .topnav .menu-icon{
        color:${theme.navText}!important
      }

      body.${theme.class} .topnav-right,
      body.${theme.class} .accordion-toggle,
      body.${theme.class} .accordion-content a{
        background:${theme.menuBg}!important;
        color:${theme.menuText}!important
      }

      body.${theme.class} .accordion-toggle:hover,
      body.${theme.class} .accordion-content a:hover{
        background:${theme.hoverBg}!important;
        color:${theme.hoverText || theme.menuText}!important
      }

      body.${theme.class} .clickable-section{
        background:${theme.mainBg}!important;
        color:${theme.mainText}!important
      }

      body.${theme.class} .site-footer{
        background:${theme.footerBg}!important;
        color:${theme.footerText}!important
      }

      body.${theme.class} .site-footer a{
        color:${theme.footerText}!important
      }
    `;

    if(mascot){
      mascot.src = `img/${theme.mascot}`;
    }

  }

}



// ======================================================
// 5. DARK MODE
// ======================================================

function initDarkMode(){

  const query =
    window.matchMedia("(prefers-color-scheme: dark)");

  let style =
    document.getElementById("dark-mode-style") ||
    document.createElement("style");

  style.id = "dark-mode-style";

  document.head.appendChild(style);


  style.textContent = `

    html.dark-mode body:not([class*="holiday-"]){
      background:#121212!important;
      color:#e5e5e5!important
    }

    html.dark-mode body:not([class*="holiday-"]) a{
      color:#ffffff!important
    }

    html.dark-mode body:not([class*="holiday-"]) .topnav,
    html.dark-mode body:not([class*="holiday-"]) .site-footer{
      background:#e82b38!important;
      color:#fff!important
    }

    html.dark-mode body:not([class*="holiday-"]) .accordion-toggle{
      background:#121212!important;
      color:#fff!important
    }

    html.dark-mode body:not([class*="holiday-"]) .accordion-content{
      background:#121212!important
    }

    html.dark-mode body:not([class*="holiday-"]) .topnav-right{
      background:#121212!important
    }
  `;


  function apply(e){
    document.documentElement.classList.toggle(
      "dark-mode",
      e.matches
    );
  }

  apply(query);

  query.addEventListener("change",apply);
}



// ======================================================
// 6. DAILY HOME SPLASH
// ======================================================

function showDailySplash(){

  if(
    !location.pathname.endsWith("/") &&
    !location.pathname.endsWith("index.html")
  ) return;

  const today =
    new Date().toLocaleDateString();

  if(localStorage.getItem("lastSplashDate") === today) return;

  localStorage.setItem("lastSplashDate",today);


  const splash = document.createElement("div");

  splash.style.cssText =
  "position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#E82B38,#731919);z-index:9999;transition:opacity 2s ease;";


  const logo = document.createElement("img");

  logo.src = "img/pofp.png";
  logo.style.width = "150px";
  logo.style.borderRadius = "50%";

  splash.appendChild(logo);

  document.body.appendChild(splash);


  setTimeout(()=>{

    splash.style.opacity = "0";

    setTimeout(()=>{
      splash.remove();
    },2000);

  },500);
}



// ======================================================
// 7. INIT
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

  ensureFooter();

  initDarkMode();

  applyHolidayTheme();

  showDailySplash();

});
