


# Voting DApp

This is a decentralized application (DApp) built for conducting voting using blockchain technology. It allows users to vote for different options and ensures transparency and security through the blockchain.

## Prerequisites

Before running the Voting DApp, ensure you have the following installed:

- Ganache: A personal blockchain for Ethereum development.
- MetaMask: A cryptocurrency wallet and gateway to blockchain apps.
- Node.js: JavaScript runtime.
- Truffle Suite: Development environment for Ethereum.
- Web3.js: Ethereum JavaScript API.

## Installation

1. Clone the repository to your local machine:

```bash
git clone https://github.com/johnp2002/voting-dapp.git
```

2. Navigate to the project directory:

```bash
cd voting-dapp
```

3. Install dependencies:

```bash
npm install
```

## Usage

1. Run Ganache to start your local blockchain.

2. Configure MetaMask to connect to your local Ganache network. Import accounts from Ganache.

3. Compile and deploy the smart contracts:

```bash
truffle compile
truffle migrate --reset
```

4. Update the contract address in the `App.jsx` file with the address of the deployed contract.

5. Run the React app:

```bash
npm run dev
```

6. Open your browser and navigate to http://localhost:5173/ to access the Voting DApp.

7. Use MetaMask to interact with the DApp, select options, and submit your vote.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

