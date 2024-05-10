const mongoose = require("mongoose");

// Define user schema
const RecipeSchema = new mongoose.Schema({
   
    Name: { type: String, required: true },
    description: { type: String },
    ingredients:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ingredients"}],
    
    createdAt: { type: Date, default: Date.now },
    isActive: {type: Boolean, default: false},
    isDeleted: {type: Boolean, default: false},
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    deletedAt: {type: Date},
    RecipeBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    activatedAt: {type: Date},
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    updatedAt: {type: Date}
});

const Recipe = mongoose.model('Recipe', RecipeSchema);

module.exports = Recipe;