import { useState, useEffect } from "react";
import { Link } from "react-router";
import client from "./Supabase";
import type PirateInformation from "./PirateInformation";

const Gang = () => {

    const [pirates, setPirates] = useState<PirateInformation[]>([]);

    useEffect(() => {

        const getPirates = async () => {
            const piratesRequest = await client.from("Pirates").select("*");
            setPirates(piratesRequest.data != null ? piratesRequest.data : []);
        };

        getPirates()
            .catch((error) => (console.log(error)));

    }, []);

    return (
        <div className="App">
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", gap: "30px"}}>
                <h3> Average Sailing: {(pirates.reduce((total, pirate) => (total + pirate.sailing_rating), 0)/Math.max(pirates.length, 1)).toFixed(1)}⭐ </h3>
                <h3> Average Dueling: {(pirates.reduce((total, pirate) => (total + pirate.dueling_rating), 0)/Math.max(pirates.length, 1)).toFixed(1)}⭐ </h3>
                <h3> Average Looting: {(pirates.reduce((total, pirate) => (total + pirate.looting_rating), 0)/Math.max(pirates.length, 1)).toFixed(1)}⭐ </h3>
            </div>
            <br />
            <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexFlow: "row wrap", gap: "20px"}}>
                {pirates.map((pirate: PirateInformation) => (
                    <div style={{width: "200px", padding: "10px", border: "1px solid", borderRadius: "25px"}} key={pirate.id}>
                        <p> <Link to={`/pirate/${pirate.id}`} key={pirate.id} style={{color: "black"}}><b>Name: {pirate.name}</b></Link> </p>
                        <p> Sailing: {"⭐".repeat(pirate.sailing_rating)} </p>
                        <p> Dueling: {"⭐".repeat(pirate.dueling_rating)} </p>
                        <p> Looting: {"⭐".repeat(pirate.looting_rating)} </p>
                        <br />
                        <Link to={`/edit-pirate/${pirate.id}`} style={{padding: "10px", color: "black", border: "1px solid", borderRadius: "15px"}}> Edit pirate! </Link>
                        <br />
                        <br />
                    </div>
                ))}
            </div>
            <br />
            <br />
            <Link to="/create-pirate" style={{padding: "10px", color: "black", border: "1px solid", borderRadius: "15px"}}> Create a new pirate! </Link>
        </div>
    );

};

export default Gang;
