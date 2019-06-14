const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//No need to declare all fields, cause we only fetch all and remove items
var JobSchema = new Schema({
  _id: Schema.Types.ObjectId
}, {
    collection: 'pagewordfrequency'
  });

// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("JobModel", JobSchema);