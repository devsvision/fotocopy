import { loginWithEmail } from "../services/authService.js";
import { isSupabaseConfigured } from "../services/supabaseClient.js";

const form = document.querySelector("#login-form");
const message = document.querySelector("#auth-message");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  setMessage("", "");
  const payload = Object.fromEntries(new FormData(form).entries());

  try {
    if (!isSupabaseConfigured()) {
      localStorage.setItem("bct_demo_profile", JSON.stringify({ role: "super_admin", name: "Demo Super Admin" }));
      window.location.href = "../dashboard/";
      return;
    }

    await loginWithEmail(payload.email, payload.password);
    window.location.href = "../dashboard/";
  } catch (error) {
    setMessage(error.message || "Login gagal.", "error");
  }
});

function setMessage(text, type) {
  if (!text) {
    message.classList.add("hidden");
    return;
  }
  message.textContent = text;
  message.className = `rounded-xl px-4 py-3 text-sm ${type === "error" ? "border border-red-400/30 bg-red-500/10 text-red-200" : "border border-cyan-300/30 bg-cyan-500/10 text-cyan-100"}`;
}
