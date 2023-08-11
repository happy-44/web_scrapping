const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let link = "https://www.espncricinfo.com/series/netherlands-in-new-zealand-2021-22-1288970/new-zealand-vs-netherlands-1st-odi-1288987/full-scorecard"
request(link, cb);
function cb(error, response, html){
    if(error)
        console.error('error:', error); // Print the error if one occurred
    else{
        // console.log('body:', html); // Print the HTML for the Google homepage.
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let teamName = document.querySelectorAll(".ds-text-tight-l.ds-font-bold");
        console.log(teamName[0].textContent);
        console.log(teamName[1].textContent);
    
    }    
}