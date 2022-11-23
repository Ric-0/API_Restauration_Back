import { Aliments } from "../models/aliments";
import { Plats } from "../models/plats";
import { ControllerTokens } from "./controllerTokens";

export class ControllerPlats{
    public static async getPlats(req,res){
        let listePlats = await Plats.getAllPlats()
        res.status(200)
        res.send(listePlats)
    }
    public static async getPlatsGroupByType(req,res){
        let verif = await ControllerTokens.verifToken(req.headers.token)
        if(verif){
            let listePlats = await Plats.getAllPlatsGroupByType()
            
            res.status(200)     
            res.send(listePlats) 
        }else{
            res.status(401)
            res.send()
        }
    }
    public static async getPlatById(req,res){
        let verif = await ControllerTokens.verifToken(req.headers.token)
        if(verif){
            let id = req.params.id;
            if(id !== null){
                let plat = await Plats.getOnePlat(id)
                res.status(200)
                res.send(plat)
            }else{
                res.status(400)
                res.send()
            }
        }else{
            res.status(401)
            res.send()
        }
    }
    public static async getPlatsByType(req,res){
        let verif = await ControllerTokens.verifToken(req.headers.token)
        if(verif){
            let type:string = req.params.type
                    
            if(type !== null){
                let listePlats = await Plats.getPlatsByType(type)
                res.status(200)
                res.send(listePlats)
            }else{
                res.status(400)
                res.send()
            }
        }else{
            res.status(401)
            res.send()
        }
    } 
    public static async insertPlat(req,res){
        let verif = await ControllerTokens.verifToken(req.headers.token)
        if(verif){            
            if(typeof req.body.aliments[0] === 'string'){
                
                let listeAliments = []
                let oneAliment: {nom:string, quantite: number} = {
                    nom: "",
                    quantite: 0
                }
                req.body.aliments.map((aliment) => {
                    
                    oneAliment.quantite = 1
                    oneAliment.nom = aliment
                    listeAliments.push(oneAliment)
                })
                req.body.aliments = listeAliments
            }
            let body:{nom:string,type:string,aliments:[{nom:string,quantite:number}],prix:number} = req.body
            
            if(body !== null){
                await Plats.insertPlat(req.body);
                res.status(201)
                res.send()
            }else{
                res.status(400)
                res.send()
            }
        }else{
            res.status(401)
            res.send()
        }
    }
    public static async updatePlat(req,res){
        let verif = await ControllerTokens.verifToken(req.headers.token)
        if(verif){
            let id:string = req.params.id
            let body:{nom:string,type:string,aliments:[{nom:string,quantite:number}],prix:number} = req.body
            if(id !== null && body !== null){
                await Plats.updatePlat(req.params.id,req.body);
                res.status(204);
                res.send();
            }else{
                res.status(400)
                res.send()
            }
        }else{
            res.status(401)
            res.send()
        }
    }
    public static async deletePlat(req,res){
        let verif = await ControllerTokens.verifToken(req.headers.token)
        if(verif){
            let id = req.params.id;
            if(id !== null){
                await Plats.deletePlat(req.params.id);
                res.status(204);
                res.send();
            }else{
                res.status(400)
                res.send()
            }
        }else{
            res.status(401)
            res.send()
        }
    }
    public static async commanderPlat(req,res){
        let verif = await ControllerTokens.verifToken(req.headers.token)
        if(verif){
            let plat = await Plats.getOnePlat(req.params.id)
            let listeAliments = await Aliments.getAllAliments()
            let listeAlimentsPlat = plat[0].aliments
            listeAlimentsPlat.forEach(alimentPlat => {
                listeAliments.forEach(async aliment => {
                    if(alimentPlat.nom === aliment.nom){
                        let quantite = aliment.quantite - alimentPlat.quantite
                        let id = aliment._id
                        let body = {quantite: quantite}
                        await Aliments.updateAliment(id,body)                  
                    }
                });
            });
            res.status(204)
            res.send('ok')
        }else{
            res.status(401)
            res.send()
        }
    }


}