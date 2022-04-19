const getData = require("./search.js");
const extractedData = [];
const WatchUrl = "https://www.youtube.com/watch?v="
const Url ="https://www.youtube.com" 
const toSeconds=r=>{if(2==r.split(":").length){var e=(r=r.split(":"))[0],t=r[1];return 60*Number(e)+Number(t)}if(3==r.split(":").length){e=(r=r.split(":"))[0],t=60*r[1];var u=r[2];return 3600*Number(e)+Number(t)+Number(u)}return" "};


const extractData = async(q) =>

{
  
   if(typeof q == "string") q = q.replace(/\s+/g,"+"); else throw new Error("Invalid search query. Search query must be of type 'String'");
  
 let data = await getData(q);
  for(i=0;i<data.length;i++)
  
  
  {
     
     
     if (!data[i].videoRenderer) {
            continue;
      }

 var retrieve  = data[i].videoRenderer;
 if(retrieve.lengthText)

 {
    var duration = retrieve.lengthText.simpleText;
    }
 
 
 else
 {
         var duration = "00:00";       
 }

 
 
  if (retrieve.shortViewCountText) {
  var shortViews = retrieve.shortViewCountText.simpleText;
      
    }
    
    
 if (retrieve.viewCountText ) {
          var views =  retrieve.viewCountText.simpleText;
}

var id= retrieve.videoId;
var seconds = toSeconds(duration);
var title = retrieve.title.runs[0].text;
var thumb = retrieve.thumbnail.thumbnails[0].url[0];  
if(typeof views == "string") views= views.split(",").join("").split("view")[0]; else views = ""
if(typeof shortViews == "string") shortViews = shortViews.split("view")[0].trim();

 var thumb = 

{       "url": retrieve.thumbnail.thumbnails[0].url,
        "width" : retrieve.thumbnail.thumbnails[0].width,
        "height" : retrieve.thumbnail.thumbnails[0].height
}



  
var authr = retrieve.ownerText && retrieve.ownerText.runs[0]; 


let authorUrl = null;


 if (authr) { authorUrl = authr.navigationEndpoint.browseEndpoint.canonicalBaseUrl || authr.navigationEndpoint.commandMetadata.webCommandMetadata.url; } 
 
 var descrip = " ";
 if(retrieve.detailedMetadataSnippets && retrieve.detailedMetadataSnippets[0].snippetText)
 
 {
  for(t=0;t<retrieve.detailedMetadataSnippets[0].snippetText.runs.length;t++)
 {
          descrip += retrieve.detailedMetadataSnippets[0].snippetText.runs[t].text +" "
         
       
 }
 
 
 }
 
 
  
 var badges = Array.isArray(retrieve.badges) ? retrieve.badges.map(a => a.metadataBadgeRenderer.label) : []; 
 
  var isVerified = !!(retrieve.ownerBadges && JSON.stringify(retrieve.ownerBadges).includes('VERIFIED')); 
   var liveStream = badges.some(b => b === 'LIVE NOW');
 


var author = authr ? {
          "name" : authr.text ,
          "url" :    Url+authorUrl ,
          "verified" : isVerified
          
  } : null;


var watchUrl = WatchUrl + id;


if(retrieve.publishedTimeText && retrieve.publishedTimeText.simpleText) var publishTime = retrieve.publishedTimeText.simpleText; else var publishTime = "";


  
  extractedData.push({
    
    
    "type": "video",
  
  "title": title,
  
  "thumbnail": thumb,
  
  "liveStream" : liveStream,
   
  "description": descrip,
  
  "viewCount": views,
  
  "duration": duration, 
  
  "id": id ,
  
  "shortViewCount" : shortViews,
  
  "seconds" : seconds,
  
  "author" : author,
  
  "watchUrl" : watchUrl,
  
  "publishedAt" : publishTime
  
  
   })
    
     
    
  }
  
return extractedData
  
}


module.exports = extractData


  