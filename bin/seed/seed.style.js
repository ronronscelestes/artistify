require('./../../config/mongo');
const mongoose = require('mongoose');

const styles = 
[
    {
        "name": "Jazz",
        "color": "#808080",
        "wikiURL": "https://en.wikipedia.org/wiki/Jazz"
    },
    {
        "name": "Rock",
        "color": "#000000",
        "wikiURL": "https://en.wikipedia.org/wiki/Rock_music"
    },
    {
        "name": "Rap",
        "color": "#c42323",
        "wikiURL": "https://en.wikipedia.org/wiki/Hip_hop_music"
    },
]

const StyleModel = require('./../../model/Style');

StyleModel.insertMany(styles)
.then(success => {
    console.log(success, 'successsss');
    mongoose.connection.close().then(success => console.log('WELL CLOSED'))
    .catch(err => console.log('NOPE DIDNT CLOSE'));
})
.catch(err => console.log(err, 'faaaaaail'));