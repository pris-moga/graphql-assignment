import React from "react";
import { Form, Input, InputNumber, Button } from "antd";
import { useMutation } from "@apollo/client";
import { UPDATE_CAR, GET_CARS } from "../../graphql/queries";

const UpdateCar = ({
  id,
  year: initialYear,
  make: initialMake,
  model: initialModel,
  price: initialPrice,
  onCancelEdit,
}) => {
  const [form] = Form.useForm();

  const [updateCar] = useMutation(UPDATE_CAR);

  const onFinish = (values) => {
    updateCar({
      variables: {
        id,
        ...values,
      },
      refetchQueries: [{ query: GET_CARS }],
    });
    onCancelEdit();
  };

  return (
    <Form
      form={form}
      initialValues={{
        year: initialYear,
        make: initialMake,
        model: initialModel,
        price: initialPrice,
      }}
      onFinish={onFinish}
    >
      <Form.Item label="Year" name="year">
        <InputNumber />
      </Form.Item>
      <Form.Item label="Make" name="make">
        <Input />
      </Form.Item>
      <Form.Item label="Model" name="model">
        <Input />
      </Form.Item>
      <Form.Item label="Price" name="price">
        <InputNumber />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update Car
        </Button>
        <Button onClick={onCancelEdit}>Cancel</Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateCar;
