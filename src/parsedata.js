const search = require("./search.js");

const WatchUrl = "https://www.youtube.com/watch?v=";
const Url = "https://www.youtube.com";

const toSeconds = (timeString) => {
  const timeArray = timeString.split(':').reverse();
  let seconds = 0;
  for (let i = 0; i < timeArray.length; i++) {
    seconds += parseInt(timeArray[i], 10) * Math.pow(60, i);
  }
  return isNaN(seconds) ? 0 : seconds;
};

const extractAuthor = (ownerText, ownerBadges) => {
  if (!ownerText) {
    return null;
  }

  const author = ownerText.runs[0];
  const authorUrl = author.navigationEndpoint.browseEndpoint.canonicalBaseUrl || author.navigationEndpoint.commandMetadata.webCommandMetadata.url;
  const isVerified = ownerBadges && JSON.stringify(ownerBadges).includes('VERIFIED');

  return {
    name: author.text,
    url: Url + authorUrl,
    verified: isVerified
  };
};

const extractData = async (query) => {
  if (typeof query !== "string" || query.trim() === "") {
    throw new Error("Invalid search query. Search query must be a non-empty string");
  }

  const searchData = await search(query);

  const videoData = searchData
    .filter(item => item.videoRenderer)
    .map(item => {
      const { videoRenderer } = item;
      const { videoId, title, runs, thumbnail, viewCountText, lengthText, ownerText, ownerBadges, publishedTimeText } = videoRenderer;
      const shortViewCount = shortNumber(parseInt(viewCountText?.simpleText?.replace(/[^0-9]/g, "")) || 0);
      const duration = lengthText?.simpleText || "00:00";
      const seconds = toSeconds(duration);
      const author = extractAuthor(ownerText, ownerBadges);
      const publishedAt = publishedTimeText?.simpleText || "";

      return {
        type: "video",
        id: videoId,
        title: title?.runs?.[0]?.text ?? "",
        thumbnail: {
          url: thumbnail?.thumbnails?.[0]?.url ?? "",
          width: thumbnail?.thumbnails?.[0]?.width ?? 0,
          height: thumbnail?.thumbnails?.[0]?.height ?? 0
        },
        viewCount: parseInt(viewCountText?.simpleText?.replace(/[^0-9]/g, "")) || 0,
        shortViewCount,
        duration,
        seconds,
        author,
        watchUrl: WatchUrl + videoId,
        publishedAt
      };
    });

  return videoData;
};

function shortNumber(num) {
  const suffixes = ["", "K", "M", "B", "T"];
  const magnitude = Math.floor(Math.log10(num) / 3);
  const scaled = num / Math.pow(10, magnitude * 3);
  const suffix = suffixes[magnitude];
  return scaled.toFixed(1) + suffix;
}

module.exports = extractData;
