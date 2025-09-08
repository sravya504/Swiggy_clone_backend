const mongoose = require("mongoose");
const Product=require("../models/Product")


const firmSchema = new mongoose.Schema({
  firmname: { type: String,
     required: true ,
     unique:true
    },
  area: { type: String,
         required:true
  },
  category:{
    type:[
        {
            type:String,
            enum:['veg','non-veg']
        }
    ]
  },

  region:{
    type:[
        {
            type:String,
            enum:['south-indian','north-indian','chinese','bakery','desserts']
        }
    ]
  },
  offer:{
    type:String
  },
  image:{
    type:String
  },
  // to give relatiion between firm and vendor
 vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true
  },
product:
   [
     {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
   ]



});

const Firm=mongoose.model("Firm",firmSchema);
module.exports=Firm;