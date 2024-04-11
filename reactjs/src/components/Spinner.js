import { HashLoader } from "react-spinners";

function Spinner({message}) {
    
    const backgroundColor = "#369cd7";

    return (
        <center>
            <HashLoader color={backgroundColor}/>
            <p style={{marginTop: "36px"}}>{message}</p>
        </center>
    );
}

export default Spinner;