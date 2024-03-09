import React from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_CAR, GET_CARS } from "../../graphql/queries";
import { DeleteOutlined } from "@ant-design/icons";

const RemoveCar = ({ id }) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      cache.modify({
        fields: {
          cars(existingCars = [], { readField }) {
            return existingCars.filter(
              (carRef) => id !== readField("id", carRef)
            );
          },
        },
      });
    },
  });

  const handleRemoveCar = () => {
    const result = window.confirm("Are you sure you want to remove this car?");
    if (result) {
      removeCar({ variables: { id } });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      style={{ color: "red" }}
      onClick={handleRemoveCar}
    />
  );
};

export default RemoveCar;
