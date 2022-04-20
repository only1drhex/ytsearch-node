const ytsearch = require("node-ytsearch")

const main = async() =>{
  let results = await ytsearch("Black Panther")
  
  console.log(results)

  
}
main()
