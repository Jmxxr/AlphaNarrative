'use client';
import {useState} from 'react';
export default function ShareStory(){const [message,setMessage]=useState('');return <><button className="saved" onClick={async()=>{try{await navigator.clipboard.writeText(location.href);setMessage(' Link copied.');}catch{setMessage(' Copy the address from your browser.');}}}>Copy article link ↗</button><span role="status" style={{font:'14px Arial'}}>{message}</span></>;}
