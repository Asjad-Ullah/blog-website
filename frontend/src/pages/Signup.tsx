import { Quote } from "../components/Quote";
import { Auth } from "../components/Auth";

export function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
          <Auth authType="signup"/>
          
          <div className="invisible md:visible">
              <Quote/> 
          </div>
    </div>
  )
}