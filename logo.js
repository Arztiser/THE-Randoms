document.addEventListener("DOMContentLoaded", () => {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      const url = chrome.runtime.getURL("index.html");

      // Open homepage in the same tab
      window.location.assign(url);
    });
  }
});
