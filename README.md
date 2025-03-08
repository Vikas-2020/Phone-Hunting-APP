# Phone Hunting API

## Overview
This project is a web application that allows users to search for mobile phones using the [Programming Hero OpenAPI](https://openapi.programming-hero.com/api). It displays search results with details about each phone and includes a modal for showing additional specifications.

## Features
- Search for phones by name.
- Display up to 12 phones initially, with an option to load more.
- Fetch and display phone details in a modal popup.
- Responsive design with a user-friendly interface.

## Technologies Used
- HTML
- CSS (Tailwind & Custom Styles)
- JavaScript (Vanilla JS)
- Fetch API for data retrieval

## Installation & Usage
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/phone-hunting-api.git
   ```
2. Navigate to the project directory:
   ```sh
   cd phone-hunting-api
   ```
3. Open `index.html` in your browser.

## File Structure
```
phone-hunting-api/
│-- index.html       # Main HTML file
│-- style.css        # Main stylesheet
│-- output.css       # Additional CSS
│-- script.js        # Main JavaScript file
│-- images/          # Image assets
│-- README.md        # Project documentation
```

## API Reference
- Base URL: `https://openapi.programming-hero.com/api/`
- Search Phones: `https://openapi.programming-hero.com/api/phones?search={query}`
- Phone Details: `https://openapi.programming-hero.com/api/phone/{id}`

## How It Works
1. Users enter a phone brand or model in the search input and click the "Search" button.
2. The application fetches data from the API and displays up to 12 results.
3. Clicking "Show Details" fetches additional specifications and displays them in a modal.
4. Users can click "Show All" to load more results if available.

## Future Enhancements
- Implement a loading animation while fetching data.
- Improve UI/UX with animations and better styling.
- Add filters for price, brand, and specifications.

## Live Demo
[View Hosted Project](your-hosted-link-here)

## GitHub Repository
[View on GitHub](https://github.com/your-username/phone-hunting-api)

## License
This project is open-source and available under the MIT License.

