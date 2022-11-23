"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var controllerAliments_1 = require("./controllers/controllerAliments");
var controllerPlats_1 = require("./controllers/controllerPlats");
var controllerTokens_1 = require("./controllers/controllerTokens");
var mongoose = require('mongoose');
var express = require('express');
var cors = require('cors');
/**
 * On créé une nouvelle "application" express
 */
var app = express();
/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(cors());
app.use(express.json());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) { console.log("".concat(req.method).concat(req.originalUrl)); next(); });
var swaggerJSDoc = require('swagger-jsdoc');
var swaggerUi = require('swagger-ui-express');
var swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for JSONPlaceholder',
        version: '1.0.0',
        description: 'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.'
    },
    servers: [{
            url: 'http://localhost:3001/',
            description: 'Development server',
        }]
};
var options = {
    swaggerDefinition: swaggerDefinition,
    // Paths to files containing OpenAPIdefinitions
    apis: ['./*.js', './controller/*.js'],
};
var swaggerSpec = swaggerJSDoc(options);
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
/**
 * @swagger
 * /aliments:
 *   get:
 *     summary: Retourne la liste des aliments
 *     tags: [Aliment]
 *     parameters:
 *     - in: header
 *       name: token
 *       description: Ajouter le token de l'API
 *       required: true
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
app.get('/aliments', function (req, res) { return controllerAliments_1.ControllerAliments.getAliments(req, res); });
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
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.get('/aliments/:id', function (req, res) { return controllerAliments_1.ControllerAliments.getAlimentById(req, res); });
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
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.get('/aliments/type/:type', function (req, res) { return controllerAliments_1.ControllerAliments.getAlimentsByType(req, res); });
/**
 * @swagger
 * /aliments:
 *   post:
 *     summary: Creation d'un aliment
 *     tags: [Aliment]
 *     parameters:
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.post("/aliments", function (req, res) { return controllerAliments_1.ControllerAliments.insertAliment(req, res); });
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
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.put('/aliments/:id', function (req, res) { return controllerAliments_1.ControllerAliments.updateAliment(req, res); });
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
 *        - in: header
 *          name: token
 *          description: Ajouter le token de l'API
 *          required: true
 *      responses:
 *        204:
 *          description: L'aliment a ete suprime
 *        404:
 *          description: L'aliment n'a pas ete trouve
 *
 */
app.delete('/aliments/:id', function (req, res) { return controllerAliments_1.ControllerAliments.deleteAliment(req, res); });
/**
 * @swagger
 * /plats:
 *   get:
 *     summary: Retourne la liste des plats
 *     tags: [Plat]
 *     parameters:
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.get('/plats', function (req, res) { return controllerPlats_1.ControllerPlats.getPlats(req, res); });
/**
 * @swagger
 * /plats/type:
 *   get:
 *     summary: Retourne la liste des plats par type
 *     tags: [Plat]
 *     parameters:
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.get('/plats/type/', function (req, res) { return controllerPlats_1.ControllerPlats.getPlatsGroupByType(req, res); });
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
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.get('/plats/:id', function (req, res) { return controllerPlats_1.ControllerPlats.getPlatById(req, res); });
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
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.get('/plats/type/:type', function (req, res) { return controllerPlats_1.ControllerPlats.getPlatsByType(req, res); });
/**
 * @swagger
 * /plats:
 *   post:
 *     summary: Creation d'un plat
 *     tags: [Plat]
 *     parameters:
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.post('/plats', function (req, res) { return controllerPlats_1.ControllerPlats.insertPlat(req, res); });
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
 *       - in: header
 *         name: token
 *         description: Ajouter le token de l'API
 *         required: true
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
app.put('/plats/:id', function (req, res) { return controllerPlats_1.ControllerPlats.updatePlat(req, res); });
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
 *        - in: header
 *          name: token
 *          description: Ajouter le token de l'API
 *          required: true
 *      responses:
 *        204:
 *          description: Le plat a ete suprime
 *        404:
 *          description: Le plat n'a pas ete trouve
 *
 */
app.delete('/plats/:id', function (req, res) { return controllerPlats_1.ControllerPlats.deletePlat(req, res); });
/**
 * @swagger
 *  /plats/commande/{id}:
 *    get:
 *      summary: Commander un plat
 *      tags: [Plat]
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Id du plat
 *          required: true
 *          schema:
 *            type: string
 *        - in: header
 *          name: token
 *          description: Ajouter le token de l'API
 *          required: true
 *      responses:
 *        204:
 *          description: Le plat a ete commande
 *        404:
 *          description: Le plat n'a pas ete trouve
 *
 */
app.get('/plats/commande/:id', function (req, res) { return controllerPlats_1.ControllerPlats.commanderPlat(req, res); });
app.get('/token', function (req, res) { return controllerTokens_1.ControllerTokens.getToken(req, res); });
app.post('/token', function (req, res) { return controllerTokens_1.ControllerTokens.insertToken(req, res); });
app.listen(3001, function () {
    "Serveur listening on port :3001";
});
function main() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose.connect('mongodb://localhost:27017/test')];
                case 1:
                    _a.sent();
                    console.log('connection ok');
                    return [2 /*return*/];
            }
        });
    });
}
main().catch(function (err) { return console.log(err); });
app.use(express.json);
//# sourceMappingURL=app.js.map