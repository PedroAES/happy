const { model, Schema } = require('mongoose');

const nursingHomeSchema = new Schema({
  name: 
    {   
        type: String,
        required: true
    },
  latitude: 
    {   
        type: Number,
        required: true
    },
  longitude: 
    {   
        type: Number,
        required: true
    },
  about: 
    {   
        type: String,
        required: true
    },
  instructions: 
    {   
        type: String,
        required: true
    },
  opening_hours: 
    {   
        type: String,
        required: true
    },
  open_on_weekends: 
    {   
        type: Boolean,
        required: true
    },
  about: 
    {   
        type: String,
        required: true
    },
  images: [
    {
      path: String,
    }
  ],
  
}, {timestamps: true});

module.exports = model('NursingHome', nursingHomeSchema);
