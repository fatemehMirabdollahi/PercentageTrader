# Percentage Trader

## Overview

Percentage Trader is a tool designed for trading cryptocurrencies with percentage-based order placement. The application allows users to select a market, view orders and trades, and calculate the payment amount based on a selected percentage of the volume in the chosen market.

## Pages

### 1. Market List

- **Description**: Users can view a list of available markets.
- **Functionality**: Upon selecting a market, users will be redirected to the market details page.

### 2. Market Details

- **Description**: Users can view the list of orders and trades for the selected market.
- **Functionality**: Users can enter a percentage value to calculate the cryptocurrency volume, average price, and total amount payable based on their input.

## Features

- **Market Selection**: Users can choose a market to view its details.
- **Order/Trade Viewing**: Users can view the list of orders and trades for the selected market.
- **Percentage-based Calculation**: Users can input a percentage to calculate the volume, price, and total amount.

## Technologies Used

- React.js
- Tailwind CSS
- React Router
- Axios (for API requests)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/fatemehMirabdollahi/PercentageTrader.git
   ```
2. Navigate into the project directory:

   ```bash
   cd percentage-trader
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
4. Run the development server:
   ```bash
   npm start
   ```

### Improvements

### Improvements

1. **Responsive Design for Mobile**

   - Layout Adjustments: The project needs a layout that adapts to mobile screens.
   - Text and Element Sizing: The text sizes, padding, and margins must be adjusted for better readability on mobile devices using Tailwind's utilities.
   - Mobile-Friendly Tables: Tables must be either scrollable horizontally or have a more compact layout on mobile to avoid overflow issues and ensure smooth usability.

2. **Loader Animation**:
   The project needs a loader animation to enhance the user experience. This would help inform users that data is being fetched or processed, preventing confusion and improving overall interaction.

3. **React Query for Data Handling**:
   The project could benefit from using React Query to manage loading states, errors, and retries particularly for market data, but for this case caching option is not suitable.

4. **Market Details API**:
   The project needs an API to fetch detailed data of a market using its ID. This would allow adding additional information such as the market's name, values (like price, volume, changes), and even the market's icon in the second page for clearity. While it's possible to store data on the client side, it’s not an ideal solution.

5. **Improvement in Data Fetching for Markets Page**

   - Implement backend pagination for the Markets page to handle large datasets efficiently.
   - Create a dedicated API for dynamic data, especially for frequently updated fields like price and change.
   - Use WebSockets to provide real-time updates to market data, avoiding full page reloads and improving user experience.
