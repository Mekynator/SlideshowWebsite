const folders = {
    home: ['Registrations', 'News', 'Health_and_Safety'],
    registrations: ['Registrations'],
    news: ['News'],
    health: ['Health_and_Safety']
  };
  
  let currentFolder = 'home';
  let currentIndex = 0;
  let images = [];
  let isPaused = false;
  let interval;
  
  // Load images for a folder
  function loadImages(folderNames) {
    images = [];
    folderNames.forEach(folder => {
      fetch(`images/${folder}/`).then(res => {
        // Assuming server supports directory browsing
        res.json().then(files => {
          images.push(...files.map(file => `images/${folder}/${file}`));
        });
      });
    });
  }
  
  // Update image
  function updateImage() {
    if (images.length > 0) {
      document.getElementById('slideshow-image').src = images[currentIndex];
      currentIndex = (currentIndex + 1) % images.length;
    }
  }
  
  // Start slideshow
  function startSlideshow() {
    interval = setInterval(updateImage, 2000);
  }
  
  // Pause/Play toggle
  function togglePausePlay() {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(interval);
      document.getElementById('pause-play-btn').textContent = 'Play';
    } else {
      startSlideshow();
      document.getElementById('pause-play-btn').textContent = 'Pause';
    }
  }
  
  // Event Listeners
  document.getElementById('home-btn').addEventListener('click', () => {
    currentFolder = 'home';
    loadImages(folders[currentFolder]);
    currentIndex = 0;
  });
  
  document.getElementById('registrations-link').addEventListener('click', () => {
    currentFolder = 'registrations';
    loadImages(folders[currentFolder]);
    currentIndex = 0;
  });
  
  document.getElementById('news-link').addEventListener('click', () => {
    currentFolder = 'news';
    loadImages(folders[currentFolder]);
    currentIndex = 0;
  });
  
  document.getElementById('health-link').addEventListener('click', () => {
    currentFolder = 'health';
    loadImages(folders[currentFolder]);
    currentIndex = 0;
  });
  
  document.getElementById('pause-play-btn').addEventListener('click', togglePausePlay);
  
  // Initial setup
  loadImages(folders[currentFolder]);
  startSlideshow();
  