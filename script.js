const outputDiv = document.querySelector(".output");
const searchBtn = document.querySelector(".btn");
const inputField = document.querySelector("input");

const defaultUrl = "https://openapi.programming-hero.com/api/phones?search=13";

// Function to fetch data
async function getPhones(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result.data;
}

// Function to display data
async function displayData(url, showAll = false) {
  const phones = await getPhones(url);
  console.log(phones);

  // Clear previous results
  outputDiv.innerHTML = "";

  if (phones.length === 0) {
    const message = document.createElement("h2");
    message.innerText = "Item is not available"; // Corrected variable name
    message.style.cssText =
      "font-size: 2rem; color: #A6ADBA; text-align: center; margin-top: 20px;";
    outputDiv.appendChild(message); // Use appendChild instead of append for better compatibility
    return;
  }

  // Create a document fragment for efficient DOM updates
  const fragment = document.createDocumentFragment();

  // Show only 12 phones initially unless showAll is true
  const displayedPhones = showAll ? phones : phones.slice(0, 12);

  displayedPhones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("phone");

    const image = document.createElement("img");
    image.classList.add("image");
    image.src = phone.image;

    const phoneName = document.createElement("h2");
    phoneName.innerText = phone.phone_name;

    const phonePara = document.createElement("p");
    phonePara.innerHTML = `There are many variations of passages of <br> available, but the majority have suffered`;

    const button = document.createElement("button");
    button.classList.add("phoneButton");
    button.innerText = "Show details";
    button.setAttribute("data-id", phone.slug); // ✅ Store phone ID

    phoneDiv.append(image, phoneName, phonePara, button);
    fragment.appendChild(phoneDiv);
  });

  outputDiv.appendChild(fragment); // Append fragment to outputDiv

  // Show All Button Logic
  const showAllContainer = document.createElement("div");
  showAllContainer.classList.add("showAllContainer");

  if (phones.length > 12 && !showAll) {
    const showAllButton = document.createElement("button");
    showAllButton.classList.add("phoneButton");
    showAllButton.innerText = "Show All";
    showAllButton.addEventListener("click", () => {
      displayData(url, true); // Reload with all items
    });
    showAllContainer.appendChild(showAllButton);
    outputDiv.appendChild(showAllContainer);
  }
}

// Load default phones on page load
async function loadDefaultPhones() {
  await displayData(defaultUrl);
}
loadDefaultPhones();

// Add event listener to search button
searchBtn.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent form submission from reloading the page
  let input = inputField.value.trim();
  console.log(input);
  if (input === "") {
    alert("Please enter a phone name!");
    return;
  }

  let url = `https://openapi.programming-hero.com/api/phones?search=${input}`;
  await displayData(url);
});

outputDiv.addEventListener("click", async (event) => {
  if (event.target.classList.contains("phoneButton")) {
    const phoneId = event.target.getAttribute("data-id"); // ✅ Get phone ID
    await showPhoneDetails(phoneId); // ✅ Fetch and display phone details
  }
});

async function showPhoneDetails(id) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  const details = data.data;

  // ✅ Update modal content
  document.getElementById(
    "imgContainer"
  ).innerHTML = `<img src="${details.image}" alt="">`;
  document.getElementById("detailsPhoneName").innerText = details.name;
  document.getElementById("detailsBrand").innerText = `Brand: ${details.brand}`;
  document.getElementById("detailsSpec").innerHTML = `
    <strong>Chipset:</strong> ${details.mainFeatures.chipSet} <br>
    <strong>Display Size:</strong> ${details.mainFeatures.displaySize} <br>
    <strong>Storage:</strong> ${details.mainFeatures.storage} <br>
    <strong>Memory:</strong> ${details.mainFeatures.memory} <br>
    <strong>Sensors:</strong> ${details.mainFeatures.sensors.join(", ")}
`;

  document.getElementById("releaseDate").innerText =
    details.releaseDate || "No release date available";

  // ✅ Show the modal
  document.getElementById("my_modal").style.display = "block";
}

const modal = document.getElementById("my_modal");
const closeModal = document.querySelector(".close");

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden"); // Apply fade-out animation
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("hidden"); // Remove class to reset animation
  }, 300); // Wait for animation to complete before hiding
});
