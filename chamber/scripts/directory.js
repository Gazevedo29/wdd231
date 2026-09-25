// =========================================
// MENU
// =========================================

const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);
        menuButton.textContent = isOpen ? "\u2715" : "\u2630";
    });
}


// =========================================
// FOOTER
// =========================================

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent = document.lastModified;
}


// =========================================
// DIRECTORY - MEMBERS
// =========================================

const membersContainer = document.querySelector("#members");

const membershipNames = {
    1: "Member",
    2: "Silver",
    3: "Gold"
};


// Display members
async function getMembers() {

    if (!membersContainer) {
        console.error("Directory error: element #members not found.");
        return;
    }

    try {

        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json.");
        }

        const members = await response.json();

        membersContainer.innerHTML = "";

        members.forEach((member) => {

            const card = document.createElement("article");

            card.classList.add("member-card");

            const membershipName =
                membershipNames[Number(member.membership)] || "Member";

            card.innerHTML = `
                <img
                    src="images/${member.image}"
                    alt="${member.name} logo"
                    loading="lazy"
                    width="200"
                    height="100">

                <h2>${member.name}</h2>

                <p>${member.address}</p>

                <p>${member.phone}</p>

                <p>
                    <strong>Membership:</strong>
                    ${membershipName}
                </p>

                <a
                    href="${member.website}"
                    target="_blank"
                    rel="noopener">
                    Visit Website
                </a>
            `;

            membersContainer.appendChild(card);
        });

    } catch (error) {

        console.error("Directory error:", error);

        membersContainer.innerHTML = `
            <p>Unable to load members.</p>
        `;
    }
}


// =========================================
// GRID / LIST VIEW TOGGLE
// =========================================

function switchView(view) {

    if (!membersContainer) {
        return;
    }

    membersContainer.classList.remove("grid", "list");
    membersContainer.classList.add(view);

    // Highlight the active button
    document
        .querySelectorAll("[data-view], #grid-button, #list-button, #grid-view, #list-view")
        .forEach((button) => {

            const label =
                (button.id + " " + button.textContent + " " +
                    (button.getAttribute("data-view") || ""))
                    .toLowerCase();

            button.classList.toggle("active", label.includes(view));
        });
}

function setupViewButtons() {

    // 1) Preferred: buttons with data-view attribute
    const dataButtons = document.querySelectorAll("[data-view]");

    if (dataButtons.length > 0) {
        dataButtons.forEach((button) => {
            button.addEventListener("click", () => {
                switchView(button.getAttribute("data-view"));
            });
        });
        return;
    }

    // 2) Fallback: find buttons by id / text / class
    document.querySelectorAll("button").forEach((button) => {

        const label =
            (button.id + " " + button.className + " " + button.textContent)
                .toLowerCase();

        if (label.includes("grid")) {
            button.addEventListener("click", () => switchView("grid"));
        }

        if (label.includes("list")) {
            button.addEventListener("click", () => switchView("list"));
        }
    });
}

// Make sure a view is active when the page loads
function setDefaultView() {

    if (!membersContainer) {
        return;
    }

    if (!membersContainer.classList.contains("grid") &&
        !membersContainer.classList.contains("list")) {
        membersContainer.classList.add("grid");
    }
}


// =========================================
// RUN FUNCTIONS
// =========================================

getMembers();
setDefaultView();
setupViewButtons();