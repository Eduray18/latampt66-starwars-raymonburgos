import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  // Imagen garantizada de Star Wars (Batalla espacial)
  const STARWARS_IMAGE = "https://wallpaperaccess.com/full/11801.jpg";

  const getInfo = async (endpoint, type) => {
    try {
      const response = await fetch(`https://www.swapi.tech/api/${endpoint}`);
      const data = await response.json();
      dispatch({ type: type, payload: data.results });
    } catch (error) {
      console.log("Error loading " + endpoint, error);
    }
  };

  useEffect(() => {
    // Solo cargamos si el store está vacío para evitar llamadas infinitas
    if (store.people.length === 0) getInfo("people", "set_people");
    if (store.planets.length === 0) getInfo("planets", "set_planets");
    if (store.vehicles.length === 0) getInfo("vehicles", "set_vehicles");
  }, []);

  const renderCard = (item, type) => (
    <div key={item.uid} className="card m-2 border-0 shadow-sm" style={{ minWidth: "18rem", borderRadius: "10px", overflow: "hidden" }}>
      <img 
        src={STARWARS_IMAGE} 
        className="card-img-top" 
        alt="Star Wars Scene" 
        style={{ height: "180px", objectFit: "cover" }}
      />
      <div className="card-body bg-light">
        <h5 className="card-title fw-bold">{item.name}</h5>
        <p className="card-text text-muted">
          Check out the details of this {type === "people" ? "character" : type === "planets" ? "planet" : "vehicle"}!
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <Link to={`/single/${type}/${item.uid}`} className="btn btn-outline-primary">
            Learn more!
          </Link>
          <button 
            className="btn btn-outline-warning"
            onClick={() => dispatch({ type: "add_favorite", payload: item.name })}
          >
            <i className={store.favorites.includes(item.name) ? "fas fa-heart text-warning" : "far fa-heart"}></i>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="text-danger mb-4 fw-bold text-start">Characters</h2>
      <div className="d-flex flex-row overflow-scroll mb-5 pb-3">
        {store.people.map(p => renderCard(p, "people"))}
      </div>
      
      <h2 className="text-danger mb-4 fw-bold text-start">Planets</h2>
      <div className="d-flex flex-row overflow-scroll mb-5 pb-3">
        {store.planets.map(p => renderCard(p, "planets"))}
      </div>
      
      <h2 className="text-danger mb-4 fw-bold text-start">Vehicles</h2>
      <div className="d-flex flex-row overflow-scroll mb-5 pb-3">
        {store.vehicles.map(v => renderCard(v, "vehicles"))}
      </div>
    </div>
  );
};