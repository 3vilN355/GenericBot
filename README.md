# GenericBot
Generic `discord.js` v14 bot with most of the basics necessary to spin up a new one quickly. Mainly intended for personal use.  
Key components: `bun`, `ts`, `docker`, `mongodb`, `sqlite`

## Preparation
- Make sure you have bun installed
- Get your discord bot token from the developer portal
- Copy `.env.example` -> `.env` and fill in

## Running
```
    docker build -t generic
    docker run generic
```
