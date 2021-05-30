const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/search`;
const API_KEY = process.env.API_KEY;

let prevKeyword = '';
let pageToken = '';

const searchYouTube = async (keyword: string): Promise<Array<any>> => {
  let result = [];
  try {
    if (prevKeyword !== keyword) [prevKeyword, pageToken] = [keyword, ''];
    const res = await fetch(
      `${YOUTUBE_API}?key=${API_KEY}&q=${encodeURI(
        keyword,
      )}&pageToken=${pageToken}&part=snippet&order=viewCount&maxResults=10`,
    );
    const { error, nextPageToken, items } = await res.json();
    if (!res.ok) throw await error;

    pageToken = nextPageToken;
    result = items;
  } catch ({ message }) {
    console.log(message);
  }
  return result;
};

export default searchYouTube;
