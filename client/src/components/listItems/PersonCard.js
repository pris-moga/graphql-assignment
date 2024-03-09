import { useState } from "react";
import { Card } from "antd";
import RemovePerson from "../buttons/removePerson";
import UpdatePerson from "../forms/UpdatePerson";
import { EditOutlined } from "@ant-design/icons";
import CarCard from "./CarCard";
import { Link } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

const PersonCard = (props) => {
  const [editMode, setEditMode] = useState(false);
  const styles = getStyles();
  const { id, firstName, lastName } = props;

  const { loading, error, data, refetch } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId: id },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { personWithCars } = data;
  const { person, cars } = personWithCars;

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
          {cars?.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}

          <Link to={`/learn-more/${id}`} target="_blank">
            {" "}
            Learn More
          </Link>
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
