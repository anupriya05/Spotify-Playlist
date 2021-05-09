const puppy=require("puppeteer");
const fs = require("fs");
let playlistname = process.argv[2];
const id="vegomiw701@zcai77.com";
const password="happy2345@";
function wait(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(ms)
        }, ms)
    })
}

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

await tab.waitForSelector('.icon.search-icon', {
    visible: true
});

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

//create playlist
tab.goto('https://open.spotify.com/collection/playlists', {
    waitUntil: 'networkidle2'
});
// await tab.waitForSelector("._0f1a8f7fdd1d622cbfe4c283f4f5cd72-scss");
// await tab.click("._0f1a8f7fdd1d622cbfe4c283f4f5cd72-scss");
 
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
}
main();
