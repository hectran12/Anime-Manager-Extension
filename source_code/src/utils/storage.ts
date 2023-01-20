import { OpenAnimeTempScale } from "./api"

export interface LocalStorage {
    animes?: string[]
    options?: LocalStorageOptions
}

export interface LocalStoragefavouriteAnime {
    animes_fav?: string[]
}

export interface LocalStorageOptions {
    hasAutoOverlay: boolean
    tempScale: OpenAnimeTempScale
    animePinned: string
}
export type LocalStorageKeys = keyof LocalStorage
export type LocalStorageFavouriteKeys = keyof LocalStoragefavouriteAnime;

export function setStoredFavouriteAnimes (animes_fav: string[]): Promise<void> {
    const vals: LocalStoragefavouriteAnime = {
        animes_fav
    }
    return new Promise ((resolve) => {
        chrome.storage.local.set(vals, ()=>{
            resolve()
        })
    })
}

export function getStoredFavouriteAnimes (): Promise<string[]> {
    const keys: LocalStorageFavouriteKeys[] = ["animes_fav"];
    return new Promise ((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStoragefavouriteAnime) => {
            resolve(res.animes_fav ?? [])
        })
    })
}

export function setStoredAnimes (animes: string[]): Promise<void> {
    const vals: LocalStorage = {
        animes
    }
    return new Promise ((resolve) => {
        chrome.storage.local.set(vals, () => {
            resolve()
        })
    })
}

export function getStoredAnimes (): Promise<string[]> {
    const keys: LocalStorageKeys[] = ["animes"];
    return new Promise ((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStorage) => {
            resolve(res.animes ?? [])
        })
    })
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
    const vals: LocalStorage = {
        options
    }

    return new Promise((resolve) => {
        chrome.storage.local.set(vals, ()=>{
            resolve()
        })
    })
}


export function getStoredOptions (): Promise<LocalStorageOptions> {
    const keys: LocalStorageKeys[] = ['options']
    return new Promise((resolve) => {
        chrome.storage.local.get(keys, (res: LocalStorage) => {
            resolve(res.options)
        })
    })
}