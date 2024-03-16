'use client'

import React, { useState } from 'react';
import Image from 'next/image';

const openInNewTab = (url: string) => {
  const win = window.open(url, '_blank');
  win?.focus();
};

export default function Home() {
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <main>
      <div className="flex justify-evenly pt-10">
        <div className='items-start'>
          <div className='pt-5 flex flex-col items-center'>
            <p className='py-5 cursor-pointer text-2xl font-bold' onClick={() => openInNewTab(`http://www.github.com/cdseaholm`)}>
              Github Profile
            </p>
            <p className='cursor-pointer text-2xl font-bold' onClick={() => openInNewTab(`https://www.linkedin.com/in/carlseaholm/`)}>
              LinkedIn Profile
            </p>
          </div>
        </div>
        <div className='w-2/6 flex-col text-right justify-items-right' style={{paddingLeft: clicked ? 14 : 0}}>
          <p className="text-2xl pt-5">Constantly learning, improving, and trying something new. Follow along, check out my Coding projects, current book I&apos;m trying to publish and the other that I&apos;m writing.</p>
          <p className="text 2xl pt-5 tp-2">Currently focusing on improving my JavaScript and TSX applications. As well as learning to site read while playing piano, improving guitar playing, and writing.</p>
        </div>
      </div>
    </main>
  );
}