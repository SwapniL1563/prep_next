// server components
// component that run only on server
// never ship js to client
// can directly fetch data from a db or api
// rendered as static HTML + minimal hydration

// eg. app/page.js-> server component
export default async function Home() {
    const res = await fetch("https://api.example.com/products");
    const post = await res.json();

    return (
        <ul>
            { post.map((p) => {
                <li key={p.id}>{p.name}</li>
            })}
        </ul>
    )
}

// When to use server components?
// u need data fetching from DB,APIs
// u want fast initial load
// SEO matters(blogs,e-comm)
// u don't need interactivity and reduce js bbundle size

// -------------------------------------------------------

// Client Components 
// Components that run in browser
// u declare them using "use client" at top of file
// needed when u use state,effects, event listener or browser APIs

// eg. simple counter app

"use client"

import { useState } from "react";

export default function Counter() {
    const [count,setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count+1)}>Increment</button>
        </div>
    );
}

// When to use client components?
// u need state or lifecycle hooks(useState,useEffect)
// ui need interactivity
// u need event listener (onClick)
// u access browsers API (localStorage,window,document)

// ------------------------------------------------------

// U can also use both component in same 

import Counter from "./Counter";

export default function Page() {
    return (
       <div>
        <h1>
            Server Component
        </h1>
        <Counter />    // Client component inside server component
       </div>
    )
}



