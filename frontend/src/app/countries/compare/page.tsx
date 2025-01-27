'use client';
import Chart from "@/app/components/Chart";
import CountryDetails from "@/app/components/CountryDetails";
import React, {useCallback, useEffect, useState} from "react";
import {debounce} from "lodash";
import {CountryDetailsInterface} from "@/app/interfaces/countryDetailsInterface";

const Page = () => {
  const [searchValue, setSearchValue] = useState('');
  const [stat, setStat] = useState('population');
  const [countries, setCountries] = useState<CountryDetailsInterface[]>([]);

  const handleSearchValue = debounce((e: React.ChangeEvent<HTMLInputElement>): void => {
    if (countries.length === 2) {
      alert('Only two countries can be compared');
      return;
    }

    const val = e.target.value.trim();
    setSearchValue(val);
  }, 500);

  const handleStat = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const val = e.target.value;
    setStat(val);
  }

  const handleFetchCountry = useCallback(async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      throw new Error('Environment variable NEXT_PUBLIC_API_URL is not set!');
    }

    const findCountryUrl = `${apiUrl}/countries/search?name=${searchValue}&compare=true`;
    try {
      const res = await fetch(findCountryUrl);
      if (res.ok) {
        const response = await res.json();
        setCountries((prev): CountryDetailsInterface[] => [...prev, response.countries[0]]);
      } else {
        alert('No country found!');
        return;
      }
    } catch (err) {
      alert('Something went wrong!');
      return;
    }
  }, [searchValue]);

  useEffect(() => {
    if (searchValue) {
      handleFetchCountry();
    }
  }, [handleFetchCountry, searchValue]);

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='w-[90%] flex flex-col my-4 justify-center shadow-2xl rounded-xl'>
          <div className='w-full flex items-center justify-center p-4 text-white bg-gray-800 rounded-t-xl'>
            <h1 className='font-normal text-2xl'>Compare Countries</h1>
          </div>
          <div className='flex flex-row justify-center mt-4'>
            <div className='w-1/2 flex flex-col space-y-4'>
              <div className='w-full flex justify-center'>
                <input
                  className='w-9/12 border-2 border-orange-300 rounded-md p-2'
                  placeholder='Search Country'
                  onChange={handleSearchValue}
                />
              </div>
              <div className={`w-9/12 flex flex-col self-center justify-center`}>
                {countries.map((country: Partial<CountryDetailsInterface>, index: number) => (
                  <div key={index} className={`flex flex-col m-2 text-sm bg-orange-100 rounded-md ${countries.length > 0 && 'p-2'}`}>
                    <CountryDetails country={country} compare={true} />
                  </div>
                ))}
              </div>
            </div>
            <div className='w-1/2 flex flex-col self-start justify-center my-4 mr-4'>
              <div className='w-full flex justify-end'>
                <select value={stat} className='bg-orange-100 p-2 rounded-md' onChange={handleStat}>
                  <option value='population'>Population</option>
                  <option value='area'>Area</option>
                </select>
              </div>
              <Chart countries={countries} stat={stat} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;