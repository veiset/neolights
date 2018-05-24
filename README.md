# Setup

Web API to control a neopixel strip.

![in-action](https://github.com/veiset/neolights/blob/master/action.gif)


## Install Arduino neopixel firmware

1. Download https://github.com/ajfisher/node-pixel/tree/master/firmware/build/node_pixel_firmata
2. Install it using the Arduino IDE: File -> Open -> node_pixel_firmata.ino
3. Verify & Flash

## Install and run app (Tested on Node 8.11.2)

```
npm install
node index.js
```

## Test API

```
curl 'http://localhost:3007/color?r=200&g=170&b=20'
curl 'http://localhost:3007/light?brightness=40'
curl 'http://localhost:3007/off'
```

