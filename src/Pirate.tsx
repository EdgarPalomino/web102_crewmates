import { useParams, Link } from "react-router";
import { useState, useEffect } from "react";
import client from "./Supabase";

const Pirate = () => {

    const parameters = useParams();

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

    return (
        <div className="App">
            <p> <b>Name: {pirateName}</b> </p>
            <p> Sailing: {"⭐".repeat(sailingRating)} </p>
            <p> Dueling: {"⭐".repeat(duelingRating)} </p>
            <p> Looting: {"⭐".repeat(lootingRating)} </p>
            <br />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "10px"}}>
                <Link to={"/"} style={{padding: "10px", color: "black", border: "1px solid", borderRadius: "15px"}}> Go back! </Link>
                <Link to={`/edit-pirate/${parameters.id}`} style={{padding: "10px", color: "black", border: "1px solid", borderRadius: "15px"}}> Edit pirate! </Link>
            </div>
        </div>
    )
};

export default Pirate;
