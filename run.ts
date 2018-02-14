import * as github from "octonode";
var client = github.client();
var repo = client.repo('Serabass/pageparser');
var data = repo.contents('bin', function (err: any, files: any, header: any) {
    debugger;
});
