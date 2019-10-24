const request = require("request").defaults({ jar: true });

const username = require('./env').username;
const apiKey = require('./env').apiKey;
const token = Buffer.from(username + ':' + apiKey).toString("base64");
let headers = {
  Authorization:
    "Basic " + token
};

// request.get(
//   `https://ineomobility.atlassian.net/rest/api/2/search?jql=project = "MOV" AND sprint in openSprints() AND Sprint not in closedSprints() ORDER BY priority&maxResults=100&startAt=0`, { headers }, (e, r, b) => {
//     let body = JSON.parse(b);
//     let issues = [];
//     body.issues.forEach(issue => {
//       let sprint = issue.fields.customfield_10113;
//       sprint = (sprint + '').match(/Sprint .{2}/g)[0].replace('Sprint ', '');
//       issues.push({ sprint: sprint, key: issue.key, points: issue.fields.customfield_10115, status: issue.fields.status.name, summary: issue.fields.summary });
//       if (statuses[issue.fields.status.name] == undefined) {
//         statuses[issue.fields.status.name] = Number(issue.fields.customfield_10115);
//       } else {
//         statuses[issue.fields.status.name] += Number(issue.fields.customfield_10115);
//       }
//     });
//     console.log(issues.length);
//   }
// );

let statuses = {};
request.get(
  `https://ineomobility.atlassian.net/rest/api/2/search?jql=project = "MOV" AND sprint in openSprints() AND Sprint not in closedSprints() ORDER BY priority&maxResults=100&startAt=0`, { headers }, (e, r, b) => {
    let body = JSON.parse(b);
    body.issues.forEach(issue => {
      if (statuses[issue.fields.status.name] == undefined) {
        statuses[issue.fields.status.name] = Number(issue.fields.customfield_10115);
      } else {
        statuses[issue.fields.status.name] += Number(issue.fields.customfield_10115);
      }
    });
  }
);