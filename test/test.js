const ytsearch = require("../src/parsedata.js")

const main = async() =>{
  let results = await ytsearch("go")
  for (i=0;i<results.length;i++) console.log(results[i].shortViewCount + results[i].viewCount)

  
}
main()
