const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const xlsx = require("json-as-xlsx");
let link = "https://www.espncricinfo.com/series/ipl-2021-1249214/match-results";

let leaderBoard = [];
let counter = 0;
request(link, cb);

function cb(error, response, html) {
    if (error) {
        console.log("error");
    } else {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let allScorecardTags = document.querySelectorAll('.ds-border-b.ds-border-line');
        for (let i = 0; i < 60; i++) {
            let anchorTagsAll = allScorecardTags[i].querySelectorAll("a");
            let tempLink = anchorTagsAll[2].href;
            //console.log(tempLink);
            let fullLink = "https://www.espncricinfo.com" + tempLink;
            // console.log(fullLink);
            request(fullLink, cb2);
            counter++;
        }
    }
}
function cb2(error, response, html) {
    if (error) {
        console.log(error);
    } else {
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let batmansRows = document.querySelectorAll(".ds-border-b.ds-border-line.ds-text-tight-s");
        for (let i = 0; i < batmansRows.length; i++) {
            let cells = batmansRows[i].querySelectorAll("td");
            if (cells.length == 8) {
                let name = cells[0].textContent;
                let runs = cells[2].textContent;
                let balls = cells[3].textContent;
                let fours = cells[5].textContent;
                let sixes = cells[6].textContent;
                // console.log("name",name,"runs",runs,"balls",balls,"fours",fours,"sixes",sixes);
                processPlayer(name, runs, balls, fours, sixes);
            }
        }
        counter--;
        if (counter == 0) {
            // console.log(leaderBoard);
            let data = JSON.stringify(leaderBoard);
            fs.writeFileSync("batsmanStats.json", data);
            let dataExcel = [
                {
                    sheet: "batmansDetails",
                    columns: [
                        { label: "Name", value: "Name" }, // Top level data
                        { label: "Runs", value: "Runs" }, // Custom format
                        { label: "Balls", value: "Balls" }, // Run functions
                        { label: "Innings", value: "Innings" }, // Run functions
                        { label: "Fours", value: "Fours" }, // Run functions
                        { label: "Sixes", value: "Sixes" }, // Run functions
                        
                    ],
                    content: leaderBoard
                },
            ]

            let settings = {
                fileName: "excelFileForBatmansDetails", // Name of the resulting spreadsheet
                extraLength: 3, // A bigger number means that columns will be wider
                writeOptions: {}, // Style options from https://github.com/SheetJS/sheetjs#writing-options
            }

            xlsx(dataExcel, settings) // Will download the excel file
        }
    }
}
// processPlayer("rohit","34","23","2","3","1");
// processPlayer("rohit","34","23","2","3","1");
// processPlayer("dhoni","34","23","2","3","1");
function processPlayer(name, runs, balls, fours, sixes) {
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    for (let i = 0; i < leaderBoard.length; i++) {
        let playerObj = leaderBoard[i];
        if (playerObj.Name == name) {
            playerObj.Runs += runs;
            playerObj.Balls += balls;
            playerObj.Innings += 1;
            playerObj.Fours += fours;
            playerObj.Sixes += sixes;
            return;
        }
    }
    let obj = {
        Name: name,
        Runs: runs,
        Balls: balls,
        Innings: 1,
        Fours: fours,
        Sixes: sixes
    }
    leaderBoard.push(obj);

}