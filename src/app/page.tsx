'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-[#29110b] text-white relative"> 
       <section className="relative h-[60vh] md:h-screen mt-[70px] sm:mt-0"> 
        <Image
          src="/images/landing-bg-mobile.webp"
          alt="The Comb Overs performing"
          fill
          sizes="(max-width: 767px) 100vw"
          className="object-cover opacity-50 md:block lg:hidden"
          priority
        />
        <Image
          src="/images/landing-bg-tablet.webp"
          alt="The Comb Overs performing on tablet"
          fill
          sizes="(min-width: 768px) 100vw, (min-width: 1280px) 100vw"
          className="object-cover opacity-50 hidden md:hidden lg:block xl:hidden"
          priority
        />
        <Image
          src="/images/landing-bg-desktop.webp"
          alt="The Comb Overs performing on desktop"
          fill
          sizes="(min-width: 1280px) 100vw"
          className="object-cover opacity-50 hidden xl:block"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 md:mt-[-250px] lg:mt-[-150px]">
          <h1 className="text-[54px] md:text-[112px] font-iceland" style={{ textShadow: '0 4px 4px #000000' }}>The Comb Overs</h1>
          <h2 className="text-[32px] md:text-[72px] font-joti mt-[-20px] md:mt-[-60px]" 
            style={{
              WebkitTextStroke: '1px #D0C779',
              color: '#000000',
              WebkitTextFillColor: '#000000'
            }}>Rocking the Dome</h2>
          <Link href="/products" className="mt-4 inline-block bg-[#d53302] px-6 py-2 text-xl md:text-2xl rounded focus:bg-[#d57902]">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Tour Teaser */}
      <section className="p-4 md:hidden">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Upcoming Shows</h2>
        <p className="text-center mb-4">Catch us live—check all dates!</p>
        <Link href="/tours" className="max-w-[80px] text-[#d53302] block mx-auto p-1 rounded border border-[#d53302] focus:underline">
          See All
        </Link>
      </section>
    </div>
  );
}