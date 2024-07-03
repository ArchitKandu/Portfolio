const checkbox = document.getElementById("check");
const menuOpen = document.getElementById("open");
const bodyElement = document.body;

// Function to handle the checkbox state change
function handleCheckboxChange() {
  if (checkbox.checked) {
    menuOpen.style.display = "none";
  } else {
    menuOpen.style.display = "block";
  }
}

// Function to check the screen width and show/hide elements accordingly
function checkScreenWidth() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 535) {
    checkbox.addEventListener("change", handleCheckboxChange);
    menuOpen.style.display = "block";
  } else {
    checkbox.style.display = "none";
    menuOpen.style.display = "none";
    checkbox.removeEventListener("change", handleCheckboxChange);
  }
}
// Call the function on page load and whenever the window is resized
window.addEventListener("load", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);

// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("nav-name").style.fontSize = "1.5rem";
    document.getElementById("nav-bar").style.padding = "4px 15px";
  } else {
    document.getElementById("nav-name").style.fontSize = "1.75rem";
    document.getElementById("nav-bar").style.padding = "7px 15px";
  }
}

window.onscroll = function () {
  scrollFunction();
};

const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: json,
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});
