import type {Metadata} from 'next';
import Link from 'next/link';
import QualityRater from '../../components/QualityRater';
export const metadata:Metadata={title:'The 25-quality self-assessment',description:'Reflect on 25 qualities, rate your past seven days, calculate your overall score, and copy your assessment.',alternates:{canonical:'/ambition/assessment'}};
export default function Assessment(){return <><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/ambition">Ambition</Link><span>/</span><span>Quality assessment</span></nav><QualityRater/></>;}
