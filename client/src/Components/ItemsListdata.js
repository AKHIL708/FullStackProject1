import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ItemsListdata() {
  const [Data, setData] = useState([]);
  const date = new Date();
  const Months = [
    "january",
    "febraury",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "octomber",
    "december",
  ];

  const UserList = (error) => {
    const url = "http://localhost:5000/addList";
    console.log(error)
    axios
      .get(url)
      .then((response) => {
        const result = response.data;
        const { status, message, data } = result;
        if (status !== 'SUCCESS') {
          alert(message, status);
        } else {
          setData(data);
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    UserList();
  }, []);
  return (
    <>
      <div className="Navbar">
        <h1>Monthly Grocery List</h1>
      </div>
      <div className="ShowDate">
        <p>
          {Months[date.getMonth()]} {date.getDate()} {date.getFullYear()}{" "}
          {Data.List}
        </p>
      </div>
    </>
  );
}
