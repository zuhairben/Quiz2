const Users = require("../model/User");
const Recipe = require("../model/Recipe");
var express = require("express");
const Ingredients = require("../model/Ingredients");
var router = express.Router();
// const jwt = require("jsonwebtoken")

// router.use((req, res, next) => {
//     if (req.user.admin == false ) return res.json({ msg: "NOT AUTHORIZED" })
//     else next()
// })

router.post("/addIngredient", async (req, res) => {
    console.log(req.user)
  try {
    const {
    Name,
    description
   
    } = req.body;
  
    await Ingredients.create({
        Name,
        description,
       
    });


    res.status(200).json({ msg: "Ingredient added successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/addRecipe", async (req, res) => {
    console.log(req.user)
  try {
    const {
    Name,
    description,
    ingredients
    } = req.body;
   

    await Recipe.create({
        Name,
        description,
        ingredients
    });


    res.status(200).json({ msg: "Recipe created successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/addIngredientinRecipe", async (req, res) => {
   
  try {
    const {
    ingredientId,
    RecipeId
    } = req.body;
    const Rec= await Recipe.findOne({ _id: RecipeId });
    if(!Rec){
       return  res.status(200).json({msg:"Recipe Not found"})
    }
    const ingredient= await Ingredients.findOne({ _id: ingredientId});
    if(!ingredient){
       return  res.status(200).json({msg:"ingredient Not found"})
    }
  
    await Recipe.findOneAndUpdate({_id:RecipeId},{
    $push: { ingredients: ingredient }}).populate('ingredients')


    res.status(200).json({ msg: "Ingrediant added to recipe successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/ShowRecipe", async (req, res) => {
    try {
       const page = req.query.page || 0; 
       const ProjPerPage = 3;
       const AllRecipe =  await Recipe.find().populate({
        path:'ingredients',select: '-_id Name description'}).skip(page * ProjPerPage).limit(ProjPerPage);

         res.status(200).json({data: AllRecipe })
    }catch (error) {
        console.error(error)
    
}}
);



module.exports = router