import express, {Router, Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import {initModels, authentication_configurations} from "../../config-models/init-models";
import sequelizeInstances from "../../config/sequelize";
import AuthenticateRouter from "../authenticate/authenticate.router";

// import models into sequelize instance
initModels(sequelizeInstances.configurationsSequelizer);

export default class WebPanelRouter {
    private readonly router: Router;
    private authenticationRouter: AuthenticateRouter;

    constructor() {
        this.router = express.Router();
        //this.authenticationRouter = new AuthenticateRouter()
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.use(bodyParser.json());
        this.router.get('/updateConfigurationValues', this.handleUpdateConfigurationValue.bind(this));
        this.router.get('/getAllConfigurations', this.handleGetAllConfigurations.bind(this));
        this.router.post('/updateSecretKey', this.handleUpdateSecretKey.bind(this));
        this.router.post('/updateSaltRounds', this.handleUpdateSaltRounds.bind(this));
        this.router.post('/updatePasswordLength', this.handleUpdatePasswordLength.bind(this));
        this.router.post('/updatePasswordNumbersEnabled', this.handleUpdatePasswordNumbersEnabled.bind(this));
        this.router.post('/updatePasswordSymbolsEnabled', this.handleUpdatePasswordSymbolsEnabled.bind(this));
        this.router.post('/updateValidateDeviceOnLogin', this.handleUpdateValidateDeviceOnLogin.bind(this));
        this.router.post('/updateValidateBrowserOnLogin', this.handleUpdateValidateBrowserOnLogin.bind(this));
        this.router.post('/updateValidateIpOnLogin', this.handleUpdateValidateIpOnLogin.bind(this));
        this.router.post('/updateValidateMacAddressOnLogin', this.handleUpdateValidateMacAddressOnLogin.bind(this));
        this.router.post('/updateValidateEmailOnRegistration', this.handleUpdateValidateEmailOnRegistration.bind(this));
        this.router.post('/updateAllowAdminCredentialsToBeRemembered', this.handleUpdateAllowAdminCredentialsToBeRemembered.bind(this));
        this.router.post('/updateIsValidationOnHyper', this.handleUpdateIsValidationOnHyper.bind(this));
        this.router.post('/updateWebPanelToken', this.handleUpdateWebPanelToken.bind(this));
        this.router.post('/webPanelLogin', this.handleWebPanelLogin.bind(this));
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

    private async handleUpdateConfigurationValue(config_name: string, config_value: string) {
        const configValue = {
            "config_name": config_name,
            "config_value": config_value
        };

        return await authentication_configurations.update(configValue, {
            where: {
                config_name: configValue.config_value
            }
        }).then(() => {
            console.log("Config value: " + configValue.config_name + " updated successfully.")
            return true;
        }).catch((err) => {
            console.log(err);
            return false;
        });
    }

    public async handleGetAllConfigurations(req: Request, res: Response): Promise<void> {
        try {

            console.log('Inside of handleGetAllConfigurations')
            const configurations = await authentication_configurations.findAll({});

            // If configurations are found, send them in the response
            if (configurations) {
                console.log(configurations)
                res.status(200).json({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Get All Configurations Route",
                    response_status: 200,
                    response_body: configurations,
                    redirect_to: ""
                });
            } else {
                // If configurations are not found, send an error response
                res.status(500).json({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Get All Configurations Route",
                    response_status: 500,
                    response_body: "Failed to get all configurations",
                    redirect_to: ""
                });
            }
        } catch (error) {
            // Handle any errors and send an error response
            console.error('Error handling request:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Get All Configurations Route",
                response_status: 500,
                response_body: "Internal Server Error"
            });
        }
    }

    public async handleInternalGetAllConfigurations(): Promise<{ status: number; headers?: { "Content-Type": string }; body: string }> {
        try {
            //console.log('user called getAllConfigurations.');
            const configs = await authentication_configurations.findAll({});
            if (configs) {
                //console.log("configs retrieved successfully:", configs);
                return {
                    status: 200,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(configs)
                }
            } else {
                console.log("Failed to get all configurations");
                return {
                    status: 500,
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({
                        response_title: "Crispy Web Panel Router V1 - Authentication API - Get All Configurations Route",
                        response_status: "Failed to get all configurations",
                        redirect_to: ""
                    })
                }
            }
        } catch (error) {
            console.error('Error handling request:', error);
            return {
                status: 500,
                body: JSON.stringify({
                    response_title: "Crispy Authentication Router V1 - Authentication API - Get All Configurations Route",
                    response_status: "Internal Server Error"
                })
            };
        }
    }

    public async handleUpdateSecretKey(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const config_name = "secret_key"
            const config_value = req.body.secret_key;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value)
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Secret Key Route",
                    response_status: "Updated secret key successfully.",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Secret Key Route",
                    response_status: "Failed to update secret key.",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            console.error('Error handling request:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Get All Configurations Route",
                response_status: "Internal Server Error"
            });
        }

    }

    public async handleUpdateSaltRounds(req, res, next) {
        const config_name = "salt_rounds"
        const config_value = req.body.salt_rounds;
        const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
        if (update_status) {
            res.status(200)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Salt Rounds Route",
                response_status: "",
                redirect_to: ""
            }))
            next(res)
        } else {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Salt Rounds Route",
                response_status: "Failed to update salt rounds",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdatePasswordLength(req, res, next) {

        try {

            const config_name = "password_length"
            const config_value = req.body.password_length;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Password Length Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Password Length Route",
                    response_status: "Failed to update password length",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            console.error('Error handling request:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Get All Configurations Route",
                response_status: "Internal Server Error"
            });
        }
    }

    public async handleUpdatePasswordNumbersEnabled(req, res, next) {
        try {
            const config_name = "password_numbers_enabled"
            const config_value = req.body.password_numbers_enabled;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Password Numbers Enabled Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Password Numbers Enabled Route",
                    response_status: "Failed to update password numbers enabled",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Password Length Route",
                response_status: "Failed to update password length",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdatePasswordSymbolsEnabled(req, res, next) {
        try {
            const config_name = "password_symbols_enabled"
            const config_value = req.body.password_symbols_enabled;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Password Numbers Enabled Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Password Numbers Enabled Route",
                    response_status: "Failed to update password numbers enabled",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Password Length Route",
                response_status: "Failed to update password length",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdateValidateDeviceOnLogin(req, res, next) {
        try {
            const config_name = "validate_device_on_login"
            const config_value = req.body.validate_device_on_login;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Device On Login Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Device On Login Route",
                    response_status: "Failed to update validate device on login",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Device On Login Route",
                response_status: "Failed to update password length",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdateValidateBrowserOnLogin(req, res, next) {
        try {
            const config_name = "validate_browser_on_login"
            const config_value = req.body.validate_browser_on_login;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser On Login Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser On Login Route",
                    response_status: "Failed to update validate browser on login",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser on Login Route",
                response_status: "Failed to update validate browser on login.",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdateValidateIpOnLogin(req, res, next) {
        try {
            const config_name = "validate_ip_on_login"
            const config_value = req.body.validate_ip_on_login;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate IP On Login Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate IP On Login Route",
                    response_status: "Failed to update validate ip on login",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser on Login Route",
                response_status: "Failed to update validate browser on login.",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdateValidateMacAddressOnLogin(req, res, next) {
        try {
            const config_name = "validate_mac_on_login"
            const config_value = req.body.validate_mac_on_login;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Mac On Login Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Mac On Login Route",
                    response_status: "Failed to update validate mac on login",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser on Login Route",
                response_status: "Failed to update validate browser on login.",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdateValidateEmailOnRegistration(req, res, next) {
        try {
            const config_name = "validate_emails_on_registration"
            const config_value = req.body.validate_emails_on_registration;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Emails On Registration Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Emails On Registration Route",
                    response_status: "Failed to update validate emails on registration",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser on Login Route",
                response_status: "Failed to update validate browser on login.",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdateAllowAdminCredentialsToBeRemembered(req, res, next) {
        try {
            const config_name = "allow_admin_credentials_to_be_remembered"
            const config_value = req.body.allow_admin_credentials_to_be_remembered;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Allow Admin Credentials To Be Remembered Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Allow Admin Credentials To Be Remembered Route",
                    response_status: "Failed to update allow admin credentials to be remembered",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser on Login Route",
                response_status: "Failed to update validate browser on login.",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdateIsValidationOnHyper(req, res, next) {
        try {
            const config_name = "is_validation_hyper"
            const config_value = req.body.is_validation_hyper;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Is Validation Hyper Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Is Validation Hyper Route",
                    response_status: "Failed to update is validation hyper",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser on Login Route",
                response_status: "Failed to update validate browser on login.",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleUpdateWebPanelToken(req, res, next) {
        try {
            const config_name = "web_panel_token"
            const config_value = req.body.web_panel_token;
            const update_status: boolean = await this.handleUpdateConfigurationValue(config_name, config_value);
            if (update_status) {
                res.status(200)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Web Panel Token Route",
                    response_status: "",
                    redirect_to: ""
                }))
                next(res)
            } else {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Update Web Panel Token Route",
                    response_status: "Failed to update web panel token",
                    redirect_to: ""
                }))
                next(res)
            }
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser on Login Route",
                response_status: "Failed to update validate browser on login.",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public async handleWebPanelLogin(req, res, next) {
        try {
            await this.authenticationRouter.handleLogin(req, res, next).then((res) => {
                next(res)
            }).catch((error) => {
                res.status(500)
                res.header("Content-Type", "application/json")
                res.json(JSON.stringify({
                    response_title: "Crispy Web Panel Router V1 - Authentication API - Login Route",
                    response_status: error,
                    redirect_to: ""
                }))
                next(res)

            })
        } catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            res.json(JSON.stringify({
                response_title: "Crispy Web Panel Router V1 - Authentication API - Update Validate Browser on Login Route",
                response_status: "Failed to update validate browser on login.",
                redirect_to: ""
            }))
            next(res)
        }
    }

    public getRouter(): Router {
        return this.router;
    }
}
