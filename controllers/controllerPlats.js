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
            var listePlats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.headers);
                        return [4 /*yield*/, plats_1.Plats.getAllPlatsGroupByType()];
                    case 1:
                        listePlats = _a.sent();
                        res.status(200);
                        res.send(listePlats);
                        return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.getPlatById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, plat;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!(id !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, plats_1.Plats.getOnePlat(id)];
                    case 1:
                        plat = _a.sent();
                        res.status(200);
                        res.send(plat);
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400);
                        res.send();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.getPlatsByType = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var type, listePlats;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        type = req.params.type;
                        console.log(req.headers);
                        if (!(type !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, plats_1.Plats.getPlatsByType(type)];
                    case 1:
                        listePlats = _a.sent();
                        res.status(200);
                        res.send(listePlats);
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400);
                        res.send();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.insertPlat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        body = req.body;
                        if (!(body !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, plats_1.Plats.insertPlat(req.body)];
                    case 1:
                        _a.sent();
                        res.status(201);
                        res.send();
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400);
                        res.send();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.updatePlat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        body = req.body;
                        if (!(id !== null && body !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, plats_1.Plats.updatePlat(req.params.id, req.body)];
                    case 1:
                        _a.sent();
                        res.status(204);
                        res.send();
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400);
                        res.send();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.deletePlat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        if (!(id !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, plats_1.Plats.deletePlat(req.params.id)];
                    case 1:
                        _a.sent();
                        res.status(204);
                        res.send();
                        return [3 /*break*/, 3];
                    case 2:
                        res.status(400);
                        res.send();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ControllerPlats.commanderPlat = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var plat, aliment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, plats_1.Plats.getOnePlat(req.params.id)];
                    case 1:
                        plat = _a.sent();
                        console.log('fait');
                        return [4 /*yield*/, aliments_1.Aliments.getOneAliment(req.params.id)];
                    case 2:
                        aliment = _a.sent();
                        res.send('ok');
                        return [2 /*return*/];
                }
            });
        });
    };
    return ControllerPlats;
}());
exports.ControllerPlats = ControllerPlats;
//# sourceMappingURL=controllerPlats.js.map