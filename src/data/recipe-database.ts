
import { Recipe } from "@/types";

// Mock recipe database with extensive coverage of global cuisines
export const recipeDatabase: Record<string, Recipe> = {
  // INDIAN CUISINE
  "Vegetable Biryani": {
    id: "vegetable-biryani",
    name: "Vegetable Biryani",
    description: "Fragrant basmati rice cooked with mixed vegetables and aromatic spices.",
    image: "https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Basmati rice",
      "Mixed vegetables",
      "Yogurt",
      "Garam masala",
      "Saffron",
      "Ghee"
    ],
    instructions: [
      "Par-boil the rice",
      "Sauté vegetables with spices",
      "Layer rice and vegetables",
      "Slow cook until fragrant"
    ],
    prepTime: "30",
    cookTime: "40",
    servings: 4,
    tags: ["Indian", "Vegetarian", "Rice", "Dinner", "Spicy"]
  },
  "Paneer Tikka Masala": {
    id: "paneer-tikka-masala",
    name: "Paneer Tikka Masala",
    description: "Grilled Indian cottage cheese in a rich, creamy tomato sauce.",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "Paneer",
      "Yogurt",
      "Tomatoes",
      "Onions",
      "Cream",
      "Spices"
    ],
    instructions: [
      "Marinate paneer",
      "Grill or pan-fry",
      "Prepare sauce",
      "Combine and simmer"
    ],
    prepTime: "25",
    cookTime: "20",
    servings: 4,
    tags: ["Indian", "Vegetarian", "Dinner", "Spicy", "North Indian"]
  },
  "Masala Dosa": {
    id: "masala-dosa",
    name: "Masala Dosa",
    description: "Crispy fermented rice crepe filled with spiced potato filling.",
    image: "https://images.unsplash.com/photo-1674483877829-38bc7c699b0b?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Rice",
      "Urad dal",
      "Potatoes",
      "Onions",
      "Mustard seeds",
      "Curry leaves"
    ],
    instructions: [
      "Ferment rice and dal batter",
      "Prepare potato filling",
      "Spread batter thin on hot griddle",
      "Add filling and fold"
    ],
    prepTime: "30",
    cookTime: "15",
    servings: 4,
    tags: ["Indian", "Vegetarian", "Breakfast", "South Indian"]
  },
  "Chole Bhature": {
    id: "chole-bhature",
    name: "Chole Bhature",
    description: "Spicy chickpea curry served with deep-fried bread.",
    image: "https://images.unsplash.com/photo-1626100846436-23403ac26105?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Chickpeas",
      "Onions",
      "Tomatoes",
      "All-purpose flour",
      "Yogurt",
      "Spices"
    ],
    instructions: [
      "Pressure cook chickpeas",
      "Prepare spicy gravy",
      "Make bhature dough and rest",
      "Deep fry bhature and serve with chole"
    ],
    prepTime: "40",
    cookTime: "30",
    servings: 4,
    tags: ["Indian", "Vegetarian", "Lunch", "North Indian", "Spicy"]
  },
  "Palak Paneer": {
    id: "palak-paneer",
    name: "Palak Paneer",
    description: "Cottage cheese cubes in a creamy spinach gravy.",
    image: "https://images.unsplash.com/photo-1546069901-5ec6a79120b0?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Paneer",
      "Spinach",
      "Onions",
      "Tomatoes",
      "Cream",
      "Spices"
    ],
    instructions: [
      "Blanch spinach",
      "Sauté onions and spices",
      "Purée spinach and add to base",
      "Add paneer cubes and simmer"
    ],
    prepTime: "20",
    cookTime: "25",
    servings: 4,
    tags: ["Indian", "Vegetarian", "Dinner", "North Indian", "Healthy"]
  },
  "Aloo Gobi": {
    id: "aloo-gobi",
    name: "Aloo Gobi",
    description: "Dry curry of potatoes and cauliflower with aromatic spices.",
    image: "https://images.unsplash.com/photo-1601314212732-047d4bdffd22?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Potatoes",
      "Cauliflower",
      "Onions",
      "Tomatoes",
      "Ginger",
      "Turmeric"
    ],
    instructions: [
      "Sauté onions and spices",
      "Add potatoes and cauliflower",
      "Cook until vegetables are tender",
      "Garnish with cilantro"
    ],
    prepTime: "15",
    cookTime: "25",
    servings: 4,
    tags: ["Indian", "Vegetarian", "Side Dish", "North Indian", "Vegan"]
  },
  
  // ITALIAN CUISINE
  "Spinach Mushroom Risotto": {
    id: "spinach-mushroom-risotto",
    name: "Spinach Mushroom Risotto",
    description: "Creamy Italian risotto with fresh spinach and sautéed mushrooms.",
    image: "https://images.unsplash.com/photo-1673845532980-90c6614d9511?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Arborio rice",
      "Spinach",
      "Mushrooms",
      "Onion",
      "Vegetable broth",
      "Parmesan cheese"
    ],
    instructions: [
      "Sauté mushrooms and onions",
      "Add rice and gradually stir in broth",
      "Cook until creamy",
      "Fold in spinach and cheese"
    ],
    prepTime: "15",
    cookTime: "30",
    servings: 4,
    tags: ["Italian", "Vegetarian", "Dinner", "European"]
  },
  "Margherita Pizza": {
    id: "margherita-pizza",
    name: "Margherita Pizza",
    description: "Classic Italian pizza with tomato sauce, mozzarella, and basil.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2669&auto=format&fit=crop",
    ingredients: [
      "Pizza dough",
      "Tomato sauce",
      "Fresh mozzarella",
      "Fresh basil",
      "Olive oil",
      "Salt"
    ],
    instructions: [
      "Roll out dough",
      "Spread tomato sauce",
      "Add mozzarella",
      "Bake until crust is golden",
      "Top with fresh basil"
    ],
    prepTime: "20",
    cookTime: "15",
    servings: 4,
    tags: ["Italian", "Vegetarian", "Dinner", "European"]
  },
  "Eggplant Parmigiana": {
    id: "eggplant-parmigiana",
    name: "Eggplant Parmigiana",
    description: "Layered eggplant with tomato sauce, mozzarella, and parmesan cheese.",
    image: "https://images.unsplash.com/photo-1629115916087-42864268ede0?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Eggplant",
      "Tomato sauce",
      "Mozzarella",
      "Parmesan",
      "Breadcrumbs",
      "Basil"
    ],
    instructions: [
      "Slice and salt eggplant",
      "Bread and fry eggplant slices",
      "Layer with sauce and cheese",
      "Bake until bubbly"
    ],
    prepTime: "30",
    cookTime: "40",
    servings: 6,
    tags: ["Italian", "Vegetarian", "Dinner", "European", "Baked"]
  },
  "Spaghetti Aglio e Olio": {
    id: "spaghetti-aglio-e-olio",
    name: "Spaghetti Aglio e Olio",
    description: "Simple pasta dish with garlic, olive oil, and chili flakes.",
    image: "https://images.unsplash.com/photo-1608219992759-8d74ed8d76eb?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Spaghetti",
      "Garlic",
      "Olive oil",
      "Red chili flakes",
      "Parsley",
      "Parmesan"
    ],
    instructions: [
      "Cook spaghetti al dente",
      "Sauté garlic in olive oil",
      "Add chili flakes",
      "Toss with pasta and parsley"
    ],
    prepTime: "10",
    cookTime: "15",
    servings: 4,
    tags: ["Italian", "Vegetarian", "Dinner", "Quick", "European", "Vegan"]
  },
  "Tiramisu": {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Ladyfingers",
      "Mascarpone cheese",
      "Eggs",
      "Sugar",
      "Coffee",
      "Cocoa powder"
    ],
    instructions: [
      "Prepare coffee",
      "Beat egg yolks with sugar",
      "Fold in mascarpone",
      "Layer with coffee-dipped ladyfingers",
      "Dust with cocoa powder"
    ],
    prepTime: "30",
    cookTime: "0",
    servings: 8,
    tags: ["Italian", "Dessert", "No-Bake", "European"]
  },
  
  // EAST ASIAN CUISINE
  "Vegetable Pad Thai": {
    id: "vegetable-pad-thai",
    name: "Vegetable Pad Thai",
    description: "Classic Thai noodle dish with tofu and fresh vegetables.",
    image: "https://images.unsplash.com/photo-1637806931098-af5d7cea9d67?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "Rice noodles",
      "Tofu",
      "Bean sprouts",
      "Carrots",
      "Green onions",
      "Peanuts"
    ],
    instructions: [
      "Soak noodles",
      "Stir-fry tofu and vegetables",
      "Add sauce and noodles",
      "Garnish with peanuts and lime"
    ],
    prepTime: "20",
    cookTime: "15",
    servings: 4,
    tags: ["Thai", "Vegetarian", "Dinner", "Asian"]
  },
  "California Roll": {
    id: "california-roll",
    name: "California Roll",
    description: "Classic sushi roll with crab, avocado, and cucumber.",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=2669&auto=format&fit=crop",
    ingredients: [
      "Sushi rice",
      "Nori seaweed",
      "Imitation crab meat",
      "Avocado",
      "Cucumber",
      "Sesame seeds"
    ],
    instructions: [
      "Prepare sushi rice",
      "Layer nori with rice",
      "Add fillings and roll",
      "Cut into pieces"
    ],
    prepTime: "30",
    cookTime: "20",
    servings: 4,
    tags: ["Japanese", "Seafood", "Sushi", "Asian"]
  },
  "Vegetable Gyoza": {
    id: "vegetable-gyoza",
    name: "Vegetable Gyoza",
    description: "Japanese dumplings filled with vegetables and pan-fried to perfection.",
    image: "https://images.unsplash.com/photo-1609183590563-7210d4bf9ed1?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Gyoza wrappers",
      "Cabbage",
      "Carrots",
      "Shiitake mushrooms",
      "Garlic",
      "Ginger"
    ],
    instructions: [
      "Prepare vegetable filling",
      "Fill and seal gyoza wrappers",
      "Pan-fry until golden",
      "Steam until cooked through"
    ],
    prepTime: "30",
    cookTime: "15",
    servings: 4,
    tags: ["Japanese", "Vegetarian", "Appetizer", "Asian"]
  },
  "Kung Pao Tofu": {
    id: "kung-pao-tofu",
    name: "Kung Pao Tofu",
    description: "Spicy stir-fried tofu with peanuts, vegetables, and Sichuan peppercorns.",
    image: "https://images.unsplash.com/photo-1512003867696-6d5ce6835040?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Tofu",
      "Bell peppers",
      "Dried chilies",
      "Peanuts",
      "Sichuan peppercorns",
      "Green onions"
    ],
    instructions: [
      "Press and cube tofu",
      "Stir-fry aromatics and dried chilies",
      "Add vegetables and tofu",
      "Finish with sauce and peanuts"
    ],
    prepTime: "20",
    cookTime: "15",
    servings: 4,
    tags: ["Chinese", "Vegetarian", "Spicy", "Asian", "Vegan"]
  },
  "Green Curry": {
    id: "green-curry",
    name: "Green Curry",
    description: "Aromatic Thai curry with vegetables in a coconut milk base.",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Green curry paste",
      "Coconut milk",
      "Tofu",
      "Thai eggplant",
      "Thai basil",
      "Kaffir lime leaves"
    ],
    instructions: [
      "Sauté curry paste",
      "Add coconut milk",
      "Add vegetables and protein",
      "Simmer until cooked",
      "Finish with Thai basil"
    ],
    prepTime: "15",
    cookTime: "25",
    servings: 4,
    tags: ["Thai", "Vegetarian", "Curry", "Asian", "Spicy"]
  },
  
  // MIDDLE EASTERN CUISINE
  "Falafel Wrap": {
    id: "falafel-wrap",
    name: "Falafel Wrap",
    description: "Crispy chickpea fritters wrapped in flatbread with tahini sauce and vegetables.",
    image: "https://images.unsplash.com/photo-1613502047688-f0f465d6a61d?q=80&w=2573&auto=format&fit=crop",
    ingredients: [
      "Chickpeas",
      "Herbs",
      "Flatbread",
      "Tahini",
      "Lettuce",
      "Tomatoes"
    ],
    instructions: [
      "Blend chickpeas with herbs and spices",
      "Form into balls and fry",
      "Prepare tahini sauce",
      "Assemble wrap with vegetables"
    ],
    prepTime: "20",
    cookTime: "15",
    servings: 4,
    tags: ["Middle Eastern", "Vegetarian", "Lunch", "Vegan"]
  },
  "Hummus": {
    id: "hummus",
    name: "Hummus",
    description: "Creamy chickpea dip with tahini, lemon, and olive oil.",
    image: "https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Chickpeas",
      "Tahini",
      "Lemon juice",
      "Garlic",
      "Olive oil",
      "Cumin"
    ],
    instructions: [
      "Blend chickpeas with tahini and lemon juice",
      "Add garlic and spices",
      "Drizzle with olive oil before serving"
    ],
    prepTime: "10",
    cookTime: "0",
    servings: 6,
    tags: ["Middle Eastern", "Appetizer", "Dip", "Vegetarian", "Vegan"]
  },
  "Tabbouleh": {
    id: "tabbouleh",
    name: "Tabbouleh",
    description: "Fresh herb and bulgur salad with tomatoes, cucumber, and lemon dressing.",
    image: "https://images.unsplash.com/photo-1593030303168-14d462983d33?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Bulgur wheat",
      "Parsley",
      "Mint",
      "Tomatoes",
      "Cucumber",
      "Lemon juice"
    ],
    instructions: [
      "Soak bulgur in water",
      "Finely chop herbs and vegetables",
      "Mix all ingredients with lemon and olive oil dressing"
    ],
    prepTime: "20",
    cookTime: "0",
    servings: 4,
    tags: ["Middle Eastern", "Salad", "Vegetarian", "Healthy", "Vegan"]
  },
  "Shakshuka": {
    id: "shakshuka",
    name: "Shakshuka",
    description: "Eggs poached in a spiced tomato and pepper sauce.",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Eggs",
      "Tomatoes",
      "Bell peppers",
      "Onions",
      "Cumin",
      "Paprika"
    ],
    instructions: [
      "Sauté onions and peppers",
      "Add tomatoes and spices",
      "Create wells and crack eggs",
      "Simmer until eggs are set"
    ],
    prepTime: "15",
    cookTime: "20",
    servings: 4,
    tags: ["Middle Eastern", "Breakfast", "Vegetarian", "Healthy"]
  },
  
  // MEDITERRANEAN CUISINE
  "Greek Salad": {
    id: "greek-salad",
    name: "Greek Salad",
    description: "Fresh salad with tomatoes, cucumber, olives, and feta cheese.",
    image: "https://images.unsplash.com/photo-1551248429-40975aa4de74?q=80&w=2690&auto=format&fit=crop",
    ingredients: [
      "Tomatoes",
      "Cucumber",
      "Red onion",
      "Kalamata olives",
      "Feta cheese",
      "Olive oil"
    ],
    instructions: [
      "Chop vegetables into chunks",
      "Add olives and feta",
      "Dress with olive oil, lemon, and oregano"
    ],
    prepTime: "15",
    cookTime: "0",
    servings: 4,
    tags: ["Greek", "Salad", "Vegetarian", "Healthy", "Mediterranean"]
  },
  "Spanakopita": {
    id: "spanakopita",
    name: "Spanakopita",
    description: "Greek spinach and feta cheese pie in crispy phyllo dough.",
    image: "https://images.unsplash.com/photo-1604851093546-8715d0dbf156?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Spinach",
      "Feta cheese",
      "Phyllo dough",
      "Onions",
      "Dill",
      "Olive oil"
    ],
    instructions: [
      "Sauté spinach and onions",
      "Mix with feta and herbs",
      "Layer phyllo sheets with filling",
      "Bake until golden"
    ],
    prepTime: "30",
    cookTime: "45",
    servings: 8,
    tags: ["Greek", "Vegetarian", "Baked", "Mediterranean"]
  },
  "Paella Vegetariana": {
    id: "paella-vegetariana",
    name: "Paella Vegetariana",
    description: "Spanish rice dish with saffron, vegetables, and herbs.",
    image: "https://images.unsplash.com/photo-1606066889831-35faf6fa6ff6?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Bomba rice",
      "Saffron",
      "Bell peppers",
      "Artichokes",
      "Green beans",
      "Vegetable broth"
    ],
    instructions: [
      "Sauté vegetables",
      "Add rice and saffron",
      "Pour in broth",
      "Cook without stirring until rice is done",
      "Create socarrat (crispy bottom)"
    ],
    prepTime: "20",
    cookTime: "35",
    servings: 6,
    tags: ["Spanish", "Rice", "Vegetarian", "Mediterranean"]
  },
  "Caprese Salad": {
    id: "caprese-salad",
    name: "Caprese Salad",
    description: "Simple Italian salad with tomatoes, mozzarella, and basil.",
    image: "https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Tomatoes",
      "Fresh mozzarella",
      "Fresh basil",
      "Olive oil",
      "Balsamic glaze",
      "Salt"
    ],
    instructions: [
      "Slice tomatoes and mozzarella",
      "Arrange with basil leaves",
      "Drizzle with olive oil and balsamic",
      "Sprinkle with salt"
    ],
    prepTime: "10",
    cookTime: "0",
    servings: 4,
    tags: ["Italian", "Salad", "Vegetarian", "Mediterranean", "Quick"]
  },
  
  // MEXICAN & LATIN AMERICAN CUISINE
  "Vegetable Enchiladas": {
    id: "vegetable-enchiladas",
    name: "Vegetable Enchiladas",
    description: "Tortillas filled with vegetables, covered in enchilada sauce and cheese.",
    image: "https://images.unsplash.com/photo-1618339560237-3e576e5e5122?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Corn tortillas",
      "Bell peppers",
      "Black beans",
      "Corn",
      "Enchilada sauce",
      "Cheese"
    ],
    instructions: [
      "Sauté vegetables",
      "Fill tortillas",
      "Roll and place in baking dish",
      "Cover with sauce and cheese",
      "Bake until bubbly"
    ],
    prepTime: "25",
    cookTime: "30",
    servings: 6,
    tags: ["Mexican", "Vegetarian", "Dinner", "Latin American"]
  },
  "Guacamole": {
    id: "guacamole",
    name: "Guacamole",
    description: "Fresh avocado dip with lime, cilantro, and onions.",
    image: "https://images.unsplash.com/photo-1695559349079-1322e1dd1af3?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Avocados",
      "Lime juice",
      "Red onion",
      "Cilantro",
      "Tomato",
      "Jalapeño"
    ],
    instructions: [
      "Mash avocados",
      "Mix in lime juice",
      "Add finely chopped onion, cilantro, tomato",
      "Season with salt"
    ],
    prepTime: "15",
    cookTime: "0",
    servings: 4,
    tags: ["Mexican", "Appetizer", "Dip", "Vegetarian", "Latin American", "Vegan"]
  },
  "Black Bean Tacos": {
    id: "black-bean-tacos",
    name: "Black Bean Tacos",
    description: "Soft tortillas filled with seasoned black beans, vegetables, and toppings.",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2680&auto=format&fit=crop",
    ingredients: [
      "Corn tortillas",
      "Black beans",
      "Avocado",
      "Cabbage slaw",
      "Lime",
      "Cilantro"
    ],
    instructions: [
      "Season and warm black beans",
      "Warm tortillas",
      "Assemble with toppings",
      "Serve with lime wedges"
    ],
    prepTime: "15",
    cookTime: "10",
    servings: 4,
    tags: ["Mexican", "Vegetarian", "Dinner", "Latin American", "Vegan"]
  },
  "Lomo Saltado": {
    id: "lomo-saltado",
    name: "Lomo Saltado",
    description: "Peruvian stir-fry with marinated strips of sirloin, onions, tomatoes, and french fries.",
    image: "https://images.unsplash.com/photo-1599861758957-1125492175157?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Sirloin steak",
      "Red onion",
      "Tomatoes",
      "Soy sauce",
      "Aji amarillo",
      "Potatoes"
    ],
    instructions: [
      "Marinate steak in soy sauce",
      "Fry potatoes",
      "Stir-fry meat until browned",
      "Add vegetables and toss",
      "Serve over rice with fries"
    ],
    prepTime: "20",
    cookTime: "25",
    servings: 4,
    tags: ["Peruvian", "Dinner", "Stir Fry", "Latin American"]
  },
  
  // AFRICAN CUISINE
  "Vegetable Tagine": {
    id: "vegetable-tagine",
    name: "Vegetable Tagine",
    description: "Moroccan stew with vegetables, chickpeas, and aromatic spices.",
    image: "https://images.unsplash.com/photo-1642282508946-adb31e8c86e9?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Chickpeas",
      "Carrots",
      "Zucchini",
      "Sweet potato",
      "Tomatoes",
      "Moroccan spices"
    ],
    instructions: [
      "Sauté onions and spices",
      "Add vegetables and chickpeas",
      "Simmer with broth",
      "Serve with couscous"
    ],
    prepTime: "20",
    cookTime: "40",
    servings: 6,
    tags: ["Moroccan", "Vegetarian", "Stew", "African", "Vegan"]
  },
  "Jollof Rice": {
    id: "jollof-rice",
    name: "Jollof Rice",
    description: "West African one-pot spiced rice dish with vegetables.",
    image: "https://images.unsplash.com/photo-1596712715518-3f5b0b7a8e19?q=80&w=2874&auto=format&fit=crop",
    ingredients: [
      "Long-grain rice",
      "Tomatoes",
      "Bell peppers",
      "Onions",
      "Scotch bonnet pepper",
      "Thyme"
    ],
    instructions: [
      "Blend tomatoes, peppers, and onions",
      "Fry paste until reduced",
      "Add rice and stock",
      "Simmer until rice is cooked"
    ],
    prepTime: "20",
    cookTime: "45",
    servings: 6,
    tags: ["West African", "Rice", "Spicy", "African"]
  },
  
  // EUROPEAN CUISINE
  "Ratatouille": {
    id: "ratatouille",
    name: "Ratatouille",
    description: "French Provençal vegetable stew with eggplant, zucchini, and bell peppers.",
    image: "https://images.unsplash.com/photo-1572453800999-e8d2d0d95b0a?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Eggplant",
      "Zucchini",
      "Bell peppers",
      "Tomatoes",
      "Onions",
      "Herbs de Provence"
    ],
    instructions: [
      "Slice vegetables",
      "Sauté each vegetable separately",
      "Layer in baking dish",
      "Bake until tender"
    ],
    prepTime: "30",
    cookTime: "45",
    servings: 6,
    tags: ["French", "Vegetarian", "Stew", "European", "Vegan"]
  },
  "Mushroom Stroganoff": {
    id: "mushroom-stroganoff",
    name: "Mushroom Stroganoff",
    description: "Russian-inspired creamy mushroom sauce served over pasta or rice.",
    image: "https://images.unsplash.com/photo-1633436375743-b40e1e62e65b?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Mixed mushrooms",
      "Onions",
      "Garlic",
      "Paprika",
      "Sour cream",
      "Egg noodles"
    ],
    instructions: [
      "Sauté mushrooms and onions",
      "Add paprika and garlic",
      "Stir in sour cream",
      "Serve over cooked noodles"
    ],
    prepTime: "15",
    cookTime: "20",
    servings: 4,
    tags: ["Russian", "Vegetarian", "Pasta", "European", "Quick"]
  },
  "Pierogi": {
    id: "pierogi",
    name: "Pierogi",
    description: "Polish dumplings filled with potato, cheese, and onions.",
    image: "https://images.unsplash.com/photo-1610614819513-58e34989e371?q=80&w=2581&auto=format&fit=crop",
    ingredients: [
      "Flour",
      "Eggs",
      "Potatoes",
      "Cheese",
      "Onions",
      "Butter"
    ],
    instructions: [
      "Make dough and rest",
      "Prepare potato and cheese filling",
      "Form and seal dumplings",
      "Boil until they float",
      "Pan-fry with butter and onions"
    ],
    prepTime: "45",
    cookTime: "20",
    servings: 6,
    tags: ["Polish", "Vegetarian", "Dumplings", "European"]
  },
  
  // AMERICAN & FUSION CUISINE
  "Quinoa Buddha Bowl": {
    id: "quinoa-buddha-bowl",
    name: "Quinoa Buddha Bowl",
    description: "Nutrient-rich bowl with quinoa, roasted vegetables, and tahini dressing.",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?q=80&w=2575&auto=format&fit=crop",
    ingredients: [
      "Quinoa",
      "Sweet potato",
      "Chickpeas",
      "Kale",
      "Avocado",
      "Tahini"
    ],
    instructions: [
      "Cook quinoa",
      "Roast vegetables",
      "Prepare dressing",
      "Assemble bowl"
    ],
    prepTime: "20",
    cookTime: "25",
    servings: 2,
    tags: ["Vegetarian", "Healthy", "Lunch", "American", "Vegan"]
  },
  "Avocado Toast": {
    id: "avocado-toast",
    name: "Avocado Toast",
    description: "Smashed avocado on toasted bread with various toppings.",
    image: "https://images.unsplash.com/photo-1603046891744-76f2e8b39203?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Whole grain bread",
      "Avocado",
      "Lemon juice",
      "Red pepper flakes",
      "Microgreens",
      "Salt"
    ],
    instructions: [
      "Toast bread",
      "Mash avocado with lemon and salt",
      "Spread on toast",
      "Add toppings"
    ],
    prepTime: "10",
    cookTime: "5",
    servings: 2,
    tags: ["Vegetarian", "Breakfast", "Quick", "American", "Vegan"]
  },
  "Sweet Potato Black Bean Burger": {
    id: "sweet-potato-black-bean-burger",
    name: "Sweet Potato Black Bean Burger",
    description: "Vegetarian burger with sweet potatoes, black beans, and spices.",
    image: "https://images.unsplash.com/photo-1520072959219-c595dc870360?q=80&w=2565&auto=format&fit=crop",
    ingredients: [
      "Sweet potatoes",
      "Black beans",
      "Quinoa",
      "Cumin",
      "Paprika",
      "Burger buns"
    ],
    instructions: [
      "Roast sweet potatoes",
      "Mash with beans and cooked quinoa",
      "Form patties",
      "Pan-fry until crisp",
      "Serve on buns with toppings"
    ],
    prepTime: "20",
    cookTime: "30",
    servings: 4,
    tags: ["Vegetarian", "Burger", "Dinner", "American", "Vegan"]
  },
  
  // SEAFOOD & NON-VEGETARIAN OPTIONS
  "Grilled Salmon with Dill": {
    id: "grilled-salmon-with-dill",
    name: "Grilled Salmon with Dill",
    description: "Fresh salmon fillets grilled with lemon and dill.",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "Salmon fillets",
      "Lemon",
      "Fresh dill",
      "Olive oil",
      "Garlic",
      "Salt"
    ],
    instructions: [
      "Marinate salmon with lemon, dill, and olive oil",
      "Preheat grill",
      "Grill skin-side down first",
      "Turn once and finish cooking"
    ],
    prepTime: "15",
    cookTime: "12",
    servings: 4,
    tags: ["Seafood", "Healthy", "Dinner", "Fish"]
  },
  "Shrimp Scampi": {
    id: "shrimp-scampi",
    name: "Shrimp Scampi",
    description: "Garlicky shrimp in a butter and white wine sauce over pasta.",
    image: "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Shrimp",
      "Linguine",
      "Garlic",
      "Butter",
      "White wine",
      "Lemon"
    ],
    instructions: [
      "Cook pasta al dente",
      "Sauté garlic in butter",
      "Add shrimp and cook until pink",
      "Deglaze with wine",
      "Toss with pasta"
    ],
    prepTime: "15",
    cookTime: "15",
    servings: 4,
    tags: ["Seafood", "Pasta", "Italian", "Dinner"]
  },
  "Fish Tacos": {
    id: "fish-tacos",
    name: "Fish Tacos",
    description: "Soft tortillas filled with grilled or fried fish, slaw, and sauce.",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "White fish fillets",
      "Corn tortillas",
      "Cabbage slaw",
      "Avocado",
      "Lime",
      "Cilantro"
    ],
    instructions: [
      "Season and grill fish",
      "Warm tortillas",
      "Make slaw and sauce",
      "Assemble tacos"
    ],
    prepTime: "20",
    cookTime: "15",
    servings: 4,
    tags: ["Seafood", "Mexican", "Dinner", "Fish"]
  },
  "Butter Chicken": {
    id: "butter-chicken",
    name: "Butter Chicken",
    description: "Tender chicken in a rich, creamy tomato sauce.",
    image: "https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=2684&auto=format&fit=crop",
    ingredients: [
      "Chicken thighs",
      "Yogurt",
      "Tomatoes",
      "Butter",
      "Cream",
      "Garam masala"
    ],
    instructions: [
      "Marinate chicken in yogurt and spices",
      "Grill or bake chicken",
      "Prepare tomato sauce",
      "Simmer chicken in sauce with butter and cream"
    ],
    prepTime: "30",
    cookTime: "30",
    servings: 4,
    tags: ["Indian", "Chicken", "Dinner", "Spicy"]
  },
  "Chicken Tikka": {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    description: "Tandoori-style grilled chicken with yogurt and spices.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?q=80&w=2598&auto=format&fit=crop",
    ingredients: [
      "Chicken breast",
      "Yogurt",
      "Lemon juice",
      "Ginger",
      "Garlic",
      "Tandoori masala"
    ],
    instructions: [
      "Marinate chicken in yogurt and spices for hours",
      "Thread onto skewers",
      "Grill or bake until charred and cooked through"
    ],
    prepTime: "20",
    cookTime: "15",
    servings: 4,
    tags: ["Indian", "Chicken", "Appetizer", "Grilled"]
  },
  "Chicken Alfredo": {
    id: "chicken-alfredo",
    name: "Chicken Alfredo",
    description: "Pasta with grilled chicken in a creamy parmesan sauce.",
    image: "https://images.unsplash.com/photo-1645112551168-58ce31e51d52?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Fettuccine",
      "Chicken breast",
      "Heavy cream",
      "Parmesan cheese",
      "Garlic",
      "Butter"
    ],
    instructions: [
      "Cook pasta until al dente",
      "Grill chicken and slice",
      "Prepare cream sauce with butter, garlic, and cheese",
      "Combine pasta, chicken, and sauce"
    ],
    prepTime: "15",
    cookTime: "25",
    servings: 4,
    tags: ["Italian", "Pasta", "Chicken", "Dinner"]
  },
  "Chicken Stir Fry": {
    id: "chicken-stir-fry",
    name: "Chicken Stir Fry",
    description: "Quick stir-fried chicken with colorful vegetables and Asian sauce.",
    image: "https://images.unsplash.com/photo-1603356033288-acfcb54801e6?q=80&w=2680&auto=format&fit=crop",
    ingredients: [
      "Chicken breast",
      "Bell peppers",
      "Broccoli",
      "Carrots",
      "Soy sauce",
      "Ginger"
    ],
    instructions: [
      "Marinate chicken in soy sauce and ginger",
      "Stir-fry chicken until browned",
      "Add vegetables and stir-fry until crisp-tender",
      "Finish with sauce",
      "Serve over rice"
    ],
    prepTime: "15",
    cookTime: "15",
    servings: 4,
    tags: ["Asian", "Chicken", "Stir Fry", "Quick", "Dinner"]
  },
  "Caesar Salad with Grilled Chicken": {
    id: "caesar-salad-with-chicken",
    name: "Caesar Salad with Grilled Chicken",
    description: "Classic Caesar salad topped with seasoned grilled chicken.",
    image: "https://images.unsplash.com/photo-1599021419847-d8a7a6aba5b3?q=80&w=2678&auto=format&fit=crop",
    ingredients: [
      "Romaine lettuce",
      "Chicken breast",
      "Parmesan cheese",
      "Croutons",
      "Caesar dressing",
      "Lemon"
    ],
    instructions: [
      "Season and grill chicken",
      "Wash and tear lettuce",
      "Slice chicken",
      "Toss lettuce with dressing",
      "Top with chicken, cheese, and croutons"
    ],
    prepTime: "15",
    cookTime: "15",
    servings: 4,
    tags: ["Salad", "Chicken", "Lunch", "Healthy"]
  },
  
  // BREAKFAST & BRUNCH OPTIONS
  "Breakfast Burrito": {
    id: "breakfast-burrito",
    name: "Breakfast Burrito",
    description: "Flour tortilla filled with scrambled eggs, cheese, and various fillings.",
    image: "https://images.unsplash.com/photo-1600150369071-ca55613ca9c5?q=80&w=2670&auto=format&fit=crop",
    ingredients: [
      "Flour tortillas",
      "Eggs",
      "Cheese",
      "Avocado",
      "Black beans",
      "Salsa"
    ],
    instructions: [
      "Scramble eggs",
      "Warm tortillas",
      "Layer fillings on tortilla",
      "Roll into burrito",
      "Grill seam-side down (optional)"
    ],
    prepTime: "15",
    cookTime: "10",
    servings: 2,
    tags: ["Breakfast", "Mexican", "Quick", "American"]
  },
  "Shakshuka": {
    id: "shakshuka-breakfast",
    name: "Shakshuka",
    description: "Middle Eastern breakfast with eggs poached in spiced tomato sauce.",
    image: "https://images.unsplash.com/photo-1590412200988-a436970781fa?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Eggs",
      "Tomatoes",
      "Bell peppers",
      "Onions",
      "Cumin",
      "Paprika"
    ],
    instructions: [
      "Sauté onions and peppers",
      "Add tomatoes and spices",
      "Make wells and crack eggs",
      "Cover and cook until eggs set"
    ],
    prepTime: "15",
    cookTime: "20",
    servings: 4,
    tags: ["Breakfast", "Middle Eastern", "Vegetarian", "Brunch"]
  },
  "Pancakes": {
    id: "pancakes",
    name: "Fluffy Pancakes",
    description: "Classic fluffy pancakes served with maple syrup and berries.",
    image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2622&auto=format&fit=crop",
    ingredients: [
      "Flour",
      "Milk",
      "Eggs",
      "Baking powder",
      "Sugar",
      "Butter"
    ],
    instructions: [
      "Mix dry ingredients",
      "Whisk in wet ingredients",
      "Cook on hot griddle",
      "Flip when bubbles form",
      "Serve with toppings"
    ],
    prepTime: "10",
    cookTime: "15",
    servings: 4,
    tags: ["Breakfast", "Sweet", "American", "Vegetarian"]
  },
  "Overnight Oats": {
    id: "overnight-oats",
    name: "Overnight Oats",
    description: "No-cook oatmeal soaked overnight with milk and toppings.",
    image: "https://images.unsplash.com/photo-1611148313238-293aff316ad8?q=80&w=2574&auto=format&fit=crop",
    ingredients: [
      "Rolled oats",
      "Milk or yogurt",
      "Chia seeds",
      "Honey",
      "Fruits",
      "Nuts"
    ],
    instructions: [
      "Mix oats, milk, and chia seeds",
      "Add sweetener and flavorings",
      "Refrigerate overnight",
      "Top with fresh fruits and nuts"
    ],
    prepTime: "10",
    cookTime: "0",
    servings: 1,
    tags: ["Breakfast", "Healthy", "No-Cook", "Vegetarian", "Vegan"]
  }
};

