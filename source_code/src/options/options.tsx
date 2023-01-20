import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import {
    Box,
    Card,
    Switch,
    Button, 
    CardContent,
    Typography,
    Grid,
    TextField
} from "@mui/material"
import "fontsource-roboto"
import "./options.css"
import {
    getStoredOptions,
    setStoredOptions,
    LocalStorageOptions
} from '../utils/storage'

type FromState = 'ready' | 'saving';
const App: React.FC<{}> = () => {
    const [options, setOptions] = useState<LocalStorageOptions | null>(null);
    const [formState, setFormState] = useState<FromState>('ready');
    useEffect(()=>{
        
        getStoredOptions().then((options) => setOptions(options))
    }, [])
    
    const handleAnimePinnedChange = (animePinned: string) => {
        setOptions({
            ...options,
            animePinned
        })
    }

    const handleSaveButtonClick = () => {
        setFormState('saving');
        setStoredOptions(options).then(()=>{
            setTimeout(()=>{
                setFormState('ready');
            },1000);
        });
    }

    const handleAutoOverlayChange = (hasAutoOverlay: boolean) => {
        setOptions({
            ...options,
            hasAutoOverlay
        })
    }
    const isFieldsDisabled = formState == 'saving';
    if (!options) {
        return null
    }
    return (
        <Box mx={'10%'} my={'2%'}>
            <Card>
            <CardContent>
                <Grid container direction={'column'} spacing={4}>
                    <Grid item>
                        <Typography variant='h4'>Anime Manager Options</Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'>Anime Pins</Typography>
                        <TextField fullWidth placeholder='Enter your favorite anime you want to pin' value={options.animePinned}
                        onChange={
                            (event) => handleAnimePinnedChange(event.target.value)
                        }
                        disabled={isFieldsDisabled}
                        />
                    </Grid>
                    <Grid item>
                        <Typography variant='body1'>Auto toggle overlay on webpage load</Typography>
                        <Switch 
                            color="primary"
                            checked={options.hasAutoOverlay}
                            onChange={(event, checked)=> handleAutoOverlayChange(checked)}
                            disabled={isFieldsDisabled}

                        />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary"
                        onClick={handleSaveButtonClick}
                        disabled={isFieldsDisabled}
                        >
                            {formState === 'ready' ? 'save': 'saving...'}
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </Box>
        
    )
}
const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(<App/>, root)