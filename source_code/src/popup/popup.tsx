import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import './popup.css'
import 'fontsource-roboto'
import { fetchAnime } from '../utils/api'
import {Paper, Box, InputBase, IconButton, Grid} from "@mui/material"
import {FeaturedVideoOutlined, Search, Search as SearchIcon, SettingsAccessibilityOutlined} from '@mui/icons-material/'
import AnimeCard from '../components/animeCard';
import { setStoredAnimes, setStoredOptions, getStoredOptions,  getStoredAnimes, LocalStorageOptions, getStoredFavouriteAnimes, setStoredFavouriteAnimes } from '../utils/storage'
import {Favorite as FavoriteIcon, 
    FavoriteBorder as FavoriteBorderIcon,
    PictureInPicture as PictureInPictureIcon 
} from '@mui/icons-material/';
import {Messages} from '../utils/messages'
const App : React.FC<{}> = () => {
    const [animes, setAnimes] = useState<string[]>([]);
    const [FavouriteAnimes, setFavouriteAnimes] = useState<string[]>([]);
    const [animeInput, setAnimeInput] = useState<string>('');
    const [options, setOptions] = useState<LocalStorageOptions | null>(null)
    useEffect(()=>{
        getStoredAnimes().then((animes)=>setAnimes(animes))
        getStoredOptions().then((options) => setOptions(options))
        getStoredFavouriteAnimes().then((animes)=>setFavouriteAnimes(animes))
    }, [])
    const handleSearchButtonClick = () => {
        if (animeInput === '') return 
        // setAnimes([...animes, animeInput])
        // setAnimeInput('');
        const updatedAnimes = [...animes, animeInput]
        setStoredAnimes(updatedAnimes).then(()=>{
            setAnimes(updatedAnimes);
            setAnimeInput('');
        })
    }
    

    const handleFavouriteButtonClick = (index) => {
        const updateFavouriteAnimes = [...FavouriteAnimes, animes[index]];
        setStoredFavouriteAnimes(updateFavouriteAnimes).then(()=>{
            setFavouriteAnimes(updateFavouriteAnimes);
        });
        animes.splice(index, 1);
        const updatedAnimes = [...animes];
        setStoredAnimes(updatedAnimes).then(()=>{
            setAnimes(updatedAnimes);
        });
    }

    const handleDeleteFavouriteButtonClick = (index) => {
        FavouriteAnimes.splice(index, 1);
        const updateFavouriteAnimes = [...FavouriteAnimes];
        setStoredFavouriteAnimes(updateFavouriteAnimes).then(()=>{
            setFavouriteAnimes(updateFavouriteAnimes);
        })
    }
    const handleTempScaleButtonClick = () => {
        const updateOptions: LocalStorageOptions = {
            ...options,
            tempScale: options.tempScale == 'Favourite' ? 'Un_favourite' : 'Favourite'
        }
        setStoredOptions(updateOptions).then(()=>{
            setOptions(updateOptions);
        })
    }

    const handleOverlayButtonClick = () => {
        chrome.tabs.query({
            active: true,

        }, (tabs) => {
            if (tabs.length > 0) chrome.tabs.sendMessage(tabs[0].id, Messages.TOGGLE_OVERLAY)
        })
    }

    if (!options) {
        return null
    }
    return (
        <div>
            <Box mx="8px" my="16px">
                <Grid container justifyContent={"space-evenly"}>
                    <Grid item>
                    <Paper>
                        <Box px="15px" py="5px" >
                            <InputBase
                                
                                placeholder='Anime to look for?'
                                value={animeInput}
                                onChange={(event)=> setAnimeInput(event.target.value)}
                            />
                            <IconButton onClick={handleSearchButtonClick}>
                                <SearchIcon/>
                            </IconButton>
                        </Box>
                        
                    </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <Box py="5px">
                                <IconButton onClick={handleTempScaleButtonClick}>
                                    {options.tempScale == 'Favourite' ? <FavoriteIcon></FavoriteIcon>:<FavoriteBorderIcon></FavoriteBorderIcon>}
                                </IconButton>
                            </Box>
                            
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Paper>
                            <Box py="5px">
                                <IconButton onClick={handleOverlayButtonClick}>
                                    <PictureInPictureIcon />
                                </IconButton>
                            </Box>
                            
                        </Paper>
                    </Grid>
                </Grid>
                {
                    options.animePinned != '' && (
                        <AnimeCard anime_name={options.animePinned} index={0}/>
                    )
                }
                {options.tempScale == 'Favourite' ? FavouriteAnimes.map((annime_name, index) => ( <AnimeCard anime_name={annime_name} key={index} onDelete={()=>handleDeleteFavouriteButtonClick(index)} index={0} /> )) : animes.map((annime_name, index) => ( <AnimeCard anime_name={annime_name} key={index} index={0} onFavourite={()=>handleFavouriteButtonClick(index)}/> ))}
                <Box height="16px"/>
            </Box>
            
            
        </div> 
    );
};


const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App />, root);