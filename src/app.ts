import express from 'express';
import router from "./router/router";
import bodyParser from 'body-parser';
import {ensureTokenHelper} from "./helpers/ensureToken.helper";
import sequelizeInstances from "./config/sequelize";
import { AuthenticationConfigurationHelper } from "./helpers/authenticationConfiguration.helper";
import os from 'os';
import { AuthenticationHelper } from "./helpers/authentication.helper";
import cors from 'cors';
// Adjust the path if needed

const authenticationConfigurationHelper = new AuthenticationConfigurationHelper();
const authenticationHelper = new AuthenticationHelper();

const app = express();

const corsOptions= {
    origin: ['http://localhost:4200', 'http://localhost:80', 'http://localhost:3000', '*'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowHeaders: 'Content-Type, Authorization, Content-Length, X-Requested-With',
    credentials: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

//app.use("/authenticate", require("./router/authenticate/authenticate.router"))

app.use('/crispy', router);

/* bad request handler */
app.use(/*ensureTokenHelper,*/ (req, res, next)=> {
  const err = new Error("Not Found");
  res.statusCode = 404;
  res.statusMessage = err.message;
  next(res);
});


// Sync TypeScript models without altering the database schema
sequelizeInstances.userSequelizer.sync({ alter: false })
    .then(async () => {
        console.log('-- TypeScript models synchronized successfully without altering the database.');


        console.log('Hostname', os.hostname());
        const outwareNetworkInformation = authenticationHelper.getOutwardFacingIPAndMAC()

        console.log('Outward facing IP:', outwareNetworkInformation.ip_address);
        console.log('Outward facing MAC:', outwareNetworkInformation.mac_address);

        /* default ports until specified in the database otherwise. */
        let port = 3000;
        let web_panel_port = 3001;
        console.log("-- Getting application configurations before starting api.")


        if (authenticationConfigurationHelper.get_authentication_api_port() === undefined) {
            console.log('-- Authentication API port is not set in the database. Using default port 3000.');
        } else {
            console.log(`-- Authentication API port is set to ${authenticationConfigurationHelper.get_authentication_api_port()}`);
            port = authenticationConfigurationHelper.get_authentication_api_port();
        }

        if (authenticationConfigurationHelper.get_web_panel_port() === undefined) {
            console.log('-- Web panel port is not set in the database. Using default port 3001.');
        } else {
            console.log(`-- Web panel port is set to ${authenticationConfigurationHelper.get_web_panel_port()}`);
            web_panel_port = authenticationConfigurationHelper.get_web_panel_port();
        }


        /* check remaining required configurations to run prior to starting services */
        /* check secret key */









        // Start your Express server
        app.listen(port, () => {
            console.log(`-- Server is running on http://127.0.0.1:${port}/cripsy/v1/`);
            console.log(`-- Web panel is running on http://127.0.0.1:${web_panel_port}/crispy/v1/web-panel`)
        });
    })
    .catch(err => {
      console.error('Error synchronizing TypeScript models:', err);
    });


