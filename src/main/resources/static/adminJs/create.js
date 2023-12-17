// create tab
const formAdd = document.querySelector("#addForm")
const usernameFormAdd = document.querySelector("#usernameAdd")
const ageFormAdd = document.querySelector("#ageAdd")
const passwordFormAdd = document.querySelector("#passwordAdd")
const rolesFormAdd = document.querySelector("#rolesAdd")
const usersTab = document.querySelector('#myTab button[data-bs-target="#users"]')

// filling roles options
on(document, "click", ".btnAdd", e => {
    allRoles.forEach(role => {
        htmlCodeRoles += `<option value="${role.id}">${role.name}</option>`
    })
    rolesFormAdd.innerHTML = htmlCodeRoles
    htmlCodeRoles = ""
})

formAdd.addEventListener("submit", e => {
    e.preventDefault()

    const selectedOptions = rolesFormAdd.selectedOptions
    const selectedValues = Array.from(selectedOptions).map(option => option.value)
    let arrayOfId = selectedValues.map(str => parseInt(str))
    const roleObjectsList = findRoleById(arrayOfId)

    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username: usernameFormAdd.value,
            password: passwordFormAdd.value,
            age: ageFormAdd.value,
            roles: roleObjectsList
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response
        })
        .then(() => userTableFilling())
        .then(() => bootstrap.Tab.getInstance(usersTab).show())
        .then(() => {
            usernameFormAdd.value = ""
            passwordFormAdd.value = ""
            ageFormAdd.value = ""
        })
        .catch(error => console.error("Error during fetch:", error))
})