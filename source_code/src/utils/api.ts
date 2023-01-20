import { HeadsetRounded } from "@mui/icons-material";

export interface Anime {
    rate: string;
    members: string;
    name: string;
    type: string;
    count_eps_or_vols: string;
    img: string;
    link: string;
    Recommend_to_see: string;
}

export type OpenAnimeTempScale = 'Favourite' | 'Un_favourite'

export async function fetchAnime (name: string): Promise<any> {
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
  
    headers.append('GET', 'POST');
    const res = await fetch(`https://tronghoa.dev/api/anime_search.php?q=${name}`, {
        headers: headers
    })
    if (!res.ok) throw new Error('Inaccessible')
    var data:Anime[] = await res.json()
    console.log(data)
    if (data.length == 0) throw new Error('Couldn\'t find the anime you were looking for')
    return data;
}


export function getUrlImageRecommend (tags) {
    return `https://tronghoa.dev/api/isset/${tags}.png`
}