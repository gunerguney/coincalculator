# Coin Calculator

In our day, cryptocurrency replaces real currencies, and therefore the volume of transactions in this market is increasing every day. In line with the demand for the market, the infrastructure and interfaces that will meet the needs are increasing day by day and becoming more comprehensive.

The CoinCalculator project, which is one of the interfaces developed based on these needs, provides users the opportunity to easily calculate the cryptocurrency they want to buy or sell through live exchange rates. It also takes live market data from https://coinmarketcap.com/ using the rest api and shows users instant cryptocurrency values and hourly changes.

The crytocurrency types to be displayed on the screen and for calculation and the currency types to be exchanged are parametrically drawn from the environment variables file. In addition, the frequency of updating market data, minimum and maximum transaction limits and the time given to the user to purchase can be defined from the environment variables file.

**Example Pages**

If you want to get inspiration or just show something directly to your clients, you can jump start your development with our pre-built example pages. You will be able to quickly set up the basic structure for your web project.

## Table of Contents

* [Quick Start](#quick-start)
* [File Structure](#file-structure)
* [Notes](#notess)
* [Browser Support](#browser-support)
* [Licensing](#licensing)

## Quick start

- [Download from Github](https://github.com/creativetimofficial/vue-argon-dashboard/archive/master.zip).

    or

- Clone the repo: `git clone https://github.com/gunerguney/coincalculator.git`.

In order to define environment variables, ".env" or ".env.local" file should be located in the root folder of the project. The contents of the environment variables file should be defined as follows.

```
VUE_APP_REST_API_URL=https://pro-api.coinmarketcap.com/v1/
VUE_APP_API_KEY=YOUR_OWN_REST_API_KEY
VUE_APP_COIN_TYPES=BTC,BCH,XRP,ETH
VUE_APP_CURRENCY_TYPES=USD
VUE_APP_BUY_WAIT_TIME=10
VUE_APP_MIN_OPT_LIMIT=25
VUE_APP_MAX_OPT_LIMIT=50000
```


```
cd coincalculator

npm install

npm run serve
```

### Coin Calculator Docker 

This repo contains a Dockerfile for the Coin Calculator web application

Follow the steps below to create your own Coin Calculator development server using this Docker image:

```
cd coincalculator

docker build -t coincalculator:dev .

docker run -v ${PWD}:/app -v /app/node_modules -p 8081:8080 --rm coincalculator:dev
```

Open your browser to http://localhost:8081 and you should see the app.

## File Structure
Within the download you'll find the following directories and files:

```
|-- Coin Calculator project structure
    |-- .dockerignore
    |-- .gitignore
    |-- Dockerfile
    |-- README.md
    |-- babel.config.js
    |-- package.json
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- manifest.json
    |   |-- robots.txt
    |   |-- img/
    |-- src
        |-- App.vue
        |-- main.js
        |-- registerServiceWorker.js
        |-- router.js
        |-- assets
        |   |-- logo.png
        |   |-- scss
        |   |   |-- argon.scss
        |   |-- vendor
        |       |-- @fortawesome
        |       |-- nucleo
        |-- components/
        |-- directives/
        |-- layout/
        |-- mixins
            |-- baseRestService.js
        |-- plugins/
        |-- views
            |-- CoinCalculator.vue
            |-- Login.vue
            |-- Register.vue
            |-- UserProfile.vue
```

## Notes

- Note: Making HTTP requests to coincapmarket on the client side with Javascript is currently prohibited through CORS configuration. This is to protect your API Key which should not be visible to users of your application so your API Key is not stolen. Secure your API Key by routing calls through your own backend service.

## Browser Support

At present, we officially aim to support the last two versions of the following browsers:

<img src="https://github.com/creativetimofficial/public-assets/blob/master/logos/chrome-logo.png?raw=true" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/firefox-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/edge-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/safari-logo.png" width="64" height="64"> <img src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/opera-logo.png" width="64" height="64">

## Licensing

- Copyright 2018 Creative Tim (https://www.creative-tim.com/?ref=ada-github-readme)

- Licensed under MIT (https://github.com/creativetimofficial/vue-argon-dashboard/blob/master/LICENSE.md)