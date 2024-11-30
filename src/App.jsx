import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './app.css'
import OneDonation from './OneDonation'
import Donations from './Donations'
import { Route, Routes,useLocation } from 'react-router-dom'
import AddDonation from './AddDonation'
import NavBar from './NavBar'
import Home from './Home'
import Campaign from './Campaign '
import Button from '@mui/material/Button';



function App() {
  const location = useLocation(); // מקבלים את המיקום הנוכחי של ה-URL
  // const [count, setCount] = useState(0)

  //פונקציה ששולפת מlocal storage את מערך האנשים שכבר תרמו אם אין מערך תחזיר מערך ריק ובהמשך
  //  יהיו בדיקות בהתאם במקומות המתאימים
  function getLocalStorage() {
    let result = localStorage.getItem("ListDonations")
    if (!result)
      return [];
    return JSON.parse(result)
  }



  //מערך סטטי של האנשים שתרמו
  let [donationsList, setDonationsList] = useState(getLocalStorage)


  //משתנה סטטי שסוכם כמה כסף תרמו עד עכשיו
  const [sum, setSum] = useState(donationsList.reduce((total, donation) => total + parseFloat(donation.money), 0));

  //משתנה בסטייט שכל פעם ישמור לי איזה סוג בכסף האתר נמצא ומהו שער הדולר
  const [coin, setCoin] = useState({ type: "shekel", dollarRate: 0 });


  //פונקציה שתעשה בפעם הראשונה של טעינת האתר והיא תביא לנו מהשרת את שער הדולר
  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/b7d83d6744f1d5ba43cf2747/latest/USD')
      .then(res => res.json())
      .then(data => {
        console.log(data.conversion_rates.ILS)
        setCoin({ ...coin, dollarRate: data.conversion_rates.ILS })

      }).catch(err => { console.log(err) })
  }, [])



  //פונקציה להוספת תרומה חדשה למערך התרומות
  function AddNewDonation(newDonation) {
    if (donationsList.length == 0)
      newDonation.id = 1
    else {
      newDonation.id = donationsList[donationsList.length - 1].id + 1
    }
    newDonation.date = new Date();
    localStorage.setItem("ListDonations", JSON.stringify([...donationsList, newDonation]))
    setDonationsList([...donationsList, newDonation])
    let copy = sum
    setSum(parseFloat(copy) + parseInt(newDonation.money))

  }




  //פונקציה שמתי שלוחצים על הכפתור של דולר/שקלים הוא ישנה את הערך של coin בהתאם
  function changeType(type) {
    if (type == "dollar")
      setCoin({ ...coin, type: "shekel" })
    else
      setCoin({ ...coin, type: "dollar" })
  }




  return (


    <>
      {/* //הקישורים ל2 העמודים */}
      <NavBar />


      {/* הכפתור לשינוי האתר מדולר לשקלים וכן להפך */}
      <div className="currency-container">
        <Button variant="contained" style={{ marginTop: "-35px", position: "fixed" }} value={coin.type}
          onClick={e => changeType(e.target.value)}>{coin.type == "shekel" ? "דולר" : "שקלים"}</Button>
        {/* <button style={{ marginTop: "-31px", position: "fixed" }} value={coin.type} 
        onClick={e => changeType(e.target.value)}>{coin.type == "shekel" ? "דולר" : "שקלים"}</button> */}
      </div>
      {/* 
  

      {/* //הצגת הסכומים של הקמפיין */}
     { location.pathname != '/'   &&<Campaign arr={donationsList} sum={sum} coin={coin} />} 


      {/* //שינוי הurl והבאת הדף הרצוי */}
      <Routes>
        <Route path='donations' element={<Donations donationsList={donationsList} coin={coin} />}></Route>
        <Route path='addDonations' element={<AddDonation funcAdd={AddNewDonation} coin={coin} />}></Route>
        <Route path='*' element={<Home/>}></Route>
      </Routes>

    </>
  )
}

export default App




