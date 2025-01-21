export default interface countryInterface {
  name: {
    common: string
  };
  flag: string;
  flags: {
    svg: string
  };
  region: string;
  timezones: any[];
  time: string;
}