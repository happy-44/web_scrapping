const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const link = "https://www.espncricinfo.com/series/ipl-2021-1249214/royal-challengers-bangalore-vs-kolkata-knight-riders-eliminator-1254115/full-scorecard";
request(link, cb);
function cb(error, response, html){
    if(error){
        console.log(error);
    }else{
        // console.log(html);
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let batsMens = document.querySelectorAll(".batsman-cell.text-truncate.out a");
        // console.log(batsMens.length);
        for(let i = 0; i < batsMens.length; i++){
            let batmansLink = batsMens[i].href;
            // console.log(batsMensLink);
            let batmansFullLink = "https://www.espncricinfo.com" + batmansLink;
            // console.log(batmansFullLink);
            request(batmansFullLink, cb2);
        }            
    }
}        
function cb2(error, response, html){
    if(error){
        console.log(error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let playersDetails = document.querySelector(".player-card-padding .player_overview-grid");
        let playerH5 = playersDetails.querySelectorAll("div h5");
        let fullName = playerH5[0].textContent;
        let dateOfBirth = playerH5[1].textContent;
        let age = playerH5[2].textContent;
        let bowlingStyle = playerH5[3].textContent;
        let battingStyle = playerH5[4].textContent;
        let playingRole = playerH5[5].textContent;
        console.log("name of player --->  ",fullName);
        console.log("DOB of player --->  ",dateOfBirth);
        console.log("Age of player --->  ",age);
        console.log("BowlingStyle of player --->  ",bowlingStyle);
        console.log("batingStyle of player --->  ",battingStyle);
        console.log("playingRole of player --->  ",playingRole);
        console.log("\n");
    }
}