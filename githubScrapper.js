const request = require("request");
const path = require("path");
const fs = require("fs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const xlsx = require("json-as-xlsx");

const link = "https://github.com/topics";
request(link, cb);
function cb(error, response, html){
    if(error){
        console.log(error);
    }else{
        const dom = new JSDOM(html);
        const document = dom.window.document;
        let allFolders = document.querySelectorAll(".no-underline.d-flex.flex-column.flex-justify-center");
        for(let i = 0; i < allFolders.length; i++){
            let link = allFolders[i].href;
            // console.log(link);
            let completeLink = "https://github.com" + link;
            // console.log(completeLink);
            let folderName = path.basename(completeLink);
            if(!fs.existsSync("folderName")){
                fs.mkdirSync(folderName);
            }
            request(completeLink, cb2);
            
            
            function cb2(error, response, html){
                if(error){
                    console.log(error);
                }else{
                    const dom = new JSDOM(html);
                    const document = dom.window.document;
                    let repos = document.querySelectorAll(".text-bold.wb-break-word");
                    for(let i = 0; i < 8; i++){
                        let reposLink = repos[i].href;
                        // console.log(reposLink);
                        let completeRepoLink = "https://github.com" + reposLink;
                        // console.log(completeRepoLink);
                        request(completeRepoLink, cb3);


                        function cb3(error, response, html){
                            if(error){
                                console.log(error);
                            }else{
                                const dom = new JSDOM(html);
                                const document = dom.window.document;
                                let anchorTags = document.querySelectorAll(".UnderlineNav-body.list-style-none .d-inline-flex a");
                                let issuesLink = anchorTags[1].href;
                                // console.log(issuesLink);
                                let issuesCompleteLink = "https://github.com" + issuesLink;
                                // console.log(issuesCompleteLink);
                                request(issuesCompleteLink, cb4);

                                function cb4(error, response, html){
                                    if(error){
                                        console.log(error);
                                    }else{
                                        const dom = new JSDOM(html);
                                        const document = dom.window.document;
                                        let mainLink = document.querySelectorAll(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
                                        for(let k = 0; k < completeRepoLink.length; k++){
                                            // console.log("hello");
                                            let fileName = path.basename(completeRepoLink);
                                            let fileKaPath = path.join(__dirname, folderName, fileName);
                                            let ans = [];
                                            let obj = {};
                                            data();
                                            function data(error){
                                                if(error){
                                                    console.log(error);
                                                }else{
                                                    for(let i = 0; i < 5; i++){
                                                        let mainHref = mainLink[i].href;
                                                        let completeMainHref =  "https://github.com" + mainHref;
                                                        for(let a = 0; a < completeMainHref.length; a++){
                                                            let issueName = path.basename(completeMainHref);
                                                            // console.log("IssueName :- ",issueName);
                                                            // console.log("IssueLink :- ",completeMainHref);
                                                            obj = {
                                                                IssueName : issueName,
                                                                IssueLink : completeMainHref,
                                                            };
                                                        }
                                                    }
                                                }
                                            }   
                                            fs.writeFileSync(fileKaPath,JSON.stringify(obj));
                                        }
                                    }
                                }    
                            }
                        }        
                    }
                }
            }
        }
    }
}
