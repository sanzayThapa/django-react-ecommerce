import { useEffect, useState } from "react";
import { setUser } from "../utils/auth";

const MainWrapper = ({ children }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const handler = async () => {
            setLoading(true); // Indicate loading is active
            await setUser();  // Call the setUser function to initialize user state
            setLoading(false); // Indicate loading is complete
        };

        handler(); // Call the handler function
    }, []); // Dependency array ensures this effect runs only once on mount

    // Render either null (or a spinner/placeholder) while loading, or children after loading
    <>{loading ? null : children}</>
};

export default MainWrapper;
