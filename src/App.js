
import './App.css';
import Startpage from "./Startpage"
import { BrowserRouter as Router, Route } from "react-router-dom"
import CountryDetails from "./CountryDetails"
import Header from "./Header"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
      
        <Route exact path="/" component={Startpage} />
        <Route path="/country/:name" component={CountryDetails}/>
      </Router>
      
    </div>
  );
}

export default App;
