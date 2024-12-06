import { useState } from 'react'
import OneDonation from "./OneDonation";
import React, { useRef } from 'react';
import "./donations.css"

//היבוא בשביל ספרית mui
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';


export default function Donations(props) {

    //משתנה search,sort-use state בשביל העיצוב של החיפושים מספרית mui
    const [search, setSearch] = React.useState('');
    const [sort, setSort] = React.useState('');


    //משתנה שמשתנה בפונקציה בעמוד זה אבל כשהדף מתרנדם
    //  לא קורה לו כלום והוא נשאר כפי שהיה ללא שינוי או איפוס
    const typeSearch = useRef("name");



    //  מערך עותק סטטי של האנשים שתרמו 
    //כי למיונים אני לא רוצה לשנות את המערך המקורי
    let [copyArr, setCopyArr] = useState([...props.donationsList])
    



    // פונקציה שמקבלת סוג מיון וממינת עותק של עותק המערך המקורי 
    // לפי הנדרש ולבסוף מעדכנת את עותק המערך המקורי
    function sortBy(type,arr) {
        let copy = [...arr]

        switch (type) {
            case "old": {
                copy=copy.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            }
            case "new": {
                copy= copy.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            }

            case "high": {
                copy = copy.sort((a, b) => b.money - a.money)
                break;
            }

            case "low":
                {
                    copy = copy.sort((a, b) => a.money - b.money)
                    break;
                }
            case "": {
                copy.reverse()
                break;
            }



        }

        setCopyArr([...copy])
    }




    //- פונקציה שמקבלת סוג חיפוש ואת מה שהמשתמש חיפש
    // הקיש בינפוט ומחזירה  עותק של עותק המערך המקורי 
    // לפי הנדרש ולבסוף מעדכנת את עותק המערך המקורי
    function searchBy(type, txt) {
        let copy = [...props.donationsList]
        let arrHelp = []


        //אם לא בחרת כלום תציג את כל המערך
        if(type==""){
            arrHelp=[...copy].reverse()
        }


        //אחרת תבדוק את סוג הבחירה ותפעל בהתאם
        else{
        switch (type) {
            case "name": {
                copy.forEach(donation => {
                    if (donation.name.includes(txt) || txt == "")
                        arrHelp.push(donation)
                });
                break;
            }


            case "dedication": {
                copy.forEach(donation => {
                    if (donation.dedication.includes(txt) || txt == "")
                        arrHelp.push(donation)
                });

                break;
            }}
            
        }
        
        // let copya=arrHelp
        // setCopyArr(copya)
        setCopyArr(arrHelp)
        sortBy(sort,arrHelp);
    }






    return (<>

        <div className='search'>

            {/* // הצגת לשונית הבחירה עי איזה מיון להציג את המערך עי שימוש בעיצוב של ספרית mui*/}
            <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: "120px", marginTop: "1.5px" }} fullWidth>
                <InputLabel id="s" >מיין</InputLabel>
                <Select name='s' style={{ backgroundColor: "#f9f9f9", height: "35px" }}
                    labelId="s"
                    id="sort"
                    value={sort}
                    label="מיין"
                    autoWidth
                    onChange={(e) => {

                        sortBy(e.target.value,copyArr)
                        setSort(e.target.value);


                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value="old">ישן - חדש</MenuItem>
                    <MenuItem value="new">חדש - ישן</MenuItem>
                    <MenuItem value="high">גבוה - נמוך</MenuItem>
                    <MenuItem value="low">נמוך - גבוה</MenuItem>

                </Select>
            </FormControl>




            {/* // הצגת לשונית הבחירה עי איזה סוג חיפוש לחפש תרומה בודדת במערך  עי שימוש בעיצוב של ספרית mui*/}
            <FormControl sx={{ m: 1, minWidth: 80 }} style={{ width: "100px", marginTop: "1.5px" }} fullWidth>
                <InputLabel id="Search">חפש לפי</InputLabel>
                <Select name="search" style={{ backgroundColor: "#f9f9f9", height: "35px" }}
                    labelId="Search"
                    id="SearchSelect"
                    value={search}
                    label="Search"
                    onChange={(e) => {
                        typeSearch.current = (e.target.value)
                        console.log(typeSearch)
                        setSearch(e.target.value);

                    }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>v
                    <MenuItem value="name">שם</MenuItem>
                    <MenuItem value="dedication">הקדשה</MenuItem>

                </Select>
            </FormControl>





            {/* // עי שימוש בעיצוב בספרית Mui input לכתיבת ערך החיפש */}
            <TextField name="searchInput" style={{ width: "200px", height: "10px", marginTop: "-13px" }}
                id="standard-basic" label="מה אתה מחפש..." variant="standard" onChange={(e) => {
                    let txt = e.target.value
                  

                   searchBy(typeSearch.current, txt)
                    // sortBy(sort)
                 
                 
                    console.log(txt)
                }} />

        </div>



        {/* //הצגת המערך עי map ושליחה כל תרומה לקומפוננטה תרומה אחת להצגת התרומה */}
        {/* //השליחה נעשת על המערך בסדר הפוך כיון שאני רוצה את החדשים שהם יהיו הראשונים */}
        <div className='scrollable-container'>

            {copyArr.length == 0 ? <p>אין תוצאות תואמות</p> : copyArr.reverse().map((donation) => { return <OneDonation coin={props.coin} one={donation} key={donation.id}></OneDonation> })}
        </div>

    </>)

}




