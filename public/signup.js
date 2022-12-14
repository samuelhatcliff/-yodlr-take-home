const form = document.querySelector('form')
const message = document.getElementById('message');
const BASE = "http://localhost:3000"
form.addEventListener("submit", async function (evt) {
    evt.preventDefault();
    const formData = new FormData(form);
    let body = {};
    for (let [key, value] of formData.entries()) {
        body[key] = value;
    }
    try {
        const req = await axios.post(`${BASE}/users`, body);
        if (req.status === 200) {
            message.setAttribute('class', 'alert alert-success')
            message.setAttribute('role', 'alert')
            message.innerHTML = "Registration Successful!";
        }
    } catch (err) {
        message.setAttribute('class', 'alert alert-danger')
        message.setAttribute('role', 'alert')
        message.innerHTML = `Registration failed. Please try again and make sure you have filled out each form.`;
    }
})