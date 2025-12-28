function generatePassword(length = 12) {
  const charset = 
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789" +
    "!@#$%^&*()_+-=[]{}|;:,.<>?";

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("password-container");
  const button = document.getElementById("generate-button");

  button.addEventListener("click", () => {
    container.textContent = generatePassword();
  });
});
