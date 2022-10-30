import axios from 'axios'

const requestBeerById = async (id) => {
    const config ={
        url: "https://api.punkapi.com/v2/beers/"+id,
        method: 'GET',
    }
    const res = await axios.request(config);
    return res.data;
}

const requestBeerByIds = async (ids) => {
    let formattedIds = "";
    console.log("ids",ids);
    ids.forEach(id => {
        formattedIds += id + "|";
    });

    const config ={
        url: "https://api.punkapi.com/v2/beers?ids="+formattedIds,
        method: 'GET',
    }
    const res = await axios.request(config);
    return res.data;
}

const requestAllBeers = async () => {
    const config ={
        url: "https://api.punkapi.com/v2/beers/",
        method: 'GET',
    }
    const res = await axios.request(config);
    return res.data;
}

const requestBeerPagination = async(page) => {
    const config ={
        url: "https://api.punkapi.com/v2/beers?page="+page+"&per_page=10",
        method: 'GET',
    }
    const res = await axios.request(config);
    return res.data;
}

const requestBeerByName = async (name) => {
  let formattedName = "";
  console.log("name",name);
  formattedName = name.replace(" ", "_");

  const config ={
      url: "https://api.punkapi.com/v2/beers?beer_name="+formattedName,
      method: 'GET',
  }
  const res = await axios.request(config);
  return res.data;
}

const requestBeerByFood = async (food) => {
  let formattedFood = "";
  console.log("name",food);
  formattedFood = food.replace(" ", "_");

  const config ={
      url: "https://api.punkapi.com/v2/beers?food="+formattedFood,
      method: 'GET',
  }
  const res = await axios.request(config);
  return res.data;
}

const requestBeerByAbv = async (min, max) => {
  console.log("min",min);
  console.log("max",max);

  const config ={
      url: "https://api.punkapi.com/v2/beers?" + ( min ? "abv_gt=" + min : "") + ( min && max ? "&" : "" ) + (max ? "abv_lt=" + max : ""),
      method: 'GET',
  }
  const res = await axios.request(config);
  return res.data;
}

const Api = {
    requestBeerById,
    requestBeerByIds,
    requestAllBeers,
    requestBeerPagination,
    requestBeerByName,
    requestBeerByFood,
    requestBeerByAbv
  }

export default Api;
