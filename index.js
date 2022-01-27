const http = require('http');
const fs = require('fs');
const { parse } = require('querystring');

const server = http.createServer((req, res)=>{
        if(req.url === "/" && req.method === 'GET'){
            res.writeHead(200, {'Content-type': 'text/html'})
            let data=`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Employee details</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            </head>
            <body>
                <h2 class="bg-primary text-white p-2 m-4 text-center">Employee Details</h2>
                <div class="container">
                <table class="table table-dark">
                        <thead>
                        <tr>
                          <th>Emp.id</th>
                          <th>Employee name</th>
                          <th>Age</th>
                          <th>City</th>
                          <th>Salary</th>                         
                        </tr>
                      <thead>
                      <tbody>`
            const text = fs.readFileSync('Employee.txt').toString();
            const line = text.split("\n");
            line.forEach(ele => {
                data += `<tr>`;
                const str = ele.split(",");
                str.forEach(el=>{
                    data += `<td>${el}</td>`
                })   
                data += `</tr>`;          
            });
            data += `
            </tbody>
            </table>
            <button type="submit" class="btn btn-success m-3"><a href="http://localhost:6677/addEmployee" class="text-decoration-none text-white">Add Employee</a></button>
            </div>
            </body>
            </html>` 
            res.write(data);
            res.end();
        }
        else if(req.url === "/addEmployee"){
            res.writeHead(200, {'Content-type': 'text/html'})
            const data = fs.readFileSync('addEmployee.html');
            res.write(data.toString());
            res.end();
        }
        else if(req.method === 'POST'){
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let data = parse(body);
               fs.appendFile("Employee.txt",`\n${data.eid},${data.ename},${data.age},${data.city},${data.salary}`,(err)=>{
                   if(err) throw err;
               });
            });
            res.writeHead(301,
                {Location: 'http://localhost:6677/'}
              );
              res.end();
        }
        // else if(req.method === 'NONE'){
        //     res.writeHead(301,
        //         {Location: 'http://localhost:6677/addEmployee'}
        //       );
        //       res.end();
        //     }
    })
    server.listen(6677);
    
    