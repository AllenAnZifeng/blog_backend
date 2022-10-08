import  {Express,Request,Response,NextFunction} from "express";
import {register_middleware,login_middleware} from "./controller/controller";

let routes = (app:Express) => {
    app.post('/api/login', login_middleware)

    app.post('/api/register', register_middleware)

    app.post('/data', (req: Request, res: Response) => {
        console.log(req.body)
    })
}

export default routes;