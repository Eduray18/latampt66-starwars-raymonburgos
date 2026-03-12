import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const Single = () => {
    const { type, theId } = useParams();
    const [details, setDetails] = useState(null);

    // Imagen épica de Star Wars fija para todos
    const STARWARS_IMAGE = "https://wallpaperaccess.com/full/11801.jpg";

    useEffect(() => {
        fetch(`https://www.swapi.tech/api/${type}/${theId}`)
            .then(res => res.json())
            .then(data => setDetails(data.result.properties))
            .catch(err => console.error(err));
    }, [type, theId]);

    if (!details) return (
        <div className="d-flex justify-content-center mt-5">
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Cargando...</span>
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            {/* Cabecera con Bootstrap*/}
            <div className="row align-items-center mb-5 bg-white p-4 rounded shadow-sm">
                <div className="col-md-6">
                    <img 
                        src={STARWARS_IMAGE} 
                        className="img-fluid rounded shadow border border-light" 
                        alt="Star Wars Detail" 
                    />
                </div>
                <div className="col-md-6 text-center px-4">
                    <h1 className="display-4 fw-bold text-dark mb-3">{details.name}</h1>
                    <p className="lead fs-5 text-muted">
                        Adéntrate en los archivos de la galaxia y descubre la historia detrás de este 
                        legendario elemento de Star Wars. Desde los confines del Borde Exterior hasta 
                        los templos del Núcleo, cada detalle cuenta una parte vital del equilibrio 
                        entre la luz y la oscuridad.
                    </p>
                </div>
            </div>
            
            <hr className="border-danger border-2 opacity-50 my-5" />

            {/* Grid de Datos Técnicos */}
            <div className="row text-danger text-center fw-bold g-4">
                {/* SECCIÓN PERSONAJES */}
                {type === "people" && (
                    <>
                        <div className="col-6 col-md-2">Nombre<p className="text-dark fw-normal border-top pt-2 mt-2">{details.name}</p></div>
                        <div className="col-6 col-md-2">Nacimiento<p className="text-dark fw-normal border-top pt-2 mt-2">{details.birth_year}</p></div>
                        <div className="col-6 col-md-2">Género<p className="text-dark fw-normal border-top pt-2 mt-2">{details.gender}</p></div>
                        <div className="col-6 col-md-2">Altura<p className="text-dark fw-normal border-top pt-2 mt-2">{details.height}</p></div>
                        <div className="col-6 col-md-2">Piel<p className="text-dark fw-normal border-top pt-2 mt-2">{details.skin_color}</p></div>
                        <div className="col-6 col-md-2">Ojos<p className="text-dark fw-normal border-top pt-2 mt-2">{details.eye_color}</p></div>
                    </>
                )}

                {/* SECCIÓN PLANETAS */}
                {type === "planets" && (
                    <>
                        <div className="col-6 col-md-2">Nombre<p className="text-dark fw-normal border-top pt-2 mt-2">{details.name}</p></div>
                        <div className="col-6 col-md-2">Clima<p className="text-dark fw-normal border-top pt-2 mt-2">{details.climate}</p></div>
                        <div className="col-6 col-md-2">Población<p className="text-dark fw-normal border-top pt-2 mt-2">{details.population}</p></div>
                        <div className="col-6 col-md-2">Órbita<p className="text-dark fw-normal border-top pt-2 mt-2">{details.orbital_period}</p></div>
                        <div className="col-6 col-md-2">Rotación<p className="text-dark fw-normal border-top pt-2 mt-2">{details.rotation_period}</p></div>
                        <div className="col-6 col-md-2">Diámetro<p className="text-dark fw-normal border-top pt-2 mt-2">{details.diameter}</p></div>
                    </>
                )}

                {/* SECCIÓN VEHÍCULOS */}
                {type === "vehicles" && (
                    <>
                        <div className="col-6 col-md-2">Nombre<p className="text-dark fw-normal border-top pt-2 mt-2">{details.name}</p></div>
                        <div className="col-6 col-md-2">Modelo<p className="text-dark fw-normal border-top pt-2 mt-2">{details.model}</p></div>
                        <div className="col-6 col-md-2">Clase<p className="text-dark fw-normal border-top pt-2 mt-2">{details.vehicle_class}</p></div>
                        <div className="col-6 col-md-2">Costo<p className="text-dark fw-normal border-top pt-2 mt-2">{details.cost_in_credits}</p></div>
                        <div className="col-6 col-md-2">Pasajeros<p className="text-dark fw-normal border-top pt-2 mt-2">{details.passengers}</p></div>
                        <div className="col-6 col-md-2">Largo<p className="text-dark fw-normal border-top pt-2 mt-2">{details.length}</p></div>
                    </>
                )}
            </div>

            
            <div className="row mt-5 mb-5">
                <div className="col text-start">
                    <Link to="/">
                        <button className="btn btn-primary btn-lg px-5 shadow rounded-pill">
                            Volver al Inicio
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};