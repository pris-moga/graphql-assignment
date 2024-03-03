import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Form, Input, Select } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_CAR,
  GET_CARS,
  //GET_CARSFORPERSON,
  GET_PEOPLE,
} from "../../graphql/queries";

const { Option } = Select;

const AddCar = () => {
  const [id, setId] = useState(uuidv4());
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const { loading, error, data } = useQuery(GET_PEOPLE);
  const [addCar] = useMutation(ADD_CAR);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const onFinish = (values) => {
    const { make, model, personId, price, year } = values;
    const newCar = {
      id: id,
      make: make,
      model: model,
      personId: personId,
      price: parseFloat(price),
      year: parseInt(year),
    };
    addCar({
      variables: {
        id,
        make,
        model,
        personId,
        price: parseFloat(price),
        year: parseInt(year),
      },
      update: (cache, { data: { addCar } }) => {
        const existingData = cache.readQuery({ query: GET_CARS });
        const existingCars = existingData ? existingData.cars : [];
        cache.writeQuery({
          query: GET_CARS,
          data: {
            cars: [...existingCars, newCar],
          },
        });
        /* const existing = cache.readQuery({
          query: GET_CARSFORPERSON,
          variables: { personId },
        });
        const existingCars1 = existing ? existing.carsforPerson : [];
        cache.writeQuery({
          query: GET_CARSFORPERSON,
          variables: { personId },
          data: {
            carsforPerson: [...existingCars1, addCar],
          },
        }); */
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <h3>Add Car</h3>
      </div>
      <Form
        name="add-car-form"
        layout="inline"
        size="large"
        style={{ marginBottom: "40px" }}
        form={form}
        onFinish={onFinish}
      >
        <Form.Item
          label="Year"
          name="year"
          rules={[{ required: true, message: "Please enter Year" }]}
        >
          <Input placeholder="Year" style={{ width: "100px" }} />
        </Form.Item>

        <Form.Item
          label="Make"
          name="make"
          rules={[{ required: true, message: "Please enter Make" }]}
        >
          <Input placeholder="Make" style={{ width: "150px" }} />
        </Form.Item>

        <Form.Item
          label="Model"
          name="model"
          rules={[{ required: true, message: "Please enter Model" }]}
        >
          <Input placeholder="Model" style={{ width: "150px" }} />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter Price" }]}
        >
          <Input addonBefore="$" style={{ width: "100px" }} />
        </Form.Item>

        <Form.Item
          label="Person"
          name="personId"
          rules={[{ required: true, message: "Please enter Person" }]}
        >
          <Select placeholder="Select a person">
            {data.people.map(({ id, firstName, lastName }) => (
              <Option key={id} value={id}>
                {firstName} {lastName}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item shouldUpdate={true}>
          {() => (
            <Button
              type="primary"
              htmlType="submit"
              disabled={
                !form.isFieldsTouched(true) ||
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length
              }
            >
              Add Car
            </Button>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCar;
