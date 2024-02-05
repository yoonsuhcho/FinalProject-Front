import {alpha, makeStyles} from '@material-ui/core/styles';
/*xs, extra-small: 0px
sm, small: 600px
md, medium: 900px
lg, large: 1200px
xl, extra-large: 1536px */
export default makeStyles((theme) => ({
    title:{
        display: 'none',
        [theme.breakpoints.up('sm')]:{
            display:'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover':{backgroundColor : alpha(theme.palette.common.white, 0.25)},
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {marginLeft: theme.spacing(3), width: 'auto'},
    },

    searchIcon: {
        padding: theme.spacing(0,2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    inputRoot: {
        color: 'inherit',
    },

    inputInput: {
        padding: theme.spacing(1,1,1,0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`
    },

    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },

}));