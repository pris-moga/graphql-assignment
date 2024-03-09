import React, { useState } from "react";
import { Card, Button } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateCar from "../forms/UpdateCar";
import RemoveCar from "../buttons/removeCar";

const CarCard = ({ id, year, make, model, price }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <Card
      type="inner"
      title={`${year} ${make} ${model} - $${price}`}
      extra={
        <>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={handleEditClick}
          />
          <RemoveCar id={id} />
        </>
      }
    >
      {isEditing && (
        <UpdateCar
          id={id}
          year={year}
          make={make}
          model={model}
          price={price}
          onCancelEdit={handleCancelEdit}
        />
      )}
    </Card>
  );
};

export default CarCard;
