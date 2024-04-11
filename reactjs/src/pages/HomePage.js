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

    const PAGE_SIZE = 2;

    const [filterRanges, setFilterRanges] = useState(null);
    const [maximumPages, setMaximumPages] = useState(1);
    const [searchResultsSize, setSearchResultsSize] = useState(0);

    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [appliedPropertyFilters, setAppliedPropertyFilters] = useState({});

    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageModalText, setMessageModalText] = useState('');
    const [messageModalTitle, setMessageModalTitle] = useState('');
    const [showBookingModal, setShowBookingModal] = useState(false);

    const [showDrawer, setShowDrawer] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const [selectedPropertyId, setSelectedPropertyId] = useState(null);
    const [propertiesData, setPropertiesData] = useState(null);

    const setURLFilters = () => {
        const queryParams = new URLSearchParams();

        //apply search query
        if(searchQuery) {
            queryParams.append('q', searchQuery);
        }

        //apply filters
        if(appliedPropertyFilters.rooms) {
            queryParams.append('r', `${appliedPropertyFilters.rooms[0]}-${appliedPropertyFilters.rooms[1]}`);
        }
        if(appliedPropertyFilters.beds) {
            queryParams.append('b', `${appliedPropertyFilters.beds[0]}-${appliedPropertyFilters.beds[1]}`);
        }
        if(appliedPropertyFilters.bathrooms) {
            queryParams.append('br', `${appliedPropertyFilters.bathrooms[0]}-${appliedPropertyFilters.bathrooms[1]}`);
        }
        if(appliedPropertyFilters.floorarea) {
            queryParams.append('f', `${appliedPropertyFilters.floorarea[0]}-${appliedPropertyFilters.floorarea[1]}`);
        }
        if(appliedPropertyFilters.upgraded_facilities) {
            queryParams.append('u', 1);
        }

        //apply page
        if(currentPage > 1) {
            queryParams.append('p', currentPage);
        }

        const baseUrl = window.location.href.split('?')[0];
        const newUrl = `${baseUrl}?${queryParams.toString()}`;
        window.history.replaceState({}, '', newUrl);
    };

    const getURLFilters = () => {
        const queryParams = new URLSearchParams(window.location.search);

        let query = '';
        let page = 1;
        let filters = {};

        if(queryParams.has('q')) {
            query = queryParams.get('q');
        }

        if(queryParams.has('p')) {
            query = parseInt(queryParams.get('p'));
        }

        if(queryParams.has('r')) {
            filters.rooms = queryParams.get('r')?.split('-').map(Number);
        }
        if(queryParams.has('b')) {
            filters.beds = queryParams.get('b')?.split('-').map(Number);
        }
        if(queryParams.has('br')) {
            filters.bathrooms = queryParams.get('br')?.split('-').map(Number);
        }
        if(queryParams.has('r')) {
            
        }
        if(queryParams.has('f')) {
            filters.floorarea = queryParams.get('f')?.split('-').map(Number);
        }
        if(queryParams.has('u')) {
            filters.upgraded_facilities = queryParams?.get('u') == 1 ? true : false;
        }

        setSearchQuery(query);
        console.log(filters);
        setAppliedPropertyFilters(filters);
        setCurrentPage(page);
    };

    const getFilterRanges = () => {
        fetch('/data/properties.json')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network Response Error, not ok.');
                }

                return response.json();
            })
            .then(json => {
                //initially set to infinite, so that the min/max won't possibly be reached on the first iteration, and update.
                let roomRanges = [Infinity, -Infinity];
                let floorAreaRanges = [Infinity, -Infinity];
                let bathroomsRanges = [Infinity, -Infinity];
                let bedsRanges = [Infinity, -Infinity];
    
                //iterate over each property to find maximum values
                json.forEach(property => {
                    roomRanges[0] = Math.min(roomRanges[0], parseInt(property.gradeSort));
                    roomRanges[1] = Math.max(roomRanges[1], parseInt(property.gradeSort));
                
                    floorAreaRanges[0] = Math.min(floorAreaRanges[0], parseInt(property.floorArea));
                    floorAreaRanges[1] = Math.max(floorAreaRanges[1], parseInt(property.floorArea));
                
                    bathroomsRanges[0] = Math.min(bathroomsRanges[0], parseInt(property.bathrooms));
                    bathroomsRanges[1] = Math.max(bathroomsRanges[1], parseInt(property.bathrooms));
               
                    bedsRanges[0] = Math.min(bedsRanges[0], parseInt(property.standardPax));
                    bedsRanges[1] = Math.max(bedsRanges[1], parseInt(property.standardPax));
                });
                
                setFilterRanges({
                    rooms: roomRanges, 
                    floorarea: floorAreaRanges, 
                    bathrooms: bathroomsRanges, 
                    beds: bedsRanges
                });
            })
            .catch(err => {
                setMessageModalTitle("Error");
                setMessageModalText("An error occurred fetching the requested properties. Please try again.");
                setShowMessageModal(true);
            });
    }

    useEffect(() => {
        getFilterRanges();
        getURLFilters();
        performSearchQuery();
    }, []);

    const buildFilteredPropertiesData = () => {
        return propertiesData.map((propertyData, index) => {
            return <PropertyCard key={index} data={propertyData} 
                onPropertySelectedCallback={() => {setSelectedPropertyId(propertyData.id); setShowBookingModal(true);}} />
        });
    };

    useEffect(() => {
        //update the current page to 1 if the search terms or filters are changed.
        performSearchQuery(searchQuery, currentPage, appliedPropertyFilters);
    }, [searchQuery]);

    useEffect(()=> {
        performSearchQuery(searchQuery, currentPage, appliedPropertyFilters);
    }, [currentPage]);

    const performSearchQuery = () => {
        setURLFilters();
        setIsLoadingData(true);
       
        fetch('/data/properties.json')
            .then(response => {
                if(!response.ok) {
                    throw new Error('Network Response Error, not ok.');
                }

                return response.json();
            })
            .then(json => {
                //simulate loading time.
                setTimeout(() => {
                    let filteredResults = json.filter(property => {
                        //filter by property name or description
                        if (searchQuery) {
                            const queryLower = searchQuery.toLowerCase();
                            if (!(property.name.toLowerCase().includes(queryLower) || 
                                property.description.toLowerCase().includes(queryLower))) {
                                return false; // Skip if property name or description doesn't match the search query
                            }
                        }

                        
                        //apply other filters
                        if (appliedPropertyFilters.rooms && (property.gradeSort < appliedPropertyFilters.rooms[0] || property.gradeSort > appliedPropertyFilters.rooms[1])) {
                            return false;
                        }
                        if (appliedPropertyFilters.floorarea && (property.floorArea < appliedPropertyFilters.floorarea[0] || property.floorArea > appliedPropertyFilters.floorarea[1])) {
                            return false;
                        }
                        if (appliedPropertyFilters.beds && (property.standardPax < appliedPropertyFilters.beds[0] || property.standardPax > appliedPropertyFilters.beds[1])) {
                            return false; 
                        }
                        if (appliedPropertyFilters.bathrooms && (property.bathrooms < appliedPropertyFilters.bathrooms[0] || property.bathrooms > appliedPropertyFilters.bathrooms[1])) {
                            return false;
                        } 
                        if (appliedPropertyFilters.upgraded_facilities && !property.upgradedFacilities) {
                            return false;
                        }  

                        //all criteria met, include property in filtered results
                        return true;
                    });
        
                    //apply page offset
                    const indexOffset = (currentPage * PAGE_SIZE) - PAGE_SIZE;
                    const filteredResultsForPage = filteredResults.slice(indexOffset, indexOffset + PAGE_SIZE);
                    //apply
                    setSearchResultsSize(filteredResults.length);
                    setMaximumPages(Math.max(Math.ceil(filteredResults.length / PAGE_SIZE), 1));
                    setPropertiesData(filteredResultsForPage);

                    setIsLoadingData(false);
                }, 2300);
            })
            .catch(err => {
                setMessageModalTitle("Error");
                setMessageModalText("An error occurred fetching the requested properties. Please try again.");
                setShowMessageModal(true);
            });

    };

    return (
        <>
            <Col className="px-2 px-sm-0">
                <ScrollToTop smooth component={<UpArrowIcon/>}/>
                <Row className="px-0 align-items-center">
                    <MapIcon className="icon border rounded primary"/>
                    <Col className="px-3  ps-md-3 pe-md-0">
                        <input className="search rounded shadow" type="text" defaultValue={searchQuery} placeholder="Search for hundreds of properties..." onChange={(e) => {setCurrentPage(1); setSearchQuery(e.target.value);}}/>
                    </Col>
                    <FilterIcon className="icon border rounded primary d-block d-md-none" onClick={() => setShowDrawer(true)}/>
                </Row>

                <Row>
                    <Col className="px-0" xs={12} md={{span:8, offset:4}} lg={{span:9, offset:3}}>
                        <p className="large-label">{isLoadingData ? "Searching..."  : `${searchResultsSize} Properties Found`}</p>
                    </Col>
                </Row>
                <Row>
                <Col xs={0} md={4} lg={3} className="d-none d-md-block">
                        <Row className="me-1 box shadow rounded">
                            <PropertySearchFilter ranges={filterRanges} defaultAppliedRanges={appliedPropertyFilters} onFiltersAppliedCallback={(appliedFilters) => setAppliedPropertyFilters(appliedFilters)} performSearchCallback={performSearchQuery}/>
                        </Row>
                    </Col>
                    <Col xs={12} md={8} lg={9} className="p-0" style={{minHeight:"400px"}}>
                        {
                            isLoadingData ? 
                            <div style={{display: "flex", justifyContent:"center", alignItems:"center", minHeight: "100%"}}>
                                <Spinner message={chooseRandomFromArray(userSearchPrompts)}/>
                            </div>
                            :
                            propertiesData.length > 0 ?
                            buildFilteredPropertiesData()
                            :
                            <>
                                <div style={{display: "flex", justifyContent:"center", alignItems:"center", minHeight: "100%"}}>
                                    <p>{searchQuery.length > 0 ? `No results for '${searchQuery}'` : "No results"}</p>
                                </div>
                            </>
                        }
                    </Col>
                </Row>

                {
                    isLoadingData ?
                    null
                    :
                    <Pagination currentPage={currentPage} maxPages={maximumPages} onGotoPageCallback={(page) => setCurrentPage(page)}/>
                }
                
                <PopoutFilterDrawer show={showDrawer} ranges={filterRanges} defaultAppliedRanges={appliedPropertyFilters} onFiltersAppliedCallback={(appliedFilters) => setAppliedPropertyFilters(appliedFilters)} closeDrawerCallback={() => setShowDrawer(false)}  performSearchCallback={performSearchQuery}/>
            </Col>

            <MessageModal title={messageModalTitle} message={messageModalText} show={showMessageModal} onMessageCloseCallback={() => setShowMessageModal(false)}/>
            <ViewPropertyDetailsModal propertyId={selectedPropertyId} show={showBookingModal} onCloseCallback={() => {setShowBookingModal(false); setSelectedPropertyId(null);}}/>
        </>
    );
}

export default HomePage;