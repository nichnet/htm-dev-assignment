# HSM Dev Assignment

<img src="https://github.com/nichnet/hsm-dev-assignment/blob/main/images/desktop.png" alt="Desktop Broser">

<div style="display: flex;">
    <img src="https://github.com/nichnet/hsm-dev-assignment/blob/main/images/tablet.png" alt="Tablet Browser" width="300"/>
    <img src="https://github.com/nichnet/hsm-dev-assignment/blob/main/images/mobile.png" alt="Mobile Browser" width="200"/>
</div>

### Requirements:
1. **Node.js**: Ensure Node.js is installed on your system. You can download it from [nodejs.org](https://nodejs.org/).
2. **npm (Node Package Manager)**: npm usually comes with Node.js installation. Check its presence by running `npm -v` in your terminal.

### Setup Instructions:
1. **Clone the Repository**: Clone the repository to your local machine using the following command:
    ```bash
    git clone https://github.com/nichnet/hsm-dev-assignment.git
    ```
2. **Install Dependencies**: Navigate to the project directory and move into the `reactjs` directory. Run the following command to install the necessary dependencies:
    ```bash
    npm install
    ```
2. **Start the Development Server**: Once the installation is complete, start the development server by running:
    ```bash
    npm start
    ```
   This will compile the project and open it in your default web browser.

### Additional Notes:
- For production builds, you can use `npm run build` to create an optimized production build.
- Navbar Links and Map button are mocks.
- Webpage has search filters, pagination, and resposnsive design for large, medium and small devices.

## Hosting Architecture
I am hosting the demo on AWS. An ideal architecture diagram would be as follows:
![AWS Architecture](https://github.com/nichnet/hsm-dev-assignment/blob/main/images/architecture.png)
