import React from "react";
import Logo from "../Logo";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className=" bg-slate-500 h-72 border-t-2 border-black">
      <div className=" px-2 py-8 flex flex-wrap h-full">
        <div className="bg-slate-500 w-1/3 flex flex-col items-center justify-between">
          <div>
            <Logo height="160px" />
          </div>
          <div>
            <p>&copy; Copyright 2024. All Rights Reserved.</p>
          </div>
        </div>
        <div className="bg-slate-500 w-2/3 flex flex-wrap justify-evenly">
          <div className="flex flex-col">
            <h3 className="text-center my-8 text-sm text-zinc-900">SUPPORT</h3>
            <ul className=" justify-items-center space-y-3 font-medium ">
              <li>
                <Link to="/" className="hover:text-gray-700">Account</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-700">Help Center</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-700">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-center my-8 text-sm text-zinc-900">COMPANY</h3>
            <ul className="justify-items-center space-y-3 font-medium">
              <li>
                <Link to="/" className="hover:text-gray-700">About Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-700">Pricing</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-700">Press Kit</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-700">Affiliate Programs</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-center my-8 text-sm text-zinc-900">LEGALS</h3>
            <ul className="justify-items-center space-y-3 font-medium">
              <li>
                <Link to="/" className="hover:text-gray-700">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-700">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-700">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
