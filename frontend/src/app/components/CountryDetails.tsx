import Image from "next/image";
import {CountryDetailsInterface} from "@/app/interfaces/countryDetailsInterface";

const CountryDetails = ({ country, compare }: { country: Partial<CountryDetailsInterface>, compare?: boolean }) => {
  return (
    <div className='w-full flex flex-row justify-center items-center'>
      <div className='aspect-[3/2] w-1/3 overflow-hidden relative'>
        <Image
          src={country.flags ? country.flags.svg : ''}
          alt={country.name ? country.name.common: ''}
          className="h-full w-full object-cover object-center"
          fill
        />
      </div>
      <div className='w-2/3 flex flex-col pl-8'>
        <h2 className={`font-bold ${compare ? 'text-lg' : 'text-2xl'}  mb-2`}>{country.name ? country.name.common : ''}</h2>
        <p><span className='font-bold'>Official name: </span>{country.name ? country.name.official : ''}</p>
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
        <p><span className='font-bold'>Country code(s): </span>{[country.cca2, country.ccn3, country.cca3].join(', ')}
        </p>
        <p>
          <span className='font-bold'>Currencies: </span>
          {country.currencies &&
            Object.entries(country.currencies).map(([key, value]) =>
              `${key} (${value.name}, ${value.symbol})`
            ).join(', ')}
        </p>
        <p>
          <span className='font-bold'>Borders: </span>
          {!compare ? (country.borderCountries?.join(', ') || 'None') : (country.borders?.join(', ') || 'None')}
        </p>
        <p>
          <span className='font-bold'>Timezones: </span>
          {country.timezones?.join(', ')}
        </p>
      </div>
    </div>
  );
}

export default CountryDetails;