import Image from "next/image";
import Link from "next/link";
import React from "react";
import countryInterface from "@/app/interfaces/countryInterface";

interface CountryCardProps {
  country: countryInterface;
  key: number;
}

const CountryCard = ({ country, key }: CountryCardProps) => {
  return (
    <Link
      key={key}
      href={`countries/${country.cca2}`}
      target="_blank"
      rel="noopener noreferrer"
      className="min-w-[18%] p-2 group hover:shadow-lg hover:shadow-gray-400 rounded-md"
    >
      <div className="aspect-[3/2] w-full overflow-hidden rounded-md relative">
        <Image
          src={country.flags.svg ? country.flags.svg : "/no-image-found.webp"}
          alt={country.name.common}
          className="h-full w-full object-cover object-center group-hover:opacity-90"
          fill
        />
      </div>
      <div className="flex flex-col px-2 py-1">
        <h3 className="mt-1 text-md font-bold">{country.name.common}</h3>
        <span className="text-sm font-normal text-gray-900">{country.region}</span>
        <span className='text-sm font-bold text-gray-600'>{country.time}</span>
      </div>
    </Link>
  );
}

export default CountryCard;