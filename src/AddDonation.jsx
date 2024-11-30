import { useState } from "react";
import Campaign from "./Campaign ";
import "./addDonation.css"
import { ShekelToDollar } from './helpPage'
import {isNumber,isTrueName} from './helpPage'

//היבוא בשביל ספרית mui
import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';




export default function AddDonation(props) {


  //אוביקט סטטי של שגיאות הטופס
  let [myErrors, setMyErrors] = useState({})



  //אוביקט סטטי להוספת תרומה חדשה למערך לבסוף
  let [newDonation, setNewDonation] = useState({
    id: 0, name: "", dedication: "", money: "", date: undefined
  })




  //פונקציה שמקבלת את הארוע בעת שינוי
  //  ושמה במקום המתאים באוביקט המעותק לפי השם ומעדכנת את האוביקט המקורי
  function change(e) {
    let { type, value, name } = e.target;
    if (type == "number") {
      value = +value
    }//המרה לערך מספרי}
    let copy = { ...newDonation };
    copy[name] = value
    setNewDonation(copy);
  }







//משתנה סטטי שמשתנה בפונקציה אחריו וזה לalert המעוצב 
//וזה מספרית mui
  const [open, setOpen] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  //  //פונקציה בעת שליחה שמבטלת את ברירת המחדל שזה כביכול שליחה לשרת 
  ////ובודקת אם מערך השגיאות ריק הוא יוסיף את התרומה למערך אם לא זה יציג את מערך השגיאות 
  function submit(e) {
    e.preventDefault();

    let result = error();
    if (Object.keys(result).length == 0) {
      //לעדכן בשביל ההודעה שתקפוץ  כי הפרטים נכונים
      setOpen(true)

      //אם הסוג זה דולר אז תשמור לי את זה
      // במערך כשקלים ולכן צריך להכפיל זאת בשער הדולר
      if (props.coin.type == "dollar")
        newDonation.money = (newDonation.money * props.coin.dollarRate);

      props.funcAdd(newDonation);
      setNewDonation({ ...newDonation, name: "", dedication: "", money: "" })
    }


    setMyErrors(result)
  }




  //פונקצית חץ של השגיאות -עושה בדיקות תקינות לטופס ואם יש שגיאה 
  //היא שמה במערך err בkey מתאים לפי שם השדה את מלל השגיאה 
  //ולבסוף מחזירה את המערך הזה
  const error = () => {
    let err = {};
    if (!newDonation.money)
      err.money = "שדה חובה"

    else if (newDonation.money < 1 || !isNumber(newDonation.money))
      err.money = "לא הוזן סכום תקין"


    if (!newDonation.name)
      err.name = "שדה חובה"

    else if (!isTrueName(newDonation.name))
      err.name = "שם לא תקין"


    else if (newDonation.name.length < 2)
      err.name = "שם קצר מדי"


    if (!newDonation.dedication)
      err.dedication = "לא הוזנה הקדשה"


    return err;
  }








  return <>


    <form onSubmit={submit}>



      <label htmlFor="money">סכום התרומה:</label>
      <input type="text" name="money" id="money" value={newDonation.money} onChange={change}
      />

      {/* //הצגת מלל השגיאה */}
      {myErrors.money && <div style={{ color: "red", marginTop: "-4%" }}>*{myErrors.money}</div>}


      <label htmlFor="name">שם התורם:</label>
      <input type="text" name="name" id="name" autoComplete="name" value={newDonation.name} onChange={change} />


      {/* //הצגת מלל השגיאה */}
      {myErrors.name && <div style={{ color: "red", marginTop: "-4%" }}>*{myErrors.name}</div>}

      <label htmlFor="dedication" >הקדשה:</label>
      <textarea rows="4" cols="5" name="dedication" id="dedication" value={newDonation.dedication} onChange={change}></textarea>


      {/* //הצגת מלל השגיאה */}
      {myErrors.dedication && <div style={{ color: "red", marginTop: "-4%" }}>*{myErrors.dedication}</div>}



      <Button style={{ direction: "ltr" }} endIcon={<SendIcon />} variant="contained" type="submit" >
        שליחה
      </Button>

      
      {/* //alert מעוצב מumi */}
      <Snackbar open={open} autoHideDuration={6000}  onClose={handleClose} direction="ltr" >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%'}}

        >
 <div style={{ whiteSpace: 'pre-wrap' }}>
      {"   התרומה נוספה בהצלחה   "}
    </div>
        </Alert>
      </Snackbar>


    </form>
  </>




}

















