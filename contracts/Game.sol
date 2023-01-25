// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Game {
    constructor() payable {}

    function pickACard() private view returns (uint256) {
        uint256 pickedCard = uint256(
            keccak256(
                abi.encodePacked(blockhash(block.number), block.timestamp)
            )
        );
        return pickedCard;
    }

    function guess(uint256 _guess) public {
        uint256 _pickedCard = pickACard();
        if (_guess == _pickedCard) {
            (bool sent, ) = msg.sender.call{value: 0.1 ether}("");
            require(sent, "Failed to send ether");
        }
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
