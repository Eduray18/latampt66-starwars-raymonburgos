import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

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
    getInfo("people", "set_people");
    getInfo("planets", "set_planets");
    getInfo("vehicles", "set_vehicles");
  }, []);

  const renderCard = (item, type) => (
    <div key={item.uid} className="card m-2" style={{ minWidth: "18rem" }}>
      <img src="https://via.placeholder.com/400x200" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text">Check out the details of this {type.slice(0, -1)}!</p>
        <div className="d-flex justify-content-between">
          <Link to={`/single/${type}/${item.uid}`} className="btn btn-outline-primary">
            Learn more!
          </Link>
          <button 
            className="btn btn-outline-warning"
            onClick={() => dispatch({ type: "add_favorite", payload: item.name })}
          >
            <i className={store.favorites.includes(item.name) ? "fas fa-heart" : "far fa-heart"}></i>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-5">
      <h2 className="text-danger">Characters</h2>
      <div className="d-flex flex-row overflow-scroll mb-5">{store.people.map(p => renderCard(p, "people"))}</div>
      
      <h2 className="text-danger">Planets</h2>
      <div className="d-flex flex-row overflow-scroll mb-5">{store.planets.map(p => renderCard(p, "planets"))}</div>
      
      <h2 className="text-danger">Vehicles</h2>
      <div className="d-flex flex-row overflow-scroll mb-5">{store.vehicles.map(v => renderCard(v, "vehicles"))}</div>
    </div>
  );
};