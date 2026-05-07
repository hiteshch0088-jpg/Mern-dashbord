        const express=require("express");
        const apple=require("../models/apple");

        const router=express.Router();

        router.get("/add", async (req, res) => {
        try {
            const newOrder = new apple({
            name: "Hitesh",
            product: "Phone",
            amount: 50000
            });

            await newOrder.save();

            res.send("Data saved");
        } catch (err) {
            res.status(500).send(err.message);
        }
        });

        module.exports=router