import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_CAR, UPDATE_CAR } from "../../graphql/queries";
import { Button, Card, Form, Input, InputNumber } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";

const CarCard = ({ id, year, make, model, price }) => {
  const [updateCar] = useMutation(UPDATE_CAR);
  const [editMode, setEditMode] = useState(false);
  const [carData, setCarData] = useState({ year, make, model, price });
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

  const handleRemove = () => {
    removeCar({ variables: { id } });
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    updateCar({
      variables: {
        id,
        year: parseInt(carData.year),
        make: carData.make,
        model: carData.model,
        price: parseFloat(carData.price),
      },
    }).then(() => setEditMode(false));
  };

  const hanldeCancel = () => {
    setEditMode(false);
    setCarData({ year, make, model, price });
  };

  return (
    <Card
      type="inner"
      title={`${year} ${make} ${model} - $${price}`}
      extra={
        <>
          <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={handleRemove}
          />
        </>
      }
    >
      {editMode ? (
        <Form layout="vertical">
          <Form.Item label="Year">
            <InputNumber
              name="year"
              value={carData.year}
              onChange={(value) => setCarData({ ...carData, year: value })}
            />
          </Form.Item>

          <Form.Item label="Make">
            <Input name="make" value={carData.make} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Model">
            <Input name="model" value={carData.model} onChange={handleChange} />
          </Form.Item>

          <Form.Item label="Price">
            <InputNumber
              name="price"
              value={carData.price}
              onChange={(value) => setCarData({ ...carData, price: value })}
            />
          </Form.Item>

          <FormItem>
            <Button type="primary" onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={hanldeCancel}>Cancel</Button>
          </FormItem>
        </Form>
      ) : null}
    </Card>
  );
};

export default CarCard;
