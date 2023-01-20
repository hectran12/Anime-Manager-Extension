import {getStoredAnimes, setStoredAnimes , setStoredOptions, setStoredFavouriteAnimes, getStoredFavouriteAnimes, getStoredOptions} from "../utils/storage";
import { Anime, fetchAnime } from "../utils/api";
chrome.runtime.onInstalled.addListener(()=>{
    setStoredAnimes([])
    setStoredFavouriteAnimes([]);
    setStoredOptions({
        hasAutoOverlay: true,
        tempScale: 'Un_favourite',
        animePinned: ''
    });

    chrome.contextMenus.create({
        contexts: ["selection"],
        title: "Add this anime to favorites",
        id: 'addAnimetoFavourite'
    });

    chrome.alarms.create({
        periodInMinutes: 1/6,
    })
    chrome.tabs.create({
        url: 'https://tronghoa.dev/thank/?install=anime_manager'
    })
})


chrome.contextMenus.onClicked.addListener((event) => {
    getStoredFavouriteAnimes().then((animes) => {
        setStoredFavouriteAnimes([...animes, event.selectionText])
    })
})

chrome.alarms.onAlarm.addListener(()=>{
    getStoredOptions().then((options) => {
        if (options.animePinned === '') return 
        fetchAnime(options.animePinned).then((data:Anime[])=>{
            setTimeout(() => {
                chrome.action.setBadgeText({
                    text: data[0].name
                })
            }, 1000);
            setTimeout(() => {
                chrome.action.setBadgeText({
                    text: `Scored`
                })
            }, 2000);
            setTimeout(() => {
                chrome.action.setBadgeText({
                    text: data[0].rate
                })
            }, 3000);
            
        });
    })
})
