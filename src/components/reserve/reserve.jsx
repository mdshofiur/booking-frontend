import React, { useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetcher from "../../hook/useFetcher";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";



const Reserve = ({ setOpenModal, hotelId }) => {

 const [selectRooms, setSelectRooms] = useState([]);

  const { data, loading, error } = useFetcher(
    `/hotel/room/${hotelId}`
  );

  const { dates } = useContext(SearchContext);


  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    let dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };
  

  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate)
  
  const isAvaliable = (roomNumber) => {
    console.log(roomNumber)
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );
     console.log(isFound);
    return !isFound;
  };
  

    const handleSelect = (e) => {
      const selected = e.target.checked;
      const value = e.target.value;
      setSelectRooms(
        selected
          ? [...selectRooms, value]
          : selectRooms.filter((item) => item !== value)
      );
    };
  

  const navigate = useNavigate();

    const handleClick = async () => {
      try {
        await Promise.all(
          selectRooms.map((roomId) => {
            const res = axios.put(`/room/availability/update/${roomId}`, {
              dates: allDates,
            });
            return res.data;
          })
        );
        setOpenModal(false);
        // navigate("/");
      } catch (err) {}
    };

    console.log("selectRooms", selectRooms);
    console.log("allDates", allDates);
    console.log("allDates", allDates);
  
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpenModal(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item, index) => (
          <div key={index} className="rItem">
            <div className="rItemInfo">
              <div className="rTitle">{item?.title}</div>
              <div className="rDesc">{item?.desc}</div>
              <div className="rMax">Max people: {item?.maxpeople}</div>
              <h2>price {item?.price}</h2>
              <div className="rSelectRooms">
                {item.roomNumbers.map((roomNumber, index) => (
                  <div key={index} className="room">
                    <label htmlFor="">{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvaliable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now
        </button>
      </div>
    </div>
  );
};

export default Reserve;
