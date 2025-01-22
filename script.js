let currentFolder = "home";
let currentIndex = 0;
let images = [];
let isPaused = false;
let interval;

// Fetch images from the server
function loadImages(folderName) {
    images = [];
    if (folderName === "home") {
      const folders = ["Registrations", "News", "Health_and_Safety"];
      folders.forEach(folder => {
        fetch(`/images-list?folder=${folder}`)
          .then(response => {
            if (!response.ok) throw new Error(`Failed to load images from ${folder}`);
            return response.json();
          })
          .then(files => {
            const validFiles = files.map(file => `image/${folder}/${file}`);
            console.log(`Generated paths for ${folder}:`, validFiles); // Debugging log
            images.push(...validFiles);
            if (folder === folders[folders.length - 1]) {
              startSlideshow();
            }
          })
          .catch(err => console.error(`Error loading images for ${folder}:`, err));
      });
    } else {
      fetch(`/images-list?folder=${folderName}`)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load images from ${folderName}`);
          return response.json();
        })
        .then(files => {
          images = files.map(file => `image/${folderName}/${file}`);
          console.log(`Generated paths for ${folderName}:`, images); // Debugging log
          startSlideshow();
        })
        .catch(err => console.error(`Error loading images for ${folderName}:`, err));
    }
}

// Update the current image in the slideshow
function updateImage() {
  if (images.length > 0) {
    document.getElementById("slideshow-image").src = images[currentIndex];
    currentIndex = (currentIndex + 1) % images.length;
  }
}

// Start the slideshow
function startSlideshow() {
  clearInterval(interval); // Clear any existing interval
  interval = setInterval(updateImage, 2000); // Change every 2 seconds
}

// Pause/Play toggle
function togglePausePlay() {
  isPaused = !isPaused;
  const button = document.getElementById("pause-play-btn");
  if (isPaused) {
    clearInterval(interval);
    button.textContent = "Play";
  } else {
    startSlideshow();
    button.textContent = "Pause";
  }
}

// Populate menu items dynamically
function populateMenu() {
  const menuItems = document.getElementById("menu-items");
  menuItems.innerHTML = ""; // Clear existing items
  const menuOptions = ["Registrations", "News", "Health_and_Safety"];
  menuOptions.forEach(folder => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = folder.replace(/_/g, " "); // Replace underscores with spaces
    link.addEventListener("click", () => {
      currentFolder = folder;
      loadImages(folder);
    });
    li.appendChild(link);
    menuItems.appendChild(li);
  });
}

// Home button event listener
document.getElementById("home-btn").addEventListener("click", () => {
  currentFolder = "home";
  loadImages(currentFolder);
});

// Pause/Play button event listener
document.getElementById("pause-play-btn").addEventListener("click", togglePausePlay);

// Initial setup
populateMenu();
loadImages(currentFolder);
