import { useNavigate } from "react-router";

const ValuesResults = (props) => {
  const navigate = useNavigate();

  const valuesArray = props.valuesResults?.values ? 
    Object.entries(props.valuesResults.values).sort((a, b) => b[1] - a[1]) : [];
    // console.log(valuesArray);

  const valuesObject = Object.fromEntries(valuesArray);

  // Compute higher-order values
  const higherOrderValues = {
    SelfTranscendence: (valuesObject.Universalism + valuesObject.Benevolence) / 2,
    Conservation: (valuesObject.Tradition + valuesObject.Conformity + valuesObject.Security) / 3,
    SelfEnhancement: (valuesObject.Achievement + valuesObject.Power) / 2,
    OpennessToChange: (valuesObject.SelfDirection + valuesObject.Stimulation + valuesObject.Hedonism) / 3,
  };

  const sortedHigherOrderValues = Object.entries(higherOrderValues)
    .sort((a, b) => b[1] - a[1]);
    
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
          {sortedHigherOrderValues.map(([key, value]) => (
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
  