const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema ({
    title:{
        type:String,
        required: true,
    },
    description: String,

    image: {
        url: String,
        filename: String,
        // default : "https://unsplash.com/photos/green-palm-tree-near-silver-sedan-02fRawxKwbA",
        // set: (v) => v=== "" ? "https://unsplash.com/photos/green-palm-tree-near-silver-sedan-02fRawxKwbA" : v,
    },
    price: Number,
    location: String,
    country: String,

});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

