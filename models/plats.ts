import { Schema } from "mongoose";
const mongoose = require('mongoose');

const platSchema = new Schema({
    nom: String,
    type: String,
    aliments: [{nom: String, quantite: Number}],
    prix: Number
})
const PlatModel = mongoose.model('plats', platSchema);
export class Plats{
    public static async getAllPlats():Promise<Plats[]>{
        return await PlatModel.find()
    }
    public static async getAllPlatsGroupByType(){
        return await PlatModel.find().sort({'type': -1})
    }
    public static async getOnePlat(id):Promise<Plats>{
        return await PlatModel.find({_id: id})
    }
    public static async getPlatByName(name):Promise<Plats>{
        return await PlatModel.find({nom: name})
    }
    public static async getPlatsByType(type){
        return await PlatModel.find({type:type})
    }
    public static async insertPlat(body:{nom:string,type:string,aliments:[{nom:string,quantite:string}],prix:number}){
        const plat = new PlatModel({
            nom:body.nom,
            type:body.type,
            aliments:body.aliments,
            prix:body.prix
        })
        return await plat.save()
    }
    public static async updatePlat(id,body){
        return await PlatModel.findByIdAndUpdate(id,body);
    }
    public static async deletePlat(id){
        return await PlatModel.findByIdAndRemove(id)
    }
}