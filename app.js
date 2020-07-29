const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    

    var data = {
        members : [
            {
                email_address : email,
                status : "subscribed",

                merge_fields:{
                    FNAME : fname,
                    LNAME : lname
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/b70d18d613";

    const options = {
        method:"POST",
        auth : "Arsh1:f3c70e5c94d437335bbdada9afa975bd-us17"
    }
    const request = https.request(url,options,function(response){

        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.get("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server running on port 3000");
});

// f3c70e5c94d437335bbdada9afa975bd-us17

// listid :
// b70d18d613