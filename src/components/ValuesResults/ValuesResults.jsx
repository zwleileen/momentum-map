import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

const ValuesResults = (props) => {
  const navigate = useNavigate();

  const descriptors = [
    { id: 1, name: "Self-Direction", description: "Independence in thought and action, creativity, and curiosity. People with high self-direction value autonomy and exploring new ideas." },
    { id: 2, name: "Stimulation", description: "The pursuit of excitement, novelty, and challenges in life. This value is linked to the need for variety and adventure." },
    { id: 3, name: "Hedonism", description: "Seeking pleasure and personal gratification. This includes enjoying life and indulging in positive sensory experiences." },
    { id: 4, name: "Achievement", description: "Striving for personal success by demonstrating competence according to social standards. This often involves ambition and capability." },
    { id: 5, name: "Power", description: "Seeking social status, prestige, and control over people and resources. This value relates to dominance and authority." },
    { id: 6, name: "Security", description: "Valuing safety, stability, and order in society, relationships, and personal life. This includes national security, family safety, and harmony." },
    { id: 7, name: "Conformity", description: "Restraining actions, impulses, and desires that might disrupt social norms and expectations. This includes obedience and self-discipline." },
    { id: 8, name: "Tradition", description: "Respecting and maintaining cultural or religious customs and beliefs. People who prioritize tradition seek continuity with the past." },
    { id: 9, name: "Benevolence", description: "Concern for the well-being of close relationships and one’s in-group. This includes values like kindness, honesty, and loyalty." },
    { id: 10, name: "Universalism", description: "Understanding, appreciating, and protecting the welfare of all people and nature. This includes social justice, environmental care, and equality." },
    { id: 11, name: "Self-Transcendence", description: "Focuses on caring for others and nature, prioritizing empathy, fairness, and harmony in relationships." },
    { id: 12, name: "Conservation", description: "Seeks to maintain social order and stability, valuing obedience, tradition, and safety to reduce uncertainty." },
    { id: 13, name: "Self-Enhancement", description: "Emphasizes personal success, social status, and control, prioritizing ambition, dominance, and prestige." },
    { id: 14, name: "Openness To Change", description: "Encourages independence, new experiences, and pleasure, valuing creativity, novelty, and personal enjoyment." }
  ];
  

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

  const formatValueName = (valueName) => {
    const replacements = {
      "SelfDirection": "Self-Direction",
      "SelfTranscendence": "Self-Transcendence",
      "OpennessToChange": "Openness To Change",
      "SelfEnhancement": "Self-Enhancement"
    };
    return replacements[valueName] || valueName; // If found, replace; otherwise, return as is
  };

  const getDescription = (valueName) => {
    const descriptor = descriptors.find((value) => value.name.replace(/[-\s]/g, "") === valueName);
    return descriptor ? descriptor.description : "Description not found";
  };
    
  return (
      <Container maxWidth="md">
        <Typography variant="h5" sx={{mt:4, mb:2}}>Here are your values profile</Typography>
        <Typography variant="h6">Top 5 Basic Values</Typography>
        { valuesArray.length > 0 ? (
        <List>
          {valuesArray.slice(0,5).map(([key]) => (
            <ListItem key={key}>
              <ListItemText primary={formatValueName(key)}
              secondary={getDescription(key)}
              />
            </ListItem>
          ))}
        </List>
        ) : (
          <Typography variant="body1">No values to show. Please take test.</Typography>
        )}

        <Typography variant="h6">Top 2 Higher Order Values</Typography>
        { sortedHigherOrderValues.length > 0 ? (
        <List>
          {sortedHigherOrderValues.slice(0,2).map(([key]) => (
            <ListItem key={key}>
              <ListItemText primary={formatValueName(key)}
              secondary={getDescription(key)}
              />
            </ListItem>
          ))}
        </List>
        ) : (
          <Typography variant="body1">No higher order values to display.</Typography>
        )}

        <Box sx={{display:"flex"}}>
        <Button variant="outlined" onClick={() => navigate("/values/new")}>Redo Questionnaire</Button>
        </Box>
      </Container>
    );
  };
  
  export default ValuesResults;
  