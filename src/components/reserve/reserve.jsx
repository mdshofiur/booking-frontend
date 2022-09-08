import React, { useState } from "react";
import "./reserve.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetcher from "../../hook/useFetcher";

const Reserve = ({ setOpenModal, hotelId }) => {
  const { data, loading, error } = useFetcher(
    `http://localhost:5000/api/hotel/room/${hotelId}`
  );

  const [selectRooms, setSelectRooms] = useState([]);

  const handleSelect = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    setSelectRooms(
      selected
        ? [...selectRooms, value]
        : selectRooms.filter((item) => item !== value)
    );
  };

    const handleClick = () => {
      
    };

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

              {item.roomNumbers.map((roomNumber, index) => (
                <div key={index} className="room">
                  <label htmlFor="">{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                  />
                </div>
              ))}
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
