import { useParams, useNavigate } from "react-router";
import { useEffect, useState, type MouseEvent } from "react";
import client from "./Supabase";

const Edit = () => {

    const parameters = useParams();
    const navigate = useNavigate();

    const [pirateName, setPirateName] = useState<string>("");
    const [sailingRating, setSailingRating] = useState<number>(0);
    const [duelingRating, setDuelingRating] = useState<number>(0);
    const [lootingRating, setLootingRating] = useState<number>(0);
    // const [ratingPoints, setRatingPoints] = useState<number>(10);

    useEffect(() => {

        const getPirate = async () => {
            const pirateRequest = await client.from("Pirates").select("*").eq("id", parameters.id).single();
            setPirateName(pirateRequest.data.name);
            setSailingRating(pirateRequest.data.sailing_rating);
            setDuelingRating(pirateRequest.data.dueling_rating);
            setLootingRating(pirateRequest.data.looting_rating);
        }

        getPirate()
            .catch((error) => (console.log(error)));

    }, []);

    const handleSubmit = async (e: MouseEvent<HTMLInputElement>) => {
        if (e.currentTarget.value == "Edit Pirate!" && pirateName != "") {
            await client.from("Pirates").update({name: pirateName, sailing_rating: sailingRating, dueling_rating: duelingRating, looting_rating: lootingRating}).eq("id", parameters.id);
            navigate("/");
        } else if (e.currentTarget.value == "Delete Pirate!") {
            await client.from("Pirates").delete().eq("id", parameters.id);
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
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                <input type="submit" value="Edit Pirate!" onClick={handleSubmit} />
                <input type="submit" value="Delete Pirate!" onClick={handleSubmit} />
            </div>
        </div>
    )
};

export default Edit;
