import { useNavigate } from "react-router-dom"
import { Button } from '@mui/material';

const Landing = () => {

  const navigate = useNavigate();

  return (
    <main className="landing-container">
      <h1 className="landing-title">Momentum Map helps you find others <br/>who share similar values</h1>
      <p>The first step is to clarify your personal values. To do so, we use the Schwartz Theory of Basic Values Questionnaire.</p>
      <p>Values generally refer to what we think are important to us in life. They may be beliefs or desirable goals. Some values may serve as standards or criteria that guide decision making.</p>
      <p>Each of us ranks values differently and sometimes our values contradict and we need to make tradeoffs.</p>
      <p>Clarifying what is important to us and our friends will help us to relate with one another better. Take the test and find out!</p>
      <Button variant="outlined" onClick={() => navigate(`/values/new`)}>Take test</Button>
      </main>
  );
};

export default Landing;
