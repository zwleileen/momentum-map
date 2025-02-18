import { useNavigate } from "react-router";

const ValuesResults = (props) => {
  const navigate = useNavigate();

  const valuesArray = props.valuesResults?.values ? 
    Object.entries(props.valuesResults.values).sort((a, b) => b[1] - a[1]) : [];

  console.log(valuesArray);

  const valuesObject = Object.fromEntries(valuesArray);

  // Compute higher-order values
  const higherOrderValues = Object.entries({
    selfTranscendence: (valuesObject.Universalism + valuesObject.Benevolence) / 2,
    conservation: (valuesObject.Tradition + valuesObject.Conformity + valuesObject.Security) / 3,
    selfEnhancement: (valuesObject.Achievement + valuesObject.Power) / 2,
    openness: (valuesObject.SelfDirection + valuesObject.Stimulation) / 2,
    hedonism: valuesObject.Hedonism
  });
    
  return (
      <main>
        <h1>Here are your values ranking</h1>
        <h3>Basic Values</h3>
        <ul>
          {valuesArray.map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{value}
            </li>
          ))}
        </ul>
        
        <h3>Higher Order Values</h3>
        <ul>
          {higherOrderValues.map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong>{value}
            </li>
          ))}
        </ul>

        <button onClick={() => navigate("/values/new")}>Redo Questionnaire</button>
      </main>
    );
  };
  
  export default ValuesResults;
  