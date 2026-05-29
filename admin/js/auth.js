const form = document.querySelector("#login-form");
const error = document.querySelector("#login-error");

checkProductionSession();

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

async function checkProductionSession() {
  try {
    const response = await fetch("../api/auth.php?action=me");
    const result = await response.json();
    if (result.user) {
      localStorage.setItem("bct_admin_session", JSON.stringify({ loggedIn: true, user: result.user, at: Date.now() }));
      window.location.href = "dashboard.html";
    }
  } catch (error) {
    // Keep localStorage demo login when PHP is not running locally.
  }
}
