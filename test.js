const request = require("request").defaults({ jar: true });

let url = "https://ineomobility.atlassian.net/rest/auth/1/session";
const username = require('./env').username;
const apiKey = require('./env').apiKey;
const token = Buffer.from(username + ':' + apiKey).toString("base64");
let headers = {
  Authorization:
    "Basic " + token
};
let response;

request.get(
  `https://ineomobility.atlassian.net/rest/api/2/search?jql=project = "MOV" AND sprint in openSprints() AND Sprint not in closedSprints()&maxResults=150&startAt=0`, { headers }, (e, r, b) => {
    let body = JSON.parse(b);
    let issues = [];
    body.issues.forEach(issue => {
      let sprint = issue.fields.customfield_10113;
      sprint = (sprint + '').match(/Sprint .{2}/g)[0].replace('Sprint ','');
      issues.push({ sprint: sprint,key: issue.key, points: issue.fields.customfield_10115, status: issue.fields.status.name, summary: issue.fields.summary});
    });
    console.log(issues);
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
