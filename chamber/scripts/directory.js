const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Unable to load members.json");
        }

        const members = await response.json();

        displayMembers(members);
    } catch (error) {
        console.error("Error loading members:", error);

        membersContainer.innerHTML = `
            <p>Unable to load the business directory.</p>
        `;
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" 
                 alt="${member.name} logo" 
                 loading="lazy">

            <div class="member-info">
                <h2>${member.name}</h2>
                <p>${member.description}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Membership Level:</strong> ${member.membership}</p>
                <a href="${member.website}" target="_blank" rel="noopener">
                    Visit Website
                </a>
            </div>
        `;

        membersContainer.appendChild(card);
    });
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});

currentYear.textContent = new Date().getFullYear();

lastModified.textContent = document.lastModified;

getMembers();