import  {Express,Request,Response,NextFunction} from "express";
import {register_middleware,login_middleware, post_comment_middleware,auth_middleware,fetch_comment_middleware} from "./controller/controller";

let routes = (app:Express) => {
    app.post('/api/login', login_middleware)

    app.post('/api/register', register_middleware)

    app.post('/api/comment', auth_middleware, post_comment_middleware)

    app.get('/api/comment/:blogId', fetch_comment_middleware)

    app.get('/data', (req: Request, res: Response) => {
        console.log("data")
        return res.status(200).json({message: "data"})
    })
}

export default routes;