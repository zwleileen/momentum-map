import { useState } from "react";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Button,
  Typography,
  Box,
  Container
} from '@mui/material';

const ValuesForm = (props) => {

  const valuesQuestions = [
      {id: "A", label: "Thinking up new ideas and being creative is important to me. I like to do things in my own original way."},
      {id: "B", label: "It is important to me to be rich. I want to have a lot of money and expensive things."},
      {id: "C", label: "I think it is important that every person in the world should be treated equally. I believe everyone should have equal opportunities in life."},
      {id: "D", label: "It is important to me to show my abilities. I want people to admire what I do."},
      {id: "E", label: "It is important to me to live in secure surroundings. I avoid anything that might endanger my safety."},
      {id: "F", label: "I like surprises and am always looking for new things to do. I think it is important to do lots of different things in life."},
      {id: "G", label: "I believe that people should do what they are told. I think people should follow rules at all times, even when no one is watching."},
      {id: "H", label: "It is important to me to listen to people who are different from me. Even when I disagree with them, I still want to understand them."},
      {id: "I", label: "It is important to me to be humble and modest. I try not to draw attention to myself."},
      {id: "J", label: "Having a good time is important to me. I like to spoil myself."},
      {id: "K", label: "It is important to me to make my own decisions about what I do. I like to be free and not depend on others."},
      {id: "L", label: "It is very important to me to help the people around me. I want to care for their well-being."},
      {id: "M", label: "Being very successful is important to me. I hope people will recognize my achievements."},
      {id: "N", label: "It is important to me that the government ensures my safety against all threats. I want the state to be strong so it can defend its citizens."},
      {id: "O", label: "I look for adventures and like to take risks. I want to have an exciting life."},
      {id: "P", label: "It is important to me to always behave properly. I want to avoid doing anything people would say is wrong."},
      {id: "Q", label: "It is important to me to get respect from others. I want people to do what I say."},
      {id: "R", label: "It is important to me to be loyal to my friends. I want to devote myself to people close to me."},
      {id: "S", label: "I strongly believe that people should care for nature. Looking after the environment is important to me."},
      {id: "T", label: "Tradition is important to me. I try to follow the customs handed down by my religion or my family."},
      {id: "U", label: "I seek every chance I can to have fun. It is important to me to do things that give me pleasure."},
    ];

  const valueOptions = [
    { value:"5", label: "Very much like me" },
    { value:"4", label: "Like me" },
    { value:"3", label: "Somewhat like me" },
    { value:"2", label: "A little like me" },
    { value:"1", label: "Not like me" }
  ];

  const inputMapping = {
      Universalism: ["C", "H", "S"],
      Benevolence: ["L", "R"],
      Tradition: ["I", "T"],
      Conformity: ["G", "P"],
      Security: ["E", "N"],
      Power: ["B", "Q"],
      Achievement: ["D", "M"],
      Hedonism: ["J", "U"],
      Stimulation: ["F", "O"],
      SelfDirection: ["A", "K"],
    };

  const [valuesInputs, setValuesInputs] = useState({});
    
  const computeResults = (valuesInputs) => {
      const averages = {};
      const valueKeys = Object.keys(inputMapping); //get all value names e.g. Universalism

      for (let i=0; i<valueKeys.length; i++) {
          const value = valueKeys[i]; //get the current value name
          const ids = inputMapping[value]; //get the ids of the value name
          let total = 0;
            
          for (let j=0; j<ids.length; j++) {
              total += valuesInputs[ids[j]] || 0;
          }
          averages[value] = total/ids.length;
      }
      
    return averages;
  };

  const handleChange = (e) => {
      setValuesInputs({
          ...valuesInputs, 
          [e.target.name]: Number(e.target.value),
      });
  };
  // console.log(valuesInputs);

  const handleNext = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };
  
  const handlePrevious = (e) => {
    e.preventDefault();
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  

  const handleSubmit = (e) => {
      e.preventDefault();
      try {
        const averages = computeResults(valuesInputs);
        console.log("User's values:", averages);
        props.handleAddValues(averages); //pass object to parent App.jsx
      } catch (error) {
        console.log(error)
      }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = Math.ceil(valuesQuestions.length / 2);
  const totalPages = 2;
  const currentQuestions = valuesQuestions.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );


    return (
    <Container maxWidth="md"> 
    <Box component="form" onSubmit={(e) => {
      if (currentPage !== totalPages) {
        e.preventDefault();
        return;
      }
      handleSubmit(e);
    }}>
    <Typography variant="h4" sx={{mb: 2}}>Clarifying your values</Typography>
    <Typography variant="body1" sx={{mb: 2}}>
      This questionnaire consists of 21 questions taken from the Schwartz Theory of Basic Values. Please respond to all the questions below by rating each of them 1 to 5, 5 being most like you and 1 being least like you.
    </Typography>
        
        {currentQuestions.map(({ id, label }) => (
        <FormControl key={id} fullWidth sx={{ mb: 3 }} >
            <FormLabel>{label}</FormLabel>
            <RadioGroup name={id} value={valuesInputs[id] || ""} onChange={handleChange} row>
              {valueOptions.map((option) => (
                <FormControlLabel key={option.value} value={option.value} control={<Radio/>} label={option.label}/>
              ))}
            </RadioGroup>
        </FormControl> 
        ))}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          {currentPage > 1 && (
            <Button variant="outlined" type="button" onClick={(e) => handlePrevious(e)}>
              Previous
            </Button>
          )}
          {currentPage < totalPages ? (
            <Button variant="outlined" type="button" onClick={(e) => handleNext(e)}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      
    </Box>
    </Container>
    )
};

export default ValuesForm