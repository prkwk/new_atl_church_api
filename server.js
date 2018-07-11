
var connected_db = "heroku_73fc1cca029ff8b";
var express      = require("express");
var app          = express();
var bodyParser   = require("body-parser");
var path         = require("path");
var request      = require("request");
var querystring  = require('querystring');
var mysql        = require('mysql');
const port       = 3000;
var pw           = "testpro@2018";


// create application/json parser
var jsonParser = bodyParser.json();

    // parse application/json
    app.use(bodyParser.json());
    app.use(express.static(path.join(__dirname, "public")));
    app.use(bodyParser.urlencoded({extended: true}));

//connect to db
 var con = mysql.createPool({
  connectionLimit : 100000000000000000000,
  host: "us-cdbr-iron-east-04.cleardb.net",
  user: "b52e8ac32d6e67",
  password: "479e4705",
  database: connected_db,
  debug: false,
  multipleStatements: true
});
//start database connection
con.getConnection((err) => {
  if (err) throw err;
});

//search post request
app.post("/search/new", (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');

      if(req.body.key==pw){
          var serchText = req.body.search;
          var searchFromPage      = "/";
          
          var query = "insert into atl_church_search (searchText, searchFromPage, searchDate) values ?";
    
          var values = 
          [
             [serchText, searchFromPage, Date.now()]
          ];

          con.query(query, [values], (error, results, fields) => {
              if(error){
                    console.log("error: "+error)
                    res.send(JSON.stringify({"status": 500, "error": "insert is null", "event": null})); 
                  //If there is error, we send the error in the error section with 500 status
            }else{
                   res.send(JSON.stringify({
                    "status": 200, 
                    "error": null, 
                    "message": serchText + " inserted in db",
                    "error": null,                    
                    "event": results
                  }));
                 //If there is no error, all is good and response is 200OK.
                 }
             });        
           }
     else{
      console.log("invalid key request " + req.body.key);
      res.send(JSON.stringify({"status": 401, "statusText": "Unauthorized", "error": "invalid key request"}));
    }
});


//subscribe post request
app.post("/subscribe/new", (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');

      if(req.body.key==pw){
          var subscribeEmail = req.body.subscribeEmail;
          var subscribeFromPage      = "/";
       
          var query = "insert into atl_church_subscribe (subscriberEmailAddress, subscribeFromPage) values ?";
    
          var values = 
          [
             [subscribeEmail, subscribeFromPage]
          ];

          con.query(query, [values], (error, results, fields) => {
              if(error){
                    console.log("error: "+error)
                    res.send(JSON.stringify({"status": 500, "error": "insert is null", "event": null})); 
                  //If there is error, we send the error in the error section with 500 status
            }else{
                   res.send(JSON.stringify({
                    "status": 200, 
                    "error": null, 
                    "message": subscribeEmail + " inserted in db",
                    "error": null,                    
                    "event": results
                  }));
                 //If there is no error, all is good and response is 200OK.
                 }
             });        
           }
     else{
      console.log("invalid key request " + req.body.key);
      res.send(JSON.stringify({"status": 401, "statusText": "Unauthorized", "error": "invalid key request"}));
    }
});


//admin post request
app.post("/admin/new", (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');

    var requestData = {
        fname:        req.body.fname,
        lname:        req.body.lname,
        email: req.body.emailAddress,
        password:     req.body.password,
        squestion:    req.body.squestion,
        sresponse:    req.body.sresponse
    }

      if(req.body.key==pw){
          var query = "insert into atl_church_admin (adminFirstName, adminLastName,adminEmailAddress,adminPassword, adminSecurityQuestion,adminSecurityAnswer) values ?";
    
          var values = 
          [
             [requestData.fname, requestData.lname, requestData.email, requestData.password, requestData.squestion, requestData.sresponse]
          ];

          con.query(query, [values], (error, results, fields) => {
              if(error){
                    console.log("error: "+error)
                    res.send(JSON.stringify({"status": 500, "error": "insert is null", "event": null})); 
                  //If there is error, we send the error in the error section with 500 status
            }else{
                   res.send(JSON.stringify({
                    "status": 200, 
                    "error": null, 
                    "message": requestData.email + " inserted in db",
                    "error": null,                    
                    "event": results
                  }));
                 //If there is no error, all is good and response is 200OK.
                 }
             });        
           }
     else{
      console.log("invalid key request " + req.body.key);
      res.send(JSON.stringify({"status": 401, "statusText": "Unauthorized", "error": "invalid key request"}));
    }
});


//home page our christian main activity post request
app.post("/activity/new", (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');
    var auth = " ";

    console.log(req);
    var requestData = {
        adminId                 : req.body.adminId,
        activityDescription     : req.body.actText,
        activityPhoto           : req.body.acPhoto,
        activityGuiDisplayedDate: req.body.acDdate
    }

      if(req.body.key!==pw){
          var query = "insert into atl_church_home_christian_activity (adminId, activityDescription, activityPhoto, activityGuiDisplayedDate) values ?";
    
          var values = 
          [
             [requestData.adminId, requestData.activityDescription, requestData.activityPhoto, requestData.activityGuiDisplayedDate]
          ];

          con.query(query, [values], (error, results, fields) => {
              if(error){
                    console.log("error: "+error)
                    res.send(JSON.stringify({"status": 500, "error": "insert is null", "event": null})); 
                  //If there is error, we send the error in the error section with 500 status
            }else{
                   res.send(JSON.stringify({
                    "status": 200, 
                    "error": null, 
                    "message": requestData.activityDescription + " inserted in db",
                    "error": null,                    
                    "event": results
                  }));
                 //If there is no error, all is good and response is 200OK.
                 }
             });        
           }
     else{
      console.log("invalid key request " + req.body.key);
      res.send(JSON.stringify({"status": 401, "statusText": "Unauthorized", "error": "invalid key request"}));
    }
});


//home page our christian main qoutes post request
app.post("/quote/new", (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');

    var requestData = {
        adminId:                 req.body.adminId,
        quoteTitle:              req.body.quoteTitle,
        quoteMessageDescription: req.body.quoteMessageDescription,
        quoteVerse:              req.body.quoteVerse,
        quoteMessageDbDate:      req.body.quoteMessageDbDate
    }

      if(req.body.key==pw){
          var query = "insert into atl_church_home_quote (adminId, quoteTitle, quoteMessageDescription, quoteVerse, quoteMessageDbDate) values ?";
    
          var values = 
          [
             [requestData.adminId, requestData.quoteTitle, requestData.quoteMessageDescription, requestData.quoteVerse, requestData.quoteMessageDbDate]
          ];

          con.query(query, [values], (error, results, fields) => {
              if(error){
                    console.log("error: "+error)
                    res.send(JSON.stringify({"status": 500, "error": "insert is null", "event": null})); 
                  //If there is error, we send the error in the error section with 500 status
            }else{
                   res.send(JSON.stringify({
                    "status": 200, 
                    "error": null, 
                    "message": requestData.activityDescription + " inserted in db",
                    "error": null,                    
                    "event": results
                  }));
                 //If there is no error, all is good and response is 200OK.
                 }
             });        
           }
     else{
      console.log("invalid key request " + req.body.key);
      res.send(JSON.stringify({"status": 401, "statusText": "Unauthorized", "error": "invalid key request"}));
    }
});


//home page our christian main news post request
app.post("/news/new", (req, res) => {
    
    res.setHeader('Content-Type', 'application/json');

    var requestData = {
        adminId:              req.body.adminId,
        newsTitle:            req.body.newsTitle,
        newsDescription:      req.body.newsDescription,
        newsPhoto:            req.body.newsPhoto,
        newsGuiDisplayedDate: req.body.newsGuiDisplayedDate,
        newsDbDate:           req.body.newsDbDate
    }

      if(req.body.key==pw){
          var query = "insert into atl_church_news (adminId, newsTitle, newsDescription, newsPhoto, newsGuiDisplayedDate, newsDbDate) values ?";
    
          var values = 
          [
             [requestData.adminId, requestData.newsTitle, requestData.newsDescription, requestData.newsPhoto, requestData.newsGuiDisplayedDate, requestData.newsDbDate,]
          ];

          con.query(query, [values], (error, results, fields) => {
              if(error){
                    console.log("error: "+error)
                    res.send(JSON.stringify({"status": 500, "error": "insert is null", "event": null})); 
                  //If there is error, we send the error in the error section with 500 status
            }else{
                   res.send(JSON.stringify({
                    "status": 200, 
                    "error": null, 
                    "message": requestData.newsTitle + " inserted in db",
                    "error": null,                    
                    "event": results
                  }));
                 //If there is no error, all is good and response is 200OK.
                 }
             });        
           }
     else{
      console.log("invalid key request " + req.body.key);
      res.send(JSON.stringify({"status": 401, "statusText": "Unauthorized", "error": "invalid key request"}));
    }
});







//tell express what to do when the /about route is requested
app.post('/form', function(req, res){
    res.setHeader('Content-Type', 'application/json');

    //mimic a slow network connection
    setTimeout(function(){

        res.send(JSON.stringify({
            firstName: req.body.firstName || null,
            lastName: req.body.lastName || null
        }));

    }, 1000)

    //debugging output for the terminal
    console.log('you posted: First Name: ' + req.body.firstName + ', Last Name: ' + req.body.lastName);
});







//get the list of sermons, event, news ...
app.get("/", (req, res) => {  
    con.query('SELECT * FROM atl_church_events ORDER BY event_id DESC; SELECT * FROM atl_church_sermons ORDER BY sermon_id DESC; SELECT * FROM ATL_CHURCH_NEWS ORDER BY news_id DESC;', [1, 2, 3], function(err, results) {
    if (err) throw err;
    
    // `results` is an array with one element for every statement in the query:
     console.log(results[0]); // [{1: 1}]
     console.log(results[1]); // [{2: 2}]
     console.log(results[2]); // [{3: 3}]
        
    res.send(JSON.stringify({"status": 200, "error": null, "event": results[0], "sermon": results[1], "news": results[2]}));
   })
});

//get the list and details of events
app.get("/events/add", (req, res) => {
    
	con.query("SELECT * FROM atl_church_events ORDER BY event_id DESC", (error, results, fields) => {
		if(error){
            console.log(error);
	  		res.send(JSON.stringify({"status": 500, "error": "an error was returned by the db", "event": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "event": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
	});
});

//add entries to the event
app.post("/events/add/new", (req, res) => {
    
    var event_name        = req.body.event_name;
    var event_date        = req.body.event_date;
    var event_description = req.body.event_description;
    var event_city        = req.body.event_city;
    var event_location    = req.body.event_location;
    
    console.log(req.body);
    
    var query = "insert into atl_church_events (event_name, event_date, event_description, event_city, event_location) values ?";
    
    var values = [
    [event_name, event_date, event_description, event_city,event_location]
    ];
    
	con.query(query, (error, results, fields) => {
    if(error){
         res.send(JSON.stringify({"status": 500, "error": error, "event": null})); 
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.send(JSON.stringify({"status": 200, "error": null, "event": results}));
        //If there is no error, all is good and response is 200OK.
      }
  }); 
});


//delete an event
app.delete("/events/remove/:eventid", (req, res) => {
    
    var row_id        = req.params.eventid;
    
    console.log(req);
    
    var query = "delete from atl_church_events where id=" + row_id + ";";
    
	con.query(query, (error, results, fields) => {
		if(error){
	  		 res.send(JSON.stringify({"status": 500, "error": error, "event": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "event": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
	}); 
});

//update an event
app.put("/events/update/:eventid", (req, res) => {

    var updatedField = req.body.value;
    var newValue     = req.body.new_value;
    var row_id       = req.params.eventid;
    
    console.log(req.body);
    
    var query = "update atl_church_events set" +  updatedField + " ='"+ newValue +"' where id =" + row_id + ";";
    
	con.query(query, (error, results, fields) => {
		if(error){
	  		 res.send(JSON.stringify({"status": 500, "error": error, "event": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			res.send(JSON.stringify({"status": 200, "error": null, "event": results}));
  			//If there is no error, all is good and response is 200OK.
	  	}
	}); 
});

//get the list and details of events
app.post("/photo/add/new", (req, res) => {
    
    var photo_name        = req.body.photo_name;
    var photo_description = req.body.photo_description;
    var photo             = req.body.photo;
    
    console.log(req.body);
    
    var query = "insert into atl_church_album_photos (photo_name, photo_description, photo) values ?";
    
    var values = [
        [photo_name, photo_description, photo]
    ];
    
	con.query(query,[values], (error, results, fields) => {
		if(error){
	  		res.send(JSON.stringify({"status": 500, "error": error, "event": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			//res.send(JSON.stringify({"status": 200, "error": null, "event": results}));
  			//If there is no error, all is good and response is 200OK.
            res.redirect("http://localhost:2500/system_admin");
	  	}
	});
    
});


//add sermons
app.post("/sermons/add/new", (req, res) => {

    var sermon_post_body = req.body;

	var add_sermon = {
        sermon_title      : sermon_post_body.sermon_title,
        sermon_date       : sermon_post_body.sermon_date,
        preacher          : sermon_post_body.preacher,
        sermon_description: sermon_post_body.sermon_description,
        sermon_video      : sermon_post_body.sermon_video,
        admin             : sermon_post_body.admin,
        sermon_photo      : sermon_post_body.sermon_photo
    };
     var sql = "INSERT INTO atl_church_sermons (sermon_title,sermon_date, preacher, sermon_description, sermon_video, admin, sermon_photo) VALUES ?";
    var values = [
                    [add_sermon.sermon_title, add_sermon.sermon_date, add_sermon.preacher, add_sermon.sermon_description, add_sermon.sermon_video, add_sermon.admin, add_sermon.sermon_photo]
                 ];

    con.query(sql, [values], (err, result) => {
    	if (err) throw err;

    	console.log("Number of records inserted: " + result.affectedRows);
    	res.send(result);
    });
    
});

//get sermons
 app.get("/sermons/add", (req, res) => {
  	con.query("SELECT * FROM atl_church_sermons ORDER BY sermon_id DESC;", (error, results, fields) => {
		if(error){
            console.log(error);
	  		res.send(JSON.stringify({"status": 500, "error": "an error was returned by the db", "sermons": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			var obj = JSON.stringify({"status": 200, "error": null, "sermons": results});
  			//If there is no error, all is good and response is 200OK.

  			var dbResSize = results.length;
  			console.log(obj);

  		   res.send(results);	 
	  	}
	});
 });


 //add news
app.post("/news/add/new", (req, res) => {

    var news_post_body = req.body;

	var add_news = {
        news_title      : news_post_body.news_title,
        news_date       : news_post_body.news_date,
        admin           : news_post_body.admin,
        news_photo      : news_post_body.news_photo
    };

    var sql = "INSERT INTO ATL_CHURCH_NEWS (news_title,news_date, admin, news_photo) VALUES ?";
    var values = [
                    [add_news.news_title, add_news.news_date, add_news.admin, add_news.news_photo]
                 ];

    con.query(sql, [values], (err, result) => {
    	if (err) throw err;

    	console.log("Number of records inserted: " + result.affectedRows);
    	res.send(result);
    });
});

//get news
 app.get("/news/add", (req, res) => {
  	con.query("SELECT * FROM ATL_CHURCH_NEWS ORDER BY news_id DESC;", (error, results, fields) => {
		if(error){
            console.log(error);
	  		res.send(JSON.stringify({"status": 500, "error": "an error was returned by the db", "news": null})); 
	  		//If there is error, we send the error in the error section with 500 status
	  	} else {
  			var obj = JSON.stringify({"status": 200, "error": null, "news": results});
  			//If there is no error, all is good and response is 200OK.

  			var dbResSize = results.length;
  			console.log(obj);

  		   res.send(results);	 
	  	}
	});
 });

//starting the server
app.listen(process.env.PORT || port, ()  => {
	console.log(port + ' port is live locally and ' + process.env.PORT + 'is up');
});