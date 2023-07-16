import React, { useState } from "react";

const StarRating = () => {
    const [rating, setRating] = useState("No Rating Selected");
    const [currentRating, setCurrentRating] = useState("No Rating");
    const [currentSelectedRating, setCurrentSelectedRating] = useState(
        "No Current Rating"
    );
    const [boundRating, setBoundRating] = useState(3);

    const showCurrentRating = (rating) => {
        setCurrentRating(
            rating === 0 ? currentSelectedRating : `Click to select ${rating} stars`
        );
    };

    const setSelectedRating = (rating) => {
        setCurrentSelectedRating(`You have Selected: ${rating} stars`);
    };

    return (
        <div id="app">
            <StarRatingComponent
                setRating={setSelectedRating}
                showCurrentRating={showCurrentRating}
                currentRating={currentRating}
                boundRating={boundRating}
            />
            <p>{rating}</p>
        </div>
    );
};

const StarRatingComponent = ({
    setRating,
    showCurrentRating,
    currentRating,
    boundRating,
}) => {
    const stars = Array.from({ length: boundRating }, (_, index) => index + 1);

    return (
        <div>
            {stars.map((star) => (
                <span
                    key={star}
                    onMouseEnter={() => showCurrentRating(star)}
                    onMouseLeave={() => showCurrentRating(0)}
                    onClick={() => setRating(star)}
                >
                    ⭐
                </span>
            ))}
            <p>{currentRating}</p>
        </div>
    );
};

export default StarRating;
