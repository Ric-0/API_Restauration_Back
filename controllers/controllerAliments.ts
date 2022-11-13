import { Aliments } from "./../models/aliments";

export class ControllerAliments{
    public static async getAliments(req,res){
        let listeAliments = await Aliments.getAllAliments();     
        res.status(200)
        res.send(listeAliments);
    }
    public static async getAlimentById(req,res){
        let id:string = req.params.id
        if(id !== null){
            let aliments = await Aliments.getOneAliment(req.params.id);
            res.status(200)
            res.send(aliments);
        }else{
            res.status(400)
            res.send()
        }
    }
    public static async getAlimentsByType(req, res){
        let type:string = req.params.type
        if(type !== null){
            let listeAliments = await Aliments.getAlimentsByType(req.params.type);
            res.status(200)
            res.send(listeAliments);
        }else{
            res.status(400)
            res.send()
        }
    }
    public static async insertAliment(req,res){
        let body:{nom:string,type:string,quantite:number} = req.body
        if(body !== null){
            await Aliments.insertAliment(body);
            res.status(201);
            res.send();
        }else{
            res.status(400)
            res.send()
        }
    }
    public static async updateAliment(req,res){
        let id:string = req.params.id
        let body:{nom:string,type:string,quantite:number} = req.body
        if(id !== null && body !== null){
            await Aliments.updateAliment(id,body);
            res.status(204);
            res.send();
        }else{
            res.status(400)
            res.send()
        }
    }
    public static async deleteAliment(req,res){
        let id:string = req.params.id
        if(id !== null){
            await Aliments.deleteAliment(req.params.id);
            res.status(204);
            res.send();
        }else{
            res.status(400)
            res.send()
        }
    }
}