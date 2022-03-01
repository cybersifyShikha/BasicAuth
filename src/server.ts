import express, {Request, Response} from 'express';
import "reflect-metadata";
import { ApolloServer, Config, ExpressContext } from "apollo-server-express";

import * as TypeORM from "typeorm";
import { createConnection } from 'typeorm';
import { Container } from 'typedi';
import createSchema from "./schema";

class Server {
  private app: express.Application;

  constructor(){
    this.app = express(); // init the application
    // this.configuration();
  }

  /**
   * Method to configure the server,
   * If we didn't configure the port into the environment 
   * variables it takes the default port 3000
   */
  // public configuration() {
  //   this.app.set('port', process.env.PORT || 3000);
  //   // this.app.use(express.json());
  // }

  /**
   * Used to start the server
   */
  public async start(){
    TypeORM.useContainer(Container);
    const schema = await createSchema(Container);

    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root",
      database: "auth",
      entities: ["build/database/entities/*.js"],
      migrations:["build/database/migrations/*.js"],
      cli: { 
        entitiesDir: "build/database/entities", 
        migrationsDir: "build/database/migrations", 
        subscribersDir: "build/subscriber" 
      },
      synchronize: true,
    });

    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      debug: true,
      playground: true,
    } as Config<ExpressContext>);

    const app = this.app
    await server.start()
    server.applyMiddleware({app});
    
    app.listen(3000, () => {
      console.log(`Server is listening 3000 port.`);
    });
  }
}

const server = new Server(); // Create server instance
server.start(); 
