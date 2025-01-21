import { Request, Response } from 'express';
import axios from "axios";
import { DateTime } from 'luxon';
import countryInterface from "../interfaces/countryInterface";

const fetchCountries = async (req: Request, res: Response) => {
  let apiUrl = process.env.COUNTRIES_API;
  if (!apiUrl) {
    res.status(500).json({ error: 'Something went wrong.'});
  }

  const url = `${apiUrl}/all?fields=name,cca2,flags,region,timezones`;
  try {
    const response = await axios.get(url, {
      headers: {
        'Accept-Encoding': 'identity'
      },
      decompress: false,
      responseType: 'text',
    });
    const countries = JSON.parse(response.data);

    countries.forEach((country: countryInterface) => {
      const timezone = country.timezones[0];
      const time = DateTime.now().setZone(timezone);
      country['time'] = time.toFormat('hh:mm a');
    });

    res.set('Cache-Control', 'public, max-age=300');
    res.status(response.status).send({ msg: response.statusText, countries:countries });
  } catch (err: any) {
    res.status(500).json({ error: 'Error fetching data from the API', details: err.message });
  }
}

export default fetchCountries;