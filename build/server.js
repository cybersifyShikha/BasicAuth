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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { PostController } from './controller/post.controller'; // import the post controller
const typeorm_1 = require("typeorm");
class Server {
    constructor() {
        this.app = (0, express_1.default)(); // init the application
        this.configuration();
        this.routes();
    }
    /**
     * Method to configure the server,
     * If we didn't configure the port into the environment
     * variables it takes the default port 3000
     */
    configuration() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(express_1.default.json());
    }
    /**
     * Method to configure the routes
     */
    routes() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.createConnection)({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "postgres",
                password: "root",
                database: "auth",
                entities: ["build/database/entities/**/*.js"],
                migrations: ["build/database/migrations/**/*.js"],
                cli: {
                    entitiesDir: "src/database/entities", migrationsDir: "src/database/migrations", subscribersDir: "src/subscriber"
                },
                synchronize: true,
            });
            // this.postController = new PostController();
            this.app.get("/", (req, res) => {
                res.send("Hello I m running");
            });
            // this.app.use(`/api/posts/`,this.postController.router); // Configure the new routes of the controller post
        });
    }
    /**
     * Used to start the server
     */
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server is listening ${this.app.get('port')} port.`);
        });
    }
}
const server = new Server(); // Create server instance
server.start(); //
