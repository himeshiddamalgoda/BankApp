

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        accountId: String,
        transactionType: String,
        amount: Number,
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Transaction = mongoose.model('transaction', schema);
    return Transaction;
  };