// table and header filling
const usersTable = document.querySelector("#usersInfoTbody")
const adminInfoTable = document.querySelector("#currentUserInfoTbody")
const usernameElement = document.querySelector("#currentUserUsername")
const rolesElement = document.querySelector("#currentUserRoles")
let htmlCodeTable = ""
let allRoles

// url
const url = "http://localhost:8080/api/admin/users"
const getCurrentUserUrl = "http://localhost:8080/api/admin/authUser"
const getAllRolesUrl = "http://localhost:8080/api/admin/roles"

async function getAllRoles() {
    const response = await fetch(getAllRolesUrl)
    allRoles = await response.json()
}

async function userInfoAndHeaderFilling() {
    const responseAuthUser = await fetch(getCurrentUserUrl)
    const authUser = await responseAuthUser.json()

    // header filling
    usernameElement.textContent = authUser.username
    const rolesArray = authUser.roles.map(role => role.name)
    rolesElement.textContent = ` with roles ${rolesArray.join(", ")}`

    const row = adminInfoTable.insertRow();
    row.insertCell(0).textContent = authUser.id;
    row.insertCell(1).textContent = authUser.username;
    row.insertCell(2).textContent = authUser.age;
    row.insertCell(3).textContent = rolesArray.join(", ");
}

async function userTableFilling() {
    try {
        const responseUsers = await fetch(url);
        const usersList = await responseUsers.json();

        // table filling
        usersList.forEach(user => {
            htmlCodeTable += `<tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.age}</td>
                    <td>${user.roles.map(role => role.name).join(", ")}</td>
                    <td><a class="btnEdit btn btn-info text-white">Edit</a></td>
                    <td><a class="btnDelete btn btn-danger text-white">Delete</a></td>
                </tr>`
        })
        usersTable.innerHTML = htmlCodeTable
        htmlCodeTable = ""
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function findRoleById(idList) {
    let selectedRoles = []
    for (let i of idList) {
        selectedRoles.push(allRoles.find(role => role.id === i))
    }
    return selectedRoles
}

function on(element, event, selector, handler) {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
}

getAllRoles()
userInfoAndHeaderFilling()
userTableFilling()