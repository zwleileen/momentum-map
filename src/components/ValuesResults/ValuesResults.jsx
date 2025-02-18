import { useNavigate } from "react-router";

const ValuesResults = (props) => {
  const navigate = useNavigate();

  const valuesArray = props.valuesResults?.values ? 
    Object.entries(props.valuesResults.values).sort((a, b) => b[1] - a[1]) : [];
    
  return (
      <main>
        <h1>Here are your values ranking</h1>
        <ul>
          {valuesArray.map(([key, value]) => (
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
  