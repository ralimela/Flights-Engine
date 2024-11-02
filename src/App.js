import './App.css';
import MyFlights from './MyFlights';
import Container from '@mui/material/Container';

function App() {
  return (
    <Container maxWidth="lg" sx={{ padding: '0 50px' }}> 
      <div className="App">
        <MyFlights />
      </div>
    </Container>
  );
}

export default App;
