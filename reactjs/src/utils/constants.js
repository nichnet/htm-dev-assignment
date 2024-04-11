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