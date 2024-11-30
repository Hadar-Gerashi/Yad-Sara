import { Link } from "react-router-dom"
import "./navBar.css"

export default function NavBar() {

    return <>

        {/* //הצגת תמונת הלוגו */}
      {/* <img src="../src/assets/images/לוגו.png" className="logo" width={"170px"} height={"90px"} ></img> */}

        {/* //רשימה של הקישורים בראש העמוד */}
        <ul className="header_links">
             {/* //הצגת תמונת הלוגו */}
      <img src="../src/assets/images/לוגו.png" className="logo" width={"170px"} height={"90px"} ></img>
        
            <li><Link className="link" to=""><b>לקמפיין</b></Link></li>
            <li><Link className="link" to="donations"><b>תרומות</b></Link></li>
            <li><Link className="link" to="addDonations"><b>תרום</b></Link></li>
        </ul>

    </>

}