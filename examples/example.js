const ytsearch = require("yt-vsr")

const main = async() =>{
  let results = await ytsearch("Black Panther")
  
  console.log(results)

  
}
main()
