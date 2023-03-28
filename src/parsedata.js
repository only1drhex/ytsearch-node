const search = require("./search.js");
const shortNumber = require('short-number');

const WatchUrl = "https://www.youtube.com/watch?v="
const Url = "https://www.youtube.com"

const toSeconds = (timeString) => {
  const [hours, minutes, seconds] = timeString.split(":");
  return parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
};

const extractData = async (query) => {
  if (typeof query !== "string" || query.trim() === "") {
    throw new Error("Invalid search query. Search query must be a non-empty string");
  }

  const searchData = await search(query);

  const videoData = searchData.filter(item => item.videoRenderer).map(item => {
    const videoRenderer = item.videoRenderer;
    const id = videoRenderer.videoId;
    const title = videoRenderer.title.runs[0].text;
    const thumbnail = {
      url: videoRenderer.thumbnail.thumbnails[0].url,
      width: videoRenderer.thumbnail.thumbnails[0].width,
      height: videoRenderer.thumbnail.thumbnails[0].height
    };
    const viewCount = parseInt((videoRenderer.viewCountText || {}).simpleText?.replace(/[^0-9]/g, "")) || 0;
    const shortViewCount = shortNumber(viewCount);
    const duration = videoRenderer.lengthText?.simpleText || "00:00";
    const seconds = toSeconds(duration);
    const author = videoRenderer.ownerText?.runs[0];
    const authorUrl = author?.navigationEndpoint.browseEndpoint.canonicalBaseUrl || author?.navigationEndpoint.commandMetadata.webCommandMetadata.url;
    const isVerified = !!(videoRenderer.ownerBadges?.some(badge => badge.metadataBadgeRenderer.label === 'VERIFIED'));
    const liveStream = videoRenderer.badges?.some(badge => badge.metadataBadgeRenderer.label === 'LIVE NOW');
    const description = (videoRenderer.descriptionSnippet || {}).runs?.map(run => run.text).join(" ") || "";
    const publishedAt = videoRenderer.publishedTimeText?.simpleText || "";

    const watchUrl = WatchUrl + id;

    return {
      type: "video",
      id,
      title,
      thumbnail,
      viewCount,
      shortViewCount,
      duration,
      seconds,
      author: author ? {
        name: author.text,
        url: Url + authorUrl,
        verified: isVerified
      } : null,
      liveStream,
      description,
      watchUrl,
      publishedAt
    };
  });

  return videoData;
};

module.exports = extractData;
