const db = require("../models");
const Transaction = db.transaction;

module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  router.post('/transactions', async (req, res) => {
    try {
      console.log('Received request:', req.body);
  
      if (!req.body) {
        return res.status(400).json({ error: 'Request body is empty' });
      }
  
      const newTransaction = new Transaction({
        accountId: req.body.accountId, // Replace with a valid ObjectId referencing an existing account
        transactionType: req.body.transactionType,
        amount: req.body.amount,
      });
  
      const savedTransaction = await newTransaction.save();
  
      console.log('Saved transaction:', savedTransaction);
      res.status(201).json(savedTransaction);
  
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/transactions', async (req, res) => {
    try {
      // Retrieve all transactions
      const transactions = await Transaction.find();
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.get('/transactions/:accountId', async (req, res) => {
    try {
      const accountId = req.params.accountId;
  
      // Retrieve transactions by accountId
      const transactions = await Transaction.find({ accountId });
      res.status(200).json(transactions);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  router.delete('/transactions/:id', async (req, res) => {
    try {
      const transactionId = req.params.id;
  
      // Delete a transaction by id
      const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);
  
      if (!deletedTransaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
  
      res.status(200).json({ message: 'Transaction deleted successfully', deletedTransaction });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.use("/api/tutorial", router);
};
