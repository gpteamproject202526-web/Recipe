console.log("API KEY LOADED:", !!process.env.OPENAI_API_KEY);
import OpenAI from "openai";

export async function POST(req: Request) {
  try {
    const { diet, healthy, mealtype, ingredients, people, cuisine, selectedTags } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `
Generate a recipe based on the following details. 
IMPORTANT RULES:
- Write in plain text only.
- Do NOT use any markdown formatting.
- Do NOT use hashtags (#).
- Do NOT use asterisks (*).
- Do NOT use bullet points like "-" or "*" or "#".
- Do NOT wrap text in bold or italics.
- Format everything as clean simple text.
- You may include emojis and emoticons.
- Also explain in one sentence how this dish is of selected cuisine.
- Always keep the food healthy and for a person with type 2 diabetes
- If you use any ingredient more than 500 grams use kilograms
- Based on certain tags you may also add stuff like plating techniques, how to imporeve appeal and other similar things.
- Ensure you fulfill all the tags to the best of your ability

RECIPE DETAILS:
Diet: ${diet}
Food should be Non Diabetic Meal/Snack: ${healthy ? "Yes" : "No"}
The meal type is for: ${mealtype}
The Cuisine I want is. Give recipe of only this cuisine: ${cuisine}
Serves: ${people} people
Ingredients Provided: ${ingredients}
Tags: ${selectedTags.join(", ")}

Return the recipe in this exact structure:

Title:(Dont write title but give a attractive name)
Ingredients:
(list ingredients on new lines without dashes and remember to give quantity. also tell why chose or not chose certain ingredients)
If ingredient or quantities providied are not good for diabetic person then, dont use that ingredient or use small quantity. Also inform them that it is not good to consume those ingredients. Take all factor such as glucose, carbohydrates and proteins into considertion.
you may only use the ingredient provided. and other you use put as suggestion but dont use in recipe.
Instructions:
(numbered steps like 1. 2. 3. explained properly)
In the end type this caution message 'Users should be cautious when relying on information provided by this chatbot 
          and verify important details through other sources to ensure accuracy.'

    `;
console.log("🔍 CHATGPT PROMPT SENT:", prompt);6
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    return Response.json({
      recipe: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("API error:", error);
    return Response.json(
      { recipe: "Error generating recipe." },
      { status: 500 }
    );
  }
}
