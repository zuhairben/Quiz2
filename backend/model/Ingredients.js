const mongoose = require("mongoose");

// Define user schema
const IngredientSchema = new mongoose.Schema({
   
    Name: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
    AddedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
   
});

const Ingredients = mongoose.model('Ingredients', IngredientSchema)

module.exports = Ingredients;