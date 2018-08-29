var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");

var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");
var app = express();
var path=require('path');

//APP Config
app.set("view engine","ejs");
app.set('port',(process.env.PORT || 8080));
//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(expressSanitizer());

//Mongooseconnect
//mongoose.connect("mongodb://localhost/dj_data")
mongoose.connect("mongodb://localhost/food")
//Mongoose/Model Config
// var requestSchema = new mongoose.Schema({
// 	title: String,
// 	artist: String,
// 	name: {type:String, default:"Anonymous"},
// 	comments: String,
// 	created:{type:Date,default:Date.now}
// })

// var Request = mongoose.model("Request",requestSchema)

var foodSchema = new mongoose.Schema({
	name: String,
	category: {type: String, lowercase:true},
	cost: String,
	location: {type: String, lowercase:true},
	notes: String,
	submitted: {type:String, default:"Anonymous"},
	date: {type:Date,default:Date.now}

})

var Food = mongoose.model("Food",foodSchema)

app.get("/", function(req,res){
	res.render("pages/index");
});

app.get("/mixes", function(req,res){
	res.render("pages/index");
});

app.get("/apps", function(req,res){
	res.render("pages/apps");
});

app.get("/contact", function(req,res){
	res.render("pages/contact");
});

app.get("/resume", function(req,res){
	res.render("pages/resume");
});
app.get("/cadc2017-2018", function(req,res){
	res.render("pages/cadc");
});

app.get("/blog/twosum", function(req,res){
	res.render("pages/blog/leetCodeTwoSum");
});

app.get("/blog/stacks", function(req,res){
	res.render("pages/blog/Stacks");
});

app.get("/cadcsnowtrip",function(req,res){
	res.render("pages/cadcsnowtrip")
})

app.get("/snowtrip",function(req,res){
	res.render("pages/snowtrip")
})

app.get("/blog/stacks", function(req,res){
	res.render("pages/blog/Stacks");
});

app.get("/cadcsnowtrip",function(req,res){
	res.render("pages/cadcsnowtrip")
})

app.get("/snowtrip",function(req,res){
	res.render("pages/snowtrip")
})

app.get("/qadev",function(req,res){
	res.render("pages/qadev")
})

app.get("/dj",function(req,res){
	res.render("pages/dj")
})

//Resume section

app.get("/work/kia", function(req,res){
	res.render("pages/work/kia/kia");
});

app.get("/work/denverautoshow",function(req,res){
	res.render("pages/work/denverautoshow/denverautoshow")
})

app.get("/work/fordsummersalesevent",function(req,res){
	res.render("pages/work/fordsummersalesevent/fordsummersalesevent")
})


// app.get("/irvine",function(req,res){
// 	res.render("pages/grocery");
// });

//REST ROUTING DJ
//INDEX ROUTE
// app.get("/requests",function(req,res){
// 	Request.find({},function(err,	songs){
// 		if(err){
// 			console.log(err);
// 		} else{
// 			res.render("pages/request",{requests:songs})
// 		}
// 	})
// })


// //NEW ROUTE
// app.get("/requests/song",function(req,res){
// 	res.render("pages/songRequest")
// });



// //CREATE ROUTE
// app.post("/requests",function(req,res){
// 	//create song 
// 	Request.create(req.body.request,function(err,newRequest){
// 		if(err){
// 			console.log(err);
// 			res.render("new");
// 		}else{
// 			console.log(newRequest);
// 			res.redirect("requests");
// 		}
// 	})

// });



//Grocery DB
//Index Route
app.get("/irvine",function(req,res){
	
	Food.find({'date': {'$gte': new Date('2018, 8, 08'), '$lt': new Date('2018, 8, 14')}},function(err,allItems){
		if(err){
			
			console.log(allItems);
			console.log(err);
		} else{


			console.log("rendering page");
			
			res.render("pages/grocery",{foods:allItems})
		}
	})
})

//NEW ROUTE
app.get("/irvine/new",function(req,res){
	res.render("pages/newGrocery")
})

//Create Route
app.post("/irvine",function(req,res){
	//create new item
	Food.create(req.body.food,function(err,newRequest){
		if(err){
			console.log(err);
			res.render("new");
		}else{
		
			console.log("this is a new request");
			console.log(newRequest);
			res.redirect("irvine");
		}
	})

});




app.listen(app.get('port'), function(){
	console.log("Mercillo server started");
	console.log("port: " +app.get('port'));

});
