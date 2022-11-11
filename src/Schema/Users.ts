var mongoose = require("mongoose");

var UsersSchema = mongoose.Schema({
    email: {
        type: String,
        default: "abc@xyz.com"
    },
    password: {
        type: String,
        default: "None"
    },
    contact: {
        type: String,
        default: "None"
    },
    publicKey: {
        type: String,
        default: "None"
    },
    nonce: {
        type: String,
        default: Date.now().toString()
    }
});

export default mongoose.model("Users", UsersSchema)

