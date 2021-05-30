import { searchYouTube, LocalStorage } from './libs';

const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);

searchYouTube('메이커준').then(console.log);

LocalStorage.setKeyword('keyword01');
LocalStorage.setKeyword('keyword02');
console.log(LocalStorage.getKeywords());
LocalStorage.removeKeyword('keyword01');
console.log(LocalStorage.getKeywords());

LocalStorage.setVideo({ id: 'videoId01' });
LocalStorage.setVideo({ id: 'videoId02' });
console.log(LocalStorage.getVideos());
LocalStorage.removeVideo('videoId01');
console.log(LocalStorage.getVideos());
