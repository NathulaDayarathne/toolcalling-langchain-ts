"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);  // Reset error state

    try {
      const res = await fetch("/api/calculate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult(JSON.stringify(data.result, null, 2)); // Convert the result to a string
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while processing your request.");
    }
  };

  return (
    <div>
      <h1>Calculator with Tool Calling</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="What is 3 * 12?"
          className="text-green-500 border rounded p-2"
        />
        <button type="submit">Calculate</button>
      </form>
      {error && (
        <div style={{ color: "red" }}>
          <h2>Error:</h2>
          <p>{error}</p>
        </div>
      )}
      {result && (
        <div>
          <h2>Result:</h2>
          <pre>{result}</pre> {/* Using <pre> for better formatting */}
        </div>
      )}
    </div>
  );
}
