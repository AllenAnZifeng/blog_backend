import {NextFunction, Request, Response} from "express";
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";

const salt = bcrypt.genSaltSync(2);

let register_middleware = async (req: Request, res: Response, next:NextFunction) => {

    console.log("inside register_middleware")

    const prisma = new PrismaClient()
    try{
        const user = await prisma.user.create({
            data: {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.pwd, salt) // hashed pwd
            }
        })
        res.json(req.body)
        console.log("success register_middleware")
    } catch (err){
        console.error("Error!!!!!!!!!!!!!!!",err)
        res.json(err)
    }


}
let login_middleware = async (req: Request, res: Response, next:NextFunction) => {
    console.log("inside login_middleware")

    const prisma = new PrismaClient()
    try{
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        })
        if (user!= null && bcrypt.compareSync(req.body.pwd, user.password)){
            console.log("successful login")
            res.json(user)
        }else{
            console.log("failed login")
            res.json({'error':'error'})
        }

    } catch (err){
        console.error("Error!!!!!!!!!!!!!!!",err)
        res.json(err)
    }
}

export {register_middleware,login_middleware};

// let login_middleware = (req: Request, res: Response, next:NextFunction) => {
//     console.log("f2 received requests")
//     res.send(req.body)
// }