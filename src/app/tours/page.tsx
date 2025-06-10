import { createClient } from '@/lib/supabaseServer';

import Image from 'next/image';

interface Tour {
  id: string;
  tour_date: string;
  city: string;
  venue: string;
  status: 'active' | 'cancelled' | 'postponed';
  details?: string;
}

export default async function ToursPage() {
  const supabase = await createClient();
  const { data: tours, error } = await supabase
    .from('tours')
    .select('id, tour_date, city, venue, status, details');

  if (error) {
    console.error('Error fetching tours:', error);
    return <p className="text-center text-lg text-white">Error loading tours.</p>;
  }

  const formattedTours: Tour[] = tours ?? [];

  return (
    <div className="relative h-screen mt-[70px] sm:mt-0"> 
      <Image
        src="/images/tour-bg-mobile.webp"
        alt="The Comb Overs Tour Background Mobile"
        fill
        sizes="(max-width: 767px) 100vw"
        className="object-cover opacity-30 md:block lg:hidden"
        priority
      />
      <Image
        src="/images/tour-bg-tablet.webp"
        alt="The Comb Overs Tour Background Tablet"
        fill
        sizes="(min-width: 768px) 100vw, (min-width: 1280px) 100vw"
        className="object-cover opacity-30 hidden md:hidden lg:block xl:hidden"
        priority
      />
      <Image
        src="/images/tour-bg-desktop.webp"
        alt="The Comb Overs Tour Background Desktop"
        fill
        sizes="(min-width: 1280px) 100vw"
        className="object-cover opacity-20 hidden xl:block"
        priority
      />

    <div className="absolute inset-0 md:mt-[120px] xl:mt-[100px]">
      <main className="p-8 max-w-6xl mx-auto">
        <h1 className="text-[42px] font-bold mb-6 text-white">Tour Dates</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-[200px]">
          {formattedTours.length === 0 ? (
            <p className="text-center text-lg text-white">No tour dates available.</p>
          ) : (
            formattedTours.map((tour) => (
              <div key={tour.id} className="border p-4 rounded-md shadow-md">
                <h2 className="text-xl font-semibold text-white">{tour.tour_date}</h2>
                <p className="text-lg text-gray-300">{tour.city} - {tour.venue}</p>
                <p className="text-sm text-gray-400">Status: {tour.status}</p>
                {tour.details && <p className="text-sm text-red-400">{tour.details}</p>}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  </div>

  );
}