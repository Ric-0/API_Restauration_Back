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
exports.ControllerPlats = void 0;
var aliments_1 = require("../models/aliments");
var plats_1 = require("../models/plats");
var controllerTokens_1 = require("./controllerTokens");
var ControllerPlats = /** @class */ (function () {
    function ControllerPlats() {
    }
    ControllerPlats.getPlats = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var listePlats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, plats_1.Plats.getAllPlats()];
                    case 1:
                        listePlats = _a.sent();
                        res.status(200);
                        res.send(listePlats);
                        return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.getPlatsGroupByType = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var verif, listePlats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, controllerTokens_1.ControllerTokens.verifToken(req.headers.token)];
                    case 1:
                        verif = _a.sent();
                        if (!verif) return [3 /*break*/, 3];
                        return [4 /*yield*/, plats_1.Plats.getAllPlatsGroupByType()];
                    case 2:
                        listePlats = _a.sent();
                        res.status(200);
                        res.send(listePlats);
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(401);
                        res.send();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.getPlatById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var verif, id, plat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, controllerTokens_1.ControllerTokens.verifToken(req.headers.token)];
                    case 1:
                        verif = _a.sent();
                        if (!verif) return [3 /*break*/, 5];
                        id = req.params.id;
                        if (!(id !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, plats_1.Plats.getOnePlat(id)];
                    case 2:
                        plat = _a.sent();
                        res.status(200);
                        res.send(plat);
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400);
                        res.send();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(401);
                        res.send();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.getPlatsByType = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var verif, type, listePlats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, controllerTokens_1.ControllerTokens.verifToken(req.headers.token)];
                    case 1:
                        verif = _a.sent();
                        if (!verif) return [3 /*break*/, 5];
                        type = req.params.type;
                        console.log(req.headers);
                        if (!(type !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, plats_1.Plats.getPlatsByType(type)];
                    case 2:
                        listePlats = _a.sent();
                        res.status(200);
                        res.send(listePlats);
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400);
                        res.send();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(401);
                        res.send();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.insertPlat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var verif, listeAliments_1, oneAliment_1, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, controllerTokens_1.ControllerTokens.verifToken(req.headers.token)];
                    case 1:
                        verif = _a.sent();
                        if (!verif) return [3 /*break*/, 5];
                        console.log(typeof req.body.aliments);
                        if (typeof req.body.aliments[0] === 'string') {
                            listeAliments_1 = [];
                            oneAliment_1 = {
                                nom: "",
                                quantite: 0
                            };
                            req.body.aliments.map(function (aliment) {
                                console.log(aliment);
                                oneAliment_1.quantite = 1;
                                oneAliment_1.nom = aliment;
                                listeAliments_1.push(oneAliment_1);
                            });
                            req.body.aliments = listeAliments_1;
                            console.log(req.body);
                        }
                        body = req.body;
                        console.log(body);
                        if (!(body !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, plats_1.Plats.insertPlat(req.body)];
                    case 2:
                        _a.sent();
                        res.status(201);
                        res.send();
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400);
                        res.send();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(401);
                        res.send();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.updatePlat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var verif, id, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, controllerTokens_1.ControllerTokens.verifToken(req.headers.token)];
                    case 1:
                        verif = _a.sent();
                        if (!verif) return [3 /*break*/, 5];
                        id = req.params.id;
                        body = req.body;
                        if (!(id !== null && body !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, plats_1.Plats.updatePlat(req.params.id, req.body)];
                    case 2:
                        _a.sent();
                        res.status(204);
                        res.send();
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400);
                        res.send();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(401);
                        res.send();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.deletePlat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var verif, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, controllerTokens_1.ControllerTokens.verifToken(req.headers.token)];
                    case 1:
                        verif = _a.sent();
                        if (!verif) return [3 /*break*/, 5];
                        id = req.params.id;
                        if (!(id !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, plats_1.Plats.deletePlat(req.params.id)];
                    case 2:
                        _a.sent();
                        res.status(204);
                        res.send();
                        return [3 /*break*/, 4];
                    case 3:
                        res.status(400);
                        res.send();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        res.status(401);
                        res.send();
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.commanderPlat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var verif, plat, listeAliments_2, listeAlimentsPlat;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, controllerTokens_1.ControllerTokens.verifToken(req.headers.token)];
                    case 1:
                        verif = _a.sent();
                        if (!verif) return [3 /*break*/, 4];
                        return [4 /*yield*/, plats_1.Plats.getOnePlat(req.params.id)];
                    case 2:
                        plat = _a.sent();
                        return [4 /*yield*/, aliments_1.Aliments.getAllAliments()];
                    case 3:
                        listeAliments_2 = _a.sent();
                        listeAlimentsPlat = plat[0].aliments;
                        listeAlimentsPlat.forEach(function (alimentPlat) {
                            listeAliments_2.forEach(function (aliment) { return __awaiter(_this, void 0, void 0, function () {
                                var quantite, id, body;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(alimentPlat.nom === aliment.nom)) return [3 /*break*/, 2];
                                            quantite = aliment.quantite - alimentPlat.quantite;
                                            id = aliment._id;
                                            body = { quantite: quantite };
                                            return [4 /*yield*/, aliments_1.Aliments.updateAliment(id, body)];
                                        case 1:
                                            _a.sent();
                                            _a.label = 2;
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); });
                        });
                        res.status(204);
                        res.send('ok');
                        return [3 /*break*/, 5];
                    case 4:
                        res.status(401);
                        res.send();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return ControllerPlats;
}());
exports.ControllerPlats = ControllerPlats;
//# sourceMappingURL=controllerPlats.js.map