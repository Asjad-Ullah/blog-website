import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export function Auth({ authType }: { authType: "signup" | "signin" }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    
    async function sendSignUpRequest() {
        try {
            const response = await axios.post("https://backend.moeezasjad.workers.dev/api/v1/user/signup", { name: name, email: email, password: password });
            const jwt = response.data.token;
            const username = response.data.username;
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("username", username);
            navigate("/blogs");
        } catch (err) {
            alert("An error occurred. Please try again.");
        }
        
    }

    async function sendSignInRequest() {
        try {
            const response = await axios.post("https://backend.moeezasjad.workers.dev/api/v1/user/signin", { email: email, password: password });
            const jwt = response.data.token;
            const username = response.data.username;
            localStorage.setItem("jwt", jwt);
            localStorage.setItem("username", username);
            navigate("/blogs");
        } catch (err) {
            alert("An error occurred. Please try again.");
        }
        
    }

    return (
        <div className="flex justify-center flex-col h-screen">
            <div className="flex justify-center mb-12 ">
                <p className="text-white font-poppins font-extrabold text-5xl bg-black p-3 rounded-md">
                    Blog<span className="text-[#39ff14]">*</span>
                </p>
            </div>
            <div className="flex justify-center"> 
                <div>
                    <h1 className="font-poppins text-3xl font-extrabold px-5">
                        {authType==="signup" ? "Create an account": "Sign into account"}
                    </h1>
                    <div className="font-poppins text-md font-sm text-zinc-400 pt-2 px-5">
                        {authType==="signup" ? "Already have an account?": "Don't have an account?"}
                        <Link className="underline pl-1" to={authType==="signup" ? "/signin": "/signup"}>{authType==="signup" ? "Sign In": "Sign Up"}</Link>
                    </div>
                    {
                        authType === "signup" ? <InputField onChange={(e)=>{setName(e.target.value)}} type="text" label="Name" placeholder="Asjad Ullah"></InputField>: null
                    }
                    <InputField onChange={(e)=>{setEmail(e.target.value)}} type="email" label="Email" placeholder="human@earth.xyz"></InputField>
                    <InputField onChange={(e)=>{setPassword(e.target.value)}} type="password" label="Password" placeholder="******"></InputField>
                    <Button onClick={authType === "signup"? sendSignUpRequest: sendSignInRequest} text={authType==="signup" ? "Sign Up": "Sign In"}></Button>
                </div>
            </div>
        </div>
    )
}



interface inputFieldProps { 
    type: string, 
    label: string, 
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}
function InputField({ type, label, placeholder, onChange }: inputFieldProps) {
    return (
        <div className="mt-5">
            <label className="font-poppins text-sm font-semibold">{label}</label>
            <input onChange={onChange} type={type} placeholder={placeholder} className="w-full border border-zinc-200 rounded-md px-3 py-2 mt-3" />
        </div>
    )
}

function Button({onClick, text }: {onClick: () => void, text: string}){
    return (
        <button onClick={ onClick } className="w-full bg-black hover:bg-zinc-800 font-semibold font-poppins text-white rounded-md py-2 mt-5">
            {text}
        </button>
    )
}