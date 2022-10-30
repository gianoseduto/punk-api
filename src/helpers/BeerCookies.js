import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookiesName = "beers_ipa_prefs";

const set = (value) => {
  cookies.set(cookiesName, value, {path: "/", maxAge: 31536000})
}

const get = () => {
  return cookies.get(cookiesName) ?  cookies.get(cookiesName) : [];
}

const beerCookies = {
  set,
  get
};

export default beerCookies;
