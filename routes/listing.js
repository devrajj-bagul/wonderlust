const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
  
const listingController = require("../controllers/listing.js");
const multer  = require("multer");
const upload = multer({ dest: "uploads/" });

// Index route   //Create ROute 
router.route("/")
.get( wrapAsync(listingController.index))
// .post( isLoggedIn, validateListing, wrapAsync(listingController.createListing));
.post( upload.single("listing[image]"), (req, res) => {
    res.send(req.file);
});


// New ROute 
router.get("/new", isLoggedIn, listingController.renderNewForm);


// Show Route   //Update ROute   // Delete Route
router.route("/:id")
.get( wrapAsync( listingController.showListing))
.put( isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


//Edit Route 
router.get("/:id/edit", isLoggedIn , isOwner, wrapAsync(listingController.renderEditForm)
);

module.exports = router;