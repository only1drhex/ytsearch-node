const ytsearch = require("../")

const main = async() =>{
  let saveString;
  let results = await ytsr("Black Panther")
  let results = await ytsearch("Black Panther")
  
  console.log(results)

  
}
main()
