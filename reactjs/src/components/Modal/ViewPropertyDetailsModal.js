import { useEffect, useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import Spinner from "../Spinner";
import MessageModal from "./MessageModal";
import PropertyDetails from "../PropertyDetails/PropertyDetails";

function ViewPropertyDetailsModal({propertyId, show, onCloseCallback}) {
    
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [messageModalText, setMessageModalText] = useState('');
    const [messageModalTitle, setMessageModalTitle] = useState('');

    const [propertyData, setPropertyData] = useState(null);
    const [isLoadingData, setIsLoadingData] = useState(true);

    const showErrorMessage = (title, message) => {
        setMessageModalTitle(title);
        setMessageModalText(message);
        setShowMessageModal(true);
    };

    useEffect(() => {
        if(!propertyId) {
            return;
        }

        setIsLoadingData(true);

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
                    // Would already be returning a single object in the backend API, but for test-sake:
                    const property = json.find((p) => p.id === propertyId);

                    if(!property || property === undefined) {
                        throw new Error('Property not found.')
                    }
                    
                    setPropertyData(property);
                    setIsLoadingData(false);
                }, 1200);
            })
            .catch(err => {
                showErrorMessage("Error", "An error occurred fetching the property details. Please try again.");
            });
            return(() => {
                setPropertyData(null);
            });
    }, [propertyId]);
    
    const handleCloseModal = () => {
        setIsLoadingData(false);
        setPropertyData(null);
        setShowMessageModal(false, () => onCloseCallback())
    };
    
    const getAmenities = () => {
        const amenities = propertyData.amenities;

        let out = [];

        for (const property in amenities) {
            if (amenities.hasOwnProperty(property)) {
                if (amenities[property] === true) {
                    const capitalizedAmenity = property.charAt(0).toUpperCase() + property.slice(1);
                    out.push(capitalizedAmenity);
                }
            }
        }

        return out.join(", ");
    }

    const buildPropertyData = () => {
        return (
            <Row>
                <Col>
                    <img style={{height: "96px", width: "100%", marginBottom:"12px", objectFit: "cover", borderRadius: "6px"}}src={`/images/properties/${propertyData.id}_hero_winter_thumbnail.jpg`} alt={propertyData.name}/>           
                    <PropertyDetails data={propertyData}/>
                    {
                        propertyData.upgradedFacilities
                        ?
                        <p style={{marginTop: "12px", fontSize: "0.8em"}}>
                            <span><b>Amenities:</b></span><br/>
                            <span>{getAmenities()}</span>
                        </p>
                        :
                        null
                    }
                    <div>
                        <p className="text-end text-success">Available</p>
                        <Button className="mt-2 w-100">Book Now</Button>
                    </div>
                </Col>
            </Row>
        );
    }

    return (
        <>
            <Modal show={show} onHide={onCloseCallback} centered style={{minHeight: "400px"}}>
                <Modal.Header closeButton>
                    <Modal.Title>Property Details</Modal.Title>
                </Modal.Header>
                {
                    isLoadingData ?
                    <Spinner style={{marginTop: "24px"}} message="Fetching Property Details..."/>
                    : 
                    propertyData ? 
                    <>
                        
                        <Modal.Body>
                            {buildPropertyData()}
                        </Modal.Body>
                    </>
                    :
                    null
                }
            </Modal>

            <MessageModal title={messageModalTitle} message={messageModalText} show={showMessageModal} onCloseCallback={handleCloseModal}/>
        </>
    );
}

export default ViewPropertyDetailsModal;