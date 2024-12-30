let currentIndex =
  localStorage.getItem("currentIndex") ||
  document.currentScript.getAttribute("currentIndex");
currentIndex = parseInt(currentIndex);

const images = [
  "bg-1.gif", "bg-2.gif", "bg-3.gif", "cbg-1.gif", "cbg-2.gif", "cbg-3.gif",
  "cbg-4.gif", "cbg-5.gif", "cbg-6.gif", "cbg-7.gif", "cbg-8.gif", "cbg-9.gif",
  "cbg-10.gif", "cbg-11.gif", "cbg-12.gif", "cbg-13.gif"
];

const colorSets = [
  {
    "--text-color": "#a7c4e0",
    "--hover-color": "#b8e2d2",
    "--accent-color": "#88b3d8",
    "--accent-color-2": "#d8a7e3",
    "--background-color": "#f5f7fa",
  },
  {
    "--text-color": "#f0d9c9",
    "--hover-color": "#f5c6b3",
    "--accent-color": "#d3a397",
    "--accent-color-2": "#f3a282",
    "--background-color": "#fef6ef",
  },
  {
    "--text-color": "#c8e6e6",
    "--hover-color": "#98dfdf",
    "--accent-color": "#78d1d1",
    "--accent-color-2": "#a3e1e1",
    "--background-color": "#effafa",
  },
  {
    "--text-color": "#ffe5d9",
    "--hover-color": "#ffccd5",
    "--accent-color": "#ffb3c1",
    "--accent-color-2": "#ff99aa",
    "--background-color": "#fff0f3",
  },
  {
    "--text-color": "#edf6f9",
    "--hover-color": "#cce3de",
    "--accent-color": "#a4c3b2",
    "--accent-color-2": "#6b9080",
    "--background-color": "#f6fff8",
  },
  {
    "--text-color": "#e0bad7",
    "--hover-color": "#ffafcc",
    "--accent-color": "#ffc8dd",
    "--accent-color-2": "#ff99c8",
    "--background-color": "#f9deff",
  },
  {
    "--text-color": "#d8e2dc",
    "--hover-color": "#ffe5d9",
    "--accent-color": "#ffcad4",
    "--accent-color-2": "#f4acb7",
    "--background-color": "#ffeef0",
  },
  {
    "--text-color": "#c5dedd",
    "--hover-color": "#d5e8e1",
    "--accent-color": "#9fb8b9",
    "--accent-color-2": "#f6bd60",
    "--background-color": "#eaf4f4",
  },
  {
    "--text-color": "#ece4db",
    "--hover-color": "#cdc2ae",
    "--accent-color": "#a49a88",
    "--accent-color-2": "#f4a261",
    "--background-color": "#f7ebe8",
  },
  {
    "--text-color": "#f4e1d2",
    "--hover-color": "#f5c2b1",
    "--accent-color": "#e27d60",
    "--accent-color-2": "#c04c4c",
    "--background-color": "#fff2e6",
  },
  {
    "--text-color": "#ffede9",
    "--hover-color": "#ffc1b6",
    "--accent-color": "#ff8b94",
    "--accent-color-2": "#ff6f61",
    "--background-color": "#fff5f0",
  },
  {
    "--text-color": "#dee2ff",
    "--hover-color": "#c1d1ff",
    "--accent-color": "#aab8ff",
    "--accent-color-2": "#8497ff",
    "--background-color": "#eef1ff",
  },
{
  "--text-color": "#d4bfff",   // Soft lavender with a hint of brightness
  "--hover-color": "#cba6f7",  // Vibrant orchid purple for hover effects
  "--accent-color": "#a990f8", // Balanced violet for primary accents
  "--accent-color-2": "#b4befe", // Muted blue-purple for secondary accents
  "--background-color": "#232136", // Deep purple-gray background for richness
},

  
];

function preloadImages() {
  for (let i = 0; i < images.length; i++) {
    const img = new Image();
    img.src = "/home/sanu/.config/startpage/images/" + images[i];
  }
}

function nextImage() {
  currentIndex = (currentIndex + 1) % images.length;
  localStorage.setItem("currentIndex", currentIndex);
  const imageElement = document.getElementById("carouselImage");
  imageElement.style.opacity = 0;
  updateColors(currentIndex);

  setTimeout(() => {
    imageElement.src = "/home/sanu/.config/startpage/images/" + images[currentIndex];
    imageElement.style.opacity = 1;
  }, 200);
}

function updateColors() {
  const colorSet = colorSets[currentIndex];
  for (const [property, value] of Object.entries(colorSet)) {
    document.documentElement.style.setProperty(property, value);
  }
}

// Set colors with current index first
updateColors(currentIndex);

// Set the initial image
document.getElementById("carouselImage").src =
  "/home/sanu/.config/startpage/images/" + images[currentIndex];

// Image is opacity 0 and text is translated off screen by default
// Add the loaded class to the image and text to animate them in
window.onload = function () {
  document.getElementById("image").classList.add("loaded");
  document.getElementById("text").classList.add("loaded");
  document.getElementsByTagName("html")[0].classList.add("loaded");
  preloadImages();
};

const searchInput = document.getElementById("searchInput");
const dynamicSuggestions = document.getElementById("dynamicSuggestions");

// Mock popular queries (or fetch from an API)
const popularQueries = [
  "How to learn JavaScript",
  "What is Catppuccin theme?",
  "Hyprland configuration",
  "Best coding practices",
  "comick.io",
  "How to set up Arch Linux",
];

// Handle input events
searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();
  dynamicSuggestions.innerHTML = ""; // Clear previous suggestions

  if (query) {
    const filteredSuggestions = popularQueries.filter(item =>
      item.toLowerCase().includes(query)
    );

    filteredSuggestions.forEach(suggestion => {
      const li = document.createElement("li");
      li.textContent = suggestion;
      li.addEventListener("click", function () {
        searchInput.value = suggestion;
        dynamicSuggestions.innerHTML = ""; // Clear suggestions on selection
      });
      dynamicSuggestions.appendChild(li);
    });
  }
});

// Close suggestions when clicking outside
document.addEventListener("click", function (e) {
  if (!dynamicSuggestions.contains(e.target) && e.target !== searchInput) {
    dynamicSuggestions.innerHTML = "";
  }
});

