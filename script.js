document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth < 1300) {
    document.getElementById("desktop").style.display = "none";

    const mobile = document.createElement("div");
    mobile.classList.add("start-50", "top-50", "trasform50", "position-fixed");
    mobile.innerHTML = `<div class="d-block text-center">
      <p>Sorry, This site is only available on Desktop.</p>
    </div>`;
    document.body.appendChild(mobile);
  } else {
    mobile.remove();
    document.getElementById("desktop").style.display = "block";
  }
});

// Tab Functionality
document.addEventListener("DOMContentLoaded", function () {
  var tabLinks = document.querySelectorAll(".nav-link");
  tabLinks.forEach(function (tabLink) {
    tabLink.addEventListener("click", function (event) {
      event.preventDefault();
      tabLinks.forEach(function (link) {
        link.classList.remove("active");
      });
      this.classList.add("active");
      var targetTabId = this.getAttribute("href").substring(1);
      hideAllTabContent();
      document.getElementById(targetTabId).classList.add("show", "active");
    });
  });
  function hideAllTabContent() {
    var tabContents = document.querySelectorAll(".tab-pane");
    tabContents.forEach(function (tabContent) {
      tabContent.classList.remove("show", "active");
    });
  }
});

const loading = document.getElementById("loading");
const main = document.getElementById("main");
main.style.display = "none";

setTimeout(() => {
  loading.style.display = "none";
  main.style.display = "block";
}, 1500);

// Get the navigation bar element
const navbar = document.getElementById("navBar");

// Function to toggle navbar visibility based on scroll position
function toggleNavbarVisibility() {
  if (window.scrollY > 450) {
    navbar.style.top = "3%"; // Show navbar
  } else {
    navbar.style.top = "-10%"; // Hide navbar
  }
}

// Add scroll event listener to window
window.addEventListener("scroll", toggleNavbarVisibility);

// JS for Choosen Color
document
  .getElementById("hue-slider")
  .addEventListener("input", updateColorShades);

// Update color shades based on the selected hue
function updateColorShades() {
  updateSelectedHueIndicator(document.getElementById("hue-slider").value);

  const selectedColor = calculateColor(
    document.getElementById("hue-slider").value
  );
  updateSelectedColor(selectedColor);

  generateColorShades(document.getElementById("hue-slider").value);
}

// Calculate color based on hue value
function calculateColor(hue) {
  const hueDegrees = hue * 3.6;
  const rgb = hslToRgb(hueDegrees, 100, 50);
  const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
  return hex;
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// Convert RGB to Hex
function rgbToHex(r, g, b) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// Generate color shades and display them
function generateColorShades(hue) {
  document.getElementById("color-shades").innerHTML = "";

  const numShades = 100;

  for (let i = 0; i < numShades; i++) {
    const lightness = (i + 1) * 1;
    const shadeColor = calculateColorShade(hue, lightness);

    const shadeDiv = document.createElement("div");
    shadeDiv.className = "shadeColor";
    shadeDiv.style.backgroundColor = shadeColor;
    shadeDiv.addEventListener("click", () => {
      addToColorPanel(shadeColor);
    });

    document.getElementById("color-shades").appendChild(shadeDiv);
  }
}

// Update selected hue indicator position
function updateSelectedHueIndicator(hue) {
  const indicatorPosition =
    (hue / 1000) * document.getElementById("hue-slider").clientWidth;
  document.getElementById("selected-hue").style.left = `${indicatorPosition}px`;
}

// Update selected color preview and code
function updateSelectedColor(hexColor) {
  document.getElementById("selected-color-preview").style.backgroundColor =
    hexColor;
  document.documentElement.style.setProperty("--slider-thumb-color", hexColor);
  document.getElementById("selected-color-code").value = hexColor.toUpperCase();
}

// Add selected shade color to the color panel
function addToColorPanel(shadeColor) {
  document.getElementById("color").style.backgroundColor = shadeColor;
  document.getElementById("hexCode").value = shadeColor.toUpperCase();

  const hexCodeCopyBtn = document.getElementById("hexCodeCopy");
  hexCodeCopyBtn.addEventListener("click", () => {
    document.getElementById("hexCode").select();
    document.execCommand("copy");
    document.getElementById("hexCode").setSelectionRange(0, 0);

    popupMessage(shadeColor + " Clipboard !!");
  });
}

function makeStyleChoosen() {
  const styleChoosenName = document.getElementById(
    "makeStyleChoosenName"
  ).value;
  if (styleChoosenName !== "") {
    popupMessage("");
    document.getElementById("makeStyleChoosenName").value = "";
  } else {
    popupMessage("");
  }
}

function addToCanvas() {
  popupMessage("");
}

// Calculate color shade based on hue and lightness
function calculateColorShade(hue, lightness) {
  const hueDegrees = hue * 3.6;
  const rgb = hslToRgb(hueDegrees, 100, lightness);
  const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
  return hex;
}

// JS for Using Hex
document
  .getElementById("selected-color-code2")
  .addEventListener("click", () => {
    document.getElementById("selected-color-code2").select();
  });

document
  .getElementById("selected-color-code2")
  .addEventListener("input", (e) => {
    const hexColor = e.target.value;
    if (validateHexColor(hexColor)) {
      updateSelectedColor2(hexColor);
      generateColorShades2(hexColor);
    }
  });

function validateHexColor(hex) {
  if (hex.charAt(0) !== "#") {
    hex = "#" + hex;
  }
  return /^#[0-9A-F]{6}$/i.test(hex);
}

function updateSelectedColor2(hexColor) {
  document.getElementById("selected-color-preview2").style.backgroundColor =
    hexColor;
  document.documentElement.style.setProperty("--slider-thumb-color", hexColor);
  document.getElementById("selected-color-code2").value =
    hexColor.toUpperCase();
}

function generateColorShades2(hex) {
  document.getElementById("color-shades2").innerHTML = "";

  const numShades = 100;

  for (let i = 0; i < numShades; i++) {
    const lightness = (i + 1) * 1;
    const shadeColor = calculateColorShade2(hex, lightness);

    const shadeDiv = document.createElement("div");
    shadeDiv.className = "shadeColor";
    shadeDiv.style.backgroundColor = shadeColor;
    shadeDiv.addEventListener("click", () => {
      addToColorPanel2(shadeColor);
    });

    document.getElementById("color-shades2").appendChild(shadeDiv);
  }
}

function calculateColorShade2(hex, lightness) {
  const rgb = hexToRgb2(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  hsl[2] = lightness / 100;
  const newRgb = hslToRgb2(hsl[0], hsl[1], hsl[2]);
  return rgbToHex2(newRgb[0], newRgb[1], newRgb[2]);
}

function hexToRgb2(hex) {
  // Remove the hash character if present
  hex = hex.replace(/^#/, "");

  // Parse the hex values
  const bigint = parseInt(hex, 16);

  // Extract RGB values
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return an RGB object
  return { r, g, b };
}

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function hslToRgb2(h, s, l) {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function rgbToHex2(r, g, b) {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function addToColorPanel2(shadeColor) {
  document.getElementById("color2").style.backgroundColor = shadeColor;
  document.getElementById("hexCode2").value = shadeColor.toUpperCase();
  document.getElementById("hexCodeCopy2").addEventListener("click", () => {
    document.getElementById("hexCode2").select();
    document.execCommand("copy");
    document.getElementById("hexCode2").setSelectionRange(0, 0);

    popupMessage(shadeColor + " Clipboard !!");
  });
}

function makeStyleChoosen2() {
  const styleChoosenName = document.getElementById(
    "makeStyleChoosenName2"
  ).value;
  if (styleChoosenName !== "") {
    popupMessage("");

    document.getElementById("makeStyleChoosenName2").value = "";
  } else {
    popupMessage("");
  }
}

function addToCanvas2() {
  popupMessage("");
}

function refresh() {
  document.getElementById("selected-color-code2").value = "#000000";
  updateSelectedColor2("#000000");
  generateColorShades2("#000000");
}

window.addEventListener("load", () => generateColorShades2("#000000"));

// Separate arrays for different color attributes
const colorData = [];

function fetchColorsFromAPI() {
  fetch("https://kartic.vercel.app/api/colorShaderColors")
    .then((response) => response.json())
    .then((data) => {
      processData(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function processData(data) {
  colorData.push(...data);
  showAllColors(); // Initially, display all colors
}

const gallery = document.getElementById("gallery");
const searchInput = document.getElementById("search");
const searchBySelect = document.getElementById("searchBy");

window.addEventListener("load", () => {
  fetchColorsFromAPI();
});

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const searchBy = searchBySelect.value;
  if (searchTerm === "") {
    showAllColors(); // If search term is empty, show all colors
  } else {
    showSearchResults(searchTerm, searchBy);
  }
});

function showAllColors() {
  clearGallery();
  const randomizedColorData = shuffle(colorData.slice());
  randomizedColorData.forEach((color) => {
    createPart(
      color.sectionName,
      color.contributorName,
      color.contributorURL,
      color.colorNames,
      color.hexCodes
    );
  });
}

function showSearchResults(searchTerm, searchBy) {
  clearGallery();
  const filteredColors = colorData.filter((color) => {
    if (searchBy === "color") {
      return (
        color.colorNames.some((name) =>
          name.toLowerCase().includes(searchTerm)
        ) ||
        color.hexCodes.some((hex) => hex.toLowerCase().includes(searchTerm))
      );
    } else {
      let searchIn = [];
      switch (searchBy) {
        case "section":
          searchIn.push(color.sectionName.toLowerCase());
          break;
        case "author":
          color.contributorName.forEach((author) => {
            searchIn.push(author.toLowerCase());
          });
          break;
        default:
          searchIn.push(color.sectionName.toLowerCase());
      }
      return searchIn.some((item) => item.includes(searchTerm));
    }
  });
  if (filteredColors.length > 0) {
    const searchSection = document.createElement("div");
    searchSection.classList.add("search-section");
    searchSection.innerHTML = `<h6 class="px-3 py-3 border-bottom mb-0">Search results for '${searchTerm}'</h6>`;
    gallery.appendChild(searchSection);

    if (searchBy === "color") {
      // Combine all matching color names and hex codes into one single part
      let combinedColorNames = [];
      let combinedHexCodes = [];
      filteredColors.forEach((color) => {
        color.colorNames.forEach((name, index) => {
          if (name.toLowerCase().includes(searchTerm)) {
            combinedColorNames.push(name);
            combinedHexCodes.push(color.hexCodes[index]);
          }
        });
        color.hexCodes.forEach((hex, index) => {
          if (
            hex.toLowerCase().includes(searchTerm) &&
            !combinedHexCodes.includes(hex)
          ) {
            combinedHexCodes.push(hex);
            combinedColorNames.push(color.colorNames[index]);
          }
        });
      });
      createPart("", [""], [""], combinedColorNames, combinedHexCodes);
    } else {
      // Show each part individually
      filteredColors.forEach((color) => {
        createPart(
          color.sectionName,
          color.contributorName,
          color.contributorURL,
          color.colorNames,
          color.hexCodes
        );
      });
    }
  } else {
    gallery.innerHTML =
      "<div class='w-100 h-100 d-flex align-items-center justify-content-center'><div class='d-block w-70 text-center'><h5 class='mb-0'><b>Sorry</b>, Color not exist.</h5><p class='fw-light mb-4'><br>If you know about that color, Please contribute here.</p><a href='https://forms.gle/nPU7bGPARGy4nsxa9' class='btn btn-primary w-33 px-3 py-2 rounded-pill m-auto border'>Contribute</a></div></div>";
  }
}

function clearGallery() {
  gallery.innerHTML = "";
}

function createPart(
  sectionName,
  contributorNames,
  contributorURLs,
  colorNames,
  hexCodes
) {
  const divPart = document.createElement("div");
  divPart.classList.add("part", "m-0", "p-0");

  if (sectionName !== "") {
    const headingDiv = document.createElement("nav");
    headingDiv.classList.add("navbar", "bg-transparent", "px-3", "py-2");

    const heading = document.createElement("h6");
    heading.classList.add("navbar-brand", "fs-6", "cs-text", "fw-bold", "mb-0");
    heading.textContent = sectionName;
    headingDiv.appendChild(heading);

    if (contributorNames && contributorNames[0] != "") {
      const author = document.createElement("span");
      author.classList.add("navbar-text", "fs-7", "cs-text", "m-0", "p-0");
      author.innerHTML = "By ";

      for (let i = 0; i < contributorNames.length; i++) {
        author.innerHTML += `<a href="${contributorURLs[i]}" target="_blank">${contributorNames[i]}</a>`;
        if (i < contributorNames.length - 1) {
          author.innerHTML += ", ";
        }
      }
      headingDiv.appendChild(author);
    }

    divPart.appendChild(headingDiv);
  }

  const divColors = document.createElement("div");
  divColors.classList.add("colors", "border-top", "border-bottom");
  if (hexCodes.length > 4) {
    divColors.style.height = "168px";
  } else {
    divColors.style.height = "160px";
  }

  for (let i = 0; i < hexCodes.length; i++) {
    const divColor = document.createElement("div");
    divColor.classList.add("color");
    divColor.style.backgroundColor = hexCodes[i];

    const divDetails = document.createElement("div");
    divDetails.classList.add("details");

    const input1 = document.createElement("input");
    input1.classList.add("form-control", "rounded-0", "border-0", "border-top");
    input1.value = colorNames[i];
    input1.readOnly = true;

    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group", "border-top");

    const input2 = document.createElement("input");
    input2.classList.add("form-control", "rounded-0", "border-0");
    input2.value = hexCodes[i].toUpperCase();
    input2.readOnly = true;

    const button = document.createElement("button");
    button.classList.add("btn", "CreateShade", "rounded-0", "border-0", "px-2");
    button.innerHTML = `<img src="https://01kartic.github.io/Assets/Images/ColorShader.png" alt="ColorShader" height="20" class="px-0">`;
    button.title = "Create Shades of this color";
    button.addEventListener("click", () => {
      document.getElementById("galleryToHex").click();
      document.getElementById("selected-color-code2").value = hexCodes[i];
      updateSelectedColor2(hexCodes[i]);
      generateColorShades2(hexCodes[i]);

      popupMessage("Shades of " + colorNames[i] + " is generated !!");
    });

    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("btn-group", "w-100");
    buttonGroup.setAttribute("role", "group");

    const button1 = document.createElement("button");
    button1.classList.add(
      "btn",
      "btn-primary",
      "px-2",
      "py-1",
      "rounded-0",
      "border-0"
    );
    button1.title = "Add to canvas";
    button1.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org/2000/svg"><path d="M12 5V12M12 19V12M12 12H19M12 12H5" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`;
    button1.addEventListener("click", () => {
      popupMessage("");
    });

    const button2 = document.createElement("button");
    button2.classList.add(
      "btn",
      "btn-primary",
      "px-2",
      "py-1",
      "rounded-0",
      "border-0",
      "border-start"
    );
    button2.title = "Create Style";
    button2.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org/2000/svg"><path d="M12.6 4.27017L18.3942 7.61547C18.7655 7.82983 18.9942 8.22598 18.9942 8.6547V15.3453C18.9942 15.774 18.7655 16.1702 18.3942 16.3845L12.6 19.7298C12.2287 19.9442 11.7713 19.9442 11.4 19.7298L5.60577 16.3845C5.23449 16.1702 5.00577 15.774 5.00577 15.3453V8.6547C5.00577 8.22598 5.23449 7.82983 5.60577 7.61547L11.4 4.27017C11.7713 4.05581 12.2287 4.05581 12.6 4.27017Z" stroke="white" stroke-width="1.6"/><circle cx="12" cy="12" r="2" fill="white"/></svg>`;
    button2.addEventListener("click", () => {
      popupMessage("");
    });

    const button3 = document.createElement("button");
    button3.classList.add(
      "btn",
      "btn-primary",
      "px-2",
      "py-1",
      "rounded-0",
      "border-0",
      "border-start"
    );
    button3.title = "Copy Hex Code";
    button3.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org/2000/svg"><rect x="9.00005" y="4.40001" width="8.6" height="12.6" rx="1.3" stroke="white" stroke-width="1.4"/><path d="M6.30005 7.70001V9.4143V12.8429V17.7C6.30005 18.8046 7.19548 19.7 8.30005 19.7H11.1H14.3" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>`;
    button3.addEventListener("click", () => {
      input2.select();
      document.execCommand("copy");
      input2.setSelectionRange(0, 0);

      popupMessage(hexCodes[i] + " Clipboard !!");
    });

    buttonGroup.appendChild(button1);
    buttonGroup.appendChild(button2);
    buttonGroup.appendChild(button3);

    inputGroup.appendChild(input2);
    inputGroup.appendChild(button);

    divDetails.appendChild(input1);
    divDetails.appendChild(inputGroup);
    divDetails.appendChild(buttonGroup);

    divColor.appendChild(divDetails);

    divColors.appendChild(divColor);
  }

  divPart.appendChild(divColors);

  gallery.appendChild(divPart);
}

document.getElementById("search").addEventListener("input", (e) => {
  if (searchInput.value.trim() !== "") {
    document.getElementById("clearSearch").classList.remove("d-none");
    document.getElementById("clearSearch").classList.add("d-block");
  } else {
    document.getElementById("clearSearch").classList.remove("d-block");
    document.getElementById("clearSearch").classList.add("d-none");
  }

  document.getElementById("clearSearch").addEventListener("click", () => {
    searchInput.value = "";
    showAllColors();
    document.getElementById("clearSearch").classList.remove("d-block");
    document.getElementById("clearSearch").classList.add("d-none");
  });
});

// JS for Color Palettes
const palettesData = [];

function fetchPalettesFromAPI() {
  fetch("https://kartic.vercel.app/api/colorShaderPalettes")
    .then((response) => response.json())
    .then((data) => {
      processPalettesData(data);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

function processPalettesData(data) {
  palettesData.push(...data);
  showAllPalettes();
}

const palettes = document.getElementById("palettes");

window.addEventListener("load", () => {
  fetchPalettesFromAPI();
});

function showAllPalettes() {
  palettes.innerHTML = "";
  // Randomize the order of palettes
  const randomizedPalettes = shuffle(palettesData.slice());
  randomizedPalettes.forEach((palette, index) => {
    createPalette(palette.colorPalette, index);
  });
}

function createPalette(colorPalette, index) {
  const divPalette = document.createElement("div");
  divPalette.classList.add("palettesPart", "float-start");

  for (let i = 0; i < colorPalette.length; i++) {
    const divColor = document.createElement("div");
    divColor.classList.add("h-100", width(colorPalette.length), "float-start");
    divColor.style.backgroundColor = colorPalette[i];
    divPalette.appendChild(divColor);
  }

  const divDetails = document.createElement("div");
  divDetails.classList.add("w-100", "palettesDetails");

  const divInputGroup = document.createElement("div");
  divInputGroup.classList.add("input-group", "rounded-0");

  for (let i = 0; i < colorPalette.length; i++) {
    const input = document.createElement("input");
    input.classList.add(
      "form-control",
      "border-0",
      "fw-light",
      "text-center",
      "px-0"
    );
    input.value = colorPalette[i].toUpperCase();
    input.readOnly = true;
    divInputGroup.appendChild(input);
  }

  const btnGroup = document.createElement("div");
  btnGroup.classList.add("btn-group", "w-100");
  btnGroup.setAttribute("role", "group");

  const btnAdd = document.createElement("button");
  btnAdd.classList.add("btn", "btn-primary", "btn-sm", "rounded-0");
  btnAdd.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://w3.org/2000/svg"><path d="M12 5V12M12 19V12M12 12H19M12 12H5" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>`;
  btnAdd.addEventListener("click", () => {
    popupMessage("");
  });

  const btnStyle = document.createElement("button");
  btnStyle.classList.add("btn", "btn-primary", "btn-sm", "rounded-0");
  btnStyle.textContent = "Create Styles";
  btnStyle.addEventListener("click", () => {
    popupMessage("");
  });

  const offcanvas = document.createElement("div");
  offcanvas.classList.add(
    "offcanvas",
    "offcanvas-end",
    "w-50",
    "figma-bg",
    "cs-text"
  );
  offcanvas.id = "offcanvasRight" + index;
  offcanvas.setAttribute("aria-labelledby", "offcanvasRightLabel");
  offcanvas.setAttribute("tabindex", "-1");
  offcanvas.setAttribute("data-bs-backdrop", "static");

  const offcanvasBody = document.createElement("div");
  offcanvasBody.classList.add("offcanvas-body", "p-0");

  const offcanvasTitle = document.createElement("h6");
  offcanvasTitle.classList.add("fw-bold", "p-3", "mb-0", "border-bottom");
  offcanvasTitle.textContent = "Name Your Styles";

  for (let i = 0; i < colorPalette.length; i++) {
    const offcanvasInput = document.createElement("input");
    offcanvasInput.classList.add(
      "form-control",
      "px-3",
      "py-3",
      "mb-0",
      "rounded-0",
      "border-0",
      "border-bottom"
    );
    offcanvasInput.placeholder = "Style Name for Color " + (i + 1);
    offcanvasBody.appendChild(offcanvasInput);
  }

  const offcanvasFooter = document.createElement("div");
  offcanvasFooter.classList.add("offcanvas-footer");

  const offcanvasButtonGroup = document.createElement("div");
  offcanvasButtonGroup.classList.add("btn-group", "w-100", "border-top");
  offcanvasButtonGroup.setAttribute("role", "group");

  const offcanvasButton1 = document.createElement("button");
  offcanvasButton1.classList.add("btn", "btn-none", "btn-lg", "rounded-0");
  offcanvasButton1.textContent = "Cancel";
  offcanvasButton1.setAttribute("data-bs-dismiss", "offcanvas");

  const offcanvasButton2 = document.createElement("button");
  offcanvasButton2.classList.add("btn", "btn-primary", "btn-lg", "rounded-0");
  offcanvasButton2.textContent = "Create Styles";
  offcanvasButton2.addEventListener("click", () => {
    const offcanvasInputs = document
      .getElementById("offcanvasRight" + index)
      .querySelectorAll("input");

    let styleNames = [];

    offcanvasInputs.forEach((input) => {
      if (input.value !== "") {
        styleNames.push(input.value);
      } else {
        parent.postMessage(
          {
            pluginMessage: {
              type: "error",
              text: "👋 Please enter a name for all style.",
            },
          },
          "*"
        );
      }
    });

    if (styleNames.length === colorPalette.length) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "makeStyleMultiple",
            name: styleNames,
            value: colorPalette,
          },
        },
        "*"
      );

      offcanvasButton1.click();
    } else {
      parent.postMessage(
        {
          pluginMessage: {
            type: "error",
            text: "👋 Please enter a name for all style.",
          },
        },
        "*"
      );
    }
  });

  const btnCopy = document.createElement("button");
  btnCopy.classList.add("btn", "btn-primary", "btn-sm", "rounded-0");
  btnCopy.textContent = "Copy Hex Codes";
  btnCopy.addEventListener("click", () => {
    const hexCodes = colorPalette.join(", ").toUpperCase();
    const input = document.createElement("input");
    input.value = hexCodes;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);

    popupMessage(hexCodes + " Clipboard !!");
  });

  offcanvasButtonGroup.appendChild(offcanvasButton1);
  offcanvasButtonGroup.appendChild(offcanvasButton2);
  offcanvasFooter.appendChild(offcanvasButtonGroup);

  offcanvas.appendChild(offcanvasTitle);
  offcanvas.appendChild(offcanvasBody);
  offcanvas.appendChild(offcanvasFooter);

  btnGroup.appendChild(btnAdd);
  btnGroup.appendChild(btnStyle);
  btnGroup.appendChild(btnCopy);

  divInputGroup.appendChild(btnGroup);
  divDetails.appendChild(divInputGroup);
  divPalette.appendChild(divDetails);

  palettes.appendChild(divPalette);
  palettes.appendChild(offcanvas);
}

function width(length) {
  if (length === 2) {
    return "w-50";
  } else if (length === 3) {
    return "w-33333";
  } else if (length === 4) {
    return "w-25";
  }
}

// Function to shuffle array randomly
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function popupMessage(message) {
  const popupMessage = document.createElement("div");
  popupMessage.classList.add(
    "popupMessage",
    "px-4",
    "py-3",
    "border",
    "rounded-4"
  );

  if (message === "") {
    popupMessage.textContent = "For this, You have to use Figma Plugin.";
  } else {
    popupMessage.textContent = message;
  }

  document.body.appendChild(popupMessage);

  setTimeout(() => {
    popupMessage.remove();
  }, 2000);
}
