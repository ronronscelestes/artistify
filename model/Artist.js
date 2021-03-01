const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artModel = new Schema({
    name: {
        type: String,
        unique: true
    },
    isBand: Boolean,
    description: String,
    picture: {
        type: String,
        defautl: "https: //res.cloudinary.com/gdaconcept/image/upload/v1614550771/workshop-artistify/no-image-logo_dcufai.png"
    }
})

const ArtistsModel = mongoose.model("artists", artModel);

module.exports = ArtistsModel;