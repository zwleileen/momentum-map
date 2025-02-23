import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as valuesService from "../../services/valuesService";
import { Link } from "react-router-dom"; 
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  MenuItem,
  Select
} from '@mui/material';
import { alignProperty } from "@mui/material/styles/cssUtils";

const FriendsList = ({ users, valuesResults }) => {
  const { user } = useContext(UserContext);
  const [ matches, setMatches ] = useState([]);
  const [ exactMatches, setExactMatches ] = useState(1);
  const [ showMatches, setShowMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        if (!user) return;
        const matchedUsers = await valuesService.getMatches();
        console.log(matchedUsers);
        setShowMatches(matchedUsers);
        setMatches(matchedUsers);
      } catch (error) {
        console.error("Error finding matches:", error);
      }
    };
    fetchMatches();
  }, [user]);

  useEffect(() => {
    const filteredMatches = showMatches.filter(match => match.matchedValues === exactMatches);
    setMatches(filteredMatches);
  }, [exactMatches, showMatches]);


  return (
    <Container maxWidth="md">
      <Typography variant="h5" sx={{mt:4}}>Find people with values that matched yours</Typography>

      <Box sx={{display:"flex", alignItems:"center", gap:2, mb:4, mt:4}}>
        <Typography variant="body1">No. of matching values: </Typography>
        <Select
        value={exactMatches} 
        onChange={(e)=>setExactMatches(Number(e.target.value))}
        variant="outlined"
        size="small"
        >
          <MenuItem value={1}>1 match</MenuItem>
          <MenuItem value={2}>2 matches</MenuItem>
          <MenuItem value={3}>3 matches</MenuItem>
        </Select>
      </Box>

      <Box sx={{display: "flex", flexWrap: "wrap", gap:2, justifyContent:"flex-start"}}>
      {matches.length > 0 ? (
        matches.map((match) => (
          <Link 
          key={match.user._id}
          to={`/users/${match.user._id}`} 
          style={{ textDecoration: "none", color: "inherit"}}
          >
            <Paper elevation={3} sx={{p:3, mb:2}}>
            <Typography variant="h6">
                {match.user.username}
            </Typography>
            <Typography variant="body1" sx={{mt:1}}>
                Their Top 3 Values:
            </Typography>
            <List sx={{mt:1}}>
              {match.top3Values.map((value, index) => (
                <ListItem key={index} sx={{py: 0, minHeight: "unset"}}>
                  <ListItemText primary={value.name} sx={{ margin: 0 }}/>
                </ListItem>
              ))}
            </List>
            </Paper>
          </Link>
        ))
      ) : (
        <Typography variant="body1">No matches found. Try changing the no. of matching values.</Typography>
      )}
      </Box>
    </Container>
  );
};

export default FriendsList;
