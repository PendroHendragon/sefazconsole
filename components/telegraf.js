function send(message){

    
    const {Telegraf} = require("telegraf");

    const bot = new Telegraf("5525472649:AAGkMiusHZ-n-3Ks1T9EnKJWnPdAyR8vA3c");

    try{
        bot.telegram.sendMessage(1153804317,message);
        return 'Success';
    }catch{
        console.log('Error: no message sended');
        return 'Error: no message sended';
    }

}

module.exports = {send};