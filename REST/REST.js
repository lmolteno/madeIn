var mysql = require("mysql");
function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {
    router.get("/",function(req,res){
        res.json({"Message" : "Hello World !"});
    })
    
    
    
    //PRODUCTS
    router.get("/products",function(req,res){
        var query = "SELECT * FROM products";
        connection.query(query,function(err,rows){
            res.json(rows);
        })
    });
    router.get("/products:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM products WHERE id = " + idvar;
        var tables = ['products','id', req.params.id];
        query = mysql.format(query,tables);
        console.log("get products by id:" + query);
        connection.query(query,function(err,rows){
            res.json(rows);
        });
    });
    router.put("/products", function(req,res){
        var query = "INSERT INTO products(name,barcode,idmanufacturer) VALUES (?,?,?);";
        var tables = [req.body.name,parseInt(req.body.barcode), parseInt(req.body.idman)];
        query = mysql.format(query,tables);
        console.log("put products: " + query);
        console.log(parseInt(req.body.barcode));
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Query" : "Failed"});
            } else {
                res.json({"Query" : "Complete"});
            };
        });
    });
    
    
    //MANUFACTURER
    router.get("/manu",function(req,res){
        var query = "SELECT * FROM manufacturer";
        connection.query(query,function(err,rows){
            console.log("get manufacturer: " + query);
            res.json(rows);
        })
    })
    router.get("/manu:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM ?? WHERE ?? = ?;";
        var tables = ['manufacturer','id', idvar];
        query = mysql.format(query,tables);
        var query1 = "SELECT name FROM countries WHERE id = ?";
        console.log("get manufacturer by id: " + query);
        connection.query(query, function(err,result){
            query1 = mysql.format(query1, [result[0].idcountryman]);
            connection.query(query1, function(err,result1){
                var out = [result[0], result1];
                res.json(out);
            });
        });
    });
    router.put("/manu", function(req,res){
        var query = "INSERT INTO manufacturer (name, idcountryman) VALUES (?,?)";
        var tables = [req.body.name, parseInt(req.body.idcountryman)];
        query = mysql.format(query, tables);
        console.log(query);
        connection.query(query, function(err, result){
            if (err) {
                res.json({"Query" : "Failed"});
            } else {
                res.json({"Query" : "Successful"});
            }
        });
    });
    
    
    //ADDRESS
    router.get("/address/countryname:namecount", function(req,res){
        var idvar = req.params.namecount;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        idvar = idvar.replace("_", " ");
        console.log(idvar);
        var query = "SELECT * FROM countries WHERE name = ?";
        var tables = [idvar];
        query = mysql.format(query, tables);
        connection.query(query, function(err,results){
            console.log("get country by id: ", query);
            res.json({"results" : results});
        })
    })
    router.get("/address/country",function(req,res){
        var query = "SELECT * FROM countries";
        connection.query(query,function(err,rows){
            console.log("get countries: " + query);
            res.json(rows);
        })
    })
    router.get("/address/country:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var tables = ['countries','id', idvar];
        query = mysql.format(query,tables);
        console.log("get country by id:" + query);
        connection.query(query,function(err,rows){
            res.json(rows);
        });
    });
    router.get("/address/state",function(req,res){
        var query = "SELECT * FROM states";
        connection.query(query,function(err,rows){
            console.log("get state: " + query);
            res.json(rows);
        });
    });
    router.get("/address/state:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var tables = ['states','id', idvar];
        query = mysql.format(query,tables);
        console.log("get state by id: " + query);
        connection.query(query, function(err,result){
            var query1 = "SELECT name FROM countries WHERE id = ?";
            query1 = mysql.format(query1, [result[0].country_id]);
            console.log(result);
            connection.query(query1, function(err,result1){
                if(err) {
                    console.log("error with second query");
                } else{
                    var out = [result, {"Country" : result1}];
                    console.log(result1);
                    console.log(query1);
                    res.json(out);
                }
            });
        });
    });
    router.put("/address/state", function(req,res){
        var query = "INSERT INTO state(name, country_id) VALUES (?,?);";
        var tables = [req.body.name, req.body.country_id];
        query = mysql.format(query,tables);
        console.log("put state: " + query);
        console.log(parseInt(req.body.barcode));
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Query" : "Failed"});
            } else {
                res.json({"Query" : "Complete"});
            };
        });
    });
    router.get("/address/city",function(req,res){
        var query = "SELECT * FROM city";
        connection.query(query,function(err,rows){
            console.log("get city: " + query);
            console.log(rows);
            res.json(rows);
        });
    });
    router.get("/address/city:id", function(req,res){
        var idvar = req.params.id;
        while(idvar.charAt(0) === ':')
            idvar = idvar.substr(1);
        var query = "SELECT * FROM ?? WHERE ?? = ?";
        var tables = ['city','id', idvar];
        query = mysql.format(query,tables);
        var query1 = "SELECT name FROM states WHERE id = ?";
        console.log("get city by id:" + query);
        connection.query(query, function(err,result){
            query1 = mysql.format(query1, [result[0].stateid]);
            connection.query(query1, function(err,result1){
                var out = [result, {"State" : result1}];
                res.json(out);
            });
        });
    });
    router.put("/address/city", function(req,res){
        var query = "INSERT INTO city(name, stateid) VALUES (?,?);";
        var tables = [req.body.name, req.body.stateid];
        query = mysql.format(query,tables);
        console.log("put city: " + query);
        console.log(parseInt(req.body.barcode));
        connection.query(query,function(err,rows){
            if(err) {
                res.json({"Query" : "Failed"});
            } else {
                res.json({"Query" : "Complete"});
            };
        });
    });
} 

module.exports = REST_ROUTER;
