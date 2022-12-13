import {NextFunction, Request, Response} from "express";
import {PrismaClient} from '@prisma/client'
import bcrypt from "bcrypt";
import jsonwebtoken from 'jsonwebtoken'


let response = (status: number, message: string, token: string = "") => {
    return {
        "status": status,
        "message": message,
        "token": token
    }
}


let register_middleware = async (req: Request, res: Response, next: NextFunction) => {

    console.log("inside register_middleware")

    const prisma = new PrismaClient()
    try {
        const salt = bcrypt.genSaltSync(2);
        await prisma.user.create({
            data: {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.pwd, salt),
                name: req.body.name,
            }
        })
        res.status(200).json(response(200, "Successful Registration!"))
        console.log("success register_middleware")
    } catch (err) {
        console.error("Error!!!!!!!!!!!!!!!", err)
        res.status(409).json(response(409, "Error! Email or Name Already Exist!"))
    }


}
let login_middleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("inside login_middleware")

    const prisma = new PrismaClient()
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        })
        if (user != null && bcrypt.compareSync(req.body.pwd, user.password)) {
            console.log("successful login")
            const token = jsonwebtoken.sign({data: user.email},
                user.password,
                {expiresIn: '1h'});
            res.status(200).json(response(200, user.name, token))
        } else {
            console.log("failed login")
            res.status(401).json(response(401, "Error! Unauthorized!"))
        }

    } catch (err) {
        console.error("Error!!!!!!!!!!!!!!!", err)
        res.status(401).json(response(401, "Error!"))
    }
}


let post_comment_middleware = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.authorName
    const comment = req.body.comment
    const blogID = req.body.blogID
    const prisma = new PrismaClient()

    try {
        await prisma.comment.create({
            data: {
                content: comment,
                authorName: username,
                blogID: blogID,
                time: JSON.stringify(Date.now()),
            }
        })
        console.log("Comment Successful!")
        res.status(200).json(response(200, "Comment Successful!"))

    } catch (err) {
        console.error("Comment Failed", err)
        res.status(409).json(response(409, "Comment Failed!"))
    }


}

let auth_middleware = async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.authorName
    const token = req.body.token
    const prisma = new PrismaClient()
    let decoded;

    try {
        const user = await prisma.user.findUnique({
            where: {
                name: username,
            }
        })
        if (user != null) {

            decoded = jsonwebtoken.verify(token, user.password)
            if (decoded) {
                console.log("exit from auth middleware")
                next()
            } else {
                res.status(401).json(response(401, "Invalid Token!"))
            }

        } else {
            console.error("Error! User not Found!")
            res.status(401).json(response(401, "User not Found!"))
        }

    } catch (err) {
        console.error("Error!", err)
        res.status(401).json(response(401, "Invalid Token!"))
    }

}


let fetch_comment_middleware = async (req: Request, res: Response, next: NextFunction) => {
    const blogId = req.params.blogId
    const prisma = new PrismaClient()

    try {
        const comments = await prisma.comment.findMany({
            where: {
                blogID: blogId,
            }
        })
        console.log("Fetch Comment Successful!")
        res.status(200).json(response(200, JSON.stringify(comments)))

    } catch (err) {
        console.error("Fetch Comment Failed", err)
        res.status(409).json(response(409, "Fetch Comment Failed!"))
    }
}

export {register_middleware, login_middleware, post_comment_middleware, auth_middleware, fetch_comment_middleware};

