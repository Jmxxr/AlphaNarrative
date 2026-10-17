import {sameOrigin} from '../../../lib/request-origin';
import {Resend} from 'resend';
import {NextResponse} from 'next/server';
export async function POST(request:Request){
 if(!sameOrigin(request))return NextResponse.json({error:'Invalid origin.'},{status:403});
 const raw=await request.text();if(raw.length>12000)return NextResponse.json({error:'Your message is too long.'},{status:413});
 let body;try{body=JSON.parse(raw);}catch{return NextResponse.json({error:'Please check your message.'},{status:400});}
 if(body.website)return NextResponse.json({error:'Please leave the extra website field empty.'},{status:400});
 const {name,email,message,subject}=body;
 if(typeof name!=='string'||!name.trim()||name.length>100||typeof email!=='string'||email.length>160||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof message!=='string'||!message.trim()||message.length>4000||!['General enquiry','Advertising & partnerships','Story idea','Report an error'].includes(subject))return NextResponse.json({error:'Please check your name, email, subject, and message.'},{status:400});
 if(!process.env.RESEND_API_KEY)return NextResponse.json({error:'The message service is currently unavailable.'},{status:503});
 try{const result=await new Resend(process.env.RESEND_API_KEY).emails.send({from:'Alpha Narrative <onboarding@resend.dev>',to:'alphanarrativepro@gmail.com',replyTo:email,subject:`Alpha Narrative: ${subject}`,text:`Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`});if(result.error)throw Error('Delivery failed');return NextResponse.json({success:true});}catch{return NextResponse.json({error:'Your message could not be delivered right now.'},{status:502});}
}
