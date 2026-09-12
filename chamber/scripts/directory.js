const membersContainer = document.querySelector("#members");

async function getMembers() {

    const response = await fetch("data/members.json");

    const data = await response.json();

    displayMembers(data);
}

getMembers();




function displayMembers(members) {

    membersContainer.innerHTML = "";

    members.forEach(member => {

        const card = document.createElement("article");

        card.classList.add("member-card");

        card.innerHTML = `
            <img src="images/${member.image}" 
                 alt="${member.name} logo"
                 loading="lazy">

            <h3>${member.name}</h3>

            <p>${member.description}</p>

            <p>${member.address}</p>

            <p>${member.phone}</p>

            <p>Membership: ${getMembershipLevel(member.membership)}</p>

            <a href="${member.website}" target="_blank">
                Visit Website
            </a>
        `;

        membersContainer.appendChild(card);
    });
}



function getMembershipLevel(level) {

    if (level === 1) {
        return "Member";
    }

    if (level === 2) {
        return "Silver";
    }

    if (level === 3) {
        return "Gold";
    }

    return "Unknown";
}


const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");
});



const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    navigation.classList.toggle("open");
});


const currentYear = new Date().getFullYear();

document.querySelector("#currentyear").textContent = currentYear;


document.querySelector("#lastModified").textContent =
    document.lastModified;