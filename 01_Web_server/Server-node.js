const http = require('http');

const port = 3000;
const hostname = '127.0.0.1';

const server = http.createServer((req,res)=>{
    if (req.ur ===  '/') {
        res.statusCode = 200;
        res.setHeader('Content-type','text/plain');
        res.end("hello User's")
    } else if (req.url ===  '/login') {
        res.statusCode = 200;
        res.setHeader('Content-type','text/plain');
        res.end("Successfully login")
    }else{
        res.statusCode = 404;
        res.setHeader('Content-type','text/plain');
        res.end("404 not found")
    } 
})


server.listen(port,hostname,()=>{
 console.log(`server is listening at http://${hostname}:${port}`);
 
})
