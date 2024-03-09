import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../../graphql/queries";
import { Button } from "antd";

const LearnMore = () => {
  const { personId } = useParams();
  //const history = useHistory();

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { personId },
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const { personWithCars } = data;
  const { person, cars } = personWithCars;

  const handleGoBack = () => {
    //history.push("/");
  };

  return (
    <div>
      <h1>{`${person.firstName} ${person.lastName}`}</h1>
      <h2>Cars:</h2>
      <ul>
        {cars.map((car) => (
          <li
            key={car.id}
          >{`${car.year} ${car.make} ${car.model} - $${car.price}`}</li>
        ))}
      </ul>
      <Button onClick={handleGoBack}>Go Back Home</Button>
    </div>
  );
};

export default LearnMore;
