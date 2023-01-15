const express = require('express');
const fs = require('fs');

const app = express();

let goods=[];

fs.readFile('./goods.json', 'utf8', (err, data) => {
    if (!err) {
        goods=JSON.parse(data);        
        console.log(goods);
    } else {
      console.error(err);
    }
});
app.get('/', (req, res)=> {res.json(goods)});

app.get('/goods', function (req, res) {
    const count = parseInt(req.query.count);
    const offset = parseInt(req.query.offset);
    res.status(200).json({ goods: goods.slice(offset, offset + count) });
  });

app.get("/goods/:id", function (req, res) {
    const idOfgood = req.params.id;
    const good = goods.find((good) => good.id == idOfgood);
    if (!good) {
      res.status(404).send();
    } 
    res.status(200).json(good);
    
});

app.get('/good/:id', function (req, res) {
    res.json({ id: req.params.id, success: true });
  });

app.get("/user/:id", function (req, res) {
    const idOfUser = parseInt(req.params.id);
    const user = users.find((user) => user.id === idOfUser);
    if (!user) {
      res.status(404).send();
    }
    res.status(200).json(user);
  });


app.listen(3000);