import { useMutation } from "@apollo/client";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { GET_PEOPLE, UPDATE_PERSON } from "../../graphql/queries";

const UpdatePerson = (props) => {
  const { id, firstName, lastName, onButtonClick } = props;
  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  const [updatePerson] = useMutation(UPDATE_PERSON);

  useEffect(() => {
    forceUpdate();
  }, []);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    const updatedPerson = {
      id: id,
      firstName: firstName,
      lastName: lastName,
    };
    updatePerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      refetchQueries: [{ query: GET_PEOPLE }],
    });
    props.onButtonClick();
  };

  return (
    <Form
      name="update-person-form"
      layout="inline"
      form={form}
      onFinish={onFinish}
      initialValues={{
        firstName,
        lastName,
      }}
    >
      <Form.Item
        // label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please Enter First Name" }]}
      >
        <Input placeholder="First Name" />
      </Form.Item>
      <Form.Item
        // label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please Enter Last Name" }]}
      >
        <Input placeholder="Last Name" />
      </Form.Item>
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type="primary" htmlType="submit">
            Update Person
          </Button>
        )}
      </Form.Item>
      <Button onClick={onButtonClick}>Cancel</Button>
    </Form>
  );
};
export default UpdatePerson;
