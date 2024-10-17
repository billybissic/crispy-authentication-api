import express, {Router, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import {initModels, user_devices, user_logs, user_sessions, users, user_access_levels, access_levels} from "../../models/init-models"
import sequelizeInstances from "../../config/sequelize";
import {AuthenticationHelper} from "../../helpers/authentication.helper";
import {AuthenticationConfigurationHelper } from "../../helpers/authenticationConfiguration.helper";

// import models into sequelize instance
initModels(sequelizeInstances.userSequelizer);

export default class AuthenticateRouter {
    private readonly router: Router;
    private authenticationHelper: AuthenticationHelper;
    private authenticationConfigurationHelper: AuthenticationConfigurationHelper;

    constructor() {
        this.router = express.Router();
        this.authenticationHelper = new AuthenticationHelper();
        this.authenticationConfigurationHelper = new AuthenticationConfigurationHelper();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(bodyParser.json());
        this.router.get('/', this.handleRootRequest.bind(this));
        this.router.post('/login', this.handleLogin.bind(this));
        this.router.post('/register', this.handleRegister.bind(this));
        this.router.post('/weblogin', this.handleAdminLogin.bind(this));
        // Define other routes similarly
    }

    private async handleRootRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Your root request hand ler logic here
            res.status(200).json({
                response_title: "Crispy Authentication Router V1 - Authentication API",
                response_status: "OK"
            });
            next(res);
        } catch (error) {
            console.error('Error handling root request:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API",
                response_status: "Internal Server Error"
            });
            next(res)
        }
    }

    public async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            console.log("req.body", req.body);
            const _username = req.body.username;
            const _password = req.body.password;
            const _device_name = req.body.device_name;
            const _device_ip_address = req.body.device_ip_address;
            const _device_mac_address = req.body.device_mac_address;
            console.log("_username: ", _username);
            console.log("_password", _password);
            console.log('_device_name', _device_name)
            console.log('_device_ip_address', _device_ip_address)
            console.log('_device_mac_address', _device_mac_address)

            /* is user in database */
            await users.findOne({where: {username: _username}}).then(async (user: users) => {

                /* retrieved user from database validating names */
                console.log("username from db: ", user.username);

                /* validate username */
                if (user.username === _username) {

                    /* usernames matched validating password */
                    if (user.password === _password) {

                        /* password matched - beginning final validations for authentication */
                        console.log("Password Matched - beginning validation process...");

                        /* retrieve user device list */
                        await user_devices.findAll({
                            where: {user_id: user.id}
                        }).then(async (response) => {

                            /* validate device */
                            if (response === null) {
                                console.log("No devices found for user: ", user.username);
                                /* if user has no devices and the account creation date is within
                                   the last 30 days add the current device, otherwise require user
                                   to set up 2FA and use it.
                                 */
                            } else {
                                console.log("Devices Found: ", response);
                                /* if user has devices validate the device */
                                for (const device of response) {
                                    console.log("Device: ", device.device_name);
                                    if (device.device_name === _device_name) {
                                        console.log("Device Matched: ", device.device_name);
                                        /* these validations are executed if the validations are in hyper mode */
                                        /* validate browser */
                                        /* validate ip */
                                    }
                                }
                            }
                        });


                        console.log("Validation Process Complete - beginning authentication process ...")

                        /* require 2FA to be configured */
                        /* check if users 2FA validation is configured in users table */

                        console.log("2FA_required", this.authenticationConfigurationHelper.get_require_2FA())
                        if (this.authenticationConfigurationHelper.get_require_2FA() === 'false') {
                            console.log("2FA not required by host system..continuing with creating session.")
                            /* 2-factor authentication is not required by host system,
                               can proceed with creating user session */

                            /* - authenticate user process - */
                            /* create identity token for session */

                            const user_identity_token = await this.authenticationHelper.generateIdentityToken();
                            console.log("User Identity Token: ", user_identity_token);

                            await user_sessions.create({
                                user_id: user.id,
                                token: user_identity_token

                            }).then(async session => {
                                console.log("Session Created: ", session)
                                console.log("Retrieving user session for: ", session)
                                await user_sessions.findOne(
                                    {where: {user_id: user.id}}
                                ).then(user_session => {
                                    console.log("Session Retrieved: ", user_session)
                                    res.status(200);
                                    res.header("Content-Type", 'application/json');
                                    res.json(JSON.stringify({
                                        response_title: "Crispy Authentication Router V1 - Authentication API - Login Route",
                                        response_status: "OK",
                                        response_body: user_session
                                    }));
                                }).catch(error => {
                                    console.error("Error finding session: ", error)
                                });
                            }).catch(error => {
                                res.status(200);
                                res.header("Content-Type", 'application/json');
                                res.json(JSON.stringify({
                                    response_title: "Crispy Authentication Router V1 - Authentication API - Login Route",
                                    response_status: "Internal Server Error"
                                }));
                                console.error("Error creating token: ", error)
                                next(res)
                            });
                        } else {
                            /* 2-factor authentication is required by host system,
                               validate that the user has set up 2FA and redirect
                               to 2FA set page if not set up, otherwise redirect to
                               the 2FA authentication page. */

                            /* TO DO: FIX THE BELOW LOGIN CODE TO HANDLE 2FA */

                            if (user.is_2fa_configured == 0) {
                                console.log("2FA not configured - require 2FA setup");

                            } else {
                                /* require 2FA since device is not recognized */
                                console.log("2FA is configured - initiating 2FA validation");
                                /* redirecting to 2FA authentication page  */
                                res.status(200);
                                // res.header("Content-Type", 'application/json');
                                res.json(JSON.stringify({
                                    response_title: "Crispy Authentication Router V1 - Authentication API - " +
                                        "Login Route - 2FA Required - Redirect to 2FA Page",
                                    response_status: "OK"
                                }));
                                next(res);
                            }

                        }
                    } else {
                        /* login attempt failed */
                        console.log('Password did not match password on file.');

                        /* update user login fail attempt in users table */
                        await users.update({
                            failed_login_attempts: user.failed_login_attempts + 1
                        }, {
                            where: {username: _username}
                        }).then(() => {

                            console.log('Login Fail Attempts Updated');

                            /* writing to user logs */
                            user_logs.create({
                                user_id: user.id,
                                log_title: 'login',
                                log_text: 'Failed Login Attempt'
                            }).then(log => {
                                console.log('User Log Created: ', log);
                            }).catch(error => {
                                console.error('Error creating user log: ', error);
                            });

                        }).catch(error => {

                            console.error('Error updating login fail attempts: ', error);

                            res.status(401);
                            //res.header("Content-Type", 'application/json');
                            res.json(JSON.stringify({
                                response_title: "Crispy Authentication Router V1 - Authentication API - Login Route",
                                response_status: "Unauthorized Username or Password incorrect."
                            }));
                            next(res);
                        });
                    }
                }
            });

        } catch (error) {
            console.error('Error handling login:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Login Route",
                response_status: "Internal Server Error"
            });
        }
    }
   private async handleAdminLogin(req: Request, res, Response, next: NextFunction): Promise<void> {
        try {
            /* validate admin username and password */
            const _admin_username = req.body.username;
            const _admin_password = req.body.password;

            /* retrieve user from database */
            await users.findOne({where: {username: _admin_username}}).then(async (user: users) => {
                /* validate username */
                if (user.username === _admin_username) {
                    /* usernames matched validating password */
                    if (user.password === _admin_password) {
                        /* password matched - beginning final validations for authentication */
                        console.log("Username And Password Matched - beginning admin validation process...");
                        /* validate if user has the proper permissions to access the admin panel */
                        await user_access_levels.findOne({where: {user_id: user.id}}).then(async (access_level: user_access_levels) => {
                            /* retrieve access levels for comparisons */
                            await access_levels.findOne({where: {level_name: "Admin"}}).then(async (admin_access_level: access_levels) => {
                                if (access_level.level_id === admin_access_level.level_id) {
                                    console.log("Admin Access Level Matched - Admin Access Granted");
                                    /* create identity token for session */
                                    const user_identity_token = await this.authenticationHelper.generateIdentityToken();
                                    console.log("User Identity Token: ", user_identity_token);
                                    await user_sessions.create({
                                        user_id: user.id,
                                        token: user_identity_token
                                    }).then(async session => {
                                        console.log("Session Created: ", session)
                                        console.log("Retrieving user session for: ", session)
                                        await user_sessions.findOne(
                                            {where: {user_id: user.id}}
                                        ).then(user_session => {
                                            console.log("Session Retrieved: ", user_session)
                                            res.status(200);
                                            res.header("Content-Type", 'application/json');
                                            res.json(JSON.stringify({
                                                response_title: "Crispy Authentication Router V1 - Authentication API - Admin Login Route",
                                                response_status: "OK",
                                                response_body: user_session
                                            }));
                                        }).catch(error => {
                                            console.error("Error finding session: ", error)
                                        });
                                    }).catch(error => {
                                        res.status(200);
                                        res.header("Content-Type", 'application/json');
                                        res.json(JSON.stringify({
                                            response_title: "Crispy Authentication Router V1 - Authentication API - Admin Login Route",
                                            response_status: "Internal Server Error"
                                        }));
                                        console.error("Error creating token: ", error)
                                        next(res)
                                    });
                                } else {
                                    console.log("Admin Access Level Not Matched - Admin Access Denied");
                                    res.status(401);
                                    res.header("Content-Type", 'application/json');
                                    res.json(JSON.stringify({
                                        response_title: "Crispy Authentication Router V1 - Authentication API - Admin Login Route",
                                        response_status: "Unauthorized - User does not have access to the admin panel."
                                    }));
                                    next(res);
                                }
                            })
                        })
                    }
                }
            });
        } catch(err) {
            console.error('Error handling admin login:', err);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Admin Login Route",
                response_status: "Internal Server Error"
            });
        }
   }
   private async handleRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {

            if (this.authenticationConfigurationHelper.get_allow_user_registration()=='true') {

                const _username = req.body.username;
                const _password = req.body.password;
                const _uuid = '' /* generate id */

                /* validate if password meets criteria */
                this.authenticationHelper.set_password('_password');
                const is_password_valid = this.authenticationHelper.validate_password(_password);
                if (is_password_valid) {

                    /!* encrypt password *!/
                    await this.authenticationHelper.encryptPasswordForStorage()
                        .then(async hashedPassword => {
                            console.log("Hashed Password:", hashedPassword)

                            /*store encrypted password */
                            await users.create({
                                uuid: _uuid,
                                username: _username,
                                password: this.authenticationHelper.get_encrypted_password()

                            }).then(user => {
                                console.log("User created with username: ", user.username)
                                res.status(200)
                                res.header("Content-Type", 'application/json');
                                res.json(JSON.stringify({
                                    response_title: "Crispy Authentication Router V1 - Authentication API - Registration Route",
                                    response_status: "OK"
                                }));
                                next(res);
                            }).catch(error => {
                                console.error("Error creating user: ", error)
                            });
                        })
                        .catch(error => {
                            console.error("Internal Server Error password: ", error)
                        });
                } else {
                    res.status(400)
                    res.header("Content-Type", 'application/json');
                    res.json(JSON.stringify({
                        response_title: "Crispy Authentication Router V1 - Authentication API - Registration Route",
                        response_status: "Bad Password - Does not meet requirements."
                    }));
                    next(res);
                }

            } else if (this.authenticationConfigurationHelper.get_allow_user_registration()=='false') {
                res.status(401)
                res.header("Content-Type", 'application/json');
                res.json(JSON.stringify({
                    response_title: "Crispy Authentication Router V1 - Authentication API - Register Route",
                    response_status: "Unauthorized - User registration is disabled."
                }));
                next(res);
            } else {
                res.status(500)
                res.header("Content-Type", 'application/json');
                res.json(JSON.stringify({
                    response_title: "Crispy Authentication Router V1 - Authentication API - Register Route",
                    response_status: "Internal Server Error"
                }));
                next(res);
            }
        } catch (error) {
            console.error('Error handling register:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Register Route",
                response_status: "Internal Server Error"
            });
            next(res)
        }
    }
    // Define other route handler methods similarly

    private async handleGetUserSession(req: Request, res: Response, next: NextFunction) {
        try {
            const _user_id = req.body.user_id;
            await user_sessions.findOne({where: {user_id: _user_id}}).then(session => {
                console.log('Session:', session);
                res.status(200).json({
                    response_title: "Crispy Authentication Router V1 - Authentication API - Get User Session Route",
                    response_status: "OK",
                    response_body: session
                });
                next(res);
            }).catch(error => {
                console.error('Error finding session:', error);
                res.status(404).json({
                    response_title: "Crispy Authentication Router V1 - Authentication API - Get User Session Route",
                    response_status: "Session Not Found",
                });
                next(res);
            });
        } catch (error) {
            console.error('Error handling get user session:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Get User Session Route",
                response_status: "Internal Server Error",
            });
            next(res);
        }
    }

    private async handleLogout(req: Request, res: Response, next: NextFunction) {
        try {
            const _user_id = req.body.user_id;
            /* destroy the session */
            await user_sessions.destroy({where: {user_id: _user_id}}).then(async () => {
                res.status(200).json({
                    response_title: "Crispy Authentication Router V1 - Authentication API - Logout Route",
                    response_status: "OK",
                    response_body: "User session destroyed."
                });
                next(res);
            }).catch(error => {
                console.error('Error destroying session:', error);
                res.status(404).json({
                    response_title: "Crispy Authentication Router V1 - Authentication API - Logout Route",
                    response_status: "Session Not Found",
                });
                next(res);
            });
        } catch (error) {
            console.error('Error handling logout:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Logout Route",
                response_status: "Internal Server Error",
            });
            next(res);
        }
    }
    public getRouter(): Router {
        return this.router;
    }
}
