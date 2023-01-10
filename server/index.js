const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 8080;

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

let DB = {
    games: [
        {
            id: 01,
            name: "Euro Truck Simulator",
            year: 2012,
            description: "Travel across Europe as king of the road, a trucker who delivers important cargo over impressive distances! With dozens of cities to explore from the UK, Belgium, Germany, Italy, Holland, Poland, and many more, your stamina, skill, and speed will all be pushed to their limits. If you've got what it takes to be part of an elite trucking force, get behind the wheel and prove it!",
            price: 40.00
        },

        {
            id: 02,
            name: "FIFA 2023",
            year: 2022,
            description: "Play the World's Greatest Game with 17,000+ players, 700+ teams in 90+ stadiums, and 30+ leagues from around the world.",
            price: 299.00
        },

        {
            id: 03,
            name: "GTA V",
            year: 2015,
            description: "When a street hustler, a retired bank robber and a terrifying psychopath tangle with some of the scariest and craziest criminals in the underworld, the US government and the entertainment industry, they must pull off daring heists to survive in this cutthroat city where no they can trust no one, not even each other.",
            price: 80.00
        },
    ]
}

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.get("/game/:id", (req, res) => {
    
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }
    else {

        let id = parseInt(req.params.id);

        let game = DB.games.find(g => g.id == id);

        if(game != undefined){
            res.statusCode = 200;
            res.json(game);
        }
        else{
            res.sendStatus(404);
        }
    }
});

app.post("/game", (req, res) => {

    let {name, description, year, price} = req.body;
    
    DB.games.push({
        id: 04,
        name,
        year,
        description,
        price
    });

    res.sendStatus(200);
    
})

app.delete("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }
    else {

        let id = parseInt(req.params.id);

        let index = DB.games.findIndex(g => g.id == id);

        if(index == -1){
            res.sendStatus(404);
        }
        else{
            res.sendStatus(200);
            DB.games.splice(index,1);
        }
    }
});

app.put("/game/:id", (req, res) => {
    if(isNaN(req.params.id)){
        res.sendStatus(400);
    }
    else {
        let id = parseInt(req.params.id);

        let game = DB.games.find(g => g.id ==id);

        if(game != undefined){
            let {name, year, description, price} = req.body;

            if(name){
                game.name = name;
            }

            if(year){
                game.year = year;
            }

            if(description){
                game.description = description;
            }

            if(price){
                if(isNaN(price)){
                    res.sendStatus(404);
                }
                else{ 
                    game.price = price;}
            }

            res.sendStatus(200);
        }
        else{
            res.sendStatus(404);
        }
    }
})

app.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});