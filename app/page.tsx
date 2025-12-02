"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [diet, setDiet] = useState<string>("");
  const [mealtype, setMealtype] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [healthy, setHealthy] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [people, setPeople] = useState<number | "">("");
  const [showModal, setShowModal] = useState(false);
  const [showDemo, setShowDemo] = useState(false);
  const [modalBackground, setModalBackground] = useState<string>("");


  /* TAG SYSTEM */
  const tagCategories = {
    Cost: ["Low Budget", "Medium Budget", "Premium Budget"],
    Time: ["Under 15 mins", "Under 30 mins", "Under an hour", "Over an hour"],
    Taste: ["Sweet", "Sour", "Spicy"],
    Skill: ["Beginner", "Intermediate", "Expert"],
    Knowledge: ["Nutrition Tips", "Ingredients Health Rating"],
    Motivation: ["Visually Appealing", "Aromatic"],
    "Support from Family": ["Family Friendly", "Kid Friendly"],
    "Support from Peers": ["Peer Friendly", "Healthy Party Food"],
    Accessibility: ["Easy Cooking Steps", "Simple Tools"],
  } as const;

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleHover = (cat: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setOpenCategory(cat);
  };

  const handleLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenCategory(null);
    }, 200);
  };

  const backgrounds = ["/bg1.jpg", "/bg2.jpg", "/bg3.jpg"];
  const [background, setBackground] = useState<string>("");

  useEffect(() => {
    const random = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBackground(random);
  }, []);

  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validate = () => {
    if (!diet) return "Please select Vegetarian or Non‑Vegetarian.";
    if (!cuisine) return "Please select or type a cuisine.";
    if (!healthy) return "Please select that you'd like a non‑diabetic (diabetes‑friendly) option.";
    if (!mealtype) return "Please select Breakfast, Lunch, Snack, or Dinner.";
    if (!ingredients.trim()) return "Please add the ingredients you have at home.";
    if (!people || people < 1) return "Please enter a valid number of people (at least 1).";
    if (selectedTags.length === 0) return "Please add at least one tag to customize your recipe.";
    return "";
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center items-center p-6"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* DEMO BUTTON */}
     <button
      onClick={() => setShowDemo(true)}
      aria-label="Open demo video"
      className={`fixed top-4 left-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg z-50 
      ${!healthy ? "jiggle" : ""}`}
      >
        How It Works
    </button>



      {/* MAIN CARD */}
      <div className="backdrop-blur-xl bg-black/40 shadow-2xl rounded-2xl p-10 w-full max-w-3xl border border-white/20">
        {/* Logo */}
        <div className="flex flex-col items-center text-center mb-4">
          <img
            src="/logo.jpeg"
            alt="Mindful Bite main logo"
            className="w-full max-w-[600px] h-auto rounded-xl object-contain border border-white/30 shadow-lg"
          />
        </div>

        {/* HEADER */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-4 mb-3">
            <img
              src="/newlogo.jpeg"
              alt="Mindful Bite square logo"
              className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 object-cover rounded-xl border border-white/30 shadow-lg"
            />

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-wide text-center">
              Mindful Bite
            </h1>
          </div>

          <p className="text-xl sm:text-2xl text-gray-200 font-semibold text-center mb-2 tracking-wide">
            Personalized Recipe Generator
          </p>

          <p className="text-lg sm:text-lg italic text-500 max-w-3xl leading-relaxed mt-3 text-center font-bold">
            With A Careful Hand, A Meal Well Planned, Serve Yourself the Safest Bite in the Land
          </p>
            <p className="text-lg sm:text-lg text-300 text-center max-w-prose leading-relaxed mb-4">
            IGCSE Grade 10 — Global Perspectives Team Project
          </p>
<p className="text-lg sm:text-lg text-300 text-center max-w-prose leading-relaxed mb-4 jiggle">
  This is a prototype used for testing, not for public use.
</p>      
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col items-center gap-5 mb-6">
          <div className="flex gap-3">
            <button
              onClick={() => setHealthy(!healthy)}
              aria-pressed={healthy}
              className={`px-4 py-2 rounded-xl border ${
                healthy ? "bg-blue-500 text-white" : "bg-black/60 border-white/30 text-white"
              }`}
            >
              {healthy ? "Make a Non-Diabetic Meal/Snack" : "Make a Non-Diabetic Meal/Snack"}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setDiet("veg")}
              className={`px-4 py-2 rounded-xl border ${
                diet === "veg" ? "bg-green-500 text-white" : "bg-black/60 border-white/30 text-white"
              }`}
            >
              Vegetarian
            </button>

            <button
              onClick={() => setDiet("nonveg")}
              className={`px-4 py-2 rounded-xl border ${
                diet === "nonveg" ? "bg-red-500 text-white" : "bg-black/60 border-white/30 text-white"
              }`}
            >
              Non‑Vegetarian
            </button>
          </div>

          <h2 className="font-semibold text-lg text-white">Meal Type</h2>

          <div className="flex flex-wrap justify-center gap-3 w-full">
            {['Breakfast', 'Lunch', 'Snack', 'Dinner'].map((mt) => (
              <button
                key={mt}
                onClick={() => setMealtype(mt)}
                className={`px-4 py-2 rounded-xl border ${
                  mealtype === mt ? "bg-blue-500 text-white" : "bg-black/60 border-white/30 text-white"
                }`}
              >
                {mt}
              </button>
            ))}
          </div>
        </div>

        {/* CUISINE */}
        <div className="mb-6 flex flex-col items-center">
          <h3 className="font-semibold text-lg mb-3 text-white text-center">Cuisine Preference</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => setCuisine('South Indian')}
              className={`px-4 py-2 rounded-xl border ${
                cuisine === 'South Indian' ? "bg-blue-500 text-white" : "bg-black/60 border-white/30 text-white"
              }`}
            >
              South Indian
            </button>

            <button
              onClick={() => setCuisine('North Indian')}
              className={`px-4 py-2 rounded-xl border ${
                cuisine === 'North Indian' ? "bg-blue-500 text-white" : "bg-black/60 border-white/30 text-white"
              }`}
            >
              North Indian
            </button>

            <input
              type="text"
              aria-label="Custom cuisine"
              placeholder="Type a different cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="px-4 py-2 rounded-xl bg-black/60 border border-white/30 text-white placeholder-gray-300 outline-none text-center w-auto"
            />
          </div>
        </div>

        {/* INGREDIENTS */}
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="List the ingredients you have at home"
          className="w-full p-3 rounded-xl border border-white/30 bg-black/50 text-white mb-6 placeholder-gray-300"
          aria-label="Ingredients list"
        />

        {/* PEOPLE */}
        <input
          type="number"
          value={people}
          onChange={(e) => setPeople(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full p-3 rounded-xl border border-white/30 bg-black/50 text-white mb-6"
          min={1}
          placeholder="Number of people"
          aria-label="Number of people"
        />

        {/* TAGS DISPLAY */}
        <div className="mb-6 p-4 rounded-xl bg-black/80 border border-white/30 min-h-[70px] flex flex-wrap gap-2 text-white">
          {selectedTags.length === 0 && (
            <span className="text-gray-400">Choose tags below to personalize the recipe.</span>
          )}
          {selectedTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
              className="px-3 py-1 bg-purple-600 text-white rounded-xl cursor-pointer hover:bg-red-500"
              aria-label={`Remove tag ${tag}`}
            >
              {tag} ✖
            </button>
          ))}
        </div>

        {/* TAG GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 w-full">
          {Object.entries(tagCategories).map(([category, options], index, arr) => (
            <div
              key={category}
              className={`relative ${index === arr.length - 1 ? "col-span-2 flex justify-center sm:col-span-1" : ""}`}
              onMouseEnter={() => handleHover(category)}
              onMouseLeave={handleLeave}
            >
              <div className="px-4 py-2 bg-black/60 text-white rounded-xl border border-white/20 cursor-pointer hover:bg-black/80 text-center w-full break-words">
                {category}
              </div>

              {openCategory === category && (
                <div className="absolute left-0 top-full mt-2 bg-blue-600 border border-blue-300 rounded-xl p-2 z-50 w-full shadow-xl">

                  {options
                    .filter((opt) => !selectedTags.includes(`${category}: ${opt}`))
                    .map((opt) => (
                      <button
  key={opt}
  onClick={() => {
    setSelectedTags([...selectedTags, `${category}: ${opt}`]);
    setOpenCategory(null);
  }}
  className="block w-full px-3 py-2 text-white bg-blue-600 hover:bg-blue-700 border-b border-blue-300 last:border-b-0 text-left rounded-lg"
>
  <span className="font-bold">{opt}</span>
</button>


                    ))}

                  {options.filter((opt) => !selectedTags.includes(`${category}: ${opt}`)).length === 0 && (
                    <p className="text-gray-400 text-lg px-2 py-1">You have selected all available tags.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {errorMessage && <p className="text-red-400 mb-6 text-center">{errorMessage}</p>}

        {/* GENERATE BUTTON */}
        <button
          onClick={async () => {
            const err = validate();
            if (err) return setErrorMessage(err);

            setErrorMessage("");
            setLoading(true);
            setRecipe("");

            try {
              const res = await fetch("/api/recipe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  diet,
                  healthy,
                  ingredients,
                  people,
                  selectedTags,
                  mealtype,
                  cuisine,
                }),
              });

              const data = await res.json();
              setRecipe(data.recipe);
              // pick different background for modal
const bgOptions = backgrounds.filter((bg) => bg !== background);
const chosen = bgOptions[Math.floor(Math.random() * bgOptions.length)];
setModalBackground(chosen);

              setShowModal(true);
            } catch {
              setRecipe("Error generating recipe.");
            }

            setLoading(false);
          }}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl mb-6"
        >
          {loading ? "Generating your recipe..." : "Generate Recipe"}
        </button>

        {loading && (
          <div className="w-full flex justify-center mt-4 mb-4">
            <div className="boxes">
              <div className="box"><div></div><div></div><div></div><div></div></div>
              <div className="box"><div></div><div></div><div></div><div></div></div>
              <div className="box"><div></div><div></div><div></div><div></div></div>
              <div className="box"><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        )}

      <p className="text-sm text-red-300 text-center mb-0">
          
Users should be cautious when relying on information provided by this chatbot and verify important details through other sources to ensure accuracy.
        </p>

        {/* OUTPUT */}
        {recipe && (
          <div className="mt-6 p-4 bg-black/40 backdrop-blur-xl rounded-xl text-white whitespace-pre-wrap">
            {recipe}
          </div>
        )}
      </div>

      {/* RECIPE MODAL */}
      {showModal && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-xl flex justify-center items-center z-50 p-6 bg-cover bg-center"
    style={{ backgroundImage: `url(${modalBackground})` }}
  >
    <button
  onClick={() => window.open("https://forms.gle/3X7hPWFV4hLQcY7K9", "_blank")}
  aria-label="Give feedback"
  className="fixed top-4 left-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg z-[9999] jiggle"
>
  Give Feedback
</button>


          <div className="bg-black/50 border border-white/20 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto text-white">
            <button
              onClick={() => setShowModal(false)}
              className="mb-6 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white"
            >
              Back
            </button>
            <div className="whitespace-pre-wrap">{recipe}</div>
          </div>
        </div>
      )}

      {/* DEMO POPUP */}
      {showDemo && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center z-50 p-6">
          <div className="bg-black/50 border border-white/20 rounded-2xl p-6 max-w-2xl w-full text-white">
            <button
              onClick={() => setShowDemo(false)}
              className="mb-4 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white"
            >
              Close
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
            <video src="/demo.mp4" autoPlay loop controls className="w-full rounded-xl border border-white/30" />
          </div>
        </div>
      )}
    </div>
  );
}
