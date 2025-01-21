import { Request, Response } from 'express';
import axios from 'axios';

const countryDetails = async (req: Request, res: Response) => {
  const apiUrl = process.env.COUNTRIES_API;
  if (!apiUrl) {
    res.status(500).json({ error: 'Something went wrong.'});
  }
  const countryCode = decodeURIComponent(req.params.code);
  const url = `${apiUrl}/alpha/${countryCode}`;
  try {
    const response = await axios.get(url);
    res.set('Cache-Control', 'public, max-age=60');
    res.status(response.status).json({ msg: response.statusText, details: response.data[0] });
  } catch (err: any) {
    res.status(500).json({ error: 'Something went wrong.', details: err.message });
  }
}

export default countryDetails;