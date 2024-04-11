import { chooseRandomFromArray, userSearchPrompts } from '../utils/constants';
import { useEffect, useState } from 'react';
import {HashLoader} from 'react-spinners';
import { Row, Col } from 'react-bootstrap';
import PropertySearchFilter from '../components/Filter/PropertySerachFilter/PropertySearchFilter';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import ScrollToTop from "react-scroll-to-top";
import { 
    MdTune as FilterIcon, 
    MdMap as MapIcon, 
    MdExpandLess as UpArrowIcon 
} from 'react-icons/md';

import './HomePage.css';
import PopoutFilterDrawer from '../components/Filter/PopoutFilterDrawer';

function HomePage() {

    const [showDrawer, setShowDrawer] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [propertiesData, setPropertiesData] = useState(null);

    useEffect(() => {
        setLoadingData(true);

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
                    setLoadingData(false);
                }, 2300);
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
        <Col className="px-2 px-sm-0">
            <ScrollToTop smooth component={<UpArrowIcon/>}/>
            <Row className="px-0 align-items-center">
                <MapIcon className="icon border rounded primary"/>
                <Col className="px-3  ps-md-3 pe-md-0">
                    <input className="search rounded shadow" type="text" placeholder="Search for hundreds of properties..." />
                </Col>
                <FilterIcon className="icon border rounded primary d-block d-md-none" onClick={() => setShowDrawer(!showDrawer)}/>
            </Row>

            <Row>
                <Col className="px-0" xs={12} md={{span:8, offset:4}} lg={{span:9, offset:3}}>
                    <p className="large-label">{loadingData ? "Searching..."  : `${propertiesData?.length ?? 0} Properties Found`}</p>
                </Col>
            </Row>
            <Row>
               <Col xs={0} md={4} lg={3} className="d-none d-md-block">
                    <Row className="me-1 box shadow rounded">
                        <PropertySearchFilter />
                    </Row>
                </Col>
                <Col xs={12} md={8} lg={9} className="p-0" style={{minHeight:"400px"}}>
                    {!propertiesData ? 
                        <div style={{display: "flex", justifyContent:"center", alignItems:"center", minHeight: "100%"}}>
                            <center>
                                <HashLoader color="#369cd7"/>
                                <p style={{marginTop: "36px"}}>{chooseRandomFromArray(userSearchPrompts)}</p>
                            </center>
                        </div>
                        :
                        <div>
                            {buildFilteredResults()}
                            <div>
                                <a href="#">Prev</a>
                                <p>1 of 2</p>
                                <a href="#">Next</a>
                            </div>
                        </div>
                    }
                </Col>
            </Row>

            <PopoutFilterDrawer show={showDrawer} closeDrawerCallback={() => setShowDrawer(false)}/>
        </Col>
    );
}

export default HomePage;