var flights = [
    { flightNumber: "AA100", departureTime: "7:00", arrivalTime: "8:30", duration: 1.5, destination: "La Guardia (New York)", priceEconomy: 200, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA101", departureTime: "10:00", arrivalTime: "12:00", duration: 3, destination: "George Bush Airport (Houston)", priceEconomy: 300, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA102", departureTime: "8:00", arrivalTime: "9:00", duration: 1, destination: "Philadelphia Airport (Philadelphia)", priceEconomy: 125, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA103", departureTime: "9:00", arrivalTime: "10:45", duration: 1.75, destination: "Hartsfield-Jackson Airport (Atlanta)", priceEconomy: 300, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA104", departureTime: "12:00", arrivalTime: "14:00", duration: 3, destination: "Dallas/Fort Worth Airport (Dallas)", priceEconomy: 325, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA150", departureTime: "10:00", arrivalTime: "12:00", duration: 5, destination: "McCarran Airport (Las Vegas)", priceEconomy: 550, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA151", departureTime: "12:00", arrivalTime: "14:00", duration: 5, destination: "San Diego Airport (California)", priceEconomy: 650, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA152", departureTime: "14:00", arrivalTime: "13:30", duration: 1.5, destination: "Ronald Reagan Airport (Washington)", priceEconomy: 150, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA170", departureTime: "15:00", arrivalTime: "21:00", duration: 12, destination: "Honolulu Airport (Hawaii)", priceEconomy: 1300, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA190", departureTime: "13:00", arrivalTime: "14:30", duration: 1.5, destination: "Detroit Metropolitan Airport (Michigan)", priceEconomy: 150, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA191", departureTime: "16:00", arrivalTime: "17:45", duration: 1.75, destination: "Boston Logan Airport (Boston)", priceEconomy: 175, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA192", departureTime: "17:00", arrivalTime: "18:00", duration: 1, destination: "Philadelphia Airport (Philadelphia)", priceEconomy: 150, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA193", departureTime: "18:00", arrivalTime: "19:30", duration: 1.5, destination: "La Guardia (New York)", priceEconomy: 250, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA250", departureTime: "7:00", arrivalTime: "9:30", duration: 2.5, destination: "Fort Lauderdale Airport (Miami)", priceEconomy: 400, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA300", departureTime: "8:00", arrivalTime: "21:00", duration: 8, destination: "London Heathrow Airport (London)", priceEconomy: 750, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA350", departureTime: "13:00", arrivalTime: "15:00", duration: 5, destination: "Ontario Airport (Ontario)", priceEconomy: 450, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA351", departureTime: "17:30", arrivalTime: "19:30", duration: 2, destination: "Quebec City Jean Lesage Airport (Quebec)", priceEconomy: 250, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA400", departureTime: "11:00", arrivalTime: "15:00", duration: 5, destination: "Mexico City Airport (Mexico)", priceEconomy: 700, economySeats: 80, firstClassSeats: 20 },
    { flightNumber: "AA500", departureTime: "6:30", arrivalTime: "21:30", duration: 9, destination: "Charles De Gaulle Airport (Paris)", priceEconomy: 850, economySeats: 80, firstClassSeats: 20 }
];

// counts first class seats prices
flights.forEach(function(flight) {
    flight.priceFirstClass = flight.priceEconomy * 2.2;
});

// helps calculate the population of available seats on the plane
function populateFlightTable() {
    var tableBody = document.querySelector("#FlightTableBody");
    flights.forEach(function(flight) {
        var row = document.createElement("tr");
        row.innerHTML = `
            <td>${flight.flightNumber}</td>
            <td>${flight.departureTime}</td>
            <td>${flight.arrivalTime}</td>
            <td>${flight.duration}</td>
            <td>${flight.destination}</td>
            <td>$${flight.priceEconomy}</td>
            <td>
                Economy: <span id="${flight.flightNumber}-economy-seats">${flight.economySeats}</span>, 
                First Class: <span id="${flight.flightNumber}-firstClass-seats">${flight.firstClassSeats}</span>
            </td>
            <td>
                <button onclick="bookSeat('${flight.flightNumber}', 'economy')">Book Economy</button>
                <button onclick="bookSeat('${flight.flightNumber}', 'firstClass')">Book First Class</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// function to update the bookings array

var bookings = [];

function UpdateBookingsSection() {
    var bookingList = document.getElementById("bookingList");
    bookingList.innerHTML = "";

    for (var i = 0; i < bookings.length; i++) {
        var booking = bookings[i];
        var listItem = document.createElement("li");
        listItem.textContent = `Flight ${booking.flightNumber} - ${booking.classType} (Seats Left: ${booking.remainingSeats})`;
        bookingList.appendChild(listItem);
    }
}


// books a seat for the user
function bookSeat(flightNumber, classType) {
    var flight = flights.find(function(flight) {
        return flight.flightNumber === flightNumber;
    });

    if (classType === 'economy') {
        if (flight.economySeats > 0) {
            flight.economySeats--;
            bookings.push({ 
                flightNumber: flightNumber, 
                classType: 'economy', 
                remainingSeats: flight.economySeats
            });
            alert('Economy seat booked for flight ' + flightNumber);
        } else {
            alert('Sorry, no economy seats available.');
        }
    } else if (classType === 'firstClass') {
        if (flight.firstClassSeats > 0) {
            flight.firstClassSeats--;
            bookings.push({ 
                flightNumber: flightNumber, 
                classType: 'firstClass', 
                remainingSeats: flight.firstClassSeats
            });
            alert('First Class seat booked for flight ' + flightNumber);
        } else {
            alert('Sorry, no first class seats available.');
        }
    }

    document.getElementById(`${flight.flightNumber}-economy-seats`).textContent = flight.economySeats;
    document.getElementById(`${flight.flightNumber}-firstClass-seats`).textContent = flight.firstClassSeats;

    UpdateBookingsSection();
}
    
    populateFlightTable();