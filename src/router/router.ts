import express from 'express';
import bodyParser from "body-parser";
import AuthenticateRouter from "./authenticate/authenticate.router";
import WebPanelRouter from "./web-panel/web-panel.router";
import UsersRouter from "./users/users.router";
import AdministratorsRouter from "./administrators/administrators.router";
import swaggerUi from 'swagger-ui-express';
//import swaggerSpec from "../config/swaggerConfig";
const router = express.Router();
const authenticateRouter = new AuthenticateRouter();
const webPanelRouter = new WebPanelRouter();
const usersRouter = new UsersRouter();
const administratorsRouter = new AdministratorsRouter();

/*
/* Internal Routes
*/
router.use('/v1/api-docs', swaggerUi.serve);
router.get('/v1/api-docs')
router.use(bodyParser.json());
router.use('/v1/authenticate', authenticateRouter.getRouter());
router.use('/v1/web-panel', webPanelRouter.getRouter());
router.use('/v1/users', usersRouter.getRouter());
router.use('/v1/administrators', administratorsRouter.getRouter());

export default router;
