enum EnumLocalStorageKey {
  KEYWORD = 'keyword',
  VIDEO = 'video',
}

enum EnumStorageLimit {
  KEYWORD = 3,
  VIDEO = 100,
}

type keyword = string;

type video = {
  id: string;
};

const LOCAL_STORAGE_ERROR = new Error('Local storage error occured');

const filterByString =
  (string: string) =>
  (target: string): boolean =>
    target !== string;

const getItem = (key: EnumLocalStorageKey): any => {
  let result;
  try {
    result = JSON.parse(localStorage.getItem(key));
  } catch {
    console.log(LOCAL_STORAGE_ERROR.message);
  }
  return result;
};

const setItem = (key: EnumLocalStorageKey, item: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(item));
  } catch {
    console.log(LOCAL_STORAGE_ERROR.message);
  }
};

const LocalStorage = {
  getKeywords(): Array<keyword> {
    return getItem(EnumLocalStorageKey.KEYWORD) ?? [];
  },

  setKeyword(keyword: keyword): void {
    const keywords = this.getKeywords();
    setItem(EnumLocalStorageKey.KEYWORD, [
      keyword,
      ...keywords
        .filter(filterByString(keyword))
        .slice(0, EnumStorageLimit.KEYWORD - 1),
    ]);
  },

  removeKeyword(keyword: keyword): void {
    setItem(
      EnumLocalStorageKey.KEYWORD,
      this.getKeywords().filter(filterByString(keyword)),
    );
  },

  getVideos(): Array<video> {
    return getItem(EnumLocalStorageKey.VIDEO) ?? [];
  },

  setVideo(video: video): void {
    const videos = this.getVideos();
    setItem(EnumLocalStorageKey.VIDEO, [
      video,
      ...videos
        .filter(({ id }) => filterByString(video.id)(id))
        .slice(0, EnumStorageLimit.VIDEO - 1),
    ]);
  },

  removeVideo(videoId: string): void {
    setItem(
      EnumLocalStorageKey.VIDEO,
      this.getVideos().filter(({ id }) => filterByString(videoId)(id)),
    );
  },
};

export default LocalStorage;
