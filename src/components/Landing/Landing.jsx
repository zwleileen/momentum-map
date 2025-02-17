import { useNavigate } from "react-router"

const Landing = () => {

  const navigate = useNavigate();

  return (
    <main>
      <h1>Hello, you are on the landing page for visitors.</h1>
      <p>Sign up now, or sign in to see your super secret dashboard!</p>
      <button onClick={() => navigate(`/values/new`)}>Take test</button>
      </main>
  );
};

export default Landing;
