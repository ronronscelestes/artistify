const express = require("express");
const router = express.Router()
const ArtistModel = require("./../model/Artist.js")
const uploader = require("./../config/cloudinary")

// VIEW OF THE ARTISTS
router.get("/", (req, res, next) => {
    ArtistModel.find()
    
        .then((artist) => {
            res.render("dashboard/artists", {artist})
        })
        .catch(next)
})

// ADD AN ARTIST
router.get('/create', (req, res, next) => {
    res.render("dashboard/artistCreate");
});
  
router.post('/create', uploader.single("picture"), (req, res, next) => {
    const { name, isBand, description } = req.body;

    let picture;
    if(req.file){
        picture = req.file.path 
    }

    ArtistModel.create({name, isBand, description, picture})
        .then(artist => {
        console.log(`New artist created: ${artist.name}`)
        res.redirect("/");
        })
        .catch(next)
});

// EDIT AN ARTIST
router.get('/update/:id', (req, res, next) => {
ArtistModel.findById(req.params.id)
    .then((artist) => res.render("dashboard/artistUpdate",{artist}))
    .catch(next)
});

router.post('/update/:id', async (req, res, next) => {
    const { name, isBand, description, picture } = req.body;
    try {
        await ArtistModel.findByIdAndUpdate(req.params.id, {
        name,
        isBand, 
        description, 
        picture
        });
        res.redirect("/:id");
    } catch (error) {next(error)}
});

// DELETE ARTIST
// router.get('/:id', async (req, res, next) => {
//     try{
//       await ArtistModel.findByIdAndDelete(req.params.id);
//     }
//     catch (error){next(error)}
//   });
  
module.exports = router;