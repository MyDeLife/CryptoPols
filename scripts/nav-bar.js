function toggleMenu() {
    document.getElementById("ham-navbar").classList.toggle("show");
    document.getElementById("hamburger-icon").classList.toggle("change");
}

function toggleDrop(event) {
    event.stopPropagation();

    var dropdown = document.getElementById("ham-menu-dropdown-about");
    var caret = event.currentTarget.querySelector(".fas");

    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "flex";
        caret.classList.remove("fa-caret-down");
        caret.classList.add("fa-caret-up");
    } else {
        dropdown.style.display = "none";
        caret.classList.remove("fa-caret-up");
        caret.classList.add("fa-caret-down");
    }
}
