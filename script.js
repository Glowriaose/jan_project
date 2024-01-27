const menuIcon = document.querySelector('.menu-icon');
const sidebar = document.querySelector('.sidebar');
const mainContainer = document.querySelector('.main-container');
const searchInput = document.querySelector('.search-bar .input');
const searchIcon = document.querySelector('.search-icon');

const playVideos = document.querySelector(
  '.video-player-left .video, .main-container .video-preview'
);

// toggle menuIcon

const miniSideBar = () => {
  sidebar.classList.toggle('mini-sidebar');
  mainContainer.classList.toggle('big-container');
};

menuIcon.addEventListener('click', miniSideBar);

// searchbar
const searchLink = 'https://www.youtube.com/results?search_query=';
const searchYoutube = () => {
  if (searchInput.value.length) {
    location.href = searchLink + searchInput.value;
  }
};
searchIcon.addEventListener('click', searchYoutube);

// displaying youtube videos

let apiKey = 'AIzaSyDZjyCjjWEfeCpJ6a6uRkZOIyNEtqSQIz4';
let videoHttps = 'https://www.googleapis.com/youtube/v3/videos';
let channelHttps = 'https://www.googleapis.com/youtube/v3/channels';

fetch(
  videoHttps +
    '?' +
    new URLSearchParams({
      key: apiKey,
      part: 'snippet',
      chart: 'mostPopular',
      maxResults: 50,
      regionCode: 'IN',
    })
)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data);
    data.items.forEach((item) => {
      getChannelIcon(item);
    });
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

const getChannelIcon = (videoData) => {
  fetch(
    channelHttps +
      '?' +
      new URLSearchParams({
        key: apiKey,
        part: 'snippet',
        id: videoData.snippet.channelId,
      })
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      videoData.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
      videoCard(videoData);
    });
};

const videoCard = (data) => {
  playVideos.innerHTML += `
          <div class="video-list">
           <a onclick="location.href ='https://youtube.com/watch?v=${data.id}'">
            <img class="thumbnail" src="${data.snippet.thumbnails.high.url}">
          </a>

          <div class="flex-container">
            <img src="${data.channelThumbnail}" />
            <div class="video-info">
              <h4
                >${data.snippet.title}
                </h4
              >
              <p>${data.snippet.channelTitle}</p>
            </div>
          </div>
        </div> `;
};
