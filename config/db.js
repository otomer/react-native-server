var mongoose = require('mongoose');

var dbInfo = {
    user: 'admin',
    password: 'admin',
    host: 'ds044689.mlab.com',
    port: 44689,
    dbName: 'appdb',
    url: 'mongodb://<dbuser>:<dbpassword>@<dbhost>:<dbport>/<dbname>',
    getConnectionString: function () {
        return this.url
            .replace('<dbuser>', this.user)
            .replace('<dbpassword>', this.password)
            .replace('<dbhost>', this.host)
            .replace('<dbport>', this.port)
            .replace('<dbname>', this.dbName);
    }
}

function setup() {
    //connect to MongoDB using Mongoose
    mongoose.connect(dbInfo.getConnectionString(), {
        useMongoClient: true
    });

    var db = mongoose.connection;

    //Error
    db.on('error', console.error.bind(console, 'connection error:'));

    //Connection open 
    db.once('open', function () {
        // we're connected!
        console.log('Connected to mongodb (db: <dbname>).'.replace("<dbname>", dbInfo.dbName));
    });

    return db;
}

module.exports = {
    setup: setup
}