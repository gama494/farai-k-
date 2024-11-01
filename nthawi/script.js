const musicData = [
    {
        title: "Mwakondera",
        poster: "atsogo.jpg", // Replace with your image path
        audio: "patsiku.mp3", // Replace with your audio file path
        video: "video1.mp4", // Direct video file path
        likes: 0,
        views: 0,
        comments: []
    },
    {
        title: "Sitidziwa",
        poster: "yo.jpg", // Replace with your image path
        audio: "sitidziwa.mp3", // Replace with your audio file path
        video: "video2.mp4", // Direct video file path
        likes: 0,
        views: 0,
        comments: []
    },
    {
        title: "Yesu Wane",
        poster: "m.jpg", // Replace with your image path
        audio: "yesu.mp3", // Replace with your audio file path
        video: "video3.mp4", // Direct video file path
        likes: 0,
        views: 0,
        comments: []
    }
];

const musicVideosContainer = document.getElementById('music-videos');

function loadMusicData() {
    const storedData = localStorage.getItem('musicData');
    return storedData ? JSON.parse(storedData) : musicData;
}

let musicDataStorage = loadMusicData();

function displayMusic(musicArray) {
    musicVideosContainer.innerHTML = '';
    musicArray.forEach((music, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <img src="${music.poster}" alt="${music.title} poster" class="video-poster" />
            <div class="card-content">
                <h3>${music.title}</h3>
                <div class="controls">
                    <button onclick="likeVideo(${index})">
                        ❤️ <span class="likeCount">${music.likes}</span>
                    </button>
                    <span class="viewCount">${music.views} views</span>
                </div>
                <audio controls onplay="incrementView(${index})">
                    <source src="${music.audio}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
                <video width="320" height="240" controls>
                    <source src="${music.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <a href="${music.audio}" class="downloadButton" download>Download</a>
                <div class="commentSection">
                    <input type="text" class="commentInput" placeholder="Add a comment..." />
                    <button class="commentButton" onclick="addComment(${index})">Submit</button>
                    <div class="commentList">${music.comments.map(comment => `<div>${comment}</div>`).join('')}</div>
                </div>
            </div>
        `;
        musicVideosContainer.appendChild(card);
    });
}

displayMusic(musicDataStorage);

function likeVideo(index) {
    const music = musicDataStorage[index];
    const button = event.target;

    if (!button.classList.contains('liked')) {
        music.likes += 1;
        button.classList.add('liked');
        alert(`You liked "${music.title}"!`);
        saveMusicData();
        displayMusic(musicDataStorage);
    }
}

function incrementView(index) {
    const music = musicDataStorage[index];
    // Increment views only if it hasn't been incremented before
    if (music.views === 0) {
        music.views += 1;
        const viewCountElement = document.querySelectorAll('.viewCount')[index];
        viewCountElement.textContent = music.views + ' views';
        saveMusicData();
    }
}

function addComment(index) {
    const music = musicDataStorage[index];
    const commentInput = document.querySelectorAll('.commentInput')[index];
    const commentText = commentInput.value.trim();

    if (commentText) {
        music.comments.push(commentText);
        commentInput.value = '';
        updateComments(index);
        saveMusicData();
    }
}

function updateComments(index) {
    const music = musicDataStorage[index];
    const commentList = document.querySelectorAll('.commentList')[index];
    commentList.innerHTML = music.comments.map(comment => `<div>${comment}</div>`).join('');
}

function searchMusic() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredMusic = musicDataStorage.filter(music => music.title.toLowerCase().includes(searchTerm));
    displayMusic(filteredMusic);
}

function saveMusicData() {
    localStorage.setItem('musicData', JSON.stringify(musicDataStorage));
}
