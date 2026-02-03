import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";

const API_URL="https://mynotes-app-mgm7.onrender.com/api/v1";

function NewRegister(){
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();


    const handlefun=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch(`${API_URL}/auth/register`,{
                method:"POST",
                headers:{'Content-type':"application/json"},
                body:JSON.stringify({name,email,password})
            })
            const data =await res.json();//await bec it takes time to convert the data coming from the network also it comes in chunks 

            if(data.success){
                localStorage.setItem('token',data.token)//setting the token in the browser
                navigate('/dashboard');
            }else{
                alert(data.err);
            }
        }catch(err){
            alert(err.message);
        }
    };

    return(
        <>
        <h1>
                Register Form 
        </h1>
        <form onSubmit={handlefun}>
            <input type="text" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/">Login</Link></p>
        </>
    )

}
export default NewRegister;