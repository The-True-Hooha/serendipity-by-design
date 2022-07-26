import React from 'react';
import Link from 'next/link';

export default function Newsletter () {
    return (
        <div className='lg:py-[100px] lg:px-[300px] h-screen text-justify lg:max-w-[1300px]'>
            <div className='py-[100px] px-[30px]'>
                <h2 className='font-oxygen text-blue-500 font-bold text-[30px]'>Hello there 👋</h2>

                <h3 className='font-sora mt-4 font-semibold'>I also run Serendipity by Design as a newsletter service so you can basically receive new post updates right to your email.</h3>
                <p className='mt-1 font-mono font-bold'>less Hassle, no stress. (shey you get?!)</p>

                <p className='mt-10 font-semibold font-oxygen'>So if you find my stuff interesting, kindly subscribe</p>

                <button className='mt-4 border bg-blue-700 px-6 py-3 text-[15px] text-white rounded-lg'>
                    <Link target="_blank" href="https://davidhero.substack.com/?utm_source=substack&utm_medium=web&utm_campaign=substack_profile?utm_source=%2Fprofile%2F24594298-davidhero&utm_medium=reader2">subscribe!</Link></button>
            </div>
        </div>
    )
}