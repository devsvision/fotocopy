const form = document.querySelector("#login-form");
const error = document.querySelector("#login-error");

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const username = data.get("username");
  const password = data.get("password");

  if (username === "admin" && password === "admin123") {
    localStorage.setItem("bct_admin_session", JSON.stringify({ loggedIn: true, at: Date.now() }));
    window.location.href = "dashboard.html";
    return;
  }

  error?.classList.remove("hidden");
});
