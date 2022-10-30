import {useState, useEffect} from "react";
import Header from "../components/Header";
import ProductDetail from "../components/ProductDetail";

import BeerCookies from "../helpers/BeerCookies";
import Helpers from "../helpers/Helpers";
import Api from "../helpers/Api";
import { useNavigate } from "react-router-dom";

export default function ProductPagePage() {

  const [beer, setBeer] = useState(null);
  const [beerError, setBeerError] = useState("");
  const navigator = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  useEffect(() => {
    const getBeer = async () => {
      try {
        const resBeer = await Api.requestBeerById([id]);
        setBeer(resBeer);
        console.log("res",resBeer);
      }
      catch (err) {
        console.log("err",err);
        setBeerError(err.message)
      }
    }
    getBeer()
  }, []);



  return(
      <>
      <Header></Header>
      <section className="product_page">
        {beerError && !beer ?
          <div className="container py-3 text-center">
          <h3 className="text-warning mb-2">{ beerError }</h3>
          <h4 className="mb-4">Torna alla home e riprova</h4>
          <button className="btn btn-outline-dark" onClick={() => {navigator("/")}}>Home Page</button>
          </div>
          :
        beer ? <ProductDetail beer={beer} /> : ""}
      </section>
      </>
  )
}
