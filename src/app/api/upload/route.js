import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_API_KEY;

export async function POST(req) {
  try {
    const { image } = await req.json(); // Expecting base64 image

    if (!API_KEY) {
      return Response.json({ error: "Missing API Key" }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      I have these ingredients in this photo. I want you to:
      1. Start with: "Based on the photo you gave me, here's what I see:"
      2. List the ingredients under the heading "Ingredients".
      3. Create at least 3 step-by-step recipes under the heading "Recipes".
      4. Format each recipe as follows:
         - Title: "Recipe [number]: [Recipe Name]"
         - Steps: Each step should be on a new line, starting with a brief description.
      5. If the image doesn't look like food ingredients, let me know.

      Here is an example of the desired format:

      Ingredients
      Penne Pasta
      Asparagus
      Sun-dried Tomatoes
      Parsley
      Lemon
      Shallots
      Garlic
      Olive Oil (Likely)
      Salt
      Pepper
      Sauce (likely a creamy sauce or aioli)

      Recipes
      Recipe 1: Creamy Asparagus and Sun-dried Tomato Pasta
      1. Cook the Pasta: Cook the penne pasta according to package directions until al dente. Drain, reserving about 1/2 cup of pasta water.
      2. Prepare the Asparagus: Snap off the tough ends of the asparagus and cut the spears into 1-inch pieces.
      3. Sauté Aromatics: Heat a tablespoon of olive oil in a large skillet over medium heat. Add the minced garlic and finely chopped shallots. Sauté until softened and fragrant, about 2 minutes.
      4. Cook the Asparagus and Sun-dried Tomatoes: Add the asparagus and sun-dried tomatoes to the skillet. Cook until the asparagus is tender-crisp, about 5-7 minutes.
      5. Add the Sauce and Pasta: Stir in the sauce and lemon juice. Add the cooked pasta and toss to coat. If the sauce is too thick, add a little of the reserved pasta water to thin it out.
      6. Season and Serve: Season with salt, pepper, and chopped fresh parsley. Serve immediately.

      Recipe 2: Simple Roasted Asparagus with Lemon and Garlic
      1. Preheat Oven: Preheat your oven to 400°F (200°C).
      2. Prepare Asparagus: Snap off the tough ends of the asparagus.
      3. Toss with Oil and Seasonings: Place the asparagus on a baking sheet. Drizzle with olive oil, and add minced garlic, salt, and pepper. Toss to coat evenly.
      4. Roast: Roast for 10-15 minutes, or until the asparagus is tender-crisp and slightly browned.
      5. Finish with Lemon: Squeeze fresh lemon juice over the roasted asparagus and garnish with chopped fresh parsley. Serve immediately.

      Recipe 3: Asparagus, Sun-dried Tomato and Shallot Frittata
      1. Sauté Aromatics: Heat a tablespoon of olive oil in an oven-safe skillet over medium heat. Add the sliced shallots. Sauté until softened and fragrant, about 3 minutes.
      2. Cook the Asparagus and Sun-dried Tomatoes: Add the asparagus (cut into 1-inch pieces) and chopped sun-dried tomatoes to the skillet. Cook until the asparagus is tender-crisp, about 5 minutes.
      3. Whisk Eggs: In a bowl, whisk together 6-8 eggs with salt and pepper.
      4. Pour Eggs into Skillet: Pour the egg mixture over the vegetables in the skillet.
      5. Bake: Transfer the skillet to the preheated oven and bake for 15-20 minutes, or until the frittata is set.
      6. Garnish and Serve: Let the frittata cool slightly before slicing and serving. Garnish with chopped fresh parsley and a squeeze of lemon juice.
    `;

    const imageParts = { inlineData: { data: image, mimeType: "image/jpeg" } };

    const result = await model.generateContent([prompt, imageParts]);
    const response = await result.response;
    let text = await response.text();

    console.log('TEXT', text);

    // Remove '*' and any unwanted formatting
    text = text.replace(/\*/g, "");

    // Split into lines and filter out empty lines
    const ingredients = text.split('\n').filter(line => line.trim() !== '');

    return Response.json({ ingredients });
  } catch (error) {
    console.error("Error analyzing image:", error);
    return Response.json({ error: "Failed to analyze image" }, { status: 500 });
  }
}