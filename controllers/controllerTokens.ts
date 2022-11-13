import { Tokens } from "../models/tokens";


export class ControllerTokens{
    public static async getToken(req,res){
        let tokken = await Tokens.getOneToken()
        res.status(200)
        res.send(tokken)
    }
    public static async insertToken(req,res){
        let body:{valeur:string} = req.body
        if(body !== null){
            await Tokens.insertToken(body)
            res.status(201)
            res.send()
        }else{
            res.status(400)
            res.send()
        }
    }
}