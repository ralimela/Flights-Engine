import * as React from 'react';
import { Button, TextField, Grid, Box, Container, MenuItem, FormControl, InputLabel, Select, Dialog, DialogTitle, DialogContent, IconButton, Typography, InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import ExploreIcon from '@mui/icons-material/Explore';
import HotelIcon from '@mui/icons-material/Hotel';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import airplaneImage from './airplane.jpg';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

export default function MyFlights() {
  const [tripType, setTripType] = React.useState('round');
  const [cabinClass, setCabinClass] = React.useState('economy');
  const [passengers, setPassengers] = React.useState({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0
  });
  const [open, setOpen] = React.useState(false);
  const [flights, setFlights] = React.useState([{ from: '', to: '', departureDate: '', returnDate: '' }]);

  const handleTripChange = (event) => {
    setTripType(event.target.value);
  };

  const handleClassChange = (event) => {
    setCabinClass(event.target.value);
  };

  const handlePassengerChange = (type, delta) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + delta)
    }));
  };

  const toggleDialog = () => {
    setOpen(!open);
  };

  const totalPassengers = () => {
    return Object.values(passengers).reduce((a, b) => a + b, 0);
  };

  const addFlight = () => {
    setFlights([...flights, { from: '', to: '', departureDate: '', returnDate: '' }]);
  };

  const handleFlightChange = (index, field, value) => {
    const updatedFlights = flights.map((flight, idx) =>
      idx === index ? { ...flight, [field]: value } : flight
    );
    setFlights(updatedFlights);
  };

  const removeFlight = (index) => {
    setFlights(flights.filter((_, idx) => idx !== index));
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container maxWidth="lg" sx={{ padding: 2, marginTop: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Button
          variant="text"
          startIcon={<TravelExploreIcon sx={{ color: '#1976d2' }} />}
          sx={{
            marginX: 1,
            borderRadius: '20px',
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Travel
        </Button>
        <Button
          variant="text"
          startIcon={<ExploreIcon sx={{ color: '#1976d2' }} />}
          sx={{
            marginX: 1,
            borderRadius: '20px',
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Explore
        </Button>
        <Button
          variant="text"
          startIcon={<FlightTakeoffIcon sx={{ color: '#1976d2' }} />}
          sx={{
            marginX: 1,
            borderRadius: '20px',
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Flights
        </Button>
        <Button
          variant="text"
          startIcon={<HotelIcon sx={{ color: '#1976d2' }} />}
          sx={{
            marginX: 1,
            borderRadius: '20px',
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Hotels
        </Button>
        <Button
          variant="text"
          startIcon={<HomeWorkIcon sx={{ color: '#1976d2' }} />}
          sx={{
            marginX: 1,
            borderRadius: '20px',
            padding: '6px 16px',
            textTransform: 'none',
            fontWeight: 'bold',
          }}
        >
          Vacation Rentals
        </Button>
      </Box>

      <img src={airplaneImage} alt="Airplane" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Search Flights...</h1>
      <Box sx={{ background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', padding: 3 }}>
        <Grid container spacing={3} justifyContent="center" sx={{ marginBottom: '20px' }}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Trip Type</InputLabel>
              <Select value={tripType} label="Trip Type" onChange={handleTripChange}>
                <MenuItem value="round">Round Trip</MenuItem>
                <MenuItem value="one-way">One-way</MenuItem>
                <MenuItem value="multi-city">Multi-city</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Class</InputLabel>
              <Select value={cabinClass} label="Class" onChange={handleClassChange}>
                <MenuItem value="economy">Economy</MenuItem>
                <MenuItem value="premium-economy">Premium Economy</MenuItem>
                <MenuItem value="business">Business</MenuItem>
                <MenuItem value="first">First</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button
              onClick={toggleDialog}
              variant="outlined"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 20px',
                borderColor: '#1976d2',
                borderRadius: '8px',
                textTransform: 'none',
                color: '#1976d2',
                fontWeight: 'bold',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#e3f2fd',
                },
              }}
              fullWidth
            >
              <PersonIcon sx={{ marginRight: '8px' }} />
              Passenger: {totalPassengers()}
            </Button>
            <Dialog open={open} onClose={toggleDialog}>
              <DialogTitle>Adjust Passengers</DialogTitle>
              <DialogContent>
                {Object.entries(passengers).map(([key, value]) => (
                  <Grid container key={key} spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <Typography variant="body1">
                        {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={8} style={{ display: 'flex', alignItems: 'center' }}>
                      <IconButton onClick={() => handlePassengerChange(key, -1)} disabled={value <= 0}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body1" sx={{ margin: '0 10px' }}>
                        {value}
                      </Typography>
                      <IconButton onClick={() => handlePassengerChange(key, 1)}>
                        <AddIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
              </DialogContent>
            </Dialog>
          </Grid>
        </Grid>

        {flights.map((flight, index) => (
          <Box key={index} sx={{ marginTop: '5px', marginBottom: '15px', position: 'relative' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="From"
                  variant="outlined"
                  value={flight.from}
                  onChange={(e) => handleFlightChange(index, 'from', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="To"
                  variant="outlined"
                  value={flight.to}
                  onChange={(e) => handleFlightChange(index, 'to', e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationOnIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  fullWidth
                  label="Departure Date"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  value={flight.departureDate}
                  onChange={(e) => handleFlightChange(index, 'departureDate', e.target.value)}
                  inputProps={{
                    min: today,
                  }}
                />
              </Grid>
              {tripType === 'round' && index === 0 && (
                <Grid item xs={12} sm={3}>
                  <TextField
                    fullWidth
                    label="Return Date"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    value={flight.returnDate}
                    onChange={(e) => handleFlightChange(index, 'returnDate', e.target.value)}
                    inputProps={{
                      min: flight.departureDate || today,
                    }}
                  />
                </Grid>
              )}
            </Grid>
            {index > 0 && (
              <IconButton
                onClick={() => removeFlight(index)}
                sx={{ position: 'absolute', top: 8, right: -8 }}
              >
                <CloseIcon />
              </IconButton>
            )}
          </Box>
        ))}

        {tripType === 'multi-city' && (
          <Grid item xs={12}>
            <Button variant="outlined" onClick={addFlight} fullWidth startIcon={<AddIcon />}>
              Add Flight
            </Button>
          </Grid>
        )}

        <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: '20px',
              padding: '8px 24px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Grid>

        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
            Explore Destinations
          </Typography>
          <ComposableMap>
            <Geographies geography="https://unpkg.com/world-atlas@1.1.4/world/110m.json">
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => alert(`You clicked on ${geo.properties.NAME}`)}
                    style={{
                      default: { fill: '#D6D6DA', outline: 'none' },
                      hover: { fill: '#F53', outline: 'none' },
                      pressed: { fill: '#E42', outline: 'none' },
                    }}
                  />
                ))
              }
            </Geographies>
          </ComposableMap>
        </Box>
      </Box>
    </Container>
  );
}
