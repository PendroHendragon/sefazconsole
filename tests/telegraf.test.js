const object = require('../components/telegraf');

//object.send("hello");


const telegrafTest = (myfunc,response,request) => {
    let res = myfunc(request);

    if(response === res){
        console.log("test passed");
    }else{
        console.log("test failed");
    }
}

telegrafTest(object.send,"Success","hello");