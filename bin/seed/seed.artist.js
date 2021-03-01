require('./../../config/mongo');
const mongoose = require('mongoose');

const artists = 
[
    {
        "name": "Sonic Youth",
        "isBand": true,
        "description": "A noisy band",
        "picture": "https://nbhap.com/wp-content/uploads//2020/04/Sonic-Youth-800x533.jpg"
    },
    {
        "name": "Wu Tang Clan",
        "isBand": true,
        "description": "A legendary hip hop crew",
        "picture": "https://media.npr.org/assets/img/2013/04/07/5-e9c801b0e7fdd6432adbaea31c1019bf39a131ba.jpg"
    },
    {
        "name": "Bojan Z",
        "isBand": false,
        "description": "A dope jazz artist",
        "picture": "https://cdn.radiofrance.fr/s3/cruiser-production/2019/05/3736105b-4e0c-4d51-9726-e116e7af1507/600x337_bojan_pierre_6_ld_definitive-.jpg.jpg"
    },
]

const ArtistModel = require('./../../model/Artist');

ArtistModel.insertMany(artists)
.then(success => {
    console.log(success, 'successsss');
    mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    .catch(err => console.log('NOPE DIDNT CLOSE'));
})
.catch(err => console.log(err, 'faaaaaail'));