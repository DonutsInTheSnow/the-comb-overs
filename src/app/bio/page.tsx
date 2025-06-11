'use client';

import Image from 'next/image';

export default function BioPage() {
  return (
    <div className="relative h-screen mt-[70px] sm:mt-0"> 
      <Image
        src="/images/bio-bg-mobile.webp"
        alt="The Comb Overs Bio Background Mobile"
        fill
        sizes="(max-width: 767px) 100vw"
        className="object-cover opacity-50 md:block lg:hidden"
        priority
      />
      <Image
        src="/images/bio-bg-tablet.webp"
        alt="The Comb Overs Bio Background Tablet"
        fill
        sizes="(min-width: 768px) 100vw, (min-width: 1280px) 100vw"
        className="object-cover opacity-30 hidden md:hidden lg:block xl:hidden"
        priority
      />
      <Image
        src="/images/bio-bg-desktop.webp"
        alt="The Comb Overs Bio Background Desktop"
        fill
        sizes="(min-width: 1280px) 100vw"
        className="object-cover opacity-40 hidden xl:block"
        priority
      />

      <div className="absolute inset-0 md:mt-[120px] xl:mt-[100px]">
        <main className="p-4 text-white">
          <h1 className="font-joti text-[24px] text-center">BIO</h1>
          <h2 className="font-iceland text-[42px] md:text-[70px] text-center md:mt-[-20px]" style={{ textShadow: '0 4px 4px #000000' }}>The Comb Overs</h2>
          <div className="w-25 h-1 rounded-full bg-[#55858b] mx-auto my-4 xl:my-0"></div>

          <section className="mx-auto md:max-w-[650px] xl:max-w-[1100px] grid grid-cols-1 gap-8 xl:gap-2 px-4 text-white mb-12 md:mt-[50px] xl:mt-[15px]">
            <div className="w-full md:max-w-[450px] xl:max-w-[1000px] xl:leading-[25px]">
              <h3 className="text-[24px] xl:text-[28px] text-center md:text-left font-semibold">What is happening</h3>
              <p className="text-[19px] xl:text-[24px] text-left mt-4">
                Well, here we still are. We partied hard like there was no tomorrow but apparently not hard enough to bite it. Heading out on the road to blast some juice into those hearing aids some o&apos; y&apos;all be sportin. Leon, Artemis and Floyd got some tunes from their new release &quot;Toupee Ole&quot; to lay on ya. C&apos;mon out and bring the grandkids.
              </p>
            </div>

            <div className="w-full md:max-w-[375px] xl:max-w-[950px] md:ml-auto xl:leading-[25px] mb-24">
              <h3 className="text-[24px] xl:text-[28px] text-center md:text-right mt-6 font-semibold">Why it happened</h3>
              <p className="text-[19px] xl:text-[24px] text-left md:text-right mt-4">
                A rule that applies to rock and roll is that the drummer is always the most effed up member. With The Comb Overs it turns out to be Floyd. Right, Floyd&rsquo;s our bass player. But here&apos;s what we came to learn. He used to play drums.
              </p>
            </div>

          </section>

        </main>
      </div>
    </div>
  );
}