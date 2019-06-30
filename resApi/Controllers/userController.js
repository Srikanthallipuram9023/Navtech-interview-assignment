// Default login credentials
var Email = "srikanth@gmail.com";
var Password = "Srikanth@123";



exports.loginController = (req, res, next) => {
    var promise = new Promise(function (resolve, reject) {
        setImmediate(() => {
            try {
                if (
                    req.body.Email != null && req.body.Email != '' &&
                    req.body.Password != null && req.body.Password != ''
                ) {
                    /* if (req.body.Email == Email && req.body.Password == Password) { */
                        // Or
                        if (req.body.Email == Email) {
                            if (req.body.Password == Password) {
                                res.json({
                                    Success: true,
                                    Extra: {
                                        Message: "Successfully login",
                                        Data: Email
                                    }
                                });
                            } else {
                                res.json({
                                    Success: false,
                                    Extra: {
                                        Message: "Please enter valid password"
                                    }
                                });
                            }
                        } else {
                            res.json({
                                Success: false,
                                Extra: {
                                    Message: "Please enter valid email address"
                                }
                            });
                        }
                    /* } else {
                        res.json({
                            Success: false,
                            Extra: {
                                Message: "Please enter valid credentials"
                            }
                        })
                    } */
                } else {
                    res.json({
                        Success: false,
                        Extra: {
                            Message: "Submit all form values"
                        }
                    })
                }
            } catch (err) {
                console.log(err);
            }
        });
    });

    return promise;
}
