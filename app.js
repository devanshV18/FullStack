const express = require('express')
const app = express()  //app = instance of express // app serves as express for us
const port = 3000

const { connection } = require('./db/db_config');

// NOTE - In the Express.js route definition, colons (:) are used to define route parameters. When you define a route with a colon followed by a parameter name (e.g., :num1, :num2), Express.js treats that part of the URL as a variable and extracts its value from the actual request URL.

// app.get('/:title', (req, res) => {
//     const title = req.params.title;
//     // Decode the search term
//     const decodedtitle = decodeURIComponent(title);

//     res.send(`
//         <!DOCTYPE html>
//         <html>
    
//         <body>
            
//             <h2>${decodedtitle}</h2>
             
//         </body>
//         </html>
//     `);
// });

// app.get('/search',(req,res) => {
//     let type = req.query.type;

//     connection.query(`SELECT * FROM movie_data WHERE language = '${type}'`,(err,results) => {
//         if(err){
//             console.log(`Error in query`);
//             res.send("Error in DB Query");
//         }
//         else{
//             console.log(results);
//             res.send(results);
//         }
//     })
    
// })

//root route solution


app.get('/',(req,res) => {
    let userInp = req.query.language;

    connection.query(`SELECT * FROM movie_data WHERE language = '${userInp}'`,(err,results) => {
        if(err){
            console.log(`Error in query`);
            res.send("Error in DB Query");
        }
        else{
            console.log(results);
            res.send(results);
        }
    })
    
})

app.get('/', (req, res) => {
    let id = req.query.id;

    connection.query(`DELETE FROM movie_data WHERE id = '${id}'`,(err,results) => {
        if(err){
            console.log(`Error in query`);
            res.send("Error in DB Query");
        }
        else{
            console.log(results);
            res.send(results);
        }
    })
});


app.get('/:operator/:num1/:num2', (req, res) => {
    const operator = req.params.operator;
    const num1 = parseFloat(req.params.num1);
    const num2 = parseFloat(req.params.num2);
    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case 'div':
            if (num2 === 0) {
                res.send('Division by zero is not allowed');
                return;
            }
            result = num1 / num2;
            break;
        default:
            res.status(400).send('Invalid operator');
            return;
    }

    res.send(`The result of ${num1} ${operator} ${num2} is ${result}`);
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//localhost:3000/?name=Devansh