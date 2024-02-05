import React ,{useState} from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl,Select } from '@material-ui/core'

import useStyles from './styles';
import PlaceDetails from "../detail/PlaceDetails";

const List = ({places}) => {
    const classes = useStyles();
    const [type,setType] = useState('golf');
    const [rating,setRating] = useState(0);
    return (
        <div className={classes.container}>
            <Typography variant='h5'>주변 시설 목록</Typography>
            <FormControl className={classes.formControl}>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                    <MenuItem value="golf">골프</MenuItem>
                    <MenuItem value="restaurants">식당</MenuItem>
                    <MenuItem value="hotels">숙소</MenuItem>
                    <MenuItem value="attractions">즐길거리</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <Select value={rating} onChange={(e) => setRating(e.target.value)}>
                    <MenuItem value={0}>전체</MenuItem>
                    <MenuItem value={3}>3점 이상</MenuItem>
                    <MenuItem value={4}>4점 이상</MenuItem>
                    <MenuItem value={4.5}>4.5점 이상</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i)=> (
                    <Grid item key={i} xs={12}>
                        <PlaceDetails place={place}/>
                    </Grid>
                ))}
            </Grid>
        </div>

    )
}

export default List;