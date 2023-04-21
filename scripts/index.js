document.querySelectorAll(".movers-quote").forEach((quote) => {
    quote.addEventListener("click", () => {
        alert(quote.textContent);
    });
});