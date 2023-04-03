const axions = require('axios');

const {Telegraf} = require("telegraf");


const bot = new Telegraf("5525472649:AAGkMiusHZ-n-3Ks1T9EnKJWnPdAyR8vA3c");

const org = require("./config/config");



let State = ["TO","SP","SE","RS","RR","RO","RN","RJ","PR","PI","PE","PB","PA","MT","MS","MG","MA","GO","ES","DF","BA","AP","AM","AL","AC"]


let dataOk = "";
let dataSlow = "";
let dataVeryslow = "";
let dataTimeout = "";
let dataError = "";
let Report = "";
let ReportFinal = "";
let dataBool = false;
let ErrorOn = false;
let msgSend = false;


const dataAnalytics = (data,dataState) =>{

    if(parseInt(data.status) === 1){
        dataState.map((n,index)=>{
            if(data.id_worker == n.id_worker){
                dataOk += State[index]+" ";
            }
        })
    }

    if(parseInt(data.status) === 2){
        console.log("Slow in this state: "+data.id_worker);
        dataBool = true;
        dataState.map((n,index)=>{
            if(data.id_worker == n.id_worker){
                dataSlow += State[index]+" ; ";
            }
        })
    }
    if(parseInt(data.status) === 3){
        console.log("Very slow in this state: "+data.id_worker);
        dataBool = true;
        dataState.map((n,index)=>{
            if(data.id_worker == n.id_worker){
                dataVeryslow += State[index]+" ; ";
            }
        })
    }
    if(parseInt(data.status) === 4){
        console.log("Timeout in this state: "+data.id_worker);
        dataBool = true;
        dataState.map((n,index)=>{
            if(data.id_worker == n.id_worker){
                dataTimeout += State[index]+" ; ";
            }
        })
    }
    if(parseInt(data.status) === 5){
        console.log("Error in this state: "+data.id_worker);
        dataBool = true;
        dataState.map((n,index)=>{
            if(data.id_worker == n.id_worker){
                dataError += State[index]+" ; ";
            }
        })
    }



}



const fetchData = async () => {
    try{
        return await axions.get("https://monitor.tecnospeed.com.br/monitores?stateStatus=true&doc=nfce");
    }catch (error){
        console.log(error);
    }
}
var bott
function SEFAZ(bot){
    bott = setInterval(() => {
        console.clear();
        console.log("Start Sefaz Check...");
            date = new Date();
            if(date.getMinutes()<10){minutes = "0"+date.getMinutes()}else{minutes = date.getMinutes()}
            myDate = date.getDate()+"/"+(date.getMonth()+1)+" - " + date.getHours()+":"+minutes;
            console.log(date.getDate()+"/"+(date.getMonth()+1)+" - " + date.getHours()+":"+minutes);
            fetchData().then((response)=>{
                try{
                    dataState = response.data;
                    response.data.map((n)=>{
                        dataAnalytics(n,dataState);
                    });
                    Report  = ` ${myDate}
    
                    Estados ok: ${dataOk}
    
                    Estados Lento: ${dataSlow}
    
                    Estados Muito lento: ${dataVeryslow}
                    
                    Estados Timeout: ${dataTimeout}
    
                    Estados Error: ${dataError}
    
    
                    `;
                    console.log("No Error");
                    bot.telegram.sendMessage(1153804317,Report);
                    //bot.telegram.sendMessage(-1001739045097,ReportFinal);
                    console.log('Enviado.');
                    /*
                    if(dataBool==true){
                        console.log(Report);
                        bot.telegram.sendMessage(1153804317,Report);
                        //bot.telegram.sendMessage(-1001739045097,ReportFinal);
                        console.log('Enviado.');
                        ErrorOn = true;
                        dataBool = false;
                    }else{
                        if(ErrorOn == true){
                            console.log(Report);
                            bot.telegram.sendMessage(1153804317,Report);
                            //bot.telegram.sendMessage(-1001739045097,ReportFinal);
                            console.log('Enviado.');
                            ErrorOn = false;

                        }
                    }*/
                    
                    
                }catch(err){
                    console.log("no response.");
                }
                
            
    
            })
    
            
            dataOk = "";
            dataSlow = "";
            dataVeryslow = "";
            dataTimeout = "";
            dataError = "";
            Report = "";
    
    }
    ,org.config.time,"bot");



    
}
SEFAZ(bot);