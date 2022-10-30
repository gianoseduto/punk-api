import  {useState, useEffect} from "react";
import BeerCookies from "../helpers/BeerCookies";
import Helpers from "../helpers/Helpers";
import {ReactComponent as StarFull} from "../icons/star-full.svg";
import {ReactComponent as StarEmpty} from "../icons/star-empty.svg";
import {ReactComponent as AngleLeft} from "../icons/angle-left.svg";
import {ReactComponent as AngleRight} from "../icons/angle-right.svg";
import imageNotAvailable from "../image/image_not_available.png";
import { useNavigate } from "react-router-dom";
import  Api from "../helpers/Api"

export default function  ProductDetail(params) {
  console.log(params)
  const beer = params.beer[0];
  const [pref, setPref] = useState(BeerCookies.get());
  const [nextBeer, setNextBeer] = useState(null);
  const navigate = useNavigate();

  const handleFavorite = (id) => {
    const temp = pref.includes(id) ? Helpers.arrayRemove(pref, id): [...pref, id];
    setPref(temp);
    BeerCookies.set(temp)
  }

  useEffect(() => {
    const getBeer = async () => {
      try {
        const resBeer = await Api.requestBeerByIds([(parseInt(beer.id,10)+1).toString(10)]);
        if (resBeer.length > 0) {
          setNextBeer(resBeer[0]);
        }else {
          setNextBeer(null);
        }
        console.log("resNext",resBeer);
      }
      catch (err) {
        console.log("err",err);
        //setBeerError(err.message)
      }
    }
    getBeer()
  }, []);


  return(

    <div className="product_detail">
      <div className="first_section">
        <div className="navigation">
          <div className="prev">
            <div className="navigation_i" onClick={() => {navigate("/productPage?id="+ (beer.id - 1).toString(10)); window.location.reload();}}>

              <AngleLeft/>
            </div>
          </div>
          <div className="next">
            {
              nextBeer ?
              <div className="navigation_i" onClick={() => {navigate("/productPage?id="+ nextBeer.id); window.location.reload();}}>
                <p className="name">
                  {nextBeer.name}
                </p>
                <AngleRight/>
              </div>
              :
              ""
            }
          </div>
        </div>
        {/* BLACK SECTION WITH TITLE */}
        <div className="bg-black pt-3 pb-2 py-md-3">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7">
                <div className="title">
                  <div className="star" onClick={() => {handleFavorite(beer.id)}}>
                      {
                        pref.includes(beer.id) ? <StarFull/> : <StarEmpty/>
                      }
                  </div>
                  <h1 className="text-primary">{beer.name}</h1>
                </div>
                <h2>{beer.tagline}</h2>
              </div>
            </div>
          </div>
        </div>
        {/* FLOATING IMAGE SECTION */}
        <div className="img_float pb-2 pt-2 py-md-3">
          <div className="container">
            <div className="row">
              <div className="col-8 offset-2 col-lg-4 col-md-4 offset-md-8 offset-lg-8 col_img">
                <div className="elem_wr">
                  <div className="img_ct">
                    {
                      beer.image_url ?
                      <img src={beer.image_url} alt="" />
                      : <img src={imageNotAvailable} alt="" />
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* LIGHT DESCRIPTION SECTION */}
        <div className="bg-light py-3">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-7">
                <h4 className="pb-2"><strong>Description</strong></h4>
                <p className="">
                  {beer.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PRIMARY INFO */}
      <div className="bg-primary py-2">
        <div className="container">
          <div className="info_data">
            <p>ABV: {beer.abv}%</p>
            <p>ARM: {beer.srm}</p>
            <p>IBC: {beer.ebc}</p>
            <p>IBU: {beer.ebc}</p>
            <p>PH: {beer.ph}</p>
          </div>
        </div>
      </div>
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="h4 pb-2">
               <strong>Abbinamenti</strong>
              </div>
            </div>
            <div className="col-12">
              <div className="food_wr">

                {beer.food_pairing.map((food, i) => (
                  <div className="food_i" key={"food_"+i}>
                    <div className="food_i_ct">

                      <p>
                        "
                        {food}
                        "
                      </p>
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
