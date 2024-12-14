import React from 'react'
import { GrDocumentText } from "react-icons/gr";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from 'react-router-dom';


export default function MainPublications(){

    return (
        <div className='flex mx-auto w-full px-28 pt-10 gap-80 bg-slate-200 h-full '>
           
           <h1 className='text-4xl font-sans'><strong>Publications</strong></h1>
        
           <div className="flex flex-col gap-10 py-7">
           {Array(4).fill().map((_, idx) => (
             <div key={idx} className="flex flex-col gap-1">
               <div className="flex gap-4 justify-center align-middle hover:text-violet-600 cursor-pointer duration-300">
                 <GrDocumentText className='my-auto'/>
                 <p className="mt-1"> Data Mixture Inference: What do BPE Tokenizers Reveal about their Training Data?.</p>
               </div>
               <br />
               <div className="flex gap-5">
                 <button className="border-2 rounded-xl border-black hover:text-white hover:bg-violet-600 py-1 px-3 duration-300">DOI</button>
                 <button className="border-2 rounded-xl border-black hover:text-white hover:bg-violet-600 py-1 px-3 duration-300">Download</button>
                 <button className="border-2 rounded-xl border-black hover:text-white hover:bg-violet-600 py-1 px-3 duration-300">Recommended Citation</button>
               </div>
               <br />
             </div>
           ))}

  <span className="hover:text-violet-600 cursor-pointer text-2xl duration-300 flex">
    <Link to='/publications'>SEE ALL PUBLICATIONS 
    {/* <MdOutlineKeyboardArrowRight className="my-auto" /> */}
    </Link>
  </span>
</div>




                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
        </div>
    )

}