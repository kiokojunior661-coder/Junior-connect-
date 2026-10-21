

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

let supabaseClient = null;

if (
  window.supabase &&
  SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL" &&
  SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY"
) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
  );
}

document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const emailInput = form.querySelector(
        'input[type="email"], input[name="email"]'
      );
      const passwordInput = form.querySelector(
        'input[type="password"], input[name="password"]'
      );
      const nameInput = form.querySelector(
        'input[name="name"], input[name="full_name"]'
      );

      const email = emailInput?.value.trim();
      const password = passwordInput?.value;
      const name = nameInput?.value.trim();

      if (!email || !password) {
        alert("Please enter your email and password.");
        return;
      }

      if (!supabaseClient) {
        alert(
          "Supabase setup is not connected yet. Please configure your project URL and publishable key."
        );
        return;
      }

      const button = form.querySelector(
        'button[type="submit"], input[type="submit"]'
      );

      if (button) button.disabled = true;

      try {
        const isRegister =
          form.id.toLowerCase().includes("register") ||
          form.id.toLowerCase().includes("signup") ||
          form.dataset.action === "register";

        if (isRegister) {
          const { data, error } =
            await supabaseClient.auth.signUp({
              email,
              password,
              options: {
                data: { full_name: name || "" }
              }
            });

          if (error) throw error;

          alert(
            data.user?.identities?.length === 0
              ? "This account may already exist. Try signing in."
              : "Registration submitted! Check your email if confirmation is required."
          );
        } else {
          const { error } =
            await supabaseClient.auth.signInWithPassword({
              email,
              password
            });

          if (error) throw error;

          alert("Login successful! Welcome to Junior Connect.");
          window.location.href = "dashboard.html";
        }
      } catch (error) {
        alert("Error: " + error.message);
      } finally {
        if (button) button.disabled = false;
      }
    });
  });

  const logoutButton = document.querySelector("#logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", async () => {
      if (!supabaseClient) {
        alert("Supabase is not connected yet.");
        return;
      }

      const { error } = await supabaseClient.auth.signOut();

      if (error) {
        alert(error.message);
        return;
      }

      window.location.href = "index.html";
    });
  }
});
