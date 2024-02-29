import { useQuery } from "@apollo/client";
import { useParams, useHistory } from "react-router-dom";
import { GET_PEOPLE } from "../../graphql/queries";
import { Button } from "antd";

const LearnMore = () => {
  const { personId } = useParams();
  const history = useHistory();

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const person = data.people.find((p) => p.id === personId);

  const handleGoBack = () => {
    history.push("/");
  };

  return (
    <div>
      <h1>{`${person.firstName} ${person.lastName}`}</h1>
      <h2>Cars:</h2>
      <ul>
        {person.cars.map((car) => (
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
