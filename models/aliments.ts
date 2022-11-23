import { Schema } from "mongoose";
const mongoose = require('mongoose');

const alimentSchema= new Schema({
    nom: String, // String is shorthandfor {type: String}
    type: String,
    quantite: Number,
    date: { 
        type: Date, 
        default: Date.now
    },
});
const AlimentModel = mongoose.model('aliments', alimentSchema);
export class Aliments{
    nom: string;
    quantite: number
    _id: any;
    public static async getAllAliments():Promise<Aliments[]>{
        return await AlimentModel.find()
    }
    public static async getOneAliment(id) :Promise<Aliments>{
        return await AlimentModel.findOne({_id:id})
    }
    public static async getAlimentsByType(type :string) :Promise<Aliments[]>{
        return await AlimentModel.find({ type: type})
    }
    public static async insertAliment(body:{nom:string,type:string,quantite:number}){
        const aliment= new AlimentModel({
            nom: body.nom,
            type: body.type,
            quantite: body.quantite,
            date: new Date()
        });
        
        return await aliment.save()
    }
    public static async updateAliment(id, body){
        return await AlimentModel.findByIdAndUpdate(id, body);
    }
    public static async deleteAliment(id){
        return await AlimentModel.findByIdAndRemove(id);
    }

}