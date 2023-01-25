const { ethers, waffle } = require("hardhat");
const { expect } = require("chai");
const { BigNumber, utils } = require("ethers");

describe("Attack", function () {
	it("Should be able to guess the exact number", async function () {
		const Game = await ethers.getContractFactory("Game");
		const _game = await Game.deploy({ value: utils.parseEther("0.1") });
		await _game.deployed();
		console.log("Game contract address", _game.address);

		const Attack = await ethers.getContractFactory("Attack");
		const _attack = await Attack.deploy(_game.address);
		console.log("Attack contract address", _attack.address);

		const tx = await _attack.attack();
		await tx.wait();

		const balanceGame = await _game.getBalance();
		expect(balanceGame).to.equal(BigNumber.from("0"));
	});
});