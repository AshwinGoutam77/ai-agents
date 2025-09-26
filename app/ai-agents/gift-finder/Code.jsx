"use client";
import Header from "@/app/components/Header";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import Container from "@/app/components/Container";
import Cookies from "js-cookie";
import { saveChat } from "@/hooks/useChatHistory";
import { useTool } from "../../../hooks/useTool";
import "../tools.css";
import Loader from "@/components/ui/Loader";

const Code = ({ token }) => {
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [recipient, setRecipient] = useState("");
  const [occasion, setOccasion] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [budget, setBudget] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggesGifts, setSuggestGifts] = useState([]);
  const getAgeGroup = (range) => {
    switch (range) {
      case "0-2":
        return "Toddler";
      case "2-4":
        return "Preschool";
      case "4-12":
        return "Child";
      case "12-18":
        return "Teen";
      case "18-25":
        return "Young Adult";
      case "26-40":
        return "Adult";
      case "40-60":
        return "Middle Age";
      case "60+":
        return "Senior";
      default:
        return "Unknown";
    }
  };
  const handleGenerate = async (e) => {
    e.preventDefault();

    const email = Cookies.get("user_email");
    if (!email) {
      setError("Please login first.");
      return;
    }

    if (!gender || !ageRange || !recipient || !occasion || !budget) {
      setError("Please fill in all required fields.");
      return;
    }
    const ageGroup = getAgeGroup(ageRange);
    setLoading(true);
    setError("");
    try {
      const usetool = await useTool("gift-suggestions", email);
      if (!usetool?.allowed) {
        setError("Daily usage limit reached for this tool.");
        setLoading(false);
        return;
      }

      const response = await fetch("/api/gift-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gender,
          age_group: ageGroup,
          age_range: ageRange, // you can adjust if needed
          recipient,
          occasion,
          hobbies,
          budget,
        }),
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const data = await response.json();
      setResults(data);
      setSuggestGifts(JSON.stringify(data.gifts, null, 2));

      await saveChat({
        email,
        toolName: "gift-suggestions",
        prompt: {
          gender,
          ageRange,
          recipient,
          occasion,
          hobbies,
          budget,
        },
        response: data,
      });
      console.log(suggesGifts, " suggesGifts");
    } catch (err) {
      console.error(err);
      setError("Failed to generate gift suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agents-detail">
      <Header />
      <Container>
        <form onSubmit={handleGenerate} className="flex flex-col gap-3 my-10">
          <h4>Find the Perfect Gift 🎁</h4>

          {/* Gender */}
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-3 border rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="other">Other</option>
          </select>

          {/* Age */}
          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="p-3 border rounded-md"
            required
          >
            <option value="">Select Age</option>
            <option value="0-2">0–2 (Toddler)</option>
            <option value="2-4">2–4 (Preschool)</option>
            <option value="4-12">4–12 (Child)</option>
            <option value="12-18">12–18 (Teen)</option>
            <option value="18-25">18–25 (Young Adult)</option>
            <option value="26-40">26–40 (Adult)</option>
            <option value="40-60">40–60 (Middle Age)</option>
            <option value="60+">60+ (Senior)</option>
          </select>

          {/* Recipient */}
          <select
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="p-3 border rounded-md"
            required
          >
            <option value="">Select Recipient</option>
            <option>Friend</option>
            <option>Girlfriend</option>
            <option>Boyfriend</option>
            <option>Husband</option>
            <option>Mother</option>
            <option>Father</option>
            <option>Grandma</option>
            <option>Grandpa</option>
            <option>Son</option>
            <option>Daughter</option>
            <option>Brother</option>
            <option>Sister</option>
            <option>Client</option>
            <option>Bridesmaid</option>
            <option>Teacher</option>
          </select>

          {/* Occasion */}
          <select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            className="p-3 border rounded-md"
            required
          >
            <option value="">Select Occasion</option>
            <option>Diwali</option>
            <option>Birthday</option>
            <option>Anniversary</option>
            <option>Housewarming</option>
            <option>Graduation</option>
            <option>Wedding</option>
            <option>Engagement</option>
            <option>Retirement</option>
            <option>Bridal Shower</option>
            <option>Wedding Shower</option>
            <option>Baby Shower</option>
            <option>Bachelor Party</option>
            <option>Promotion</option>
            <option>Christmas</option>
            <option>Valentine's Day</option>
            <option>Mother's Day</option>
            <option>Father's Day</option>
            <option>Easter</option>
            <option>Eid</option>
            <option>Rakshabandhan</option>
          </select>

          {/* Hobbies (comma separated) */}
          <input
            type="text"
            placeholder="Enter hobbies (comma separated)"
            value={hobbies}
            onChange={(e) => setHobbies(e.target.value)}
            className="p-3 border rounded-md"
          />

          {/* Budget */}
          <select
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="p-3 border rounded-md"
            required
          >
            <option value="">Select Budget</option>
            <option value="under_500">Under ₹500</option>
            <option value="500_1000">₹500–₹1000</option>
            <option value="1000_2000">₹1000–₹2000</option>
            <option value="above_2000">Above ₹2000</option>
          </select>

          <p className="text-rose-500">{error}</p>

          <button
            disabled={loading}
            className=" bg-gradient-to-r from-blue-600 to-purple-600 w-fit text-white py-3 px-4 rounded-full"
          >
            {loading ? "Generating..." : "Generate Suggestions"}
          </button>
        </form>

        {/* Results */}
        {results && (
          <div className="space-y-6 my-10">
            {results?.gifts && results.gifts.length > 0 && (
              <div className="space-y-4 my-10">
                <h3 className="text-xl font-semibold">🎁 Gift Suggestions</h3>
                <ul className="space-y-3">
                  {results.gifts.map((gift, index) => (
                    <li
                      key={index}
                      className="p-2 transition ml-5"
                    >  
                      <strong>{index+1}. {gift.title} : </strong>{" "}
                      <span>{gift.description}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <h3 className="text-xl font-semibold">💌 Gift Card Message</h3>
            <div className="p-4 rounded-lg shadow bg-white">
              <ReactMarkdown>{results.cardMessage}</ReactMarkdown>
            </div>
          </div>
        )}

        <Loader />
      </Container>
    </div>
  );
};

export default Code;
