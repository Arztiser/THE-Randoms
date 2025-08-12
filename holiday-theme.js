// holiday-theme.js

function setHolidayTheme() {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();

  let holidayClass = '';
  let styles = '';

  if ((month === 8 && day >= 11) || (month === 1 && day <= 5)) {
    holidayClass = 'holiday-christmas';
    styles = `
      body.holiday-christmas {
        background-color: #008C6C;
        color: white;
      }
      body.holiday-christmas a {
        color: #ffffff;
      }
      /* Add other Christmas styles here */
    `;
  } else if (month === 10 && day >= 25 && day <= 31) {
    holidayClass = 'holiday-halloween';
    styles = `
      body.holiday-halloween {
        background-color: #331100;
        color: orange;
      }
      body.holiday-halloween a {
        color: #ff6600;
      }
      /* Add other Halloween styles here */
    `;
  } else if (month === 4 && day >= 1 && day <= 10) {
    holidayClass = 'holiday-easter';
    styles = `
      body.holiday-easter {
        background-color: #fff8dc;
        color: #6b4c9a;
      }
      body.holiday-easter a {
        color: #9b59b6;
      }
      /* Add other Easter styles here */
    `;
  } else if (month === 3 && day === 17) {
    holidayClass = 'holiday-stpatricks';
    styles = `
      body.holiday-stpatricks {
        background-color: #006400;
        color: #ffff00;
      }
      body.holiday-stpatricks a {
        color: #32cd32;
      }
      /* Add other St. Patrick's Day styles here */
    `;
  } else if (month === 7 && day === 4) {
    holidayClass = 'holiday-fourthofjuly';
    styles = `
      body.holiday-fourthofjuly {
        background-color: #002868;
        color: white;
      }
      body.holiday-fourthofjuly a {
        color: #bf0a30;
      }
      /* Add other 4th of July styles here */
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
