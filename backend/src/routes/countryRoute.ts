import { Router } from 'express';
import fetchCountries from "../controllers/fetchCountries";
import countryDetails from "../controllers/countryDetails";
import searchCountries from "../controllers/searchCountries";

const router: Router = Router();

router.get('/', fetchCountries);
router.get('/search', searchCountries);
router.get('/:code', countryDetails);

export default router;