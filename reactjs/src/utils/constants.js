export const userSearchPrompts = [
    "Searching through hundreds of properties...",
    "Finding the best property for you!",
    "Working on it...",
    "Let's find something that suits you!",
]

export const chooseRandomFromArray = (arr) => {
    if(!arr) {
        return null;
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

export const calculateDistanceToTownCentre = (distance) => {
    if (distance < 25) {
        return "In Town";
    } else {
        let roundedMetres = Math.round(distance / 100) * 100;
    
        let outDistance = `${roundedMetres}m`;
        
        if (roundedMetres >= 1000) {
            // Calculate kilometers
            let kilometres = Math.floor(roundedMetres / 1000);
            let remainingMetres = roundedMetres % 1000;
            let kmm = kilometres;
    
            if(remainingMetres > 0) {
                kmm += `.${remainingMetres / 100}`;
            }
            
            outDistance = `${kmm}km`;
        }
        
        return `${outDistance} from Town`;
    }
}
