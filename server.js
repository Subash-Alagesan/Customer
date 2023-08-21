const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
const { validateCustomer } = require('./validation');
 


const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "customer",

});




connection.connect(function (error) {
    if (error) {
      console.log("Error Connecting to DB");
    } else {
      console.log("successfully Connected to DB");
    }
  });
  server.listen(3036,function check(error) {
    if (error) 
    {
    console.log("Error....dddd!!!!");
    }

    else 
    {
        console.log("Started....!!!! 3036");

    }
});



server.post("/api/customer", validateCustomer,(req, res) => {
  let details = {
    customerid: req.body.customerid,
    customername: req.body.customername,
    businessname: req.body.businessname,
    personalemail: req.body.personalemail,
    companyemail: req.body.companyemail,
    district: req.body.district,
    state: req.body.state,
    phonenumber: req.body.phonenumber,
    industrytype: req.body.industrytype,

  };
  let sql = "INSERT INTO customerdetails SET ?";
  connection.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Customer Registration Failed" });
    } else {
      res.send({ status: true, message: "Customer Registration successfull" });
    }
  });
});

server.get("/api/customer/allcustomer", (req, res) => {
  var sql = "SELECT * FROM customerdetails";
  connection.query(sql, function (error, result) {
    if (error) {
      console.log("Error Connecting to DB" + error);
    } else {
      res.send({ status: true, data: result });
    }
  });
});


