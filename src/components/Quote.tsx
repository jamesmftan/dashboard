"use client";
import { useState, useEffect } from "react";
import { QuoteLoader } from "@/components/Loaders";

const Quote = () => {
  const [author, setAuthor] = useState<string>("");
  const [quote, setQuote] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getQuote = async () => {
    try {
      const response = await fetch("/api/quote", {
        method: "GET",
      });
      const res = await response.json();
      setQuote(res.data[0].quote);
      setAuthor(res.data[0].author);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  return isLoading ? (
    <QuoteLoader />
  ) : (
    <div className="text-slate-200 text-end justify-center flex flex-col items-end w-1/2 space-y-2 p-3">
      <p>{quote}</p>
      <h1 className="font-bold">{author}</h1>
    </div>
  );
};

export default Quote;
