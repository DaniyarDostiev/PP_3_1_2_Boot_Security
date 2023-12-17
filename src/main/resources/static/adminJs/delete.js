// delete modal
const modalDelete = new bootstrap.Modal('#deleteModal')
const formDelete = document.querySelector("#deleteForm")
const idUserFormDelete = document.querySelector("#idUserDelete")
const usernameFormDelete = document.querySelector("#usernameDelete")
const ageFormDelete = document.querySelector("#ageDelete")
const rolesFormDelete = document.querySelector("#rolesDelete")


on(document, "click", ".btnDelete", e => {
    const tableRow = e.target.parentNode.parentNode

    idUserFormDelete.value = tableRow.children[0].innerHTML
    usernameFormDelete.value = tableRow.children[1].innerHTML
    ageFormDelete.value = tableRow.children[2].innerHTML
    tableRow.children[3].innerHTML.split(", ").forEach(str => {
        htmlCodeRoles += `<option>${str}</option>`
    })
    rolesFormDelete.innerHTML = htmlCodeRoles
    htmlCodeRoles = ""
    modalDelete.show()
})

formDelete.addEventListener("submit", e => {
    e.preventDefault()

    fetch(`${url}/${idUserFormDelete.value}`, {
        method: "DELETE"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }
            return response
        })
        .then(() => userTableFilling())
        .then(() => modalDelete.hide())
        .catch(error => console.error("Error during fetch:", error))
})