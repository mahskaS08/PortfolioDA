// Navigation
const hambugerMenu = document.querySelector(".hambuger");

const navMenu = document.querySelector(".nav-menu");

const navLinks = document.querySelectorAll(".nav-link");

// Toggle the menu
hambugerMenu.addEventListener("click", () => {
  hambugerMenu.classList.toggle("active");

  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hambugerMenu.classList.remove("active");

    navMenu.classList.remove("active");
  });
});

const projects = [
  {
    id: 1,
    name: "CipherTech Project",
    description:
      "Developed a web application implementing fundamental ciphers such as Caesar cipher, block cipher, and stream key cipher. Utilized Node.js and Express.js for backend development and deployed the application on the Render platform.",
    image: "images/bfd4c49e-2e1b-429b-8ede-90ce33cd54bf.webp",  
    technologies: ["Node.js", "Express.js", "JavaScript","Cryptography"],
    link: "https://cipher-project-m7mu.onrender.com",  
    source: "https://github.com/mahskaS08/cipherProject",
    
  },
  {
    id: 2,
    name: "AI-Driven Personal Finance Assistant",
    description:
      "Built backend infrastructure for a personal finance assistant that provides users with financial recommendations, stock predictions, and SIP calculations through an intuitive chatbot interface. Implemented API integrations and ensured efficient handling of real-time financial data to enhance the user experience. Developed a salary breakdown feature that offers personalized investment suggestions based on users' salary and risk appetite, including the percentage of salary to invest in various financial instruments.",
    image: "images/PFA.jpeg",  
    technologies: ["Node.js", "Express.js", "API Integration", "JavaScript"],
    
  }
];


const onModalOpen = async (id) => {
  const getData = await projects.find((project) => project.id === id);

  const modal = document.querySelector(".modal-container");
  modal.style.display = "block";
  document.getElementById("modal-title").innerHTML = getData.name;
  document.getElementById("modal-desc").innerHTML = getData.description;
  document.getElementById("modal-img").src = getData.image;
  document.getElementById("modal-see-live").href = getData.link;
  document.getElementById("modal-see-source").href = getData.source;

  document.getElementById("group-list").innerHTML = getData.technologies
    .map((tech) => `<li class="stack">${tech}</li>`)
    .join("");
};
const p = onModalOpen;

const onModalClose = () => {
  const modal = document.querySelector(".modal-container");
  modal.style.display = "none";
};
onModalClose(p);

window.addEventListener("DOMContentLoaded", () => {
  const displayCards = projects.map(
    (project) => `
      <div id=${project.id} >
        <div class="work-info1">
            <div class="image-container">
              <img
                src=${project.image}
                alt="multi-post work content2"
                class="work-img"
              />
            </div>
            <div class="content1">
              <h3 class="work-title">
                ${project.name}
              </h3>
              <p class="title-description">
              ${project.description}
              </p>
              <ul class="stack-group">
              ${project.technologies
                .map((tech) => `<li class="stack">${tech}</li>`)
                .join("")}
              </ul>
              <button id=${project.id} type="button" onclick="onModalOpen(${
      project.id
    })" class="btn" id="btn-4">See Project</button>
            </div>
          </div> 
      </div>`
  );
  document.getElementById("cards").innerHTML = displayCards.join("");
});

// Form Validation
const form = document.getElementById("form");

const INVALID_EMAIL =
  "Oops!, failed to send. Take in account your email should be in lowercase e.g promise@gmail.com";

function showMessage(input, message, type) {
  document.querySelector("small").innerText = message;
  input.className = type ? "success" : "error";
  return type;
}

function showError(input, message) {
  return showMessage(input, message, false);
}

function showSuccess(input) {
  return showMessage(input, "", true);
}

function emailValidation(input, invalidMsg) {
  const email = input.value.trim();
  if (email !== email.toLowerCase()) {
    return showError(input, invalidMsg);
  }
  showSuccess(input);
  return true;
}


// Accordion
var acc = document.getElementsByClassName("dev-stack");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


// Preserve Data In-Browser
const username = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
let user;
function saveData() {
  user = {
    name: "",
    email: "",
    message: "",
  };
  user.name = username.value;
  user.email = email.value;
  user.message = message.value;
  localStorage.setItem("usermessage", JSON.stringify(user));
}
username.onchange = saveData;
email.onchange = saveData;
message.onchange = saveData;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailValid = emailValidation(form.elements.email, INVALID_EMAIL);
  if (emailValid) {
    localStorage.setItem("usermessage", JSON.stringify(user));
    form.submit();
  }
});

// Preserve input data with reload or refresh
window.addEventListener("load", () => {
  user = JSON.parse(localStorage.getItem("usermessage"));
  if (user) {
    username.value = user.name;
    email.value = user.email;
    message.value = user.message;
  }
});
