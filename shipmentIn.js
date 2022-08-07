const express = require("express")
const router = express.Router()
const pool = require('./connection')
const bodyParser = require("body-parser")
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

router.get('/shipmentIn',jsonParser,(req,res)=>{
    pool.query('SELECT * FROM shipmentin',(err,data)=>{
        if(err)throw err
        res.send(data)
        console.log(data)
        console.log(pool._allConnections.length)
      })  
})

router.get('/shipmentIn', function (req, res) {
    pool.query(`select * from shipmentin where tlnumber="${req.body.id}"`, function (error, results, fields) {
       if (error) throw error;
       res.send(results.body);
     });
 });

router.post('/shipmentIn',(req,res)=>{
    console.log(req.body.tlnum)
    pool.query((`Insert into shipmentin values(null,"${req.body.tlnum}","${req.body.products}",${req.body.token},${req.body.quantity},"${req.body.shift}","${req.body.customer}","${req.body.transfertype}","${req.body.date_in}",${req.body.time_in},${req.body.tare_weight},${req.body.remarks})`),(err)=>{
        if(err){
            console.error(err)
        }
    })
    res.send("Database updated!")
})

router.put('/shipmentIn',(req,res)=>{
    if(Object.keys(req.body).length===0){
        res.send("No values to edit!")
    }
    let sql = `UPDATE shipmentin SET `;
    Object.entries(req.body).forEach(([key,value])=>{
        const valueToSet = typeof req.body[key] === 'string' ? `'${value}'` : value;
        sql+= ` ${key}=${valueToSet}, `
    })
    sql = sql.slice(0,-2);
    sql+=` WHERE serialNumber=${req.body.serialNumber};`;
    console.log(sql)
    pool.query(sql,(err)=>{
        if(err){
            console.error(err)
            res.end("Database Error!")
        }
        else{
            res.send("Data updated!")
        }
    })
})

router.delete('/shipmentIn',(req,res)=>{
    pool.query(`delete from shipmentin where serialNumber = ${req.body.serialNumber}`,(err, result)=>{
        if(err){
            console.error(err)
        }
        console.log(result.affectedRows)
    })
    res.send(`Deleted row number: ${req.body.serialNumber}`)
})

module.exports = router