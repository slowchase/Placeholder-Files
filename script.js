/*
  Newsletter signup

  For now this only validates the email locally.
  Later, replace API_URL with your Supabase Edge Function endpoint.

  Example:
  const API_URL = "";
*/

const API_URL = "https://xqlnypsmfbczrytksded.supabase.co/functions/v1/subscribe";

const form = document.getElementById("subscribe-form");
const emailInput = document.getElementById("email");
const message = document.getElementById("form-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  message.className = "form-message";

  if (!emailInput.checkValidity()) {
    message.textContent = "Please enter a valid email address.";
    message.classList.add("error");
    emailInput.focus();
    return;
  }

  /*
    This is intentionally not connected to a database yet.

    Once your Supabase backend exists, set API_URL above and this
    block will send the address to your private subscription endpoint.
  */

  if (!API_URL) {
    message.textContent = "Subscription form ready — database connection coming soon.";
    message.classList.add("success");
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      throw new Error("Subscription request failed.");
    }

    emailInput.value = "";
    message.textContent = "Check your email to confirm your subscription.";
    message.classList.add("success");
  } catch (error) {
    console.error(error);
    message.textContent = "Something went wrong. Please try again.";
    message.classList.add("error");
  }
});
