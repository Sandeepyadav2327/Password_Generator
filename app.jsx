import React, { useCallback, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function PasswordGenerator(){

    const [Password,setPassword]=useState("Syaanddaevep");
    const[length,setLength]=useState(10);
    const[numberChanged,setnumberChanged]=useState(false)
    const[charChanged,setcharChanged]=useState(false);

    // function generatePassword(){
    //     let str="abcdefghijklmnopqrstuvwsyxABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //     if(numberChanged){
    //         str+="1234567890";
    //     }
    //     if(charChanged){
    //         str+="~!$%^&*()_+-=/|:<>"
    //     }
    //     let pass="";
    //     for(let i=0;i<length;i++){
    //         pass+= str[Math.floor(Math.random()*str.length)];
    //     }
    //     setPassword(pass);
    // }
    // normal likhenge to har bar jab koi bhi setpass, setleng, etc call hoga tab ye function bhi call hoga aur har bar ise heap me memory allocate hogi
    // isse bachne k liye ham usecallback use karte hai us

    const generatePassword=useCallback(()=>{
        let str="abcdefghijklmnopqrstuvwsyxABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if(numberChanged){
            str+="1234567890";
        }
        if(charChanged){
            str+="~!$%^&*()_+-=/|:<>"
        }
        let pass="";
        for(let i=0;i<length;i++){
            pass+= str[Math.floor(Math.random()*str.length)];
        }
        setPassword(pass);
    },[length,numberChanged,charChanged]);


    ///use call back use karne se jab length,numberChanged,charChanged inme se koi eak change hoga tabhi generatePassword call hoga nahi to pahale jab ham alag fun 
    // me likh rahe the tab ye bar bar call ho raha tha aur is function ko har bar heap me memory allocate ho rahi thi

    // generatePassword(); // isse infiline loop me chala jayega bar bar generatepassword setpassword call hoga aur infinite loop chal jayega 

    // isliye ham useEffect hook use karenge
    useEffect(()=>{
        generatePassword();
    },[length,numberChanged,charChanged])
    // ye eak bar hi chalega bas 
   return(
        <>
        <h1>Password is:  {Password}</h1>
        <div className="second">
            <input type="range" min={5} max={50} value={length} onChange={(e)=>setLength(e.target.value)}/>
            <label>Length is {length}</label>

            <input type="checkbox" defaultChecked={numberChanged} onChange={()=>setnumberChanged(!numberChanged)}/>
            <label>Number</label>

            <input type="checkbox" defaultChecked={charChanged} onChange={()=>setcharChanged(!charChanged)}/>
            <label>Special Character</label>
        </div>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')).render(<PasswordGenerator></PasswordGenerator>);