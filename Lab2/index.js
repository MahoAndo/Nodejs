import http from "http";
import fs from "fs";
const PORT = 8000;

const server = http.createServer((req, res) => {
    console.log("Request received");
    const url = req.url;
    if(url === "/"){
        res.setHeader("Content-Type", "text/html");
        res.write(`
            <h1>Hello Node!</h1>
            <p><a href="/read-message">Read Message</a></p>
            <p><a href="/write-message">Write Message</a></p>
        `);
        //res.end();
    }
    else if (url === "/read-message"){
        const text = fs.readFileSync("file.txt", "utf-8", (err, data) => {
            if(data) 
                console.log(data);
            else
                console.log(err);
        });
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`
            <h1>Read Message Page</h1>
            <h1>${text}</h1>
            <ul>
                <li><a href="/">Back Home</a></li>
                <li><a href="/write-message">Write Message</a></li>
            </ul>
        `);
        //res.end();
    }
    else if(url === "/write-message"){
        if(req.method === 'GET'){
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(`
                <form action='/write-message' method='post'>
                    <h1>Write Message Page</h1>
                    <input type='text' name='text'/>
                    <button type='submit'>Submit</button>
                    <ul>
                        <li><a href="/">Back Home</a></li>
                        <li><a href="/write-message">Write Message</a></li>
                    </ul>
                </form>
            `);
            //res.end();
        }
        else if(req.method === 'POST'){
            const msgs = [];
            req.on('data', msg => msgs.push(msg))
            req.on('end', () => {
                const data = Buffer.concat(msgs).toString();
                const text = data.substring(data.indexOf('=')+1);
                fs.writeFile('file.txt', text, err => {
                    if(err){
                        console.error(err)
                    }
                });
            });
            res.writeHead(301, {
                Location: '/'
            })
        }
    res.end();
    }
});

server.listen(PORT, function(){
    console.log('Server is running on port 8000');
});