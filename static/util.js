// Add active class to the current button (highlight it)
var navbar = document.querySelector(".navbar");
var links = navbar.querySelectorAll(".nav-link");
let activeLink = navbar.querySelector(".nav-link .active")
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener("click", function() {
    activeLink.classList.remove('active')
    this.classList.add(" active");
  });
}