import React, { useState, useEffect } from "react";
import Api from "../helpers/Api.js"
import {ReactComponent as StarFull} from "../icons/star-full.svg";
import {ReactComponent as StarEmpty} from "../icons/star-empty.svg";
import BeerCookies from "../helpers/BeerCookies";
import Helpers from "../helpers/Helpers";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  // Beers Collection
  const [beers, setBeers] = useState([]);

  //Error var to set if api calls failed
  const [beersError, setBeersError] = useState(undefined);
  //pref load from cookies
  const [pref, setPref] = useState(BeerCookies.get());

  // Pagination Attributes
  const [page, setPage] = useState(1);
  const beerPerPage = 10;
  const navigate = useNavigate();

  // Min Max ABV filters value
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");

  //Function to get "all" the dafault 25 beers without filters.
  const getBeers = async () => {
    try {
      const resBeers = await Api.requestAllBeers();
      setBeers(resBeers);
      console.log(resBeers);
      setBeersError(undefined);
    }
    catch (err) {
      setBeersError(err.message)
    }
  }

  // Use Effect to call it at the begin and update it consequently
  useEffect(() => {
    getBeers()
  }, []);

  // Handle the pageChange
  const handlePage = (index) => {
    console.log("setPage");
    setPage(index);
  }

  //Handle the favorite action - set cookie and update prefs
  const handleFavorite = (id) => {
    const temp = pref.includes(id) ? Helpers.arrayRemove(pref, id): [...pref, id];
    setPref(temp)
    BeerCookies.set(temp)
  }

  // Function to build the pagination elem
  const paginator = () => {
    const pagesArr = [];
    for (let index = 1; index <= Math.ceil(beers.length / beerPerPage); index++) {
      pagesArr.push(index);
    }
    if (pagesArr.length > 1) {
      const paginator = pagesArr.map((pageIndex) => (
        <div className={pageIndex === page ? "current page": "page"} onClick={() => {handlePage(pageIndex)}} key={"paginator_"+pageIndex}>{pageIndex}</div>
        ));
        return paginator;
    }
    else {
      return;
    }
  }

  // Function called onChange of input value to filters by beer name && beer food, merged result to remove duplicates
  const handleFilters = async (value) => {
    setPage(1);
    if (value === "") {
      getBeers();
      return;
    }
    try {
      let beers = [];
      const restName = await Api.requestBeerByName(value);
      const restFood = await Api.requestBeerByFood(value);
      console.log("restName", restName)
      console.log("restFood", restFood)
      beers = [...restName, ...restFood];
      beers = beers.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.id === value.id
        ))
      )
      console.log("beers", beers);
      setBeers(beers);
      setBeersError(undefined);
    }
    catch (err) {
      console.log("err",err);
      setBeersError(err.message)
    }

  }

  const hadleMaxMin = async(val_min, val_max) => {

    let actual_min = undefined;
    let actual_max = undefined;

    if(val_min !== "") {
      actual_min = val_min;
    }else {
      if(val_min === "") {
        actual_min = undefined;
      } else {
        actual_min = min;
      }
    }

    if(val_max !== "") {
      actual_max = val_max;
    }else {
      if(val_max === "") {
        actual_max = undefined;
      } else {
        actual_max = max;
      }

    }

    try {
      const resBeerAbv = await Api.requestBeerByAbv(actual_min, actual_max);
      setBeers(resBeerAbv);
      setBeersError(undefined);
    }
    catch (err) {
      console.log("err",err);
      setBeersError(err.message)
    }
  }

  return (
    <>
      <section className="home_header bg-black">
        <div className="container">
          <div className="row pt-3 pb-3 align-items-center">
            <div className="col-12 col-md-6 pb-3 pb-md-0">
              <h1 className="text-primary text-center text-md-start">BREWDOG</h1>
            </div>
            <div className="col-12 col-md-6">
              <div className="d-flex gap-30 justify-content-center justify-content-md-end">
                <button className="btn btn-outline-dark" onClick={() => {navigate("/productPage?id=random")}}>
                    Una birra random
                </button>
                <button className="btn btn-outline-dark" onClick={() => {navigate("/Favorites")}}>
                    Preferiti
                </button>
              </div>
            </div>
          </div>
          <div className="row pb-3">
            <div className="col-12 col-md-6 pb-2 pb-md-0">
              <div className="input_ct">
                <input
                  type="text"
                  placeholder="Filtra per nome o abbinalmento"
                  autoautocomplete="off"
                  onChange={(value) => {handleFilters(value.target.value)}}/>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <p className="_small">Gradazione alcolica (da - a)</p>
              <div className="input_wr">
                <div className="input_ct">
                  <input type="text" placeholder="Da" autoautocomplete="off" onChange={(value) => { value.target.value === "" ? setMin(undefined) : setMin(value.target.value); hadleMaxMin(value.target.value, undefined);}} />
                </div>
                <div className="input_ct">
                  <input type="text" placeholder="A" autoautocomplete="off" onChange={(value) => { value.target.value === "" ? setMax(undefined) : setMax(value.target.value); hadleMaxMin(undefined, value.target.value);}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home_content bg-light">
        <div className="container">
          <div className="row py-3">
            <div className="col-12">
              <div className="beers_info">
                <h4>{beers.length} {beers.length > 1 ? "birre" : "birra" }</h4>
                <div className="paginator">
                  { beers.length > beerPerPage ? paginator() : ""}
                </div>
              </div>

              <div className="beers_ct">
                {
                  beersError
                    ?
                    <h3>C'è stato un errore nell'ottenere le informazioni, non ci sono birre</h3>
                    :
                    beers.map((beer, i) => {
                      if (i >= (page - 1) * beerPerPage && i < page * beerPerPage) {
                      return (
                          <div className="beer_i" key={"beer_i_"+beer.id}>
                          <a href={"/productPage?id=" + beer.id}>
                            <p>{beer.name}</p> <p className="abv">{beer.abv} %</p>
                          </a>
                          <div className="favorite" onClick={() => {
                            handleFavorite(beer.id);
                          }}>
                          {
                            pref.includes(beer.id) ? <StarFull/> : <StarEmpty/>
                          }

                          </div>
                          </div>
                        )
                      }else {
                        return "";
                      }
                    })
                }
              </div>
              <div className="beers_info">
                <div></div>
                <div className="paginator">
                  { beers.length > beerPerPage ? paginator() : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
