const form = document.querySelector("#login-form");
const errorBox = document.querySelector("#login-error");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  errorBox?.classList.add("hidden");

  const payload = Object.fromEntries(new FormData(form).entries());
  try {
    const response = await fetch("../api/auth.php?action=login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || "Login gagal.");

    window.location.href = result.user.role_code === "KASIR" ? "../kasir/" : "../admin/dashboard.html";
  } catch (error) {
    errorBox.textContent = error.message;
    errorBox.classList.remove("hidden");
  }
});
