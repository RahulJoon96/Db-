
const express = require("express");
const axios = require("axios");
            require('dotenv').config();

const app = express();
const apiKey = process.env.API_key;

class Block{
    constructor(timeStamp,blockReward){
        this.timeStamp = timeStamp;
        this.blockReward = blockReward;
    }
}


const fetchData = async()=>{
    try {
        const listOfBlocks = [];
        for(let blockNumber = 17469523;blockNumber < 17469528; blockNumber++){
            const ApiURL = `https://api.etherscan.io/api?module=block&action=getblockreward&blockno=${blockNumber}&apikey=${apiKey}`
            const response = await axios.get(ApiURL); 
            
            const rewardEther = response.data.result.blockReward;
            const timeStamp = response.data.result.timeStamp;
            
            const block = new Block(timeStamp,rewardEther);
            listOfBlocks.push(block);
        }
    console.log(listOfBlocks);
    
    } catch (error) {
        console.log(error);
    }
}

(async()=>{  
    try{
        await fetchData()
        app.listen(3000,()=>{
            console.log("Server is running");
        })
    }catch(erorr){
        console.error(error)
    }
})()