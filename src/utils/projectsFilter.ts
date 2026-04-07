// Client-side filtering logic
export function initProjectFilter() {
    const tabs = document.querySelectorAll(".filter-tab");
    const cards = document.querySelectorAll<HTMLElement>(".project-card");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            // 1. Reset all tabs to inactive styles
            tabs.forEach((t) => {
                t.classList.remove("bg-white", "text-black", "active-tab");
                t.classList.add("text-gray-400");
            });

            // 2. Set the clicked tab as active
            tab.classList.remove("text-gray-400");
            tab.classList.add("bg-white", "text-black", "active-tab");

            // 3. Filter the cards
            const targetCategory = tab.getAttribute("data-category");

            cards.forEach((card) => {
                const htmlCard = card;
                const cardCategory = htmlCard.getAttribute("data-category");

                if (
                    targetCategory === "all" ||
                    cardCategory === targetCategory
                ) {
                    htmlCard.style.display = "flex";
                    // Force a repaint so animation triggers from scratch
                    htmlCard.style.animation = "none";
                    htmlCard.offsetHeight; /* trigger reflow */
                    htmlCard.style.animation =
                        "fadeInUp 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards";
                } else {
                    htmlCard.style.display = "none";
                }
            });
        });
    });
}
