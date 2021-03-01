require('./../../config/mongo');
const mongoose = require('mongoose');

const labels = 
[
    {
        "name": "Ninja Tunes",
        "city": "London",
        "country": "UK",
        "street": "Fake street",
        "streetNumber": 90,
        "zipcode": "09468",
        "logo": "https://upload.wikimedia.org/wikipedia/fr/5/56/Ninja_Tune_logo.jpg"
    },
    {
        "name": "Loud Records",
        "city": "New York",
        "country": "USA",
        "street": "Fake street",
        "streetNumber": 1,
        "zipcode": "37830",
        "logo": "https://img.discogs.com/N8_z8rUauY6x4y826XvQYKsglAw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/L-8984-1484409284-1951.jpeg.jpg"
    },
    {
        "name": "Warp Records",
        "city": "London",
        "country": "UK",
        "street": "Fake street",
        "streetNumber": 0,
        "zipcode": "76489",
        "logo": "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Warp_Records_logo.svg/1200px-Warp_Records_logo.svg.png"
    },
]

const LabelModel = require('./../../model/Label');

LabelModel.insertMany(labels)
.then(success => {
    console.log(success, 'successsss');
    mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    .catch(err => console.log('NOPE DIDNT CLOSE'));
})
.catch(err => console.log(err, 'faaaaaail'));