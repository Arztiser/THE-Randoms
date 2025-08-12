// holiday-theme.js
(function(){
  const now = new Date();

  // Uncomment to test specific date
  // const now = new Date('2025-12-25');

  const month = now.getMonth() + 1;
  const day = now.getDate();

  let holidayClass = '';

  if ((month === 12 && day >= 15) || (month === 1 && day <= 5)) {
    holidayClass = 'holiday-christmas';
  } else if (month === 10 && day >= 25 && day <= 31) {
    holidayClass = 'holiday-halloween';
  } else if (month === 4 && day >= 1 && day <= 10) {
    holidayClass = 'holiday-easter';
  } else if (month === 3 && day === 17) {
    holidayClass = 'holiday-stpatricks';
  } else if (month === 7 && day === 4) {
    holidayClass = 'holiday-fourthofjuly';
  }

  if (holidayClass) document.body.classList.add(holidayClass);
})();
