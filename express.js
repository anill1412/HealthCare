var http=require('http');
var url=require('url');
var fs=require('fs');
var port=5000;
var cust=require('./customer.json');
var server=http.createServer(function(req,res)
{
    if(req.url==="/")
    {
    res.write("<h1>Welcome to the rest API</h1>");
    res.end();
    }
    if(req.url==="/students"&&req.method==="GET")

    {
        fs.readFile("details.json",function(err,data)
        {
            res.write(data);
            res.end();
        });
    }
    if(req.method==="POST")
    {
        var newData=url.parse(req.url,true).query;
        cust.push(newData);
        writeDataBack(cust);
        res.write("<h1>New Student Record is Updated</h1>");
        res.end();
    }
    if(req.method==="PUT")
    {
        var upcust=url.parse(req.url,true).query;
        for(s in cust)
        {
            if(cust[s]['name']==upcust['name'])
            {
                cust[s]['email']=upcust['email'];
                cust[s]['pw']=cust['pw'];
                writeDataBack(cust);
                res.write("<h1>Data is updated successfully</h1>");  
            }
        }
        res.end();
    }
    if(req.method==="DELETE")
    {
        var delData=url.parse(req.url,true).query;
        for(s in cust)
        {
            if(cust[s]['name']==upcust['name'])
            {
                cust.splice(s,1);
                writeDataBack(cust);
                res.write("<h1>Data is deleted successfully</h1>");
                
            }
        }
        res.end();
    }
    function writeDataBack(data)
    {
        fs.writeFile("Employee.json",JSON.stringify(data),function(err)
        {
            console.log(err);
        });
    }
});
server.listen(port,function()
{
    console.log("server is running:");
});

