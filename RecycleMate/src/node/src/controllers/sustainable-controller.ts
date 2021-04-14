import { MaterialService } from './../service/material-service';
import { SustainableRepository } from './../repository/sustainable-repository';
import * as express from 'express';
import * as http from 'http';
import * as https from 'https';

export default class SustainableController {
  public path = '/items';
  public router = express.Router();
  private sustainableRepository = new SustainableRepository().getInstance();

  private materialService: MaterialService;

  private posts: any[] = [
    {
      author: 'Marcin',
      content: 'Dolor sit amet',
      title: 'Lorem Ipsums',
    },
  ];

  constructor() {
    this.intializeRoutes();
    this.initializeServices();
  }

  private intializeRoutes() {
    this.router.get('/', this.baseCase);
    this.router.get('/search', this.getRecollectSearch);
    this.router.get('/detail', this.getDetail);
    this.router.get('/location', this.getLocations);
    this.router.get('/material', this.getRecollectSearch);
    this.router.get(this.path, this.getItems);
    this.router.get(`${this.path}/details`, this.getItems);
    this.router.post(this.path, this.createAPost);
  }

  private initializeServices(){
      this.materialService = new MaterialService().getInstance();
  }

  baseCase = (request: express.Request,
    response: express.Response,) => {
        response.send(JSON.stringify({}));
  }

  getItems = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    this.sustainableRepository.getLocation(1).then(data => {
        console.log(data);
        response.send(JSON.stringify(data[0]));
    });
  };

  getItemDetils = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
    console.log('did I make it here');
    response.send(this.posts);
    // this.sustainableRepository.getItems(1).then(data => {
    //     response.send(data);
    // })
    // .catch(next);
  };

  createAPost = (request: express.Request, response: express.Response) => {
    const post: any = request.body;
    this.posts.push(post);
    response.send(post);
  };

  // detail?materialId=?
  getDetail = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
      if(!request.query.materialId){
        response.send({});
      }
      const result = await this.materialService.getMaterialDetail(Number(request.query.materialId))
      response.send(result);
  };

  getLocations = async(  request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
      if(!request.query.materialId){
        response.send({});
      }
      const result = await this.materialService.getLocations(Number(request.query.materialId))
      response.send(result);
  };
  

  getRecollectSearch = async (
    request: express.Request,
    response: express.Response,
    next: express.NextFunction
  ) => {
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
  };
}
