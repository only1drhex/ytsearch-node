const ytsr = require("../src/parsedata.js")
const fs = require("fs")
const util = require("util")


const main = async() =>{
  let saveString;
  let results = await ytsr("i")
  
  console.log(results[0]. description)
  saveString = util.inspect(results, { depth: Infinity });
  fs.writeFileSync('./example.txt', saveString);

  
  
}
main()