module.exports = {
    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/users/login');
    },
    forwardAuthenticated: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/dashboard');
    },

    validateRegisterReq: function (req, res, next) {
        const { email, password, confirmPassword } = req.body;
        console.log('req', req.body);

        if (!email || !password || !confirmPassword) {
            res.send({
                error: 'invalid inputs',
                msg: 'Please send all fields'
            });

            return;
        }

        //ToDo: email pattern verification helper
        //ToDo: password pattern verification helper

        if (password != confirmPassword) {
            res.send({
                error: 'invalid inputs',
                msg: 'Password do not match'
            });

            return;
        }

        if (password && password.length < 6) {
            res.send({
                error: 'invalid inputs',
                msg: 'Password must be at least 6 characters'
            });

            return;
        }

        return next();
    }
};
