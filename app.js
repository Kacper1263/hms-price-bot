import { ChannelType, Client, GatewayIntentBits } from 'discord.js';
import axios from 'axios';
import fs from 'fs';

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] 
});

// Check if the configuration file exists
const configPath = 'config.json';
if (!fs.existsSync(configPath)) {
    console.error('Config file does not exist.');
    process.exit(1); // Terminate the program with error code 1
}

// Read data from the configuration file
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const token = config.token;
const channelId = config.channelId;

if(!token) {
    console.error('Token is not provided in the configuration file.');
    process.exit(1);
}
if(!channelId) {
    console.error('Channel ID is not provided in the configuration file.');
    process.exit(1);
}

const apiUrl = 'https://api.xeggex.com/api/v2/market/getbysymbol/HMS%2FUSDT';
const mainInterval = 10 * 1000; // Interval for Xeggex API in milliseconds (e.g., 10 seconds)
const setNameInterval = 5 * 60 * 1000; // Interval for updating channel name in milliseconds (e.g., 5 minutes) - Discord API rate limit is 2 requests per 10 minutes
let lastPrice = null; // Variable to store the last price
let lastSetNameTime = 0; // Variable to store the timestamp of the last channel name update

client.once('ready', () => {
    console.log('Bot is ready');
    main();
    setInterval(main, mainInterval);
});

async function main() {
    var currentPrice = 0;
    try {
        const response = await axios.get(apiUrl);
        const { lastPrice: lastPriceXeggex } = response.data;
        currentPrice = lastPriceXeggex;

        console.log(`Current price: ${currentPrice}`);
    } catch (error) {
        console.error('Error fetching price:', error);
        return;
    }

    const currentTime = Date.now();
    const elapsedTimeSinceLastSetName = currentTime - lastSetNameTime;

    // Check if the elapsed time since the last channel name update is greater than or equal to 5 minutes
    if (elapsedTimeSinceLastSetName >= setNameInterval && currentPrice !== lastPrice) {
        const channel = client.channels.cache.get(channelId);

        if (channel && channel.type === ChannelType.GuildVoice) {
            // Update the voice channel name with the current price
            await channel.setName(`HMS/USDT: ${currentPrice}$`)
                .catch(error => console.error('Error updating channel name:', error));

            lastPrice = currentPrice; // Update the last price
            
            // Update the timestamp of the last channel name update
            lastSetNameTime = currentTime;
        } else {
            console.error(`Channel with ID '${channelId}' not found or is not a voice channel`);
        }
    }
}

client.login(token);
