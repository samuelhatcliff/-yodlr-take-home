const BASE = "http://localhost:3000"
const ul = document.querySelector('ul')
let users;

async function render() {
    users = await axios.get(`${BASE}/users`);
    for (let user of users.data) {
        const li = document.createElement('li');
        li.innerHTML = `First Name: ${user.firstName}
        Last Name: ${user.lastName} Email:${user.email}`;
        const removeButton = document.createElement('button');
        removeButton.setAttribute('id', user.id);
        li.append(removeButton);
        ul.append(li);
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
