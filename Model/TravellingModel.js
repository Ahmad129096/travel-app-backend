import mongoose from 'mongoose'

const travelSchema = mongoose.Schema({
    location:{
        type: String,
        required: true,
    },
    images:[{
        type: String,
    }],
    costOfTravel:{
        type: Number,
        required: true,
    },
    heritages:{
        type: String,
        required: true,
    },
    placesToVisit:{
        type: String,

    },


})

const Travel = mongoose.model("Travel",travelSchema)
export default Travel