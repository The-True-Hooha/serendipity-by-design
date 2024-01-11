import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='inset-x-0 bottom-0 '>
      <div className='lg:px-[300px] shadow-lg py-4 border bg-slate-300 flex'>
        <p className='font-sora font-bold px-[30px]'>&copy; {currentYear} David Ogar</p>
        <p className='font-sora'>curiosity and perseverance</p>
      </div>
    </footer>
  );
}
