const mongoose  = require('mongoose');
const schema  = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const currency = mongoose.Types.Currency;

const puductSchema  =  new schema(
    {
        name:{
            type:String,
            required:true
        },
        description:{
         type:String,
         required:true
        },
        price:{
          type:currency,
          required:true
        }
    },
    {timestamps:true}
);

module.exports = mongoose.model('product',puductSchema);