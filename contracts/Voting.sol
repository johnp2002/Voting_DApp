//SPDX-License-Identifier:MIT
pragma solidity ^0.8.1;

contract VotingSystem {
    
    // State variables
    address public owner;
    string[] public contenders;
    mapping(string => uint256) public contenderVotes;
    mapping(address => bool) public hasVoted;

    // Events to log important actions
    event ContenderAdded(string contenderName);
    event Voted(address voter, string contenderName);

    // Constructor to set the owner when the contract is deployed
    constructor(){
        owner = msg.sender;
    }

    function getContenders() public view returns(string[] memory ){
        return contenders;
    }
    // Function to add a contender
    function addContender(string memory contenderName) public onlyOwner {
        contenders.push(contenderName);
        contenderVotes[contenderName] = 0;
        emit ContenderAdded(contenderName);
    }

    // Function to cast a vote
    function vote(string memory contenderName) public {
        require(contenderVotes[contenderName] >= 0, "Contender does not exist.");
        require(!hasVoted[msg.sender], "You have already voted.");

        contenderVotes[contenderName] += 1;
        hasVoted[msg.sender] = true;
        emit Voted(msg.sender, contenderName);
    }

    // Function to get the winner
    function getWinner() public view returns (string memory) {
        require(contenders.length > 0, "No contenders available.");

        string memory winner;
        uint256 maxVotes = 0;

        for (uint256 i = 0; i < contenders.length; i++) {
            if (contenderVotes[contenders[i]] > maxVotes) {
                maxVotes = contenderVotes[contenders[i]];
                winner = contenders[i];
            }
        }

        return winner;
    }

    // Modifier to ensure that only the owner can perform certain actions
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }
}


