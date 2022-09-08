import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Auth } from 'aws-amplify';
import { useState, useEffect } from "react";
import "./FrmEmail.scss";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

export default function FrmEmail({
  setEmailUtilisateur,
  emailUtilisateur,
  NouvelEmailUtilisateur,
  setNouvelEmailUtilisateur,
  frmEmailOuvert,
  setFrmEmailOuvert,
  URI
}) {

  /**
   * État d'erreur
   */
  const [openErr, setOpenErr] = React.useState(false);

  /**
   * État de l'alerte
   */
  const [severity, setSeverity] = useState([]);

  /**
   * État du message retour
   */
  const [messageRetour, setMessageRetour] = useState([]);

  /**
   *  Gère l'action d'annuler
   */
  function viderFermerFrm() {
    setFrmEmailOuvert(false);
  }

  /**
   *  Gère l'action d'annuler
   */
  function gererInput(e) {
    setNouvelEmailUtilisateur(e.target.value);
  }

  /**
   * requête de modification de l'email utilisateur
   */
  async function fetchPatchUtilisateurEmail(NouvelEmailUtilisateur) {
    let user = await Auth.currentAuthenticatedUser();
    let result = await Auth.updateUserAttributes(user, {
        'email': NouvelEmailUtilisateur,
    });
    if (result === "SUCCESS") {
      let reponse = await fetch(
          URI + "/" + "email" + "/" + emailUtilisateur + "/" + "utilisateurs",
          {
              method: "PATCH",
              body: JSON.stringify({ email: NouvelEmailUtilisateur }),
          }
      );
      let reponseJson = await reponse.json();
    }
    setEmailUtilisateur(NouvelEmailUtilisateur)
    return result
  }

  /**
   * Gère l'action de soumettre
   */
  function gererSoumettre() {
    var reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setNouvelEmailUtilisateur(NouvelEmailUtilisateur);
    if (reg.test(NouvelEmailUtilisateur)) {
      fetchPatchUtilisateurEmail(NouvelEmailUtilisateur);
      setMessageRetour("Modification effectuée")
      setSeverity("success")
      setOpenErr(true)
    } else {
      setMessageRetour("Courriel invalide")
      setSeverity("error")
      setOpenErr(true)
    }
  }
  
  return (
    <div>
      <Dialog open={frmEmailOuvert} onClose={viderFermerFrm}>
        <DialogTitle> Modifier votre email</DialogTitle>
        <DialogContent>
          <div className="frmPassword">
            <p className="">Email actuel: {emailUtilisateur}</p>
            <TextField
                onChange={gererInput}
                autoFocus
                id="email"
                type={"text"}
                defaultValue={emailUtilisateur}
            />
            <Dialog open={openErr}>
              <Alert severity={severity}
                action={
                  <IconButton
                    aria-label="close"
                    size="small"
                    onClick={() => {
                      setOpenErr(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {messageRetour}
              </Alert>
            </Dialog>
          </div>
        </DialogContent>
          <DialogActions>
            <Button onClick={viderFermerFrm}>Annuler</Button>
            <Button onClick={gererSoumettre}>Soumettre</Button>
          </DialogActions>
      </Dialog>
    </div>
  );
}