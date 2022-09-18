const BASE = "http://localhost:3000"
const ul = document.querySelector('ul')
let users;
async function render() {
    users = await axios.get(`${BASE}/users`);
    for (let user of users.data) {
        const li = document.createElement('li');
        const text = document.createTextNode(`${user.email}`);
        li.appendChild(text);
        ul.append(li);
    }
}
render()
