import Image from "next/image";
import { CountryDetailsInterface } from "@/app/interfaces/countryDetailsInterface";

const CountryDetails = ({
  country,
  compare = false,
}: {
  country: Partial<CountryDetailsInterface>;
  compare?: boolean;
}) => {
  if (!country) return null;

  const {
    flags,
    name,
    capital,
    region,
    subregion,
    continents,
    languages,
    cca2,
    ccn3,
    cca3,
    currencies,
    borderCountries,
    borders,
    timezones,
  } = country;

  const countryName = name?.common || "Unknown Country";
  const officialName = name?.official || "N/A";
  const borderList = compare ? borders?.join(", ") || "None" : borderCountries?.join(", ") || "None";
  const continentList = continents?.join(", ") || "N/A";
  const languageList = languages ? Object.values(languages).join(", ") : "N/A";
  const currencyList = currencies
    ? Object.entries(currencies)
        .map(([key, value]) => `${key} (${value.name}, ${value.symbol})`)
        .join(", ")
    : "N/A";
  const countryCodes = [cca2, ccn3, cca3].filter(Boolean).join(", ");
  const timezoneList = timezones?.join(", ") || "N/A";

  return (
    <div className="w-full flex flex-row justify-center items-center">
      <div className="aspect-[3/2] w-1/3 overflow-hidden relative">
        <Image
          src={flags?.svg || "/no-image-found.webp"} // Placeholder image
          alt={countryName}
          className="h-full w-full object-cover object-center"
          fill
          priority
        />
      </div>
      <div className="w-2/3 flex flex-col pl-8">
        <h2 className={`font-bold ${compare ? "text-lg" : "text-2xl"} mb-2`}>{countryName}</h2>
        <p>
          <span className="font-bold">Official name: </span>
          {officialName}
        </p>
        <p>
          <span className="font-bold">Capital: </span>
          {capital || "N/A"}
        </p>
        <p>
          <span className="font-bold">Region: </span>
          {region || "N/A"}
        </p>
        <p>
          <span className="font-bold">Subregion: </span>
          {subregion || "N/A"}
        </p>
        <p>
          <span className="font-bold">Continents: </span>
          {continentList}
        </p>
        <p>
          <span className="font-bold">Languages: </span>
          {languageList}
        </p>
        <p>
          <span className="font-bold">Country code(s): </span>
          {countryCodes || "N/A"}
        </p>
        <p>
          <span className="font-bold">Currencies: </span>
          {currencyList}
        </p>
        <p>
          <span className="font-bold">Borders: </span>
          {borderList}
        </p>
        <p>
          <span className="font-bold">Timezones: </span>
          {timezoneList}
        </p>
      </div>
    </div>
  );
};

export default CountryDetails;
