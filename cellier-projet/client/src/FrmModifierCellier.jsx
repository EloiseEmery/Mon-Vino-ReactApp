import * as React from "react";
import "./FrmModifierCellier.scss";
import {
	useNavigate,
	useLocation
} from "react-router-dom";
import { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


function FrmModifierCellier({fetchCelliers, URI, error, setError}) {
	const location = useLocation();
	const navigate = useNavigate();
	const [messageRetour, setMessageRetour] = useState([]);
	const [severity, setSeverity] = useState([]);

	 
 	/**
  	 * État de l'alerte
   	*/
	const Alert = React.forwardRef(function Alert(props, ref) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	  });
	  const [openAlert, setOpenAlert] = React.useState(false);
	  const handleCloseAlert = (event, reason) => {
		if (reason === 'clickaway') {
		  return
		}
		setOpenAlert(false);
		navigate("/", { replace: true });
    };

	let idCellier = location.state.id;
	let nomCellier = location.state.nom;

	/**
	 * Gérer le formulaire de modification de cellier
	 */
	function gererModifierCellier() {
		let nouvNomCellier = document.getElementById("nomCellier").value;
		// console.log(nouvNomCellier);
		if(nouvNomCellier === "") {
			let error = document.querySelector('span')
			error.innerText = "Veuillez entrer un nouveau nom de cellier.";
		} else {
			fetchModifierCellier(nouvNomCellier);
		}
	}
	
	/**
	 * Modifier le cellier
	 */
	async function fetchModifierCellier(nouvNomCellier) {
		 console.log("mo")
		await fetch(URI + `/cellier/${idCellier}/celliers`, 
		{
			method: "PATCH",
			body: JSON.stringify({nom: nouvNomCellier}),
		})
		.then((response) => {
			if (response.ok) {
			return response.json();
			}
			throw response;
		})
		.then((data) => {
			fetchCelliers()
			setMessageRetour("Modification effectuée");
			setSeverity("success");
			setOpenAlert(true);
			setTimeout (() => {
				navigate("/", { replace: true });
			}, 2000);
		})
		.catch((error) => {
			console.error("Error fetching data: ", error);
			setError(error);
		});
	}

    return (
        <div className="FrmModifierCellier">
			<h1>Modifier {nomCellier}</h1>
			<div className="form-ajout--container">
				<label htmlFor="nom">Nom du cellier</label><br></br>
				<input type="text" id="nomCellier" name="nom" placeholder={nomCellier} /><br></br>
				<span></span><br></br>
				<button onClick={gererModifierCellier}>Modifier</button>
			</div>
			<Snackbar
				sx={{ height: "70%" }}
				anchorOrigin={{
				vertical: "top",
				horizontal: "center",
				}}
				open={openAlert}
				autoHideDuration={2000}
				onClose={handleCloseAlert}
			>
				<Alert
				onClose={handleCloseAlert}
				severity={severity}
				sx={{ width: "100%" }}
				>
				{messageRetour}
				</Alert>
			</Snackbar>
		</div>
    );
}

export default FrmModifierCellier;