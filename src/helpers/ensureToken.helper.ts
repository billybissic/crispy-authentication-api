import jwt from 'jsonwebtoken';
import { AuthenticationConfigurationHelper} from "./authenticationConfiguration.helper";

const authenticationConfigurationHelper = new AuthenticationConfigurationHelper();

export const ensureTokenHelper = function (req, res, next) {

    /* retrieve the secret key from the database */
    if(authenticationConfigurationHelper.get_secret_key() === undefined){
        console.log("No secret key set. Please set a secret key in the database.")
        res.sendStatus(403)
    } else {
        console.log("Secret key set in the database.", authenticationConfigurationHelper.get_secret_key());
        //const req = req
        const reqHeaders = req.headers
        //console.log(req.headers['origin'].toString())
        console.log("Origin: ", req.headers['origin']);
        if((req.headers['origin'] === 'http://localhost:4200') || (req.headers['origin'] === 'http://localhost:3000')
        || (req.headers['host'] === 'localhost:3000') || (req.headers['host'] === 'localhost:4200')) {
            console.log('Localhost origin detected. Allowing request.')
            next()
        } else {
            const bearerHeader = req.headers['authorization']
            //console.log("req:", req)
            console.log("reqHeaders:", reqHeaders)
            console.log("bearerHeader:", bearerHeader)
            if (typeof bearerHeader !== 'undefined') {
                console.log("bearerHeader:", bearerHeader.header)
                /*const bearer = bearerHeader.split(" ")
                const bearerToken = bearer[1]
                jwt.verify(bearerToken, authenticationConfigurationHelper.get_secret_key(), (err) => {
                    if (err) {
                        res.sendStatus(403)
                    } else {
                        next()
                    }
                })*/
            } else {
                res.sendStatus(403)
            }
        }
    }
    /* validate if there is a secret key set in the database */
}