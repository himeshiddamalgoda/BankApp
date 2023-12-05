const db = require("../models");
const User = db.user; // Adjust this based on your actual model name

module.exports = (app) => {
  var router = require("express").Router();

  router.post("/", async (req, res) => {
    try {
      console.log("Received user details:", req.body);

      if (!req.body) {
        return res.status(400).json({ error: "Request body is empty" });
      }

      const newUser = new User({
        // Adjust these fields based on your user model structure
        username: req.body.username,
        email: req.body.email,
        accountId: req.body.accountId,
        accountType: req.body.accountType, // Example: 1 for savings, 2 for checking, etc.
        userAddress: req.body.userAddress,
        accountBalance: req.body.accountBalance,
        // Other user details...
      });

      const savedUser = await newUser.save();

      console.log("Saved user details:", savedUser);
      res.status(201).json(savedUser);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/", async (req, res) => {
    try {
      // Retrieve all users
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const accountId = req.params.id;

      // Retrieve user by id
      const user = await User.find({ accountId });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const userId = req.params.id;

      // Delete a user by id
      const deletedUser = await User.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  app.use("/api/users", router);
};
