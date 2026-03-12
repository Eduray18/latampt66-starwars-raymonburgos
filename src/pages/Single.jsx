import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {
    const { type, theId } = useParams(); // Obtenemos el tipo (people/planets/vehicles) y el ID
    const [details, setDetails] = useState(null);

    useEffect(() => {
        
        fetch(`https://www.swapi.tech/api/${type}/${theId}`)
            .then(res => res.json())
            .then(data => {
                setDetails(data.result.properties);
            })
            .catch(err => console.error(err));
    }, [type, theId]);

    // Mientras carga la API, mostramos un mensaje
    if (!details) return <h2 className="text-center mt-5 text-warning">Loading Details...</h2>;

    return (
        <div className="container mt-5">
            <div className="row d-flex align-items-center mb-5">
                <div className="col-md-6">
                    
                    <img 
                        src="https://via.placeholder.com/800x600" 
                        className="img-fluid rounded" 
                        alt={details.name} 
                    />
                </div>
                <div className="col-md-6 text-center">
                    <h1 className="display-4">{details.name}</h1>
                    <p className="lead">
                        Esta es una descripción detallada de {details.name}. Aquí puedes encontrar toda la información técnica y biográfica recolectada de los archivos oficiales de la saga.
                    </p>
                </div>
            </div>
            
            <hr className="border-danger border-2 my-4" />

            <div className="row text-danger text-center fw-bold">
                {/* MOSTRAR DATOS SI ES PERSONAJE */}
                {type === "people" && (
                    <>
                        <div className="col">Name<p className="text-dark fw-normal">{details.name}</p></div>
                        <div className="col">Birth Year<p className="text-dark fw-normal">{details.birth_year}</p></div>
                        <div className="col">Gender<p className="text-dark fw-normal">{details.gender}</p></div>
                        <div className="col">Height<p className="text-dark fw-normal">{details.height}</p></div>
                        <div className="col">Skin Color<p className="text-dark fw-normal">{details.skin_color}</p></div>
                        <div className="col">Eye Color<p className="text-dark fw-normal">{details.eye_color}</p></div>
                    </>
                )}

                {/* MOSTRAR DATOS SI ES PLANETA */}
                {type === "planets" && (
                    <>
                        <div className="col">Name<p className="text-dark fw-normal">{details.name}</p></div>
                        <div className="col">Climate<p className="text-dark fw-normal">{details.climate}</p></div>
                        <div className="col">Population<p className="text-dark fw-normal">{details.population}</p></div>
                        <div className="col">Orbital Period<p className="text-dark fw-normal">{details.orbital_period}</p></div>
                        <div className="col">Rotation Period<p className="text-dark fw-normal">{details.rotation_period}</p></div>
                        <div className="col">Diameter<p className="text-dark fw-normal">{details.diameter}</p></div>
                    </>
                )}

                {/* MOSTRAR DATOS SI ES VEHÍCULO */}
                {type === "vehicles" && (
                    <>
                        <div className="col">Name<p className="text-dark fw-normal">{details.name}</p></div>
                        <div className="col">Model<p className="text-dark fw-normal">{details.model}</p></div>
                        <div className="col">Class<p className="text-dark fw-normal">{details.vehicle_class}</p></div>
                        <div className="col">Cost<p className="text-dark fw-normal">{details.cost_in_credits}</p></div>
                        <div className="col">Passengers<p className="text-dark fw-normal">{details.passengers}</p></div>
                        <div className="col">Length<p className="text-dark fw-normal">{details.length}</p></div>
                    </>
                )}
            </div>

            
            <div className="row mt-5">
                <div className="col text-start">
                    <Link to="/">
                        <button className="btn btn-primary btn-lg shadow">
                            Back to home!
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};