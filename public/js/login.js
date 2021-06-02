const loginFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#userName").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/`);
      document
        .querySelector("#dashboardButton")
        .setAttribute("href", `/dashboard/${username}`);
    } else {
      alert("Failed to log in");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#userName").value.trim();
  const password = document.querySelector("#password").value.trim();

  if (username && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace(`/dashboard/${username}`);
    } else {
      alert("Something went wrong, please try again");
    }
  }
};

document
  .querySelector("#loginButton")
  .addEventListener("click", loginFormHandler);
document
  .querySelector("#registerButton")
  .addEventListener("click", signupFormHandler);
