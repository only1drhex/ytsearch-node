const axios = require('axios');
const search = async(query,ogq) =>
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



if(typeof data[index] == "object" && data[index].hasOwnProperty("itemSectionRenderer")) 
{ 
  data = data[index].itemSectionRenderer.contents; 
  return data;
}
else {
  
  throw new Error ("No results were found for search query '"+ ogq +"'.")
}





     }
   
 module.exports = search
   
   
   
