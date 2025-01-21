import { Request, Response } from 'express';
import axios from 'axios';
import {DateTime} from "luxon";
import countryInterface from "../interfaces/countryInterface";

const searchCountries = async (req: Request, res: Response) => {
  const apiUrl = process.env.COUNTRIES_API;
  if (!apiUrl) {
    res.status(500).json({ error: 'Something went wrong.'});
  }

  const fields = 'fields=name,cca2,flags,region,timezones';
  let url = '';
  if(req.query.name) {
    const name = req.query.name;
    url = `${apiUrl}/name/${name}?fullText=true&${fields}`;
  }
  if(req.query.region) {
    const region = req.query.region;
    url = `${apiUrl}/region/${region}?${fields}`;
  }
  if(req.query.capital) {
    const capital = req.query.capital;
    url = `${apiUrl}/capital/${capital}?${fields}`;
  }

  try {
    console.log(url);
    const response = await axios.get(url);
    const countries = response.data;

    countries.forEach((country: countryInterface) => {
      const timezone = country.timezones[0];
      console.log(timezone);
      const time = DateTime.now().setZone(timezone);
      country['time'] = time.toFormat('hh:mm a');
    });
    res.set('Cache-Control', 'public, max-age=300');
    res.status(response.status).json({ msg: response.statusText, countries: response.data });
  } catch (err: any) {
    res.status(500).json({ error: 'Something went wrong.', details: err.message });
  }
}

export default searchCountries;