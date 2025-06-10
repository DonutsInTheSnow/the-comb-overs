'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <div className="md:flex md:justify-center">
        <footer className="fixed bottom-0 w-[100%] md:bottom-15 z-50 p-4 bg-[#55858b] text-center text-white md:w-[375px] md:rounded-[10px] md:shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
            <div className="flex justify-center space-x-7 mt-2">
                <Link href="https://x.com" target="_blank" rel="noopener noreferrer">
                <Image src="/x-icon.png" alt="X" width={35} height={35} />
                </Link>
                <Link href="https://spotify.com" target="_blank" rel="noopener noreferrer">
                <Image src="/spotify-icon.png" alt="Spotify" width={35} height={35} />
                </Link>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Image src="/facebook-icon.png" alt="Facebook" width={35} height={35} />
                </Link>
            </div>
        </footer>
    </div>
  );
}