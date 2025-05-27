import React from 'react'
import PlaceCardItem from './placeCardItem';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary;
  if (!itinerary) return null;

  return (
    <div>
      <h2 className="font-bold text-lg">Places To Visit</h2>

      {Object.entries(itinerary).map(([dayKey, dayData], dayIndex) => (
        <div className="mt-6" key={dayKey}>
          <h3 className="font-semibold text-xl mb-1">Day {dayIndex + 1}</h3>
          <p className="italic text-base mb-3">{dayData.theme}</p>

          <div className="grid md:grid-cols-2 gap-5">
            {dayData.plan.map((place, idx) => (
              <PlaceCardItem key={idx} place={place} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


export default PlacesToVisit
