'use client';

import React, { useCallback, useEffect, useState, useMemo } from 'react';
import CountryCard from "@/app/components/CountryCard";
import countryInterface from "@/app/interfaces/countryInterface";
import { debounce } from "lodash";
import { LoaderProvider, useLoader } from "@/app/context/loaderContext";
import FullPageLoader from "@/app/components/fullLoader";

const App = () => {
  const [searchSelect, setSearchSelect] = useState<string>('name');
  const [searchVal, setSearchVal] = useState<string>('');
  const [region, setRegion] = useState<string>('Select');
  const [countries, setCountries] = useState<countryInterface[]>([]);
  const { isLoading, setIsLoading } = useLoader();

  const apiUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL, []);
  if (!apiUrl) {
    throw new Error('Environment variable NEXT_PUBLIC_API_URL is not set!');
  }

  const handleSearchSelect = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSearchSelect(e.target.value);
  };

  const handleSearchValue = debounce((e: React.ChangeEvent<HTMLInputElement>): void => {
      const val = e.target.value.trim();
      setSearchVal(val);
      setRegion('Select');
    }, 500);

  const handleSearchRegion = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setRegion(e.target.value);
    setSearchVal('');
  };

  const fetchCountries = useCallback(
    async (url: string): Promise<void> => {
      setIsLoading(true);
      try {
        const res = await fetch(url);
        if (res.ok) {
          const response = await res.json();
          setCountries(response.countries || []);
        } else {
          setCountries([]);
          alert('No record found!');
        }
      } catch (err) {
        console.error(err);
        setCountries([]);
        alert('Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading]
  );

  const listCountries = useCallback((): void => {
    fetchCountries(`${apiUrl}/countries`);
  }, [apiUrl, fetchCountries]);

  const handleSearch = useCallback((): void => {
    let url = '';

    if (searchVal.length > 1) {
      url =
        searchSelect === 'name'
          ? `${apiUrl}/countries/search?name=${searchVal}`
          : `${apiUrl}/countries/search?capital=${searchVal}`;
    } else if (region !== 'Select') {
      url = `${apiUrl}/countries/search?region=${region}`;
    }

    if (url) fetchCountries(url);
  }, [apiUrl, searchSelect, searchVal, region, fetchCountries]);

  useEffect(() => {
    listCountries();
  }, [listCountries]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-9/12 h-full my-4 shadow-2xl">
        <header className="p-2 items-center text-center bg-gray-800 text-white rounded-t-lg">
          <h1 className="font-bold text-2xl">Welcome to Countries Data Dashboard!</h1>
        </header>
        <div className="flex flex-row p-2 space-x-3 items-center justify-end bg-blue-400">
          <div className="flex items-center">
            <select
              className="h-8 p-1 text-sm rounded-l-md bg-gray-300"
              value={searchSelect}
              onChange={handleSearchSelect}
            >
              <option value="name">By Name</option>
              <option value="capital">By Capital</option>
            </select>
            <input
              className="h-8 p-1 text-md rounded-r-md"
              placeholder="Search"
              onChange={handleSearchValue}
            />
          </div>
          <div className="flex items-center">
            <select
              className="h-8 p-1 text-sm rounded-md bg-gray-300"
              value={region}
              onChange={handleSearchRegion}
            >
              <option value="Select">Select Region</option>
              <option value="africa">Africa</option>
              <option value="antarctic">Antarctic</option>
              <option value="americas">Americas</option>
              <option value="asia">Asia</option>
              <option value="europe">Europe</option>
              <option value="oceania">Oceania</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <FullPageLoader />
        ) : (
          <div className="grid grid-cols-5 gap-x-3 gap-y-4 p-2 items-center justify-center bg-blue-50 rounded-b-lg">
            {countries.map((country, index) => (
              <CountryCard country={country} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => (
  <LoaderProvider>
    <App />
  </LoaderProvider>
);

export default Home;
