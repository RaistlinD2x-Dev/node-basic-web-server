const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Hello from the server')
})

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