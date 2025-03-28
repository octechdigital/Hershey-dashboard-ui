import './style.scss'
import {Link} from "react-router-dom";





export default function ErrorPage() {
    return(
        <div className={"errorPage"} >
            <h1>Something Went Wrong !</h1>
           <Link to={"./"} ><button>GO Back</button></Link>
        </div>
    )
}