const http = require("http");
const https = require("https");

const port = 3000;

const requestHandler = (request, response) => {
  console.log(request.url);
  let rr = request.url.replace('/api/recollect/', '');
  https.get(`https://api.recollect.net/api/areas/${rr}`, (resp) => {
      let data = "";
      // A chunk of data has been received.
      resp.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on("end", () => {
        response.end(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
