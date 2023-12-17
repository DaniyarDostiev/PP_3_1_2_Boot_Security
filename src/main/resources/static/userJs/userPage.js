const userTable = document.querySelector("#userTable")
const usernameElement = document.querySelector("#currentUserUsername")
const rolesElement = document.querySelector("#currentUserRoles")
const url = "http://localhost:8080/api/user/get"

async function fetchUserData() {
    try {
        const response = await fetch(url);
        const user = await response.json();

        // header filling
        usernameElement.textContent = user.username
        const rolesArray = user.roles.map(role => role.name)
        rolesElement.textContent = ` with roles ${rolesArray.join(", ")}`

        // table filling
        const row = userTable.insertRow();
        row.insertCell(0).textContent = user.id;
        row.insertCell(1).textContent = user.username;
        row.insertCell(2).textContent = user.age;
        row.insertCell(3).textContent = rolesArray.join(", ");
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

fetchUserData();