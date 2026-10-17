import Image from 'next/image';
export default function JournalImage({src,alt,priority=false,sizes}:{src:string;alt:string;priority?:boolean;sizes:string}){return <Image src={src} alt={alt} fill priority={priority} sizes={sizes} unoptimized={src.startsWith('https:')}/>;}
