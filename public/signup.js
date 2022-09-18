const form = document.querySelector('form')
const BASE = "http://localhost:3000"
form.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const formData = new FormData(form);
    let body = {};
    for (let [key, value] of formData.entries()) {
        body[key] = value;
    }
    const req = await axios.post(`${BASE}/users`, body);
    console.log(req);
})