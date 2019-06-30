var OrdersData = require("../jsondata/Order.json");
var validator = require("validator");
var uuid = require('uuid');
// Sample models var
var Orders = require('../Models/Orders');
// apimessages require
var apiMessage = require('../apiMessages/apiMessages');

/* ============================== New Order create controller ========================================== */

exports.OrdersnewdataAdd = (req, res, next) => {
    return new Promise(function (resolve, reject) {
        setImmediate(() => {
            try {
                if (
                    req.body.Ordernumber != null && req.body.Ordernumber != '' &&
                    req.body.Duedate != null && req.body.Duedate != '' &&
                    req.body.Customername != null && req.body.Customername != '' &&
                    req.body.Address != null && req.body.Address != '' &&
                    req.body.Mobile != null && req.body.Mobile != '' &&
                    req.body.Total != null && req.body.Total != ''
                ) {
                    // if we want backend validation write this 
                    //if (validator.isMobilePhone(req.body.Mobile, 'en-IN')) {
                        // Mobile number exits check
                        let Mobilecheck_query = {
                            Mobile: req.body.Mobile
                        }
                        Orders.findOne(Mobilecheck_query)
                            .lean()
                            .exec()
                            .then((Result) => {
                                if (Result != null) {
                                    res.json({
                                        Success: false,
                                        Extra: {
                                            Message: apiMessage.SUBMIT_ALL_VALUES
                                        }
                                    })
                                } else {
                                    // form data save
                                    let OrderformData = new Orders({
                                        "ORDERSID": uuid.v4(),
                                        "Ordernumber": req.body.Ordernumber,
                                        "Duedate": req.body.Duedate,
                                        "Customername": req.body.Customername,
                                        "Address": req.body.Address,
                                        "Mobile": req.body.Mobile,
                                        "Total": req.body.Total,
                                        "IsDelete": "0",
                                        "Created_By":  'fdt556gr5yr5theryetyf', //req.body.USERID, // login user id
                                        "Creaed_Date": new Date(),
                                        "Updated_Date": new Date()
                                    });
                                    OrderformData.save()
                                        .then((Result) => {
                                            res.json({
                                                Success: true,
                                                Extra: {
                                                    Message: apiMessage.SUCCESS_MESSAGE,
                                                    Data: Result
                                                }
                                            })
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            res.json({
                                                Success: false,
                                                Extra: {
                                                    Message: apiMessage.DATABASE_ERROR
                                                }
                                            })
                                        });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({
                                    Success: false,
                                    Extra: {
                                        Message: apiMessage.SERVER_NOT_FOUND
                                    }
                                })
                            });
                    /* } else {
                        res.json({
                            Success: false,
                            Extra: {
                                Message: apiMessage.MOBILE_FORMAT_ERROR
                            }
                        })
                    } */
                } else {
                    res.json({
                        Success: false,
                        Extra: {
                            Message: apiMessage.SUBMIT_ALL_VALUES
                        }
                    })
                }
            } catch (err) {
                console.log(err);
            }
        });
    });
}



/* ============================== Orders update data get ========================================== */


exports.Ordersupdateget = (req, res, next) => {
    return new Promise(function (resolve, reject) {
        setImmediate(() => {
            try {
                if (req.body.ORDERSID != null && req.body.ORDERSID) {
                    // find order update data
                    let Updategetid_query = {
                        ORDERSID: req.body.ORDERSID
                    }
                    Orders.findOne(Updategetid_query)
                        .lean()
                        .exec()
                        .then((Result) => {
                            if (Result != null) {
                                res.json({
                                    Success: true,
                                    Extra: {
                                        Data: Result
                                    }
                                })
                            } else {
                                res.json({
                                    Success: false,
                                    Extra: {
                                        Message: apiMessage.NO_DATA_FOUND
                                    }
                                })
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                Success: false,
                                Extra: {
                                    Message: apiMessage.DATABASE_ERROR
                                }
                            })
                        });
                } else {
                    res.json({
                        Success: false,
                        Extra: {
                            Message: apiMessage.SUBMIT_ALL_VALUES
                        }
                    })
                }
            } catch (err) {
                console.log(err);
            }
        });
    });
}



/* ============================== Orders update Controller ========================================== */


exports.UpdateOrdersnewdata = (req, res, next) => {
    return new Promise(function (resolve, reject) {
        setImmediate(() => {
            try {
                if (
                    req.body.Ordernumber != null && req.body.Ordernumber != '' &&
                    req.body.Duedate != null && req.body.Duedate != '' &&
                    req.body.Customername != null && req.body.Customername != '' &&
                    req.body.Address != null && req.body.Address != '' &&
                    req.body.Mobile != null && req.body.Mobile != '' &&
                    req.body.Total != null && req.body.Total != ''
                ) {
                    //if (validator.isMobilePhone(req.body.Mobile, 'en-IN')) {
                        // Order number exits find
                        let Updateid_query = {
                            ORDERSID: { $ne: req.body.ORDERSID },
                            Ordernumber:  req.body.Ordernumber
                        }
                        Orders.findOne(Updateid_query)
                            .lean()
                            .exec()
                            .then((Result) => {
                                if (Result != null) {
                                    res.json({
                                        Success: false,
                                        Extra: {
                                            Message: apiMessage.ALREADY_EXITS
                                        }
                                    });
                                } else {
                                    // update selected order
                                    let UpdateOrderid_query = {
                                        ORDERSID: req.body.ORDERSID
                                    }
                                    let updateformData = {
                                        $set: {
                                            "Ordernumber": req.body.Ordernumber,
                                            "Duedate": req.body.Duedate,
                                            "Customername": req.body.Customername,
                                            "Address": req.body.Address,
                                            "Mobile": req.body.Mobile,
                                            "Total": req.body.Total,
                                            "IsDelete": "0",
                                            "Created_By": req.body.USERID, // login user id
                                            "Updated_Date": new Date()
                                        }
                                    };
                                    Orders.updateOne(UpdateOrderid_query, updateformData)
                                        .lean()
                                        .exec()
                                        .then((Result) => {
                                            res.json({
                                                Success: true,
                                                Extra: {
                                                    Message: apiMessage.UPDATE_SUCCESS,
                                                    Data: Result
                                                }
                                            })
                                        })
                                        .catch((err) => {
                                            console.log(err);
                                            res.json({
                                                Success: false,
                                                Extra: {
                                                    Message: apiMessage.DATABASE_ERROR
                                                }
                                            })
                                        });
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                res.json({
                                    Success: false,
                                    Extra: {
                                        Message: apiMessage.SERVER_NOT_FOUND
                                    }
                                })
                            });
                    /* } else {
                        res.json({
                            Success: false,
                            Extra: {
                                Message: apiMessage.MOBILE_FORMAT_ERROR
                            }
                        })
                    } */
                } else {
                    res.json({
                        Success: false,
                        Extra: {
                            Message: apiMessage.SUBMIT_ALL_VALUES
                        }
                    })
                }
            } catch (err) {
                console.log(err);
            }
        });
    });
}


/* ============================== Orders Delete Controller ========================================== */


exports.OrdersnewdataDelete = (req, res, next) => {
    return new Promise(function (resolve, reject) {
        setImmediate(() => {
            try {
                if (
                    req.body.ORDERSID != null && req.body.ORDERSID != ''
                ) {
                    let DeleteOrderid_query = {
                        ORDERSID: req.body.ORDERSID
                    }
                    let DeleteRecordData = {
                        $set: {
                            IsDelete: "1"
                        }
                    };
                    Orders.updateOne(DeleteOrderid_query, DeleteRecordData)
                        .then((Result) => {
                            res.json({
                                Success: true,
                                Extra: {
                                    Message: apiMessage.DELETE_SUCCESS,
                                    Data: Result
                                }
                            })
                        })
                        .catch((err) => {
                            console.log(err);
                            res.json({
                                Success: false,
                                Extra: {
                                    Message: apiMessage.DATABASE_ERROR
                                }
                            })
                        });
                } else {
                    res.json({
                        Success: false,
                        Extra: {
                            Message: apiMessage.SUBMIT_ALL_VALUES
                        }
                    })
                }
            } catch (err) {
                console.log(err);
            }
        });
    });
}


/* ============================== Orders all records get Controller ========================================== */

exports.OrdersgetControllers = (req, res, next) => {
    var promise = new Promise(function (resolve, reject) {
        setImmediate(() => {
            try {
                // real time data get
                /* let dataget_query = {
                    IsDelete: "0"
                };
                Orders.find(dataget_query)
                .lean()
                .exec()
                .then((Result) => {
                    if(Result != null){
                        res.json({
                            Success: true,
                            Extra: {
                                Data: Result
                            }
                        });
                    } else{
                        res.json({
                            Success: false,
                            Extra: {
                                Message: apiMessage.NO_DATA_FOUND
                            }
                        })
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.json({
                        Success: false,
                        Extra: {
                            Message: apiMessage.DATABASE_ERROR
                        }
                    })
                }); */

                /* function isEmpty(OrdersData){
                    return !Object.keys(OrdersData).length > 0;
                } */
                if (Object.keys(OrdersData).length > 0) {
                    res.json({
                        Success: true,
                        Extra: {
                            Data: OrdersData.Orders
                        }
                    });
                } else {
                    res.json({
                        Success: false,
                        Extra: {
                            Message: apiMessage.NO_DATA_FOUND
                        }
                    });
                }
            } catch (err) {
                console.log(err);
            }
        });
    });
    return promise;
}
