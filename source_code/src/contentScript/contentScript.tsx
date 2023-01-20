import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import AnimeCard from '../components/animeCard';
import { Card } from '@mui/material';
import { Messages } from '../utils/messages'
import { getStoredOptions, LocalStorageOptions } from '../utils/storage';
import './contentScript.css'
const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [isActive, setIsActive] = useState<Boolean>(false);

    useEffect(()=>{
        getStoredOptions().then((options)=> {
            setOptions(options)
            setIsActive(options.hasAutoOverlay)
        })
    }, [])

    useEffect(()=>{
        chrome.runtime.onMessage.addListener((msg)=>{
            if(msg == Messages.TOGGLE_OVERLAY) {
                setIsActive(!isActive);
            }
        })
    },[isActive])
    if (!options) {
        return null
    } else {
        if (options.animePinned == '') setIsActive(false);
    }
    return (
        <>
            {
                isActive &&
                (<Card className='overlayCard'>
                    <AnimeCard anime_name={options.animePinned} index={0}
                    onDelete={()=>setIsActive(false)}
                    />
                </Card>)
            }
        </>
    )   
    
    
}
const root = document.createElement('div');
document.body.appendChild(root)
ReactDOM.render(<App/>, root)