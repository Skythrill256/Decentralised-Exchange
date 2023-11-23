// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./token.sol";

contract CustomDex {
    string[] public tokens = ["Tether USD", "BNB", "USD Coin", "stEth", "TRON", "Matic Token", "SHIBA INU", "Uniswap"];
    mapping(string => ERC20) public tokenInstanceMap;

    uint256 ethValue = 100000000000000000;

    struct History {
        uint256 historyId;
        string tokenA;
        string tokenB;
        uint256 inputValue;
        uint256 outputValue;
        address userAddress;
    }

    uint256 public _historyIndex;
    mapping(uint256 => History) private historys;

    constructor() {
        for (uint256 i = 0; i < tokens.length; i++) {
            CustomToken token = new CustomToken(tokens[i], tokens[i]);
            tokenInstanceMap[tokens[i]] = token;
        }
    }

    function getBalance(string memory tokenName, address _address) public view returns (uint256) {
        return tokenInstanceMap[tokenName].balanceOf(_address);
    }

    function getTotalSupply(string memory tokenName) public view returns (uint256) {
        return tokenInstanceMap[tokenName].totalSupply();
    }

    function getTokenName(string memory tokenName) public view returns (string memory) {
        return tokenInstanceMap[tokenName].name();
    }

    function getTokenAddress(string memory tokenName) public view returns (address) {
        return address(tokenInstanceMap[tokenName]);
    }

    function getEthBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function _transactionHistory(
        string memory tokenName,
        string memory etherToken,
        uint256 inputValue,
        uint256 outputValue
    ) internal {
        _historyIndex++;
        uint256 _historyID = _historyIndex;
        History storage history = historys[_historyID];
        history.historyId = _historyID;
        history.tokenA = tokenName;
        history.tokenB = etherToken;
        history.inputValue = inputValue;
        history.outputValue = outputValue;
    }

    function swapEthToToken(string memory tokenName) public payable returns (uint256) {
        uint256 inputValue = msg.value;
        uint256 outputValue = (inputValue / ethValue) * 10 ** 18;

        require(tokenInstanceMap[tokenName].transfer(msg.sender, outputValue), "Swap Failed");
        string memory etherToken = "Ether";
        _transactionHistory(tokenName, etherToken, inputValue, outputValue);
        return outputValue;
    }

    // Other swap functions (swapTokenToEth, swapTokenToToken) remain the same as before

    function getAllHistory() public view returns (History[] memory) {
        uint256 itemCount = _historyIndex;
        History[] memory items = new History[](itemCount);

        for (uint256 i = 0; i < itemCount; i++) {
            uint256 currentID = i + 1;
            items[i] = historys[currentID];
        }
        return items;
    }
}
