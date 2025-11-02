"use client";

import { useState } from "react";

export default function Home() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [responseText, setResponseText] = useState("");


  const addExpense = async () =>{
    if(!item || !price) return alert("Enter both fields")
    
    const response = await fetch("/api/expense", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({item, price: Number(price)}),
    });
    
    if(response.status===200){
      setResponseText("Expense Added")
    }
    else{
      setResponseText("Failed to add Expense")
    }
    
    setItem("");
    setPrice("");
  }

  return(
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4"> Expense Tracker </h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Item"
          className="border p-2 rounded flex-1"
          value={item}
          onChange={(e)=> setItem(e.target.value)}
        />
        <input
          type="number"
          min="0"
          placeholder="Price"
          className="border p-2 rounded flex-1"
          value={price}
          onChange={(e)=>setPrice(e.target.value)}
        />
        <button
          onClick={addExpense}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add Expense  
        </button>
      </div>
      {responseText ? <p className="flex gap-2 mb-4">{responseText}</p> : <></>}
    </main>
  )
}