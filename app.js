let web3;
let shrimpFaucetContract;
const contractAddress = '0x1ab0F52CAe9ed91fa95e425C6B8E20b889e28544'; // Update with your contract address
const contractABI = [
	{
		"inputs": [],
		"name": "claimTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newAmount",
				"type": "uint256"
			}
		],
		"name": "setClaimAmount",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newPeriod",
				"type": "uint256"
			}
		],
		"name": "setCooldownPeriod",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdrawTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "cooldownPeriod",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getCooldownTimeRemaining",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFaucetBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getLastClaimed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "lastClaimed",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "shrimpToken",
		"outputs": [
			{
				"internalType": "contract IShrimpToken",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function initWeb3() {
    if (window.ethereum) {
        try {
            web3 = new Web3(window.ethereum);
            await window.ethereum.enable(); // Request access
            shrimpFaucetContract = new web3.eth.Contract(contractABI, contractAddress);
            console.log("Web3 initialized and contract connected.");
        } catch (error) {
            console.error("User denied account access");
        }
    } else {
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
}

async function claimTokens() {
    const addressInput = document.getElementById("addressInput").value;
    if (!web3.utils.isAddress(addressInput)) {
        alert("Invalid address. Please enter a valid Ethereum address.");
        return;
    }

    try {
        await shrimpFaucetContract.methods.claimTokens().send({ from: addressInput });
        alert("Tokens claimed successfully!");
    } catch (error) {
        console.error("Error claiming tokens", error);
        alert("Failed to claim tokens. See console for details.");
    }
}

window.onload = initWeb3;
