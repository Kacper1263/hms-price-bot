# Hemis (HMS/USDT) price bot for Discord

This very simple Discord bot retrieves the current HMS/USDT price from the Xeggex API and updates the name of a specified channel with the price at regular intervals.

You can create a private "read-only" voice channel and set all needed permissions only for that bot and for @everyone set them to Connect = false and View = true to get the effect as below

![effect](https://github.com/Kacper1263/hms-price-bot/assets/43702481/31c163d7-a29b-4770-ae1f-4a983ccf2220)
![permissions](https://github.com/Kacper1263/hms-price-bot/assets/43702481/e01fc3fa-b388-4bff-81ff-5e685ff96465)

The code is very simple so it supports only one server and all configuration is done in the `config.json` file

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/Kacper1263/hms-price-bot.git
    ```

2. **Install dependencies:**

    Navigate into the project directory and run:

    ```bash
    npm install
    ```

3. **Create a configuration file:**

    Create a file named `config.json` in the root directory of the project. Add your Discord bot token and the ID of the voice channel you want to update. The file should look like this:

    ```json
    {
        "token": "YOUR_DISCORD_BOT_TOKEN",
        "channelId": "YOUR_VOICE_CHANNEL_ID"
    }
    ```

    > Alternatively, you can set the following environment variables:
    > - `DISCORD_BOT_TOKEN`: Your Discord bot token.
    > - `DISCORD_VOICE_CHANNEL_ID`: The ID of the voice channel where you want the bot to display the token price.


4. **Run the bot:**

    Run the bot using Node.js:

    ```bash
    node bot.js
    ```

## Discord Bot Token

To obtain a Discord bot token, follow these steps:

1. Go to the [Discord Developer Portal](https://discord.com/developers/applications).
2. Log in or create an account if you haven't already.
3. Click on "New Application" and give your application a name.
4. Go to the "Bot" tab.
5. Under the bot section, you'll see a "Token" section.

## Voice Channel ID

To obtain the ID of the voice channel you want to update, follow these steps:

1. Enable Developer Mode in Discord.
    - Go to Settings > APP SETTINGS (section).
    - Under Advanced, toggle Developer Mode on.

2. Right-click on the voice channel you want to use and select "Copy Channel ID".

3. Paste the copied ID into your `config.json` file.

## Discord API Rate Limit

Keep in mind that the Discord API has rate limits for updating channel names. The current limit is 2 requests per 10 minutes. Ensure that you don't exceed this limit to avoid any issues.

## Contributing

This bot is designed to be simple and easy to use. Feel free to expand its functionality or customize it to suit your needs. Contributions are welcome! If you have any ideas for improvements or new features, please open a pull request.


