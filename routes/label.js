const express = require("express");
const router = express.Router();
const uploader = require("./../config/cloudinary");

const LablesModel = require("./../model/Label");

// 1 - Routing the dashboard labels.hbs

router.get("/", (req, res, next) => {
    LablesModel.find()
        .then((dbResponse) =>{
            res.render("lables.hbs", {
                label: dbResponse,
            });
        })
        .catch((dbError) => {
            next(dbError);
        })
})

router.get("/create", (req, res, next) => {
    LablesModel.find()
        .then((dbResponse) => {
            res.render("Create.hbs", {
                labelCreate: dbResponse,
            });
        })
        .catch((dbError) => {
            next(dbError);
        })
})

router.get("/update/:id", (req, res, next) => {
    LablesModel.findById(req.params.id)
        .then((label) => res.render("Update.hbs", {label}))
        .catch(next); 
});

router.get("/delete/:id", (req, res, next) => {
    try{
        LablesModel.findByIdAndDelete(req.params.id);
        res.redirect("label")
    } catch(err){
        next(err)
    }
   
})

router.post("/", uploader.single("label"), async (req, res, next) => {
    const {name, city, country, street, streetNumber, zipCode} = req.body;
    
    let label;
    if(req.file){
        label = req.file.path
    }

    LablesModel.create({name, city, country, street, streetNumber, zipCode})
    .then(label => {
        console.log(`Your label has been created: ${label.name}`)
        res.redirect("/");
    })
    .catch(next)

})

router.post("/Update/:id", async (req, res, next) => {
    const {name, city, country, street, streetNumber, zipCode} = req.body;

    try {
        await LablesModel.findByIdAndUpdate(req.params.id, {
            name,
            city,
            country,
            street,
            streetNumber,
            zipcode,
            logo
        })
        res.redirect("/:id");
    } catch (error) {next(error)}
})

module.exports = router;