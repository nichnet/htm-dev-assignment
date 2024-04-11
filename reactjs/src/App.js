import Footer from "./components/Nav/Footer";
import Header from "./components/Nav/Header";
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
