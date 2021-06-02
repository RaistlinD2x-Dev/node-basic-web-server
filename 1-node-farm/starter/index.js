const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');

// replace template functions
const replaceTemplate = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    ouput = output.replace(/{%IMAGE%}/g, product.image);
    ouput = output.replace(/{%FROM%}/g, product.from);
    ouput = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    ouput = output.replace(/{%QUANTITY%}/g, product.quantity);
    ouput = output.replace(/{%DESCRIPTION%}/g, product.description);
    ouput = output.replace(/{%ID%}/g, product.id);
    ouput = output.replace(/{%PRICE%}/g, product.price);
    
    if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic')

    return output
}

// moved to top level so it is executed once, changed from async to sync
const templateOverview = fs.readFileSync(`./templates/template-overview.html`, 'utf-8')
const templateCard = fs.readFileSync(`./templates/template-card.html`, 'utf-8')
const templateProduct = fs.readFileSync(`./templates/template-product.html`, 'utf-8')

const data = fs.readFileSync(`./dev-data/data.json`, 'utf-8')
const dataObj = JSON.parse(data);
console.log(dataObj)



// creates server and assigns it to server variable
const server = http.createServer((req, res) => {
    // req.url is just the appended route
    const pathName = req.url

    // basic routing for root and overview routes
    if(pathName === '/' || pathName === '/overview') {
        res.writeHead(200, { 'Content-Type': 'text/html' })

        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join('')
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml)

        res.end(output)

    // product page
    } else if (pathName === '/product'){
        res.end('this is the product')

    // API
    } else if (pathName === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(data)

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