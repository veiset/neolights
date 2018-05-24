const pixel = require("node-pixel");
const five = require("johnny-five");
const express = require('express');
const app = express();

const NUMBER_OF_LEDS = 24;
const PORT = 3007;

var board = new five.Board();
var strip = null;

const paramOrDefault = (req, param, d) => {
    try {
        const val = req.query[param] ? parseInt(req.query[param], 10) : d;
        if (isNaN(val)) { throw "Not a number" }
        return val;
    } catch (e) {
        console.log(`API ERROR - Invalid input: ${req.query[param]}. Using default value ${d}.`);
        return d;
    }
}

app.get('/light', (req, res) => { 
    const brightness = paramOrDefault(req, 'brightness', 150);
    console.log(`API - /light - ${brightness}`);
    light(brightness);
    return res.send('Ok.');
});

app.get('/color', (req, res) => { 
    const r = paramOrDefault(req, 'r', 0);
    const g = paramOrDefault(req, 'g', 0);
    const b = paramOrDefault(req, 'b', 0);
    console.log(`API - /color - r=${r}, g=${g}, b=${b}`);
    color(r, g, b)
    return res.send('Ok.');     
});

app.get('/off', (req, res) => {
    console.log('API - /off');
    light(0);
    return res.send('Ok.');
});

app.listen(PORT, () => console.log('Web API started.'))

board.on("ready", function() {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 6, length: NUMBER_OF_LEDS}, ], 
        gamma: 2.8, 
    });

    strip.on("ready", function() {
        strip.off();
        console.log('Strip is Ready! You can now start using the API.');
    });
});

function light(b) {
    color(b, b, b);
}

function color(r, g, b) {
    strip.color(`rgb(${r}, ${g}, ${b})`);
    strip.show();
}
