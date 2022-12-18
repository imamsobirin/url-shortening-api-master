const toggleMenu = document.querySelector(".img__menu-toggle");
const navMenu = document.querySelector(".nav__menu");
const btnShorten = document.querySelector(".btn-shorten");
const btnCopy = document.querySelectorAll(".btn--copy");
const inputURL = document.querySelector(".form-input");
const resultURL = document.querySelector(".shorted-links-wrapper");

toggleMenu.addEventListener("click", () => {
  if (navMenu.style.display != "none") {
    navMenu.style.display = "none";
  } else {
    navMenu.style.display = "flex";
  }
});

const API = "https://api.shrtco.de/v2/shorten?url=";
let shortLink = "";

function getShortenURL(url) {
  if (url != "") {
    fetch(API + url)
      .then((response) => response.json())
      .then((data) => {
        resultURL.innerHTML += shortedLink(data);
      });
  }
}

btnShorten.addEventListener("click", (e) => {
  let url = inputURL.value;
  e.preventDefault();
  getShortenURL(url);
  inputURL.value = "";
});

resultURL.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    const linkCopy = e.target.previousElementSibling;
    navigator.clipboard.writeText(linkCopy.innerHTML);
    document.activeElement.innerHTML = "Copied!";
    e.target.style.backgroundColor = "var(--Very-Dark-Violet)";

    setTimeout(function () {
      document.activeElement.innerHTML = "Copy";
      e.target.style.backgroundColor = "var(--Cyan)";
    }, 300);
  }
});

function shortedLink(data) {
  return `<div class="shorted-link__block">
            <p class="actual-link">${data["result"]["original_link"]}</p>
            <a href="${data["result"]["full_short_link"]}" class="shorted-link">${data["result"]["full_short_link"]}</a>
            <button class="btn btn--copy">Copy</button>
          </div>`;
}
