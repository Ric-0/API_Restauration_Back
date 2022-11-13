import { Aliments } from "../models/aliments";
import { Plats } from "../models/plats";

export class ControllerPlats{
    public static async getPlats(req,res){
        let listePlats = await Plats.getAllPlats()
        res.status(200)
        res.send(listePlats)
    }
    public static async getPlatsGroupByType(req,res){
        console.log(req.headers);
        let listePlats = await Plats.getAllPlatsGroupByType()
        
        res.status(200)     
        res.send(listePlats)   
    }
    public static async getPlatById(req,res){
        let id = req.params.id;
        if(id !== null){
            let plat = await Plats.getOnePlat(id)
            res.status(200)
            res.send(plat)
        }else{
            res.status(400)
            res.send()
        }
    }
    public static async getPlatsByType(req,res){
        let type:string = req.params.type
        console.log(req.headers);
                
        if(type !== null){
            let listePlats = await Plats.getPlatsByType(type)
            res.status(200)
            res.send(listePlats)
        }else{
            res.status(400)
            res.send()
        }
    } 
    public static async insertPlat(req,res){
        let body:{nom:string,type:string,aliments:[{nom:string,quantite:string}],prix:number} = req.body
        if(body !== null){
            await Plats.insertPlat(req.body);
            res.status(201)
            res.send()
        }else{
            res.status(400)
            res.send()
        }
    }
    public static async updatePlat(req,res){
        let id:string = req.params.id
        let body:{nom:string,type:string,aliments:[{nom:string,quantite:string}],prix:number} = req.body
        if(id !== null && body !== null){
            await Plats.updatePlat(req.params.id,req.body);
            res.status(204);
            res.send();
        }else{
            res.status(400)
            res.send()
        }
    }
    public static async deletePlat(req,res){
        let id = req.params.id;
        if(id !== null){
            await Plats.deletePlat(req.params.id);
            res.status(204);
            res.send();
        }else{
            res.status(400)
            res.send()
        }
    }
    public static async commanderPlat(req,res){
        let plat = await Plats.getOnePlat(req.params.id)
        console.log('fait');
        
        let aliment = await Aliments.getOneAliment(req.params.id)
        res.send('ok')
    }
}