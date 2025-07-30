import { useNavigate } from "react-router";
import { useState } from "react";
import client from "./Supabase";

const Create = () => {

    const navigate = useNavigate()

    const [pirateName, setPirateName] = useState<string>("");
    const [sailingRating, setSailingRating] = useState<number>(0);
    const [duelingRating, setDuelingRating] = useState<number>(0);
    const [lootingRating, setLootingRating] = useState<number>(0);
    // const [ratingPoints, setRatingPoints] = useState<number>(10);

    const handleSubmit = async () => {
        if (pirateName != "") {
            await client.from("Pirates").insert({name: pirateName, sailing_rating: sailingRating, dueling_rating: duelingRating, looting_rating: lootingRating});
            navigate("/");
        }
    };

    return (
        <div className="App">
            <label htmlFor="pirate-name"> Your Pirate's Name: </label>
            <input id="pirate-name" type="text" placeholder="Name" onChange={(e) => (setPirateName(e.target.value))} value={pirateName} />
            <br />
            <br />
            <label htmlFor="pirate-sailing-rating"> Your Pirate's Sailing Rating: {sailingRating} </label>
            <input id="pirate-sailing-rating" type="range" min="0" max="5" onChange={(e) => (setSailingRating(Number(e.target.value)))} value={sailingRating} />
            <br />
            <br />
            <label htmlFor="pirate-dueling-rating"> Your Pirate's Dueling Rating: {duelingRating} </label>
            <input id="pirate-dueling-rating" type="range" min="0" max="5" onChange={(e) => (setDuelingRating(Number(e.target.value)))} value={duelingRating} />
            <br />
            <br />
            <label htmlFor="pirate-looting-rating"> Your Pirate's Looting Rating: {lootingRating} </label>
            <input id="pirate-looting-rating" type="range" min="0" max="5" onChange={(e) => (setLootingRating(Number(e.target.value)))} value={lootingRating} />
            <br />
            <br />
            <input type="submit" value="Create Pirate!" onClick={handleSubmit} />
        </div>
    );

};

export default Create;