const fs = require('fs');
const http = require('http');
const url = require('url');

// creates server and assigns it to server variable
const server = http.createServer((req, res) => {
    // req.url is just the appended route
    const pathName = req.url

    // basic routing for root and overview routes
    if(pathName === '/' || pathName === '/overview') {
        res.end('This is the overview page')
    } else if (pathName === '/product'){
        res.end('this is the product')
    } else if (pathName === '/api') {

        fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
            const productData = JSON.parse(data);
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(data)
            // console.log(productData)
        })
    } else {
        // error handling with 404 and error handling with custom header
        res.writeHead(404, { 
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        })
        // closing response
        res.end('<h1>404 page not found</h1>')
    }

    // console.log(req.url)
    // res.end('Hello from the server')
})


// creates listen event for server on 8000 with localhost and callback
server.listen(8000, '127.0.0.1', () => {
    console.log('Server is listening on port 8000')
})












/* ---------------------------------------------- File System -------------------------------------------------------*/

// // blocking code execution
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)
// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File write SUCCESS!')

// // non-blocking code execution + callback hell
// // tested error handler with change of file name to ...startttt.txt
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err) return console.error('ERROR!')

//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2)
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data3)

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 console.log('File has been written!!!!!!')
//             })
//         })
//     })
// })
// console.log('Will read file at some point!') // this happens first while waiting on callback