import type {Metadata} from 'next';
import {AdminEditor} from './AdminEditor';
import './admin.css';
export const metadata:Metadata={title:'Publishing desk',robots:{index:false,follow:false}};
export default function AdminPage(){return <AdminEditor/>;}
