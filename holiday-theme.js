// holiday-theme.js

function setHolidayTheme() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1–12
  const day = now.getDate();

  let holidayClass = '';
  let styles = '';

  if ((month === 12 && day >= 1) || (month === 1 && day <= 5)) {
    // Christmas
    holidayClass = 'holiday-christmas';
    styles = `
      body.holiday-christmas {
        background-color: #00A53C;
        color: white;
      }
      body.holiday-christmas a {
        color: #ffffff;
      }
      body.holiday-christmas .topnav {
        background-color: #E82B38; /* Christmas topnav red */
      }
      body.holiday-christmas .topnav a {
        color: white;
      }
    `;
  } else if (month === 10 && day >= 25 && day <= 31) {
    // Halloween
    holidayClass = 'holiday-halloween';
    styles = `
      body.holiday-halloween {
        background-color: orange;
        color: black;
      }
      body.holiday-halloween a {
        color: black;
      }
      body.holiday-halloween .topnav {
        background-color: black;
      }
      body.holiday-halloween .topnav a {
        color: white;
      }
    `;
  } else if (month === 8 && day >= 11 && day <= 13) {
    // Easter
    holidayClass = 'holiday-easter';
    styles = `
      body.holiday-easter {
        background-color: #fff8dc;
        color: #6b4c9a;
      }
      body.holiday-easter a {
        color: #9b59b6;
      }
      /* No special topnav changes for Easter */
    `;
  } else if (month === 3 && day === 17) {
    // St. Patrick's Day
    holidayClass = 'holiday-stpatricks';
    styles = `
      body.holiday-stpatricks {
        background-color: #006400;
        color: #FFD700; /* Gold text */
      }
      body.holiday-stpatricks a {
        color: #FFD700;
      }
      body.holiday-stpatricks .topnav {
        background-color: #006400; /* Green topnav */
      }
      body.holiday-stpatricks .topnav a {
        color: #FFD700; /* Gold text in nav */
      }
    `;
  } else if (month === 7 && day === 4) {
    // 4th of July
    holidayClass = 'holiday-fourthofjuly';
    styles = `
      body.holiday-fourthofjuly {
        background-color: #002868;
        color: white;
      }
      body.holiday-fourthofjuly a {
        color: #bf0a30;
      }
      body.holiday-fourthofjuly .topnav {
        background-color: #E82B38; /* Red topnav same as Christmas */
      }
      body.holiday-fourthofjuly .topnav a {
        color: white;
      }
    `;
  }

  if (holidayClass) {
    document.body.classList.add(holidayClass);

    // Inject the CSS dynamically into the head
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
  }
}

document.addEventListener('DOMContentLoaded', setHolidayTheme);
