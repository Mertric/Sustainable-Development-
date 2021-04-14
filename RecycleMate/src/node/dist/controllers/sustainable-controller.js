"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const material_service_1 = require("./../service/material-service");
const sustainable_repository_1 = require("./../repository/sustainable-repository");
const express = __importStar(require("express"));
const https = __importStar(require("https"));
class SustainableController {
    constructor() {
        this.path = '/items';
        this.router = express.Router();
        this.sustainableRepository = new sustainable_repository_1.SustainableRepository().getInstance();
        this.posts = [
            {
                author: 'Marcin',
                content: 'Dolor sit amet',
                title: 'Lorem Ipsums',
            },
        ];
        this.baseCase = (request, response) => {
            response.send(JSON.stringify({}));
        };
        this.getItems = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            this.sustainableRepository.getLocation(1).then(data => {
                console.log(data);
                response.send(JSON.stringify(data[0]));
            });
        });
        this.getItemDetils = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            console.log('did I make it here');
            response.send(this.posts);
            // this.sustainableRepository.getItems(1).then(data => {
            //     response.send(data);
            // })
            // .catch(next);
        });
        this.createAPost = (request, response) => {
            const post = request.body;
            this.posts.push(post);
            response.send(post);
        };
        // detail?materialId=?
        this.getDetail = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            if (!request.query.materialId) {
                response.send({});
            }
            const result = yield this.materialService.getMaterialDetail(Number(request.query.materialId));
            response.send(result);
        });
        this.getLocations = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            if (!request.query.materialId) {
                response.send({});
            }
            const result = yield this.materialService.getLocations(Number(request.query.materialId));
            response.send(result);
        });
        this.getRecollectSearch = (request, response, next) => __awaiter(this, void 0, void 0, function* () {
            console.log(request.url);
            const rr = `https://api.recollect.net/api/areas/api/recollect/Regina/services/waste/pages?type=material&suggest=${request.query.suggest}`;
            console.log(rr);
            https.get(`https://api.recollect.net/api/areas/Regina/services/waste/pages?type=material&suggest=${request.query.suggest}`, (resp) => {
                let data = '';
                // A chunk of data has been received.
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                // The whole response has been received. Print out the result.
                resp.on('end', () => {
                    response.end(data);
                });
            })
                .on('error', (err) => {
                console.log('Error: ' + err.message);
            });
        });
        this.intializeRoutes();
        this.initializeServices();
    }
    intializeRoutes() {
        this.router.get('/', this.baseCase);
        this.router.get('/search', this.getRecollectSearch);
        this.router.get('/detail', this.getDetail);
        this.router.get('/location', this.getLocations);
        this.router.get('/material', this.getRecollectSearch);
        this.router.get(this.path, this.getItems);
        this.router.get(`${this.path}/details`, this.getItems);
        this.router.post(this.path, this.createAPost);
    }
    initializeServices() {
        this.materialService = new material_service_1.MaterialService().getInstance();
    }
}
exports.default = SustainableController;
//# sourceMappingURL=sustainable-controller.js.map