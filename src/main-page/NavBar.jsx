import React from "react";
import {Link} from 'react-router-dom'
import { CiSearch } from "react-icons/ci";

export default function NavBar (){
    return (
           <div className="text-3xl flex justify-between align-middle p-10 top-0 w-full gap-96 fixe mx-auto cursor-pointer shadow-md shadow-slate-700">
                        <Link to='/' className="hover:text-violet-600  duration-300">Dr. Fadi Herzallah Dashboard</Link>
                        <div className=" flex gap-5 justify-center align-middle">
                        <Link to='/publications' className="hover:text-violet-600 duration-300">publications</Link>
                        <Link to='/' className="hover:text-violet-600 duration-300">Add Publicaiton</Link>
                        </div>
            </div>



    );
} 



