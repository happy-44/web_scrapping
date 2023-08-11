const request = require("request");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const link = "https://www.espncricinfo.com/series/ipl-2021-1249214/chennai-super-kings-vs-kolkata-knight-riders-final-1254117/full-scorecard";
request(link, cb);
function cb(error, response, html){
    if(error){
        console.log(error);
    }else{
        // console.log(html);
        const dom = new JSDOM(html);
        const document = dom.window.document;
        const bowlersTable = document.querySelectorAll(".table.bowler");
        let highestWicketTakerMan = 0;
        let NameOfHighestWicketTakerMan = "";
        for(let i = 0; i < bowlersTable.length; i++){
            let rows = bowlersTable[i].querySelectorAll("tbody tr");
            for(let j = 0; j < rows.length; j++){
                let tds = rows[j].querySelectorAll("td");
                if(tds.length > 1){
                    let name = tds[0].textContent;
                    let wicket = tds[4].textContent;
                    // console.log("Name of Bowler --->",name,"    Wickets",wicket);
                    if(wicket > highestWicketTakerMan){
                        highestWicketTakerMan = wicket;
                        NameOfHighestWicketTakerMan = name;
                    }
                }
            }
        }
        
        console.log("Name of the highest wicket taker man --> ",NameOfHighestWicketTakerMan);
        console.log("highest wicket --> ",highestWicketTakerMan);
    }
}