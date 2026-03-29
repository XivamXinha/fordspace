const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({

  teamName:{
    type:String,
    required:true
  },

  teamID:{
    type:String,
    required:true,
    unique:true
  },

  ownerEmail:{
    type:String,
    required:true
  },

  ownerName:{
    type:String,
    required:true
  },

  members:[
    {
      email:String,
      name:String
    }
  ],

  requests:[
    {
      email:String,
      name:String
    }
  ]

});

module.exports = mongoose.model("Team",teamSchema);