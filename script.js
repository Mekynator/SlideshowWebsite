const folders = {
    home: ['Registrations', 'News', 'Health_and_Safety'],
    registrations: 'Registrations',
    news: 'News',
    health: 'Health_and_Safety',
  };
  
  let currentFolder = 'home';
  let currentIndex = 0;
  let images = [];
  let isPaused = false;
  let interval;
  
  // Fetch images from the server
  function loadImages(folderName) {
    images = [];
    fetch(`/images-list?folder=${folderName}`)
      .then(response => {
        if (!response.ok) throw new Error(`Failed to load images from ${folderName}`);
        return response.json();
      })
      .then(files => {
        const validFiles = files.map(file => `image/${folderName}/${file}`);
        images.push(...validFiles);
        console.log(`Loaded images for ${folderName}:`, images);
        startSlideshow();
      })
      .catch(err => console.error(`Error loading images for ${folderName}:`, err));
  }
  
  // Update the current image in the slideshow
  function updateImage() {
    if (images.length > 0) {
      document.getElementById('slideshow-image').src = images[currentIndex];
      currentIndex = (currentIndex + 1) % images.length;
    }
  }
  
  // Start the slideshow
  function startSlideshow() {
    clearInterval(interval); // Clear any existing interval
    interval = setInterval(updateImage, 45000); // Change every 45 seconds
  }
  
  // Pause/Play toggle
  function togglePausePlay() {
    isPaused = !isPaused;
    const button = document.getElementById('pause-play-btn');
    if (isPaused) {
      clearInterval(interval);
      button.textContent = 'Play';
    } else {
      startSlideshow();
      button.textContent = 'Pause';
    }
  }
  
  // Populate menu items dynamically
  function populateMenu() {
    const menuItems = document.getElementById('menu-items');
    menuItems.innerHTML = ''; // Clear existing items
    Object.entries(folders).forEach(([key, folderName]) => {
      if (key === 'home') return; // Skip "home" as it has its own button
  
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize menu item name
      link.addEventListener('click', () => {
        currentFolder = folderName;
        loadImages(folderName);
        currentIndex = 0;
      });
  
      li.appendChild(link);
      menuItems.appendChild(li);
    });
  }
  
  // Toggle menu visibility
  document.getElementById('menu-btn').addEventListener('click', () => {
    const menu = document.getElementById('menu');
    menu.classList.toggle('hidden');
  });
  
  // Home button event listener
  document.getElementById('home-btn').addEventListener('click', () => {
    currentFolder = 'home';
    loadImages(folders[currentFolder]);
    currentIndex = 0;
  });
  
  // Pause/Play button event listener
  document.getElementById('pause-play-btn').addEventListener('click', togglePausePlay);
  
  // Initial setup
  populateMenu();
  loadImages(folders[currentFolder]);
  