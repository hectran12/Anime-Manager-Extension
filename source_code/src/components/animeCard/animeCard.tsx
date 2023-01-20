import React, {useEffect, useState} from "react"
import { fetchAnime,Anime,getUrlImageRecommend} from "../../utils/api"
import { Card, CardContent, CardActions, Button, Typography, CardMedia, Box  } from "@mui/material"
import './animeCard.css'
const AnimeCardContainer: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    return (
        <Box mx={'4px'} my={'16px'}>
            <Card sx={{ display: 'flex' }}>
                {children}
                
            </Card>
            
        </Box>
    )
}

type AnimeCardState = "loading" | "error" | "ready";
const AnimeCard: React.FC<{
    anime_name: string;
    index: number;
    onFavourite?: () => void;
    onDelete?: () => void;
}> = ({ anime_name, index, onFavourite, onDelete}) => {
    const [AnimesData, setAnimesData] = useState<Anime[] | null>(null);
    const [cardState, setCardState] = useState<AnimeCardState>("loading");
    useEffect(()=>{
        fetchAnime(anime_name).then((data)=> {
            setAnimesData(data);
            setCardState('ready');
        }).catch((err) => setCardState('error'));
    }, [anime_name]);
    if (cardState == "loading" || cardState == "error") {
        return (
            <AnimeCardContainer>
                <Typography paddingTop={"10px"} paddingBottom={"10px"} paddingLeft={"10px"} paddingRight={"10px"} className='animeCard-body'>
                    {cardState == "loading" ? "Retrieving data from this anime..." : "Can't get data from this Anime!"}
                </Typography>
                <CardActions>
                    {
                        onFavourite &&
                        <Button color="secondary" className='animeCard-body'  onClick={onFavourite}>Favorite</Button>
                    }
                    {
                        onDelete &&
                        <Button variant="outlined" className='animeCard-body'  onClick={onDelete}>Delete</Button> 
                    }
                </CardActions>
            </AnimeCardContainer>
        )
    }
    return (
        <AnimeCardContainer>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" className="animeCard-title">
                {AnimesData[index].name}
                </Typography>
                <Typography  className='animeCard-body' color="text.secondary" component="div">

                {AnimesData[index].type}
                </Typography>
                <Typography  className='animeCard-body' color="text.secondary" component="div">

                {'Scores:' + AnimesData[index].rate + '/' + AnimesData[index].members + ' menbers'}
                </Typography>
                <Typography  className='animeCard-body' color="primary" component="div">

                {'Recommended to watch: '+ AnimesData[index].Recommend_to_see}
                <img src={getUrlImageRecommend(AnimesData[index].Recommend_to_see)} height={"15px"} width={"15px"}/>
                </Typography>
                <CardActions>
                    {
                        onFavourite &&
                        <Button color="secondary" className='animeCard-body'  onClick={onFavourite}>Favorite</Button>
                    }
                    {
                        onDelete &&
                        <Button variant="outlined" className='animeCard-body'  onClick={onDelete}>Delete</Button> 
                    }
                </CardActions>
                </CardContent>
            </Box>
        <CardMedia
            component="img"
            sx={{ width: 80 }}
            image={AnimesData[index].img}
            alt={AnimesData[index].name + ' image'}
        />
        </AnimeCardContainer>
        
        
    )
    
}

export default AnimeCard