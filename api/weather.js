export default async function handler(req, res) {
    const { API_KEY } = process.env;

    const { city, lat, lon } = req.query;

    if (!API_KEY) {
        return res.status(500).json({ error: 'Server configuration error: API Key missing' });
    }

    const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
    let externalUrl = "";

    
    if (city) {  
        externalUrl = `${baseUrl}?q=${city}&units=metric&appid=${API_KEY}`;
    } else if (lat && lon) {
        externalUrl = `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else {
        return res.status(400).json({ error: 'Missing city or coordinates' });
    }

    
    try {
        const response = await fetch(externalUrl);
        const data = await response.json();
        
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}