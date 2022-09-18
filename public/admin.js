const BASE = "http://localhost:3000"
const ul = document.querySelector('ul')
let users;

async function render() {
    users = await axios.get(`${BASE}/users`);
    for (let user of users.data) {
        const userUl = document.createElement('ul');
        userUl.setAttribute('class', 'list-group list-group-horizontal flex-fill');

        const userId = document.createElement('li');
        userId.innerHTML = `User ID: ${user.id}`
        console.log(userId, user.id);

        const email = document.createElement('li');
        email.innerHTML = `Email:${user.email}`;

        const firstName = document.createElement('li');
        firstName.innerHTML = `First Name: ${user.firstName}`;

        const lastName = document.createElement('li');
        lastName.innerHTML = `Last Name: ${user.lastName}`;

        const columns = [userId, email, firstName, lastName]

        for (let col of columns) {
            col.setAttribute('class', 'list-group-item flex-fill ')
        }
        const removeButton = document.createElement('button');
        removeButton.setAttribute('id', user.id);
        removeButton.setAttribute('class', 'btn btn-outline-danger')
        removeButton.innerHTML = "Remove User"
        userUl.append(userId, email, firstName, lastName, removeButton)
        ul.append(userUl);
    }
}

const removeButtons = document.querySelectorAll('button')
ul.addEventListener('click', async (evt) => {
    if (evt.target.nodeName === 'BUTTON') {
        const id = parseInt(evt.target.id);
        await axios.delete(`${BASE}/users/${id}`)//deletes user in users.data array before re-rendering
        for (let value of Object.values(users.data)) {
            if (value.id === id) {//we must clear out all users before re-rendering again with updated users.data array 
                delete users.data.id;
                ul.replaceChildren();
            }
        }
        render();
    }
})

render()
