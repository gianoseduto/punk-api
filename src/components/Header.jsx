import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    return(
        <div className="header py-3 bg-black">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-outline-dark" onClick={() => {navigate("/")}}>
                                Tutte le birre
                            </button>
                            <div className="d-flex gap-30">
                                <button className="btn btn-outline-dark" onClick={() => {
                                    if((window.location.pathname + window.location.search) === "/productPage?id=random") {
                                      window.location.reload();
                                    }else {
                                      navigate("/productPage?id=random")
                                    }
                                  }}>
                                    Una birra random
                                </button>
                                <button className="btn btn-outline-dark" onClick={() => {navigate("/Favorites")}}>
                                    Preferiti
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}
