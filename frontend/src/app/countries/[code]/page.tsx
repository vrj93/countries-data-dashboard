import { MapProvider } from "@/app/components/mapProvider";
import MapComponent from "@/app/components/map";
import { notFound } from 'next/navigation';
import {CountryDetailsInterface} from "@/app/interfaces/countryDetailsInterface";
import CountryDetails from "@/app/components/CountryDetails";

const fetchCountryDetails = async (code: string): Promise<{ details: object }> => {
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
  let country: Partial<CountryDetailsInterface>;
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

  return country.name ? (
    <div className='w-full flex items-center justify-center'>
      <div className='w-[90%] flex flex-row my-4 items-center justify-center shadow-2xl rounded-xl'>
        {/* Country Info Section */}
        <div className='w-1/2 flex flex-row justify-center items-center'>
          <CountryDetails country={country}/>
        </div>
        {/* Map Section */}
        {country.latlng &&
          <div className='w-1/2 flex flex-row items-center justify-center'>
              <MapProvider>
                  <MapComponent coordinates={country.latlng}/>
              </MapProvider>
          </div>
        }
      </div>
    </div>
  ) : null;
};

export default Page;
