module.exports = {
    validateLoginReq: function (req, res, next) {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).send({
                error: 'invalid inputs',
                msg: 'Please send all fields'
            });

            return;
        }

        //ToDo: email pattern verification helper
        //ToDo: password pattern verification helper

        if (password && password.length < 6) {
            res.status(400).send({
                error: 'invalid inputs',
                msg: 'Password must be at least 6 characters'
            });

            return;
        }

        return next();
    }
};
