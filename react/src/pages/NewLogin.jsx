import { useState } from "react";
import {Link,useNavigate}from "react-router-dom"

const API_URL = "https://mynotes-app-mgm7.onrender.com/api/v1"; 

function NewLogin(){
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    
    const handleFun=async (e) => {
        e.preventDefault();
        try{
            const res=await fetch(`${API_URL}/auth/login`,{
                method:"POST",
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({email,password})
            });
            const data=await res.json();

            if(data.success){
                localStorage.setItem('token',data.token)//saving the token in the browser
                navigate('/dashboard')
            }else{
                alert(data.error)
            }
        }catch(err){
            alert("Something went wrong didnt get the data")
        }
        
    }

    return(
        <>
        <form onSubmit={handleFun}>
            <input type='email' placeholder="type email " value={email} onChange={((e)=>setEmail(e.target.value))}></input>
            <input type='password' value={password} onChange={((e)=>setPassword(e.target.value))}></input>
            <button type="submit">Login</button>

        </form>
        <p>new here? <span>Register</span></p>
        </>
    )
}
export default NewLogin;