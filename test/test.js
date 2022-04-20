const ytsearch = require("../src/parsedata.js")

const main = async() =>{
  let results = await ytsearch("Black Panther")
  
  console.log(results)

  
}
main()
