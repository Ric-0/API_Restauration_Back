import { Schema } from "mongoose";
const mongoose = require('mongoose');

const tokenSchema = new Schema({
    valeur:String
})
const TokenModel = mongoose.model('tokkens',tokenSchema)
export class Tokens{
    public static async getOneToken(){
        return await TokenModel.find({},{valeur:-1, _id:0}).limit(1)
    }
    public static async insertToken(body:{valeur:string}){
        const token = new TokenModel({
            valeur: body.valeur
        })
        return await token.save()
    }
}