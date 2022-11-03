var mongoose = require("mongoose");

var UsersSchema = mongoose.Schema({
    email: String,
    password: String,
    contact: String
});

export default mongoose.model("Users", UsersSchema)

