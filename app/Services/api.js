export const getDestinations = async () => {
    try {
        const response = await fetch("http://localhost:8000/destinations");
        if (!response.ok) {
            throw new Error('Error fetching destinations');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getDestinationId = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/destinations/${id}`)
          if (!response.ok) {
            throw new Error('Error fetching destinations');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
}


export const addDestination = async (destinationData) => {
    try {
        const response = await fetch("http://localhost:8000/destinations",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(destinationData)
        } );
         if (!response.ok) {
            throw new Error('Error fetching destinations');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
}


export const updateDestination = async (id, destinationData) => {
    try {
        const response = await fetch(`http://localhost:8000/destinations/${id}`, {
            method: 'PUT',
             headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(destinationData)
            
        });
         if (!response.ok) {
            throw new Error('Error fetching destinations');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const addFavoriteDestination = async (id, favoriteDestination) => {
    try {
        const response = await fetch(`http://localhost:8000/destinations/${id}`, {
            method: 'PUT',
             headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(favoriteDestination)
            
        });
         if (!response.ok) {
            throw new Error('Error fetching destinations');
        } 
        return await response.json();
    } catch (error) {
        throw error;
    }
}

export const deleteDestinations = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/destinations/${id}`, {
            method: 'DELETE'
        })

         if (!response.ok) {
            throw new Error('Error fetching destinations');
        } 
        return await response.json();
    } catch (error) {
        throw error;   
    }
} 