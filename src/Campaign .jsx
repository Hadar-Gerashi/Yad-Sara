import "./campaign.css"
import { ShekelToDollar } from './helpPage'
export default function Campaign(props) {

  //הסכום של יעד הקמפיין
  const target = 800000;


  //כאן יש חישוב שאם כבר הגענו ליעד אז הציר הכחול יהיה 100 אחוז כדי שלא יגלוש
  //ןאם לא הגענו ליעד אז תעשה חישוב מתאים
  let w = 0
  if (props.sum >= target) {
    w = 100
  }
  else
    w = (props.sum * 100) / target




  return <>

    <div className="campaign-container">

      {/* ציר האחוזים */}
      <div className="campaign-progress-bar">

      {/* הכחול שעל ציר האחוזים */}
      <div className="progress-fill" style={{ width: `${w}%` }}></div>


      {/* //הצגת הלב שעל הציר הכחול עם הכיתוב של האחוזים עליו */}
      <div className="heart2" style={{
          marginRight: `${w - 0.7}%`, marginTop: "-5vh"
      }}><p style={{ transform: 'rotate(-45deg)', fontSize: "0.9rem" }}><b>{parseInt((props.sum * 100) / target)}%</b></p></div>

      </div>


      {/* הסכום שהשיגו עד עכשיו */}
      <h1 className="summ" >{ShekelToDollar(props.sum, props.coin)}</h1>



      {/* יעד הקמפיין */}
      <h2> יעד הקמפיין: {ShekelToDollar(target, props.coin)}</h2>

      {/* מספר התורמים */}
      <p>קיים {props.arr.length == 0 ? 0 : props.arr[props.arr.length - 1].id} תורמים </p>

    </div>

  </>

}









