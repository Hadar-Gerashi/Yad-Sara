import "./oneDonation.css"
import { ShekelToDollar, LastTime } from './helpPage'
import { useEffect, useState } from 'react'

//היבוא בשביל ספרית mui
import * as React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Avatar from '@mui/material/Avatar';




export default function OneDonation(props) {


    //פונקציה ומשתנה סטטי לדעת אם נלחץ הלב וזה נלקח מספרית Mui
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked);
    };


    // פונקציה שמקבלת את שם התורם ויוצרת לו עיגול עם צבע שונה וזה נלקח מספרית הmui
    function stringToColor(string) {
        let hash = 0;
        let i;

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }



    return <>
        <div className="donation-container">

            {/* //הצגת האות הראשונה של התורם */}
            <Avatar className="letter" sx={{ bgcolor: stringToColor(props.one.name) }}>{props.one.name[0]}</Avatar>

            {/* //הצגת ההקדשה */}
            <p className="dedication">{props.one.dedication}</p>


            {/* //הצגת כמות התרומה ושם התורם */}
            <p className="money">{ShekelToDollar(props.one.money, props.coin)} <b>  {props.one.name}</b></p>

            {/* //הצגה לפני כמה זמן תרמו */}
            <p className="time">לפני {LastTime(props.one.date)}</p>


            {/* //הצגת לב שאפשר ללחוץ עליו והוא נהפך לאדום */}
            <BottomNavigationAction className="heart" label="" icon={<FavoriteIcon style={{
                color: liked ? '#ff3d47' : 'black',  // אם נלחץ, הצבע של האייקון יהיה לבן
            }} />} style={{ width: "0px", padding: "0" }} onClick={handleClick} />


        </div>
    </>
}






