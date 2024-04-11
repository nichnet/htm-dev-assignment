import { chooseRandomFromArray, userSearchPrompts } from '../utils/constants';
import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import ScrollToTop from "react-scroll-to-top";
import PropertySearchFilter from '../components/Filters/PropertySearchFilter/PropertySearchFilter';
import PropertyCard from '../components/PropertyCard/PropertyCard';
import PopoutFilterDrawer from '../components/PopoutFilterDrawer';
import Spinner from '../components/Spinner';
import MessageModal from '../components/Modal/MessageModal';
import ViewPropertyDetailsModal from '../components/Modal/ViewPropertyDetailsModal';
import Pagination from '../components/Pagination/Pagination';
import { 
    MdTune as FilterIcon, 
    MdMap as MapIcon, 
    MdExpandLess as UpArrowIcon 
} from 'react-icons/md';

import './HomePage.css';

function HomePage() {

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageModalText, setMessageModalText] = useState('');
    const [messageModalTitle, setMessageModalTitle] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

    const [showDrawer, setShowDrawer] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [filterMaximums, setFilterMaximums] = useState(null);

    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [propertiesData, setPropertiesData] = useState(null);

    const getFilterMaximums = () => {
        fetch('/data/properties.json')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network Response Error, not ok.');
                }

                return response.json();
            })
            .then(json => {
                let maxRooms = 0;
                let maxFloorArea = 0;
                let maxBathrooms = 0;
                let maxBeds = 0;
    
                // Iterate over each property to find maximum values
                json.forEach(property => {
                    maxBeds = Math.max(maxBeds, property.standardPax);
                    maxRooms = Math.max(maxRooms, property.gradeSort);
                    maxFloorArea = Math.max(maxFloorArea, property.floorArea);
                    maxBathrooms = Math.max(maxBathrooms, property.bathrooms);
                });
                
                setFilterMaximums({
                    max_rooms: maxRooms, 
                    max_floorarea: maxFloorArea, 
                    max_bathrooms: maxBathrooms, 
                    max_beds: maxBeds
                });
            })
            .catch(err => {
                setMessageModalTitle("Error");
                setMessageModalText("An error occurred fetching the requested properties. Please try again.");
                setShowMessageModal(true);
            });
    }

    useEffect(() => {
        setIsLoadingData(true);

        getFilterMaximums();

        //fetch data for user query
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
                    setIsLoadingData(false);
                }, 2300);
            })
            .catch(err => {
                setMessageModalTitle("Error");
                setMessageModalText("An error occurred fetching the requested properties. Please try again.");
                setShowMessageModal(true);
            });
    }, []);

    const buildFilteredPropertiesData = () => {
        return propertiesData.map((propertyData, index) => {
            return <PropertyCard key={index} data={propertyData} 
                onPropertySelectedCallback={() => {setSelectedPropertyId(propertyData.id); setShowBookingModal(true);}} />
        });
    };

    const handlePageChanged = (page) => {
        console.log(page);
    };

    const handlePropertyFiltersChanged = (filters) => {
        console.log(filters);
    }

    return (
        <>
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
                        <p className="large-label">{isLoadingData ? "Searching..."  : `${propertiesData?.length ?? 0} Properties Found`}</p>
                    </Col>
                </Row>
                <Row>
                <Col xs={0} md={4} lg={3} className="d-none d-md-block">
                        <Row className="me-1 box shadow rounded">
                            <PropertySearchFilter maximums={filterMaximums} onFiltersAppliedCallback={handlePageChanged}/>
                        </Row>
                    </Col>
                    <Col xs={12} md={8} lg={9} className="p-0" style={{minHeight:"400px"}}>
                        {!propertiesData ? 
                            <div style={{display: "flex", justifyContent:"center", alignItems:"center", minHeight: "100%"}}>
                                <Spinner message={chooseRandomFromArray(userSearchPrompts)}/>
                            </div>
                            :
                            <div>
                                {buildFilteredPropertiesData()}
                                <Pagination currentPage={1} maxPages={10} onGotoPageCallback={handlePageChanged}/>
                            </div>
                        }
                    </Col>
                </Row>

                <PopoutFilterDrawer show={showDrawer} maximums={filterMaximums} onFiltersAppliedCallback={handlePropertyFiltersChanged} closeDrawerCallback={() => setShowDrawer(false)}/>
            </Col>

            <MessageModal title={messageModalTitle} message={messageModalText} show={showMessageModal} onMessageCloseCallback={() => setShowMessageModal(false)}/>
            <ViewPropertyDetailsModal propertyId={selectedPropertyId} show={showBookingModal} onCloseCallback={() => {setShowBookingModal(false); setSelectedPropertyId(null);}}/>
        </>
    );
}

export default HomePage;