const axios = require('axios');
const FS = require("fs")



const search = async(query) =>
{

const base  = "https://www.youtube.com/results"

const options = {
 "app" : "desktop",
 "search_query" : query  
}

let resp = await axios.get(base,{params : options })
 
    var e = resp.data
        var findInitialData = e.match(/var ytInitialData = {(.*?)};/g)[0]
          var fixData = findInitialData.replace(/var ytInitialData = /g,"")
          var c = JSON.parse(fixData.slice(0,-1))
          
    var data = c.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents;
    var index, confirm = false;
    
    //Find videoRenderer position and break out of nested loop on time.
    
    
    
    for(i=0;i<data.length;i++)
    {
         if(confirm) break;
    
          if(data[i].hasOwnProperty("itemSectionRenderer"))
            {
                
            for(j=0;j<data[i].itemSectionRenderer.contents.length;j++)
      {    
      if(data[i].itemSectionRenderer.contents[j].hasOwnProperty("videoRenderer"))
      {
              index = i;
              confirm = true;
            break;
      }
          
            }
    }
    
}
data = data[index].itemSectionRenderer.contents;
return data;
    
    
   }
   
 module.exports = search
   
   
   