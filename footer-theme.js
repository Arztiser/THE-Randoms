// footer-theme.js
function updateFooterTheme() {
  const footer = document.querySelector('footer.site-footer');
  if (!footer) return;

  let bgColor = '#333'; // default
  let textColor = '#f2f2f2'; // default

  if (document.body.classList.contains('holiday-christmas')) {
    bgColor = '#E82B38';
    textColor = '#ffffff';
  } else if (document.body.classList.contains('holiday-halloween')) {
    bgColor = '#000000';
    textColor = '#ffffff';
  } else if (document.body.classList.contains('holiday-easter')) {
    bgColor = '#6BE2F9';
    textColor = '#acfda2';
  } else if (document.body.classList.contains('holiday-stpatricks')) {
    bgColor = '#008551';
    textColor = '#FFD700';
  } else if (document.body.classList.contains('holiday-fourthofjuly')) {
    bgColor = '#E82B38';
    textColor = '#ffffff';
  } else if (document.body.classList.contains('holiday-valentinesday')) {
    bgColor = '#E82B38';
    textColor = '#ffffff';
  }

  footer.style.backgroundColor = bgColor;
  footer.style.color = textColor;
}

document.addEventListener('DOMContentLoaded', updateFooterTheme);
