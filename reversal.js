
    // Remove injected dark mode style
const injectedStyles = document.querySelectorAll('style');
injectedStyles.forEach(style => {
  if (style.innerHTML.includes('body.dark-mode') || style.innerHTML.includes('#topnav-icons')) {
    style.remove();
  }
});

// Remove the dark mode icon container
const topnavIcons = document.getElementById('topnav-icons');
if (topnavIcons) topnavIcons.remove();

// Remove dark-mode class from body
document.body.classList.remove('dark-mode');

// Reset topnav styles
const topnav = document.querySelector('.topnav');
if (topnav) {
  topnav.style.display = 'flex';
  topnav.style.justifyContent = 'space-between';
  topnav.style.alignItems = 'center';
  topnav.style.padding = '0 16px';
}

// Reset hamburger menu if it got moved
const menuIcon = document.querySelector('.menu-icon');
if (menuIcon) {
  menuIcon.style.marginLeft = '';
  menuIcon.style.order = '';
}

// Reset logo style
const logo = document.querySelector('.logo');
if (logo) {
  logo.style.marginLeft = '';
  logo.style.order = '';
  logo.style.color = '';
}
