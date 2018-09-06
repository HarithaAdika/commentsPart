const express = require('express')
const app = express()
const conn = require('./comments')
const parser = require('body-parser')
const Dao = require('./modules/data-access/data-access')
const connection = new conn();
const dao = new Dao()



/***
 * @Description calling getComments() method of Comments class in comments.js file 
 */

app.get('/getComments/:id', async (req, res) => {
    let pId = eval(req.params.id);
    let result = await connection.getComments("commentsCollection", pId);

    res.send(result);
})




/***
 * @Description calling postComments() method of Comments class in comments.js file 
 */
app.use(parser.json());

app.put('/updateComments/:uname/:pid', async (req, res) => {
    let result
    let uId = req.params['uname'];
    let pId = eval(req.params.pid)

    try {
        let result = await connection.postComments("commentsCollection", uId, pId, req.body)
        res.send(result)
    }
    catch (err) {
        result = { err: err }
    }


})


app.listen('8080', () => console.log('Listening on port 8080'));