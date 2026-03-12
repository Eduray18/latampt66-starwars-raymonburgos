import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	return (
		<nav className="navbar navbar-light bg-light mb-3 p-3">
			<div className="container">
				<Link to="/">
					<img 
						src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg" 
						alt="Star Wars Logo" 
						style={{ width: "80px" }} 
					/>
				</Link>
				<div className="ml-auto">
					<div className="dropdown">
						<button 
							className="btn btn-primary dropdown-toggle" 
							type="button" 
							id="dropdownMenuButton" 
							data-bs-toggle="dropdown" 
							aria-expanded="false"
						>
							Favoritos 
							<span className="badge bg-secondary ms-2">{store.favorites.length}</span>
						</button>
						<ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
							{store.favorites.length === 0 ? (
								<li className="text-center">(empty)</li>
							) : (
								store.favorites.map((fav, index) => (
									<li key={index} className="d-flex justify-content-between align-items-center px-2 py-1">
										<span className="dropdown-item p-0">{fav}</span>
										<i 
											className="fas fa-trash-alt ms-2 text-danger" 
											style={{ cursor: "pointer" }}
											onClick={() => dispatch({ type: "remove_favorite", payload: fav })}
										></i>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};