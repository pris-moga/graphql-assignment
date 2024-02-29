import { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/removePerson";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined } from "@ant-design/icons";
import CarCard from "./CarCard";
import { Link } from "react-router-dom";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, firstName, lastName, cars } = props;

  console.log("Cars:", cars);

  const handleButtonClick = () => {
    setEditMode(!editMode);
  };

  return (
    <div>
      {editMode ? (
        <UpdatePerson
          id={id}
          firstName={firstName}
          lastName={lastName}
          onButtonClick={handleButtonClick}
        />
      ) : (
        <Card
          title={`${firstName} ${lastName}`}
          style={styles.card}
          actions={[
            <EditOutlined key="edit" onClick={handleButtonClick} />,
            <RemovePerson id={id} />,
          ]}
        >
          {/* This is not displaying the cars of each person: */}
          {cars?.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}

          <Link to={`/learn-more/${id}`}> Learn More</Link>
        </Card>
      )}
    </div>
  );
};

const getStyles = () => ({
  card: {
    width: "500px",
  },
});

export default PersonCard;
