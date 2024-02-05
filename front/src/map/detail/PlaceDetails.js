import React from 'react'
import {Button, Card, CardActions, CardContent, CardMedia, Chip} from "@mui/material";
import {Box, Typography} from "@material-ui/core";

const PlaceDetails = ({place}) => {
    return (
        <Card elevation={6}>
            <CardMedia
                style={{height: 100}}
                image={place.photo ? place.photo.images.large.url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTADjstZwNwk-N2u_OgXGelncqeivG47Lh3Jw&usqp=CAU"}
                title={place.name}
            />

            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
            </CardContent>

            <Box display="flex" justifyContent="space-between">
                <Typography variant ="subtitle1">Price</Typography>
                <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Typography variant ="subtitle1">Ranking</Typography>
                <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
            </Box>

            {place?.awards?.map((award) => (
                <Box my={1} display="flex" justifyContent="space-between" alignItems="center">
                    <img src={award.images.small} alt={award.display_name}/>
                    <Typography variant="subtitle2" color="textSecondary">{award.display_name}</Typography>
                </Box>
            ))}

            <CardActions>
                <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                    Trip Advisor
                </Button>
                <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                    Website
                </Button>
            </CardActions>
        </Card>

    )
}

export default PlaceDetails