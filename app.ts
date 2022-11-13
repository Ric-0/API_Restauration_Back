import { Schema } from "mongoose";
import { ControllerAliments } from "./controllers/controllerAliments";
import { ControllerPlats } from "./controllers/controllerPlats";
import { ControllerTokens } from "./controllers/controllerTokens";
const mongoose = require('mongoose');
const express = require('express')
const cors = require('cors')
/**
 * On créé une nouvelle "application" express
 */
const app = express()

/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */

app.use(cors())
app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) =>{console.log(`${req.method}${req.originalUrl}`);next()})

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
    openapi:'3.0.0',
    info:{
        title:'Express API for JSONPlaceholder',
        version:'1.0.0',
        description:'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.'
    },
    servers:[{
        url:'http://localhost:3001/',
        description:'Development server',
    }]
};
const options= {
    swaggerDefinition,
    // Paths to files containing OpenAPIdefinitions
    apis:['./*.js','./controller/*.js'],
};

const swaggerSpec= swaggerJSDoc(options);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
/**
 * @swagger
 * components:
 *   schemas:
 *     Aliment:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: L'id de l'aliment
 *         nom:
 *           type: String
 *           description: Le nom de l'aliment
 *         type:
 *           type: String
 *           description: Le type de l'aliment
 *         quantite:
 *           type: String
 *           description: La quantite
 *         date:
 *           type: Date
 *           descripton: La date de derniere mise a jour
 *       example:
 *         _id: 633af1056cabf57af8169622
 *         nom: Navet
 *         type: legume
 *         quantite: 50
 *         date: 2022-10-03T14:26:13.581Z
 *     Plat:
 *       type: object
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: L'id du plat
 *         nom:
 *           type: String
 *           description: Le nom du plat
 *         type:
 *           type: String
 *           description: Le type du plat
 *         aliments:
 *           type: array
 *           description: La liste des aliment du plat
 *           items: 
 *             type: object
 *             properties:
 *               _id:
 *                 type: ObjectId
 *                 description: L'id de l'aliment dans le tableau
 *               nom:
 *                 type: String
 *                 description: Le nom de l'aliment
 *               quantite:
 *                 type: Integer
 *                 description: La quantite de l'aliment nécessaire pour faire le plat  
 *         prix:
 *           type: Integer
 *           description: Le prix du plat 
 *       example:
 *         _id: 6356835a99278b94024a2794
 *         nom: Soupe
 *         type: Entree
 *         aliments: [{_id: 6356835a99278b94024a2795, nom: Navet, quantite: 1}]
 *         prix: 5 
 */

app.get('/', (req, res) => res.send('🏠'))
/**
 * @swagger
 * /aliments:
 *   get:
 *     summary: Retourne la liste des aliments
 *     tags: [Aliment]
 *     responses:
 *       200:
 *         description: La liste des aliments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aliment'
 */
app.get('/aliments', (req,res) => ControllerAliments.getAliments(req,res))
/**
 * @swagger
 * /aliments/{id}:
 *   get:
 *     summary: Retourne un aliment selon l'id
 *     tags: [Aliment]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id de l'aliment
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: L'aliment correspondant a l'id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aliment'
 *       400:
 *         description: Aucun aliment correspondant
 */
app.get('/aliments/:id', (req,res) => ControllerAliments.getAlimentById(req,res))
/**
 * @swagger
 * /aliments/type/{type}:
 *   get:
 *     summary: Retourne la liste des aliments en fonction d'un type
 *     tags: [Aliment]
 *     parameters:
 *       - in : path
 *         name: type
 *         description: type de(s) aliment(s)
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Liste des aliments avec le type donne
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/Aliment'
 *       400:
 *         description: Aucun aliment correspondant
 */
app.get('/aliments/type/:type', (req,res) => ControllerAliments.getAlimentsByType(req,res))
/**
 * @swagger
 * /aliments:
 *   post:
 *     summary: Creation d'un aliment
 *     tags: [Aliment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aliment'
 *     responses:
 *       201:
 *         description: L'aliment a bien ete cree
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aliment'
 *       500:
 *         description: Erreur dans l'insertion
 */
app.post("/aliments", (req,res) => ControllerAliments.insertAliment(req,res))
/**
 * @swagger
 * /aliments/{id}:
 *   put:
 *     summary: Mise a jour d'un aliment
 *     tags: [Aliment]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id de l'aliment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aliment'
 *     responses:
 *       200:
 *         decsription: L'aliment a ete mis a jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aliment'
 *       404:
 *         description: Impossible de trouver l'aliment
 *       500:
 *         description: Erreur survenu
 *
 */
app.put('/aliments/:id', (req,res) => ControllerAliments.updateAliment(req,res))
/**
 * @swagger
 *  /aliments/{id}:
 *    delete:
 *      summary: Supprime l'aliment
 *      tags: [Aliment]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Id de l'aliment
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        204:
 *          description: L'aliment a ete suprime
 *        404:
 *          description: L'aliment n'a pas ete trouve
 *
 */
app.delete('/aliments/:id', (req,res) => ControllerAliments.deleteAliment(req,res))

/**
 * @swagger
 * /plats:
 *   get:
 *     summary: Retourne la liste des plats
 *     tags: [Plat]
 *     responses:
 *       200:
 *         description: La liste des plats
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plat'
 */
app.get('/plats', (req,res) => ControllerPlats.getPlats(req,res))
/**
 * @swagger
 * /plats/type:
 *   get:
 *     summary: Retourne la liste des plats par type
 *     tags: [Plat]
 *     responses:
 *       200:
 *         description: La liste des plats par type
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plat'
 */
app.get('/plats/type/', (req,res) => ControllerPlats.getPlatsGroupByType(req,res))
/**
 * @swagger
 * /plats/{id}:
 *   get:
 *     summary: Retourne un plat selon l'id
 *     tags: [Plat]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: id du plat
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Le plat correspondant a l'id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plat'
 *       400:
 *         description: Aucun plat correspondant
 */
app.get('/plats/:id', (req,res) => ControllerPlats.getPlatById(req,res))
/**
 * @swagger
 * /plats/{type}:
 *   get:
 *     summary: Retourne un plat selon le type
 *     tags: [Plat]
 *     parameters:
 *       - in : path
 *         name: id
 *         description: type du/des plat(s)
 *         schema:
 *           type: String
 *     responses:
 *       200:
 *         description: Le(s) plat(s) correspondant au type
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plat'
 *       400:
 *         description: Aucun plat correspondant
 */
app.get('/plats/type/:type', (req,res) => ControllerPlats.getPlatsByType(req,res))
/**
 * @swagger
 * /plats:
 *   post:
 *     summary: Creation d'un plat
 *     tags: [Plat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plat'
 *     responses:
 *       201:
 *         description: Le plat a bien ete cree
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plat'
 *       500:
 *         description: Erreur dans l'insertion
 */
app.post('/plats', (req,res) => ControllerPlats.insertPlat(req,res))
/**
 * @swagger
 * /plats/{id}:
 *   put:
 *     summary: Mise a jour d'un plat
 *     tags: [Plat]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Id du plat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plat'
 *     responses:
 *       200:
 *         decsription: Le plat a ete mis a jour
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plat'
 *       404:
 *         description: Impossible de trouver le plat
 *       500:
 *         description: Erreur survenu
 *
 */
app.put('/plats/:id', (req,res) => ControllerPlats.updatePlat(req,res))
/**
 * @swagger
 *  /plats/{id}:
 *    delete:
 *      summary: Supprime le plat
 *      tags: [Plat]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Id du plat
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        204:
 *          description: Le plat a ete suprime
 *        404:
 *          description: Le plat n'a pas ete trouve
 *
 */
app.delete('/plats/:id', (req,res) => ControllerPlats.deletePlat(req,res))

app.options('/plats/type/', (req,res) => console.log('option'))

app.get('/plats/commande/:id', (req,res) => ControllerPlats.commanderPlat(req,res))

app.get('/token', (req,res) => ControllerTokens.getToken(req,res))
app.post('/token', (req,res) => ControllerTokens.insertToken(req,res))

app.listen(3001,()=>{
    "Serveur listening on port :3001"
})

async function main(){
    await mongoose.connect('mongodb://localhost:27017/test');
    console.log('connection ok');   
}
main().catch(err => console.log(err))
app.use(express.json)