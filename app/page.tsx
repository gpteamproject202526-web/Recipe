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

  /* TAG SYSTEM */
  const tagCategories = {
    Cost: ["Cost Effective", "Medium Budget", "Premium"],
    Time: ["Under 15 mins", "Under 30 mins", "Under an hour", "Over an Hour"],
    Taste: ["Sweet", "Sour", "Spicy",],
    Skill: ["Beginner", "Intermediate", "Expert"],
    Knowledge: ["Nutrition Tips", "Ingredients Health Rating"],
    Motivation: ["Visually Appealing", "Aromatic"],
    "Support from Family": ["Family Friendly", "Kid Friendly"],
    "Support from Peers": ["Peer Friendly", "Healthy Party Food"],
    Accessibility: ["Easy Cooking Steps", "Simple Tools"],  
    
  };

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
    if (!diet) return "Please select Veg or Non-Veg.";
    if (!cuisine) return "Please select or type a Cuisine.";
    if (!healthy) return "Please Select Non-Diabetic Meal/Snack";
    if (!mealtype) return "Please select Breakfast, Lunch, Snack or Dinner.";
    if (!ingredients.trim()) return "Please enter the ingredients.";
    if (!people || people < 1) return "Please enter a valid number of people.";
    if (selectedTags.length === 0) return "Please add at least one tag.";
    return "";
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex justify-center items-center p-6"
      style={{ backgroundImage: `url(${background})` }}
    >
    {/* DEMO BUTTON (top-left) */}
  <button
    onClick={() => setShowDemo(true)}
    className="fixed top-4 left-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg z-50"
  >
  How it Works
</button>

      <div className="backdrop-blur-xl bg-black/40 shadow-2xl rounded-2xl p-10 w-full max-w-3xl border border-white/20">

 
  {/* Logo */}
<div className="w-full flex justify-center mb-6">
  <img
    src="/logo.jpeg"  // replace with your file name
    alt="logo"
    className="w-full max-w-[600px] h-auto rounded-xl object-contain border border-white/30 shadow-lg"
  />
</div>


        <h2 className="text-2xl font-bold text-white mb-1 text-center"> IGCSE Grade 10 - Global Perspective Team Project</h2>
        <h2 className="text-1xl font-bold text-white mb-6 text-center">
          This is a prototype used for testing, not for public use.
        </h2>

        {/* BUTTONS CENTERED */}
        <div className="flex flex-col items-center gap-5 mb-6">

          {/* Healthy Toggle */}
          <div className="flex gap-3 mb-0.1">
            <button
              onClick={() => setHealthy(!healthy)}
              className={`px-4 py-2 rounded-xl border ${
                healthy
                  ? "bg-blue-500 text-white"
                  : "bg-black/60 border-white/30 text-white"
              }`}
            >
              Make a Non-Diabetic Meal/Snack
            </button>
          </div>

          {/* Diet Buttons */}
          <div className="flex gap-3 mb-0.1">
            <button
              onClick={() => setDiet("veg")}
              className={`px-4 py-2 rounded-xl border ${
                diet === "veg"
                  ? "bg-green-500 text-white"
                  : "bg-black/60 border-white/30 text-white"
              }`}
            >
              Veg
            </button>

            <button
              onClick={() => setDiet("nonveg")}
              className={`px-4 py-2 rounded-xl border ${
                diet === "nonveg"
                  ? "bg-red-500 text-white"
                  : "bg-black/60 border-white/30 text-white"
              }`}
            >
              Non-Veg
            </button>
          </div>

          {/* Meal Type */}
          <h2 className="font-semibold text-lg text-white mb-0.1">
            Meal Type
          </h2>

          <div className="flex flex-wrap justify-center gap-3 w-full mb-0.1">
            {["Breakfast", "Lunch", "Snack", "Dinner"].map((mt) => (
              <button
                key={mt}
                onClick={() => setMealtype(mt)}
                className={`px-4 py-2 rounded-xl border ${
                  mealtype === mt
                    ? "bg-blue-500 text-white"
                    : "bg-black/60 border-white/30 text-white"
                }`}
              >
                {mt}
              </button>
            ))}
          </div>

        </div>

        {/* Cuisine Section */}
        <div className="mb-6 flex flex-col items-center">
          <h2 className="font-semibold text-lg mb-3 text-white text-center">
            Cuisine Preference
          </h2>

          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <button
              onClick={() => setCuisine("South Indian")}
              className={`px-4 py-2 rounded-xl border ${
                cuisine === "South Indian"
                  ? "bg-blue-500 text-white"
                  : "bg-black/60 border-white/30 text-white"
              }`}
            >
              South Indian
            </button>

            <button
              onClick={() => setCuisine("North Indian")}
              className={`px-4 py-2 rounded-xl border ${
                cuisine === "North Indian"
                  ? "bg-blue-500 text-white"
                  : "bg-black/60 border-white/30 text-white"
              }`}
            >
              North Indian
            </button>

            <input
              type="text"
              placeholder="Type a different cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="px-4 py-2 rounded-xl bg-black/60 border border-white/30 text-white placeholder-gray-300 outline-none text-center w-auto"
            />
          </div>
        </div>

        {/* Ingredients */}
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Add the you have ingredients at home"
          className="w-full p-3 rounded-xl border border-white/30 bg-black/50 text-white mb-6 placeholder-gray-300"
        />

        {/* People */}
        <input
          type="number"
          value={people}
          onChange={(e) => {
            const val = e.target.value;
            setPeople(val === "" ? "" : Number(val));
          }}
          className="w-full p-3 rounded-xl border border-white/30 bg-black/50 text-white mb-6"
          min={1}
          placeholder="Enter number of people"
        />

        {/* Selected Tags */}
        <div className="mb-6 p-4 rounded-xl bg-black/80 border border-white/30 min-h-[70px] flex flex-wrap gap-2 text-white">
          {selectedTags.length === 0 && (
            <span className="text-gray-400"> Choose tags from below to personalize your recipe.</span>
          )}

          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-purple-600 text-white rounded-xl cursor-pointer hover:bg-red-500"
              onClick={() =>
                setSelectedTags(selectedTags.filter((t) => t !== tag))
              }
            >
              {tag} ✖
            </span>
          ))}
        </div>

{/* Tag Dropdown Grid */}
<div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 w-full">
  {Object.entries(tagCategories).map(([category, options], index, arr) => (
    <div
      key={category}
      className={`relative ${
        index === arr.length - 1
          ? "col-span-2 flex justify-center sm:col-span-1"
          : ""
      }`}
      onMouseEnter={() => handleHover(category)}
      onMouseLeave={handleLeave}
    >
      <div className="px-4 py-2 bg-black/60 text-white rounded-xl border border-white/20 cursor-pointer hover:bg-black/80 text-center w-full flex justify-center break-words whitespace-normal">
        {category}
      </div>

      {openCategory === category && (
        <div className="absolute left-0 top-full mt-2 bg-black/90 border border-white/20 rounded-xl p-2 z-50 w-full break-words">
          {options
            .filter((opt) => !selectedTags.includes(`${category}: ${opt}`))
            .map((opt) => (
              <button
                key={opt}
                onClick={() => {
                  setSelectedTags([...selectedTags, `${category}: ${opt}`]);
                  setOpenCategory(null);
                }}
                className="block w-full px-3 py-2 text-white hover:bg-purple-600 border-b border-white/20 last:border-b-0 flex justify-center text-center break-words whitespace-normal"
              >
                {opt}
              </button>
            ))}

          {options.filter(
            (opt) => !selectedTags.includes(`${category}: ${opt}`)
          ).length === 0 && (
            <p className="text-gray-400 text-sm px-2 py-1">
              You have selected all available tags.
            </p>
          )}
        </div>
      )}
    </div>
  ))}
</div>


        {errorMessage && (
          <p className="text-red-400 mb-6 text-center">{errorMessage}</p>
        )}

        {/* Generate Button */}
        <button
          onClick={async () => {
            const err = validate();
            if (err) {
              setErrorMessage(err);
              return;
            }

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
              setShowModal(true);
            } catch (error) {
              console.error("Error:", error);
              setRecipe("Error generating recipe.");
            }

            setLoading(false);
          }}
          className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl mb-6"
        >
          {loading ? "Cooking your Recipe..." : "Generate Recipe"}
        </button>

        {loading && (
  <div className="w-full flex justify-center mt-4 mb-4">
    <div className="boxes">
      <div className="box">
        <div></div><div></div><div></div><div></div>
      </div>
      <div className="box">
        <div></div><div></div><div></div><div></div>
      </div>
      <div className="box">
        <div></div><div></div><div></div><div></div>
      </div>
      <div className="box">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  </div>
)}


        {/* Caution */}
        <p className="text-xs text-red-300 text-center mb-0">
          Users should be cautious when relying on information provided by this chatbot 
          and verify important details through other sources to ensure accuracy.
        </p>
        <p className="text-xs text-white-300 text-center mb-0">
          For queries or to report errors contact gpteamproject2025.26@gmail.com.
        </p>

        {/* Old Output */}
        {recipe && (
          <div className="mt-6 p-4 bg-black/40 backdrop-blur-xl rounded-xl text-white whitespace-pre-wrap">
            {recipe}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center z-50 p-6">
          <div className="bg-black/50 border border-white/20 rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto text-white">

            <button
              onClick={() => setShowModal(false)}
              className="mb-6 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-xl text-white"
            >
              Back
            </button>

            <div className="whitespace-pre-wrap">
              {recipe}
            </div>
            
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

      <video
        src="/demo.mp4"
        autoPlay
        loop
        controls
        className="w-full rounded-xl border border-white/30"
      />

    </div>
  </div>
)}
    
    </div>
  );
}