import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import {Container} from 'react-bootstrap';

function App() {
  return (
    <div>
      <Header/>
      <Container className="page">
        <HomePage/>
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
