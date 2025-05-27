export const SelectTravelesList=[
    {
        id:1,
        tittle:'just me',
        desc:'A solo traveles in exploration',
        icon:'✈',
        people:'1'
    },
    {
        id:2,
        tittle:'A Couple',
        desc:'Two traveles in tandem',
        icon:'🥂',
        people:'2'
    },
    {
        id:3,
        tittle:'Family',
        desc:'A group of fun loving adv',
        icon:'🏡',
        people:'3 to 5 People'
    },
    {
        id:4,
        tittle:'Friends',
        desc:'A bunch of thrill-seekes',
        icon:'⛵',
        people:'5 to 10 People'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        tittle:'Cheap',
        desc:'Stay consious of consts',
        icon:'💵',
    },
    {
        id:2,
        tittle:'Moderate',
        desc:'Keep cost on the average side',
        icon:'💰',
    },
    {
        id:3,
        tittle:'Luxury',
        desc:'Dont worry about cost',
        icon:'💸',
    },
]

export const AI_PROMPT= `Generate Travel Plan for Location : {location}, for {totalDays} Days for {poeple} with a {budget} budget. Give me a hotel options list with Hotel Name, Hotel Address, Price, Hotel image url, geo coordinates, rating, descriptions and suggest itinerary with Place Name, Place Details, Place Image Url, Geo Coordinates, Ticket Pricing, Rating ,Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.The output should be in the following JSON format:

      {
        "tripDetails": {
          "location": "Kurukshetra, Haryana, India",
          "duration": "2 Days",
          "groupSize": "3-5 People",
          "budget": "Moderate",
          "currency": "INR"
        },
        "hotelOptions": [
          {
            "hotelName": "Hotel Name",
            "hotelAddress": "Hotel Address",
            "price": "Price Range per night",
            "hotelImageUrl": "Image URL",
            "geoCoordinates": {
              "latitude": Latitude,
              "longitude": Longitude
            },
            "rating": Rating out of 5,
            "description": "Brief description of the hotel",
            "amenities": ["Amenity1", "Amenity2", ...]
          },
          ...
        ],
        "itinerary": {
          "day1": {
            "theme": "Theme for Day 1",
            "bestTimeToVisit": "Best time to visit",
            "plan": [
              {
                "placeName": "Place Name",
                "placeDetails": "Brief details about the place",
                "placeImageUrl": "Image URL",
                "geoCoordinates": {
                  "latitude": Latitude,
                  "longitude": Longitude
                },
                "ticketPricing": "Ticket pricing details",
                "rating": Rating out of 5,
                "timeToTravel": "Estimated travel time from previous location",
                "bestTimeToVisit": "Best time to visit",
                "duration": "Estimated duration of visit"
              },
              ...
            ]
          },
          "day2": {
            "theme": "Theme for Day 2",
            "bestTimeToVisit": "Best time to visit",
            "plan": [
              {
                "placeName": "Place Name",
                "placeDetails": "Brief details about the place",
                "placeImageUrl": "Image URL",
                "geoCoordinates": {
                  "latitude": Latitude,
                  "longitude": Longitude
                },
                "ticketPricing": "Ticket pricing details",
                "rating": Rating out of 5,
                "timeToTravel": "Estimated travel time from previous location",
                "bestTimeToVisit": "Best time to visit",
                "duration": "Estimated duration of visit"
              },
              ...
            ]
          }
        }
      }

      Please ensure that all fields are populated with accurate and relevant information based on the specified location and parameters.
    `