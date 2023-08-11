const fs = require("fs");

// console.log("before");
// let content = fs.readFileSync("file.txt");
// console.log(content+"");
// console.log("after");

console.log("before");
fs.readFile("file.txt",cb);
function cb(error, data){
    if(error)
        console.log(error);
    else{
        console.log(data+"");
    }     
}
console.log("after");