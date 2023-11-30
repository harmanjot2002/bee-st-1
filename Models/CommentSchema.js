const mongoose=require('mongoose');

const comSchema = new mongoose.Schema({
    content: {
      type: String,
      required: true,
      maxlength: 1000, 
    },
    author: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports=mongoose.model("comModel",comSchema);