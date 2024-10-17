import express, {Router, Request, Response} from 'express';
import bodyParser from 'body-parser';
import { initModels, users } from "../../models/init-models";
import {ensureTokenHelper} from "../../helpers/ensureToken.helper";
import sequelizeInstances from "../../config/sequelize";
import {AuthenticationHelper} from "../../helpers/authentication.helper";
import {Delete, Get, Body, Res, JsonController, Post} from "routing-controllers";


initModels(sequelizeInstances.userSequelizer);

@JsonController("/users")
export default class UsersRouter {
    private readonly router: Router;
    private authenticationHelper: AuthenticationHelper;

    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(bodyParser.json());
        this.router.get('/getUsers', ensureTokenHelper, this.handleGetUsersRequest);
        this.router.post('/addUser', ensureTokenHelper, this.handleAddUserRequest);
        this.router.post('/updateUser', ensureTokenHelper, this.handleUpdateRequest);
        this.router.post('/deleteUser', ensureTokenHelper, this.handleDeleteRequest);
    }

    @Get()
    public async handleGetUsersRequest(@Res() response: Response) {

        try {

            console.log('Handling request to get all users');
            const users_list = await users.findAll({});
            console.log("Users list fetched: ", users_list);
            response.status(200).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Get All Users Route",
                response_status: 200,
                response_body: users_list,
                redirect_to: ""
            });

        } catch (error) {
            // Handle any errors and send an error response
            console.error('Error handling request:', error);
            response.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Get All Configurations Route",
                response_status: 500,
                response_body: "Internal Server Error"
            });
        }

    }

    @Post()
    public async handleAddUserRequest(@Body() req: Request, @Res() res: Response) {

        try {

            console.log('Handling request to add a user');
            const user = new users(req.body);
            user.uuid = this.authenticationHelper.generateIdentityToken().toString();
            await user.save();
            res.status(201).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Add User Route",
                response_status: 201,
                response_body: user,
                redirect_to: ""
            });

        } catch (error) {
            // Handle any errors and send an error response
            console.error('Error handling request:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Add User Route",
                response_status: 500,
                response_body: "Internal Server Error"
            });
        }
    }

    @Post()
    public async handleUpdateRequest(req: Request, res: Response) {

        try {

            console.log('Handling request to update a user');
            const user = new users(req.body);
            await user.save();
            res.status(201).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Update User Route",
                response_status: 201,
                response_body: user,
                redirect_to: ""
            });

        } catch (error) {
            // Handle any errors and send an error response
            console.error('Error handling request:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Update User Route",
                response_status: 500,
                response_body: "Internal Server Error"
            });
        }
    }

    @Delete()
    public async handleDeleteRequest(req: Request, res: Response) {
        try {
            console.log('Handling request to delete a user');
            const user = new users(req.body);
            await user.destroy();
            res.status(201).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Delete User Route",
                response_status: 201,
                response_body: user,
                redirect_to: ""
            });
        } catch (error) {
            // Handle any errors and send an error response
            console.error('Error handling request:', error);
            res.status(500).json({
                response_title: "Crispy Authentication Router V1 - Authentication API - Delete User Route",
                response_status: 500,
                response_body: "Internal Server Error"
            });
        }
    }
    public getRouter(): Router {
        return this.router;
    }
}