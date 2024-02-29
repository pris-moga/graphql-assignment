import { useMutation } from "@apollo/client";
import { REMOVE_CAR } from "../../graphql/queries";
import { Button, Card } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const CarCard = ({ id, year, make, model, price }) => {
  const [removeCar] = useMutation(REMOVE_CAR);

  const handleRemove = () => {
    removeCar({ variables: { id } });
  };

  return (
    <Card
      type="inner"
      title={`${year} ${make} ${model} - $${price}`}
      extra={
        <>
          <Button type="text" icon={<EditOutlined />} />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={handleRemove}
          />
        </>
      }
    />
  );
};

export default CarCard;
