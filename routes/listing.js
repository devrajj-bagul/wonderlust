const express = require("express");
const router = express.Router();
const wrapAsync = require("../util/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
  
const listingController = require("../controllers/listing.js");
const multer  = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// Index route   //Create ROute 
router.route("/")
.get( wrapAsync(listingController.index))
.post( isLoggedIn, upload.single("listing[image]"), wrapAsync(listingController.createListing)); //validateListing,
// .post((req, res) =>{
//     res.send(req.body);
// })


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