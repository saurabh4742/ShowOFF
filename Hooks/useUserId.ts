// hooks/useUserId.js
import { useState, useEffect } from 'react';

const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await fetch('/api/getUserId');
                const data = await response.json();
                setUser(data.userId);
            } catch (error) {
                console.error('Failed to fetch user ID:', error);
            }
        };

        fetchUserId();
    }, []);

    return user;
};

export default useUser;
