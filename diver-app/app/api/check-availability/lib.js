export const formatReserves = (reservations) => {
    
    // 2. Get all unique dates
    const allDates = new Set();
    reservations.forEach(res => {
        allDates.add(res.checkIn);
        allDates.add(res.checkOut);
    });
    
    // 3. Sort dates chronologically
    const sortedDates = Array.from(allDates)
        .sort((a, b) => new Date(a) - new Date(b));
    
    // 4. Create ranges and calculate quantities
    const dateRanges = [];
    
    for (let i = 0; i < sortedDates.length - 1; i++) {
        const checkIn = sortedDates[i];
        const checkOut = sortedDates[i + 1];
        
        let totalQuantity = 0;
        
        // Check each reservation
        reservations.forEach(res => {
            // Is this reservation active during this range?
            const reservationStartsOnOrBefore = 
                new Date(res.checkIn) <= new Date(checkIn);
            const reservationEndsOnOrAfter = 
                new Date(res.checkOut) >= new Date(checkOut);
            
            if (reservationStartsOnOrBefore && reservationEndsOnOrAfter) {
                totalQuantity += res.quantity;
            }
        });
        
        if (totalQuantity > 0) {
            dateRanges.push({
                checkIn,
                checkOut,
                quantity: totalQuantity,
            });
        }
    }
    
    return dateRanges;
}

