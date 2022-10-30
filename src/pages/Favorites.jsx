import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Api from "../helpers/Api.js"
import { ReactComponent as StarFull } from "../icons/star-full.svg";
import { ReactComponent as StarEmpty } from "../icons/star-empty.svg";
import BeerCookies from "../helpers/BeerCookies";
import Helpers from "../helpers/Helpers";

export default function Favorites() {
  const [beers, setBeers] = useState([]);
  const [pref, setPref] = useState(BeerCookies.get());
  const [beersError, setBeersError] = useState(undefined);

  useEffect(() => {
    const getBeers = async () => {
      try {
        const resBeers = await Api.requestBeerByIds(pref);
        setBeers(resBeers);
        console.log(resBeers);
      }
      catch (err) {
        setBeersError(err.message)
      }
    }
    getBeers()
  }, []);

  const handleFavorite = (id) => {
    const temp = pref.includes(id) ? Helpers.arrayRemove(pref, id) : [...pref, id];
    setPref(temp)
    BeerCookies.set(temp)
  }

  return (
    <>
      <Header></Header>
      <section className="home_content bg-light">
        <div className="container">
          <div className="row py-4">
            <div className="col-12">
              <div className="beers_info">
                <h4>{beers.length} {beers.length > 1 ? "birre" : "birra" }</h4>
              </div>

              <div className="beers_ct">
                {
                  beersError
                    ? <h3>C'è stato un errore nell'ottenere le informazioni, non ci sono birre</h3>

                    :
                    beers.map((beer, i) => {

                      return (
                        <div className="beer_i" key={"beer_i_" + beer.id}>
                          <a href={"/productPage?id=" + beer.id}>
                            <p>{beer.name}</p> <p className="abv">{beer.abv} %</p>
                          </a>
                          <div className="favorite" onClick={() => {
                            handleFavorite(beer.id);
                          }}>
                            {
                              pref.includes(beer.id) ? <StarFull /> : <StarEmpty />
                            }

                          </div>
                        </div>
                      )
                    })
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
