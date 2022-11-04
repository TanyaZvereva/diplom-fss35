const {Client} = require('pg');
const {pgSettings} = require('./constants');

const connect = () => {
    const myClient = new Client(pgSettings);
    try{
        myClient.connect();
    }catch(err){
        console.log(err)
    }
    return myClient
}

module.exports = connect()