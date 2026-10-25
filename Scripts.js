JavaScript

document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll('nav a');

  menuLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      const target = link.getAttribute("href");

      if (target && target.startsWith("#")) {
        const section = document.querySelector(target);

        if (section) {
          event.preventDefault();
          section.scrollIntoView({
            behavior: "smooth"
          });
        }
      }
    });
  });

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const forms = document.querySelectorAll("form");

  forms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const message = form.querySelector(
        "#status, .status, [role='status']"
      );

      if (message) {
        message.textContent =
          "Form received. Connect authentication or a backend to submit data securely.";
      } else {
        alert(
          "Connect authentication or a backend to submit data securely."
        );
      }
    });
  });

  console.log("Junior Connect is ready!");
});
