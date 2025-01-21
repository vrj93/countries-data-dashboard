import Image from "next/image";
import { MapProvider } from "@/app/components/mapProvider";
import MapComponent from "@/app/components/map";
import { notFound } from 'next/navigation';

const fetchCountryDetails = async (code: string): Promise<any> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) throw new Error('Environment variable NEXT_PUBLIC_API_URL is not set!');

  const url = `${apiUrl}/countries/${code}`;
  const res = await fetch(url);

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error(`Failed to fetch country details for code: ${code}`);
  }

  return res.json();
};

const fetchBorderCountries = async (borders: string[]): Promise<string[]> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl || !borders?.length) return [];

  const borderPromises = borders.map(async (border: string) => {
    const url = `${apiUrl}/countries/${border}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data.details.name.common;
      }
      return null;
    } catch (err) {
      throw err;
    }
  });

  const borderNames = await Promise.all(borderPromises);
  return borderNames.filter(Boolean);
};

const Page = async ({ params }: { params: Promise<{ code: string }> }) => {
  const { code } = await params;
  let country: any;

  try {
    const response = await fetchCountryDetails(code);
    country = response.details;

    if (country.borders) {
      country.borderCountries = await fetchBorderCountries(country.borders);
      delete country.borders;
    }
  } catch (err) {
    console.error('Error fetching country details:', err);
    notFound();
  }

  return country?.name ? (
    <div className='w-full flex items-center justify-center'>
      <div className='w-[90%] flex flex-row my-4 items-center justify-center shadow-2xl rounded-xl'>
        {/* Country Info Section */}
        <div className='w-1/2 flex flex-row justify-center items-center'>
          <div className='aspect-[3/2] w-1/3 overflow-hidden relative'>
            <Image
              src={country.flags.svg}
              alt={country.name.common}
              className="h-full w-full object-cover object-center"
              fill
            />
          </div>
          <div className='w-2/3 flex flex-col pl-8'>
            <h2 className='font-bold text-2xl mb-2'>{country.name.common}</h2>
            <p><span className='font-bold'>Official name: </span>{country.name.official}</p>
            <p><span className='font-bold'>Capital: </span>{country.capital}</p>
            <p><span className='font-bold'>Region: </span>{country.region}</p>
            <p><span className='font-bold'>Subregion: </span>{country.subregion}</p>
            <p>
              <span className='font-bold'>Continents: </span>
              {country.continents?.join(', ')}
            </p>
            <p>
              <span className='font-bold'>Languages: </span>
              {country.languages && Object.values(country.languages).join(', ')}
            </p>
            <p><span className='font-bold'>Country code(s): </span>{[country.cca2, country.ccn3, country.cca3].join(', ')}</p>
            <p>
              <span className='font-bold'>Currencies: </span>
              {country.currencies &&
                Object.entries(country.currencies).map(([key, value]) =>
                  `${key} (${value.name}, ${value.symbol})`
                ).join(', ')}
            </p>
            <p>
              <span className='font-bold'>Borders: </span>
              {country.borderCountries?.join(', ') || 'None'}
            </p>
            <p>
              <span className='font-bold'>Timezones: </span>
              {country.timezones?.join(', ')}
            </p>
          </div>
        </div>

        {/* Map Section */}
        <div className='w-1/2 flex flex-row items-center justify-center'>
          <MapProvider>
            <MapComponent coordinates={ country?.latlng } />
          </MapProvider>
        </div>
      </div>
    </div>
  ) : null;
};

export default Page;
