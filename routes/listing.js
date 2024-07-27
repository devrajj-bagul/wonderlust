const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
  
const listingController = require("../controllers/listing.js");

// Index route 
router.get("/", wrapAsync(listingController.index)); 

// New ROute 
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show Route 
router.get("/:id", wrapAsync( listingController.showListing));


//Create ROute 
router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));


//Edit Route 
router.get("/:id/edit", isLoggedIn , isOwner, wrapAsync(listingController.renderEditForm)
);

//Update ROute 
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


module.exports = router;