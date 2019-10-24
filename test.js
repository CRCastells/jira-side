const request = require("request").defaults({ jar: true });

let url = "https://ineomobility.atlassian.net/rest/auth/1/session";
const username = require('./env').username;
const apiKey = require('./env').apiKey;
const token = Buffer.from(username + ':' + apiKey).toString("base64");
let headers = {
  Authorization:
    "Basic " + token
};
request.get(
  "https://ineomobility.atlassian.net/rest/api/2/search?jql=project=MOV", { headers }, (e, r, b) => {
    console.log(r.statusCode);
  }
);

// request.post(
//   {
//     url,
//     form
//   },
//   function(err, httpResponse, body) {
//     console.log(httpResponse.request.getHeader("Content-Type"));
//     console.log(httpResponse.statusCode);
//     console.log(err,body)
//   }
// );
