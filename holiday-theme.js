// =======================
// Ensure Footer Exists
// =======================
function ensureFooter() {
    let footer = document.querySelector('.site-footer');

    if (!footer) {
        footer = document.createElement('footer');
        footer.className = 'site-footer';
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

        const style = document.createElement('style');
        style.innerHTML = `
            html, body { height: 100%; margin: 0; }
            body { display: flex; flex-direction: column; min-height: 100vh; font-family: 'Jersey 10', sans-serif; }
            main.content, .container, .page-content { flex: 1 0 auto; box-sizing: border-box; }
            footer.site-footer {
                position: relative;
                margin-top: auto;
                width: 100%;
                min-height: 60px;
                background-color: var(--theme-bg-color, #333);
                color: var(--theme-topnav-color, #f2f2f2);
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 20px;
                font-size: 20px;
                z-index: 1000;
                overflow: visible;
            }
            #footer-mascot {
                height: 50px;
                max-height: 100%;
                object-fit: contain;
                cursor: pointer;
                transition: transform 0.2s ease;
            }
            #footer-mascot:hover { transform: scale(1.1) rotate(-5deg); }
        `;
        document.head.appendChild(style);
    }
    return footer;
}

// =======================
// Apply Holiday Theme & Custom Cursor
// =======================
function setHolidayTheme() {
    const footer = ensureFooter();
    const mascotImg = footer.querySelector('#footer-mascot');

    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let holidayClass = '';
    let mascotFile = 'Mascot.png';

    // Default theme
    let bgColor='#fff', textColor='#000', linkColor='#000',
        navBg='#333', navText='#f2f2f2', menuBg='#333', menuText='#f2f2f2',
        hoverBg='rgba(255,255,255,0.1)', hoverText='#fff',
        mainBg='#E82B38', mainText='#fff',
        footerBg='#333', footerText='#f2f2f2';

    // =======================
    // Holiday Checks
    // =======================
    if ((month===12 && day>=25) || (month===12 && day<=31)){
        holidayClass='holiday-christmas'; mascotFile='christmasmascot.png';
        bgColor='#00A53C'; textColor='#fff'; linkColor='#fff';
        navBg='#E82B38'; navText='#fff'; menuBg='#00A53C'; menuText='#fff';
        hoverBg='rgba(255,255,255,0.2)'; mainBg='#E82B38'; mainText='#fff';
        footerBg='#E82B38'; footerText='#fff';
    }
    else if(month===10 && day>=25 && day<=31){
        holidayClass='holiday-halloween'; mascotFile='halloweenmascot.png';
        bgColor='orange'; textColor='black'; linkColor='black';
        navBg='black'; navText='white'; menuBg='black'; menuText='white';
        hoverBg='orange'; mainBg='orange'; mainText='black';
        footerBg='black'; footerText='white';
    }
    else if(month===3 && day===17){
        holidayClass='holiday-stpatricks'; mascotFile='stpatricksmascot.png';
        bgColor='#009E60'; textColor='#FFD700'; linkColor='#FFD700';
        navBg='#008551'; navText='#FFD700'; menuBg='#009E60'; menuText='#FFD700';
        hoverBg='#00A53C'; mainBg='#008551'; mainText='#FFD700';
        footerBg='#008551'; footerText='#FFD700';
    }
    else if(month===7 && day===4){
        holidayClass='holiday-fourthofjuly'; mascotFile='fourthofjulymascot.png';
        bgColor='#1F61C5'; textColor='white'; linkColor='#bf0a30';
        navBg='#E82B38'; navText='#fff'; menuBg='#1F61C5'; menuText='#fff';
        hoverBg='#bf0a30'; mainBg='#E82B38'; mainText='#fff';
        footerBg='#E82B38'; footerText='#fff';
    }
    else if(month===2 && day===14){
        holidayClass='holiday-valentinesday'; mascotFile='valentinesmascot.png';
        bgColor='#E3A8C6'; textColor='white'; linkColor='#E54551';
        navBg='#E82B38'; navText='#fff'; menuBg='#E3A8C6'; menuText='#fff';
        hoverBg='#E54551'; mainBg='#E82B38'; mainText='#fff';
        footerBg='#E82B38'; footerText='#fff';
    }
    else if(month===3 && day===10){
        holidayClass='holiday-birthday'; mascotFile='birthdaymascot.png';
        bgColor='#F3E5AB'; textColor='#F5E5D5'; linkColor='#E54551';
        navBg='#ADCFE9'; navText='#fff'; menuBg='#ADCFE9'; menuText='#fff';
        hoverBg='#8CC4E0'; mainBg='#ADCFE9'; mainText='#fff';
        footerBg='#ADCFE9'; footerText='#fff';
    }
    else if(month===4 && day>=1 && day<=7){
        holidayClass='holiday-easter'; mascotFile='eastermascot.png';
        bgColor='#FFF0F5'; textColor='#6A0DAD'; linkColor='#6A0DAD';
        navBg='#FFD700'; navText='#6A0DAD'; menuBg='#FFF0F5'; menuText='#6A0DAD';
        hoverBg='#FFC0CB'; mainBg='#FFD700'; mainText='#6A0DAD';
        footerBg='#FFD700'; footerText='#6A0DAD';
    }

    if(holidayClass){
        document.body.classList.add(holidayClass);
        if(mascotImg) mascotImg.src=`img/${mascotFile}`;
        document.documentElement.style.backgroundColor=bgColor;
        document.body.style.backgroundColor=bgColor;
        document.body.style.color=textColor;
        document.body.style.setProperty('--theme-bg-color', navBg);
        document.body.style.setProperty('--theme-topnav-color', navText);
        document.body.style.setProperty('--theme-accent-color', mainBg);

        const styleSheet=document.createElement('style');
        styleSheet.innerHTML=`
            body.${holidayClass}{color:${textColor};}
            body.${holidayClass} a{color:${linkColor};}
            body.${holidayClass} .topnav{background-color:${navBg};color:${navText};}
            body.${holidayClass} .topnav a.logo{color:${navText};}
            body.${holidayClass} .topnav .menu-icon{color:${navText};}
            body.${holidayClass} .topnav-right, .accordion-content a, .accordion-toggle{background-color:${menuBg};color:${menuText};}
            body.${holidayClass} .accordion-toggle:hover, body.${holidayClass} .accordion-content a:hover{background-color:${hoverBg};color:${hoverText};}
            body.${holidayClass} .clickable-section{background-color:${mainBg};color:${mainText};}
            body.${holidayClass} .site-footer{background-color:${footerBg};color:${footerText};}
            body.${holidayClass} .site-footer a{color:${footerText};}
        `;
        document.head.appendChild(styleSheet);
    }

    // =======================
    // Custom Cursor (Fully Fixed)
    // =======================
    (function createCursor(){
        const style=document.createElement('style');
        style.innerHTML='body,body *{cursor:none !important;}';
        document.head.appendChild(style);

        const cursor=document.createElement('img');
        cursor.id='custom-cursor';
        cursor.src='img/cursor.png';
        cursor.style.cssText=`
            position:fixed;
            top:0; left:0;
            width:32px; height:32px;
            pointer-events:none;
            transform:translate(-50%,-50%);
            z-index:99999;
            display:block;
        `;
        document.body.appendChild(cursor);

        function updateCursor(e){
            cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
            const el=document.elementFromPoint(e.clientX,e.clientY);
            if(!el) return;
            if(el.matches('a, button, [role="button"], .clickable, .accordion-toggle, .accordion-content a')){
                cursor.src='img/hand.png';
            } else if(el.matches('input, textarea, [contenteditable]')){
                cursor.src='';
            } else {
                cursor.src='img/cursor.png';
            }
        }

        document.addEventListener('mousemove',updateCursor);
        document.addEventListener('mousedown',()=>cursor.src='img/handgrab.png');
        document.addEventListener('mouseup',()=>cursor.src='img/cursor.png');
        document.addEventListener('mouseleave',()=>cursor.style.display='none');
        document.addEventListener('mouseenter',()=>cursor.style.display='block');
    })();
}

// =======================
// Daily Splash Screen
// =======================
document.addEventListener('DOMContentLoaded',()=>{
    setHolidayTheme();

    if(window.location.pathname.endsWith('/')||window.location.pathname.endsWith('index.html')){
        const lastSplash=localStorage.getItem('lastSplashDate');
        const today=new Date().toLocaleDateString();

        if(lastSplash!==today){
            localStorage.setItem('lastSplashDate',today);

            const splash=document.createElement('div');
            splash.id='daily-splash';
            splash.style.cssText=`
                position:fixed;inset:0;
                background:linear-gradient(135deg,#E82B38,#731919);
                display:flex;align-items:center;justify-content:center;
                z-index:9999;opacity:1;transition:opacity 4.5s ease;
            `;

            const logo=document.createElement('img');
            logo.src='img/pofp.png';
            logo.alt='THE Randoms';
            logo.style.width='150px';
            logo.style.borderRadius='50%';

            splash.appendChild(logo);
            document.body.appendChild(splash);

            setTimeout(()=>{splash.style.opacity='0';},500);
            setTimeout(()=>{splash.remove();},4500);
        }
    }
});
