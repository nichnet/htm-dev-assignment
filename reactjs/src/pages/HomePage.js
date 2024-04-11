import { useEffect, useState } from 'react';
import {HashLoader} from 'react-spinners';
import { Row, Col, Button, Offcanvas } from 'react-bootstrap';
import PropertySearchFilter from '../components/Filter/PropertySearchFilter';
import PropertyCard from '../components/PropertyCard/PropertyCard';
function HomePage() {

    const [showDrawer, setShowDrawer] = useState(false);
    const [propertiesData, setPropertiesData] = useState(null);

    useEffect(() => {
        fetch('/data/properties.json')
        .then(response => {
            if(!response.ok) {
                throw new Error('Network Response Error, not ok.');
            }

            return response.json();
        })
        .then(json => {
            // Simulate loading time.
            setTimeout(() => {
                setPropertiesData(json);
            }, 1000);
        })
        .catch(err => {
            //TODO show error modal.
            console.log("error:", err);
        })
    }, []);

    const buildFilteredResults = () => {
        return propertiesData.map((propertyData, index) => {
            return <PropertyCard key={index} data={propertyData}/>
        });
    };

    return (
        <>
            <Row>
                <Col xs={0} md={4} lg={3} className="box shadow rounded d-none d-md-block">
                    <PropertySearchFilter/>
                </Col>
                <Col xs={12} md={8} lg={9}>
                    <Button className="d-none d-md-block" onClick={() => setShowDrawer(!showDrawer)}>Filter Results</Button>
                    <p>{propertiesData ? `${propertiesData.length} Properties Found` : null}</p>
                    <div>

                    {!propertiesData ? 
                        <center>
                            <HashLoader color="#36d7b7" />
                        </center>
                        :
                        <div>
                            {buildFilteredResults()}
                        </div>
                    }
                    </div>
                </Col>
            </Row>

            <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Drawer</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <PropertySearchFilter/>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default HomePage;