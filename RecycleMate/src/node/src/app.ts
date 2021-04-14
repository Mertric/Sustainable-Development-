import express from 'express';
import bodyParser from 'body-parser';
import dotenv from "dotenv";

class App {
  public app: express.Application;
  public port: number;

  constructor(controllers: any) {
    this.app = express();
    dotenv.config({ path: './src/resources/.env' })
    this.port = Number(process.env.SERVER_PORT);

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.app.use(bodyParser.json());
  }

  private initializeControllers(controllers: any) {
    controllers.forEach((controller: any) => {
      this.app.use('/', controller.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;