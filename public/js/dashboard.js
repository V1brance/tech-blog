const dashboardHandler = async (event) => {
  event.preventDefault();

  const response = await fetch("/api/users/login", {
    method: "GET",
  });

  if (response.ok) {
    document.location.replace(`/dashboard/${resonse.user}`);
  }
};
