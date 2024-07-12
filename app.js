const mongoose = require("mongoose");
const express = require("express");
const app = express();
const Listing = require ("./models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log("connected To DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/", (req, res) => {
    res.send("hi , Iam Root ");
});

app.get("/testListing", async (req, res) =>{
    let sampleListing = new Listing({
        title: "My Home",
        description: " One room And Keychain for prepare food",
        price: 3000,
        location: "Malegaon , Nashik , Maharashtra ",
        country: "India",
    });

    await sampleListing.save()
    console.log(" Sample Was Saved ");
    res.send("Secessfull Testing");
});

app.listen(8080, () => {
    console.log("server Is Listning To port 8080")
});