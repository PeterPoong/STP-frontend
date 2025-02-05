export const requestUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error("Geolocation is not supported by this browser."));
        }
    });
};

export const requestUserCountry = async () => {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();

        if (data && data.country) {
            const country = data.country; // Get the country code
            sessionStorage.setItem('userCountry', country); // Save country in session storage
            console.log("Fetched country:", country); // Log the fetched country
            return country;
        } else {
            throw new Error('Unable to fetch location data');
        }
    } catch (error) {
        console.error("Error fetching country:", error);
        return null; // Return null if there's an error
    }
}; 