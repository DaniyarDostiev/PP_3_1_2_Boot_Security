// edit modal
const modalEdit = new bootstrap.Modal('#editModal')
const formEdit = document.querySelector("#editForm")
const idUserFormEdit = document.querySelector("#idUserEdit")
const usernameFormEdit = document.querySelector("#usernameEdit")
const ageFormEdit = document.querySelector("#ageEdit")
const passwordFormEdit = document.querySelector("#passwordEdit")
const rolesFormEdit = document.querySelector("#rolesEdit")
let htmlCodeRoles = ""

on(document, "click", ".btnEdit", e => {
    const tableRow = e.target.parentNode.parentNode

    idUserFormEdit.value = tableRow.children[0].innerHTML
    usernameFormEdit.value = tableRow.children[1].innerHTML
    ageFormEdit.value = tableRow.children[2].innerHTML
    allRoles.forEach(role => {
        htmlCodeRoles += `<option value="${role.id}">${role.name}</option>`
    })
    rolesFormEdit.innerHTML = htmlCodeRoles
    htmlCodeRoles = ""
    modalEdit.show()
})

formEdit.addEventListener("submit", e => {
    e.preventDefault()

    const selectedOptions = rolesFormEdit.selectedOptions
    const selectedValues = Array.from(selectedOptions).map(option => option.value)
    let arrayOfId = selectedValues.map(str => parseInt(str))
    const roleObjectsList = findRoleById(arrayOfId)

    fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: idUserFormEdit.value,
            username: usernameFormEdit.value,
            password: passwordFormEdit.value,
            age: ageFormEdit.value,
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
        .then(() => modalEdit.hide())
        .then(() => passwordFormEdit.value = "")
        .catch(error => console.error("Error during fetch:", error))
})