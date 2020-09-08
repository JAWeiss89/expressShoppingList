const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");
const items  = require("./fakeDb.js");
const app = require("./app");


router.get("/", function(req, res) {
    let myItems = items;
    return res.json(myItems)
});

router.post("/", function(req, res, next) {
    try {
        if (!req.body.name || !req.body.price) {
            throw new ExpressError("Missing information in request. Need values for body and price", 400)
        }
        const newItem = {name: req.body.name, price: req.body.price}
        items.push(newItem);
        return res.json({"added": newItem})
    } catch(err) {
        return next(err)
    }

})

router.get("/:itemName", function(req, res, next) {
    try {
        const foundItem = items.find(function(item) {
            return item.name === req.params.itemName;
        })
        if (!foundItem) {
            throw new ExpressError("Item not found", 404)
        }
        return res.json(foundItem)
    } catch(err) {
        return next(err);
    }
})

router.patch("/:itemName", function(req, res, next) {
    try {
        const foundItem = items.find(function(item) {
            return item.name === req.params.itemName;
        })
        if (!foundItem) {
            throw new ExpressError("Item not found", 404)
        }
        // The following edits will update the original object even if inside array
        foundItem.name = req.body.name || foundItem.name;
        foundItem.price = req.body.price || foundItem.price;

        return res.json({"updated": foundItem})
    } catch(err) {
        next(err);
    }
})

router.delete("/:itemName", function(req, res, next) {
    try {
        const foundItemIndex = items.findIndex(function(item) {
            return item.name === req.params.itemName;
        })
        if (foundItemIndex == -1 ) {
            throw new ExpressError("Item not found", 404)
        }
        items.splice(foundItemIndex, 1);
        res.json({"message": "deleted item"})

    } catch(err) {
        next(err);
    }
})

module.exports = router;