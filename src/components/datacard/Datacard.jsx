import "./datacard.css";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import React from "react";

const Datacard = () => {
  const { userData, userData2 } = useContext(UserContext);

  return (
    <article style={{ padding: "40px" }} className="flex-container">
      <div className="flex-item-left">
        {userData2.szallitas === "Személyes átvétel" ? (
          <div>
            <h1>Szállítási adatok:</h1>
            <p>Személyes átvétel</p>
          </div>
        ) : (
          <div>
            <div className="flex-item-left">
              <h1>Szállítási adatok:</h1>
              <p>
                {userData.vname} {userData.kname}
              </p>
              <p>
                {userData.iranyito} {userData.varos}
              </p>
              <p>{userData.cim}</p>
              <p> {userData.telefon}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex-item-right">
        <h1>Számlázási adatok:</h1>
        <p>
          {userData.vname2} {userData.kname2}
        </p>
        <p>
          {userData.iranyito2} {userData.varos2}
        </p>
        <p>{userData.cim2}</p>
        <p> {userData.telefon2}</p>
      </div>
    </article>
  );
};

export default Datacard;
