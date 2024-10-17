import express, {Router, Request, Response, NextFunction} from 'express';
import bodyParser from 'body-parser';
import { initModels, users, administrators } from "../../models/init-models";
import {ensureTokenHelper} from "../../helpers/ensureToken.helper";
import sequelizeInstances from "../../config/sequelize";
import {AuthenticationHelper} from "../../helpers/authentication.helper";
import {Op} from "sequelize";


initModels(sequelizeInstances.userSequelizer);

export default class AdministratorsRouter {
    private readonly router: Router;
    private authenticationHelper: AuthenticationHelper;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(bodyParser.json());
        this.router.get('/getAdministrators', ensureTokenHelper, this.handleGetAdministratorsRequest);
        this.router.post('/addAdministrator', ensureTokenHelper, this.handleAddAdministratorRequest);
        this.router.post('/deleteAdministratorr', ensureTokenHelper, this.handleDeleteAdministratorRequest);
    }

    private async handleGetAdministratorsRequest(req: Request, res: Response) {

            try {

                console.log('Handling request to get all administrators');
                const administrators_list = await administrators.findAll({});
                console.log("Administrators list fetched: ", administrators_list);

                // Extract IDs from the initial results
                const uuid_list = administrators_list.map(user => user.uuid);
                console.log(uuid_list);

                // Second query: Fetch rows with IDs matching those obtained in the first query
                const user_administrators = await users.findAll({
                    where: {
                        uuid: {
                            [Op.in]: uuid_list
                        }
                    }
                });
                res.status(200).json({
                    response_title: "Crispy Authentication Router V1 - Authentication API - Get All Administrators Route",
                    response_status: 200,
                    response_body: user_administrators,
                    redirect_to: ""
                });

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

    private async handleAddAdministratorRequest(req: Request, res: Response) {

                try {

                    console.log('Handling request to add an administrator');
                    const administrator = new administrators(req.body);
                    await administrator.save();
                    console.log("Administrator added: ", administrator);
                    res.status(200).json({
                        response_title: "Crispy Authentication Router V1 - Authentication API - Add Administrator Route",
                        response_status: 200,
                        response_body: administrator,
                        redirect_to: ""
                    });

                } catch (error) {
                    // Handle any errors and send an error response
                    console.error('Error handling request:', error);
                    res.status(500).json({
                        response_title: "Crispy Authentication Router V1 - Authentication API - Add Administrator Route",
                        response_status: 500,
                        response_body: "Internal Server Error"
                    });
                }
    }

    private async handleDeleteAdministratorRequest(req: Request, res: Response) {

                    try {

                        console.log('Handling request to delete an administrator');
                        const administrator = new administrators(req.body);
                        await administrator.destroy();
                        console.log("Administrator deleted: ", administrator);
                        res.status(200).json({
                            response_title: "Crispy Authentication Router V1 - Authentication API - Delete Administrator Route",
                            response_status: 200,
                            response_body: administrator,
                            redirect_to: ""
                        });

                    } catch (error) {
                        // Handle any errors and send an error response
                        console.error('Error handling request:', error);
                        res.status(500).json({
                            response_title: "Crispy Authentication Router V1 - Authentication API - Delete Administrator Route",
                            response_status: 500,
                            response_body: "Internal Server Error"
                        });
                    }
    }

    public getRouter(): Router {
        return this.router;
    }
}
