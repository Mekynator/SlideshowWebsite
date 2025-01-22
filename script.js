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
  
  // Allowed image extensions
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  
  // Toggle menu visibility
  document.getElementById('menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
  });
  
  // Load images for a folder
  function loadImages(folderNames) {
    images = [];
    folderNames.forEach(folder => {
      fetch(`images/${folder}/`)
        .then(res => res.json()) // Replace this with logic to fetch the file list dynamically
        .then(files => {
          const validFiles = files.filter(file => {
            const extension = file.split('.').pop().toLowerCase();
            return allowedExtensions.includes(extension);
          });
          images.push(...validFiles.map(file => `images/${folder}/${file}`));
        })
        .catch(err => console.error(`Failed to load images from ${folder}:`, err));
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
  
  // Event Listeners for pages
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
  