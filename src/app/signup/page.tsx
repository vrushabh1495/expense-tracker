"use client";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";

export default function SignupPage(){
    
    const [user, setUser] = React.useState({
        email:"", password:"", username:" "
    });
    const router = useRouter();

    const onSignUp = async () => {
        const res = await fetch('/api/users/signup',{
            method: "POST",
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(user)
        });
        if(res.ok){
            router.push("/login");
        }
        else{
            alert("Error during signup");
        }
    }


    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-white text-2xl">Signup</h1>
            <hr/>
            <label htmlFor="username">username</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
            />
            <label htmlFor="email">email</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <label htmlFor="password">password</label>
            <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="text"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <button onClick={onSignUp} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">SignUp</button>
            <Link href="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
        </div>
    )
}