import React, { useState, useEffect } from "react";
import Axios from "axios";
import Cellier from "./Cellier";
import "./ListeCelliers.scss";
import { useNavigate, useParams } from "react-router-dom";

function ListeCelliers(props) {
  let history = useNavigate();

  useEffect(() => {
    props.fetchCelliers();
  }, []);
  if (props.celliers.length > 0) {
    return (
      <div className="ListeCelliers">
        {props.celliers.map((cellier) => (
          <div key={cellier.id} className="Cellier">
            <Cellier
              {...cellier}
              fetchVins={props.fetchVins}
              celliers={props.celliers}
              cellier={props.cellier}
              setCellier={props.setCellier}
              emailUtilisateur={props.emailUtilisateur}
              gererCellier={props.gererCellier}
              URI={props.URI}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default ListeCelliers;
