import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ItemsListdata() {
  const navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [list, setList] = useState("");
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

  const GetFullList = ()=>{
    navigate("/addList")
  }

  const AddListToDataBase = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/addList", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          List: list,
        }),
      });
      const data = await res.json();
      if (!data) {
        window.alert("List Not Added");
      } else {
        window.alert("List added success");
        navigate("/");
        window.location.reload(false);
      }
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  const getItemId = (id) => {
    console.log(id);
  };
  const UserList = async () => {
    const url = "http://localhost:5000/addList";
    try {
      const ListData = await axios.get(url);
      const data = ListData.data.data;
      setData(ListData.data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
          {Months[date.getMonth()]} {date.getDate()} {date.getFullYear()}
        </p>
      </div>

      <input
        value={list}
        name="list"
        type="text"
        onChange={(e) => setList(e.target.value)}
      />
      <button onClick={AddListToDataBase}>Add</button>
     <a href="http://localhost:5000/addList" target={"_blank"}><button onClick={GetFullList}>GetFullList</button></a> 

      <table style={{ borderCollapse: "collapse" }}>
        <tr>
          <th style={{ border: "1px solid black" }}>Grocery Lists</th>
        </tr>
        <tbody>
          {Data &&
            Data.map((item) => {
              return (
                <tr>
                  <td
                    style={{
                      border: "1px solid black",
                    }}
                    key={item.id}
                  >
                    {item.List}
                  </td>
                  <td
                    className="TableData"
                    style={{
                      border: "1px solid black",
                    }}
                  >
                    <button onClick={() => getItemId(item._id)}>view</button>
                    <button onClick={() => getItemId(item._id)}>edit</button>
                    <button onClick={() => getItemId(item._id)}>Delete</button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
