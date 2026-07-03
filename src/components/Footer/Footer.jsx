import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-gray-400 py-12 px-6 font-sans text-xs border-t-4 border-red-850">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-slate-800">
        
        {/* Contact Information Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Contact Information</h3>
          <div className="space-y-2 leading-relaxed">
            <p className="font-bold">හෝමාගම ප්‍රාදේශීය සභාව,</p>
            <p>උසාවිය පාර,</p>
            <p>හෝමාගම</p>
          </div>
          <div className="space-y-1.5 mt-4">
            <p className="flex items-center gap-2">
              <span>📞</span> Phone: +94 11 285 5230 / +94 11 275 5108
            </p>
            <p className="flex items-center gap-2">
              <span>✉️</span> Email: homagamapradeshiyasabawa@gmail.com
            </p>
          </div>
          <div className="flex gap-3 pt-3">
            <a href="#" className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors">🌐</a>
            <a href="#" className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors">🎥</a>
            <a href="#" className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 transition-colors">📸</a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Quick Links</h3>
          <ul className="grid grid-cols-1 gap-2.5">
            <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Introduction</a></li>
            <li><a href="#" className="hover:text-white transition-colors">RTI Officers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Downloads</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>

        {/* Important Links Column */}
        <div className="space-y-4">
          <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Important Links</h3>
          <ul className="space-y-2.5 leading-relaxed font-bold">
            <li><a href="#" className="hover:text-white transition-colors">ශ්‍රී ලංකා රජයේ නිල අන්තර්ජාල පිවිසුම</a></li>
            <li><a href="#" className="hover:text-white transition-colors">නාගරික සංවර්ධන අධිකාරිය</a></li>
            <li><a href="#" className="hover:text-white transition-colors">රාජ්‍ය තොරතුරු කේන්ද්‍රය</a></li>
            <li><a href="#" className="hover:text-white transition-colors">ආරක්ෂක අමාත්‍යාංශය</a></li>
            <li><a href="#" className="hover:text-white transition-colors">පළාත් පාලන හා පළාත් සභා අමාත්‍යාංශය</a></li>
            <li><a href="#" className="hover:text-white transition-colors">රාජ්‍ය පරිපාලන, පළාත් පාලන හා ප්‍රජාතන්ත්‍රීය පාලනය පිළිබඳ අමාත්‍යාංශය</a></li>
          </ul>
        </div>

      </div>

      {/* Bottom Copyright bar */}
      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
        <div>
          Copyright &copy; {new Date().getFullYear()} Homagama Pradeshiya Sabha. All Rights Reserved.
        </div>
        <div>
          Concept, Design & Development by SLT
        </div>
      </div>
    </footer>
  );
};

export default Footer;
