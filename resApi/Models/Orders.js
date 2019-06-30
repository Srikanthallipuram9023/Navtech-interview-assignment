var mongoose = require("mongoose");

const Orders = mongoose.Schema({
    ORDERSID: { 
        type: String, 
        default: "", 
        required: true 
    },
    Ordernumber: { 
        type: String, 
        default: "",  
        required: true 
    },
    Duedate: { 
        type: Date, 
        default: Date.now(),  
        required: true 
    },
    Customername: { 
        type: String, 
        default: "",  
        required: true 
    },
    Address: { 
        type: String, 
        default: "",  
        required: true 
    },
    Mobile: { 
        type: String, 
        default: "",  
        required: true 
    },
    Total: { 
        type: Number, 
        default: "",  
        required: true 
    },
    IsDelete: { 
        type: Number, 
        default: "0",  
        required: true, 
        enum: [ "0", "1" ] 
    },
    Created_By: { 
        type: String, 
        required: true 
    },
    Creaed_Date: { 
        type: Date, 
        default: Date.now(), 
        required: true 
    },
    Updated_Date: { 
        type: Date, 
        default: Date.now(), 
        required: true 
    }    
}, { collection: "Orders" });


module.exports = mongoose.model('Orders', Orders);


