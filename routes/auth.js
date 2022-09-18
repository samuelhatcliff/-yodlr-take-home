const registerSchema = require("../schemas/register.json");
const jsonschema = require("jsonschema");
const { BadRequestError } = require("../expressError");




router.post("/register", async function (req, res, next) {
    try {
        const validator = jsonschema.validate(req.body, registerSchema);
        if (!validator.valid) {
            const errs = validator.errors.map(e => e.stack);
            throw new BadRequestError(errs);
        }
        console.log(req.body)
        // const newUser = await User.register({ ...req.body, isAdmin: false });
        // const token = createToken(newUser);
        // return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
});


