import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  faTrash,
  faSquareArrowUpRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ViewTest() {
  const [data, setData] = useState([]);
  const { subject } = useParams();
  let navigate = useNavigate();

  //const { subject } = match.params;
  const deleteTest = (id, name) => {
    if (
      window.confirm(`Please Click Ok if you want to delete subject ${name}`)
    ) {
      fetch("http://localhost:5000/deleteTest", {
        method: "DELETE",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          testid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          //getAllTest();
          console.log(data);
        });
    } else {
    }
  };

  useEffect(() => {
    fetch(`http://localhost:5000/subjects/${subject}/tests`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setData(data.data);
        } else {
          console.log(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [subject]);

  return (
    <div>
      <div className="auth-wrapper" style={{ height: "auto" }}>
        <div className="auth-inner" style={{ width: "auto" }}>
          <h3>All Questions:</h3>
          <table class="centered" style={{ width: 350 }}>
           
          </table>
        </div>
      </div>
    </div>
  );
}

