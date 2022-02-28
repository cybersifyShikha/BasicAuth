import express, {Request, Response} from 'express';
// import { PostController } from './controller/post.controller'; // import the post controller
import { createConnection } from "typeorm";

import routes from './routes'

class Server {
  // private postController: PostController;
  private app: express.Application;

  constructor(){
    this.app = express(); // init the application
    this.configuration();
    this.routes();
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  public configuration() {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());
  }

  /**
   * Method to configure the routes
   */
  public async routes(){
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "auth",
      entities: ["src/database/entities/*.ts"],
      migrations:["src/database/migrations/*.ts"],
      cli: { 
        entitiesDir: "src/database/entities", 
        migrationsDir: "src/database/migrations", 
        subscribersDir: "src/subscriber" 
      },
      synchronize: true,
    });

    // this.postController = new PostController();

    this.app.get( "/", (req: Request, res: Response ) => {
      res.send( "Hello I m running" );
    });

    this.app.use(routes)

    // this.app.use(`/api/posts/`,this.postController.router); // Configure the new routes of the controller post
  }

  /**
   * Used to start the server
   */
  public start(){
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is listening ${this.app.get('port')} port.`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); //