


// define a route handler for the default home page
// app.get( "/", ( req, res ) => {
//     res.send( "Hello world!" );
// } );

// // start the Express server
// app.listen( port, () => {
//     console.log( `server started at http://localhost:${ port }` );
// } );

import App from './app';
import SustainableController from './controllers/sustainable-controller'

const app = new App(
  [
    new SustainableController(),
  ]
);

app.listen();

// const requestHandler = (request, response) => {
//   console.log(request.url);
//   let rr = request.url.replace('/api/recollect/', '');
//   https.get(`https://api.recollect.net/api/areas/${rr}`, (resp) => {
//       let data = "";
//       // A chunk of data has been received.
//       resp.on("data", (chunk) => {
//         data += chunk;
//       });

//       // The whole response has been received. Print out the result.
//       resp.on("end", () => {
//         response.end(data);
//       });
//     })
//     .on("error", (err) => {
//       console.log("Error: " + err.message);
//     });
// };

// const server = http.createServer(requestHandler);

// server.listen(port, (err) => {
//   if (err) {
//     return console.log("something bad happened", err);
//   }

//   console.log(`server is listening on ${port}`);
// });
