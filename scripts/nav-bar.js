function toggleMenu() {
    document.getElementById("ham-navbar").classList.toggle("show");
    document.getElementById("hamburger-icon").classList.toggle("change");
    document.body.classList.toggle("no-scroll");
}


function toggleDrop(event) {
    event.stopPropagation();

    // get the clicked link element
    var linkElement = event.currentTarget;

    // get the associated dropdown element
    var dropdown = linkElement.nextElementSibling;
    var caret = linkElement.querySelector(".fas");

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

