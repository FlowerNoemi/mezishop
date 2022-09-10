import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth";

const Admin = () => {
    const { auth } = useAuth();

    return (
        auth.roles === '2001' ? (

            <div className="App">
        
      
            <div className="App">
              KisCica
              </div>
          
            </div>
      
           ) : (
      
            <div className="App">
              <div className="App">
              Kiskugya
              </div>
            </div>
      
           )
      
          );  
      } 

export default Admin