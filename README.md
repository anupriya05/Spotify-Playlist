# Spotify-Playlist

## overview
This project collects songs from the pre-existing playlist and creates a new playlist and add all the songs from the searched playlist into new one.
This project uses automation tool "puppeteer" to automate the task of cloning playlist.

## Features

This project performs following tasks:
##
```
✅It logs in to stopify web browswer account automatically
✅Searches for the given command for eg. top 10 english songs<br></br>
✅It will store all the songs from that playlist<br></br> 
✅Create a new playlist<br></br> 
✅add all the songs from the searched playlist into new one<br></br> 
```
## Installation
You need a working installation of node and the npm package manager. In your terminal, install dependencies with ```npm install```.
( Use this command to install all the modules used in this project automatically without installing them individually )
```bash
npm install 
```
## Usage
It contains two functions <br></br>
1. First function is wait function which uses```setTimeout```which is declared so that it can be called any number of times in the program.
2. Second function uses browser that is visible to us (```headless : false``` => means browser ```visible``` to us, ```headless : true``` => means browser is ```not visible``` to us)
<br></br
<b>Lets look at the code one by one</b>
```javascript
const puppy=require("puppeteer");
const fs = require("fs");
```
We need to require the dependencies that we are going to use in our project.
[puppeteer](https://www.npmjs.com/package/puppeteer)
[fs](https://www.npmjs.com/package/file-system)

```javascript
function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}
```
<b>This function wait is defined for the ease and to reduce the complexity so that it comes easy to use setTimeout.
next is main async function,this can be divided into 3 sections on basis of work it does </b>
<b>first work it does is to open spotify and login to spotify account</b>

```javascript
async function main()
{ 
    let browser =await puppy.launch({
        headless:false,
        defaultViewport:false,
        args: ['--disable-notifications']
    });
let tabs=await browser.pages();
let tab=tabs[0];
await tab.goto('https://open.spotify.com/',{waitUntil: 'networkidle2'});
await tab.waitForSelector(".onetrust-close-btn-handler.onetrust-close-btn-ui.banner-close-button.ot-close-icon", {
    visible: true
});
await tab.click(".onetrust-close-btn-handler.onetrust-close-btn-ui.banner-close-button.ot-close-icon");
await tab.waitForSelector("._3f37264be67c8f40fa9f76449afdb4bd-scss._1f2f8feb807c94d2a0a7737b433e19a8-scss", {
    visible: true
});
await tab.click("._3f37264be67c8f40fa9f76449afdb4bd-scss._1f2f8feb807c94d2a0a7737b433e19a8-scss");

await tab.waitForSelector('#login-username', {
    visible: true
});
await tab.type('#login-username', id);
await tab.type('#login-password', password);
await tab.click(".control-indicator");
await tab.click("#login-button");
```
<b> second task is to search the playlist and store all the songs in array</b>
```javascript
tab.goto('https://open.spotify.com' + "/search", {
    waitUntil: 'networkidle2'
});


await tab.waitForSelector('._748c0c69da51ad6d4fc04c047806cd4d-scss.f3fc214b257ae2f1d43d4c594a94497f-scss', {
    visible: true
});
await tab.type('._748c0c69da51ad6d4fc04c047806cd4d-scss.f3fc214b257ae2f1d43d4c594a94497f-scss', playlistname);

await tab.waitForSelector('._85fec37a645444db871abd5d31db7315-scss', { visible: true});
await tab.click("._85fec37a645444db871abd5d31db7315-scss");
await tab.waitForSelector(".da0bc4060bb1bdb4abb8e402916af32e-scss.standalone-ellipsis-one-line._8a9c5cc886805907de5073b8ebc3acd8-scss",{visible:true});
let song_name_array=[];
let elements=await tab.$$(".da0bc4060bb1bdb4abb8e402916af32e-scss.standalone-ellipsis-one-line._8a9c5cc886805907de5073b8ebc3acd8-scss");
for (let idx = 0; idx < elements.length; idx++) {
    let text = await elements[idx].getProperty('innerText');
    let ft = (await text).jsonValue();
        song_name_array.push(ft);
}
```
<b>last task is to create the playlist</b>
```javascript

//create playlist
tab.goto('https://open.spotify.com/collection/playlists', {
    waitUntil: 'networkidle2'
});

 await tab.waitForSelector("._3f37264be67c8f40fa9f76449afdb4bd-scss._1f2f8feb807c94d2a0a7737b433e19a8-scss._0b979b912e80659fe92da99af4ebd251-scss");
await tab.click("._3f37264be67c8f40fa9f76449afdb4bd-scss._1f2f8feb807c94d2a0a7737b433e19a8-scss._0b979b912e80659fe92da99af4ebd251-scss");
let song = await Promise.all(song_name_array);
for(let i of song)
{
    let typing=i;


await tab.waitForSelector("._655bc45ccbf3d91c685865ff470892eb-scss.f3fc214b257ae2f1d43d4c594a94497f-scss",{visible:true});
await tab.click("._655bc45ccbf3d91c685865ff470892eb-scss.f3fc214b257ae2f1d43d4c594a94497f-scss");
await tab.type("._655bc45ccbf3d91c685865ff470892eb-scss.f3fc214b257ae2f1d43d4c594a94497f-scss",typing);
await wait(1000);
//add
await tab.waitForSelector("._3f37264be67c8f40fa9f76449afdb4bd-scss._110dbc41d89af63f97cdd8b7cd7fea47-scss._2e6fd4bdb936691a0eceb04a1e880c2f-scss");
await tab.click("._3f37264be67c8f40fa9f76449afdb4bd-scss._110dbc41d89af63f97cdd8b7cd7fea47-scss._2e6fd4bdb936691a0eceb04a1e880c2f-scss");
await wait(1000);
//cross button
await tab.waitForSelector(".e2743454bbd40e4ecd04d30f09d53798-scss");
await tab.click(".e2743454bbd40e4ecd04d30f09d53798-scss");
}
```
and finally call the main function
```javascript
main();
```
