"use client";
import React from "react";
import DataObject from "@/app/dataObject/page";
import "../../../styles/uploadfile.css";
import { updateFilename } from "@/lib/features/filename/fileSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateActualFile } from "@/lib/features/file/Slice";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { updateData } from "@/lib/features/data/dataSlice";

export default function page() {
  const { filename } = useAppSelector((state) => state.filename);
  const { actualfile } = useAppSelector((state) => state.actualFile);
  const dispatch = useAppDispatch();

  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_museyardkey as string
  );

  const prompt = `Analyze the following chat content provided in ${actualfile}. The analysis should include:

Categorization: Classify each message as one of the following:

Link: Contains a URL or external reference.
Quote: Includes a quote from an external source or a personal reflection.
Reflection: Represents a personal thought, note, or idea.
Themes: Group messages into recurring themes/topics such as "Productivity," "Design," "Personal Growth," etc. Provide labeled themes with associated messages.

Frequency_Analysis:

Highlight frequently shared types of content (e.g., quotes, links, reflections).
Identify repeated topics or themes (e.g., "design," "productivity").
Insights: Provide key observations, including:

Patterns in communication (e.g., frequent sharing of design inspiration, morning reflections).
Active recurring themes or topics.
Relationships: Highlight relationships between messages based on shared themes or content types (e.g., a link and a reflection related to "design")
Please send the response in the form of json `;

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("event is working");
    const file = event.target.files?.[0];
    if (file && file.type == "text/plain") {
      dispatch(updateFilename(file?.name));
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = (e) => {
        if (e.target?.result) {
          dispatch(updateActualFile(e.target.result.toString()));
        }
      };
      reader.onerror = () => {
        alert("Failed to read file content. Please try again.");
      };
    } else {
      alert("please select a valid file");
      return;
    }
  };

  const submitFile = async () => {
    if (actualfile) {
      if (!process.env.NEXT_PUBLIC_museyardkey) {
        alert(
          "please generate the gemini ai api keys first to analyse the chat patterns"
        );
        return;
      }
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      let responseText = result.response.text();
      responseText = responseText.replace("json", "");
      responseText = responseText.replaceAll("```", "");
      const responeJson = JSON.parse(responseText);
      dispatch(updateData(responeJson));
    } else {
      alert("please select a file first to generate analysis");
      return;
    }
  };

  return (
    <div className="main">
      <div className="space"></div>
      <div className="main-content">
        <h1>Pattern Explorer: WhatsApp Chat Analysis and Insight Generator</h1>
        <p>
          a web application designed to help users uncover meaningful patterns
          and insights from their exported WhatsApp chats, making it easier to
          visualize and analyze communication trends
        </p>
      </div>
      <div className="main-input">
        <input
          type="file"
          accept=".txt"
          name="fileupload"
          id="fileupload"
          onChange={handleFile}
          className="file-input"
        />
        <label htmlFor="fileupload" className="custom-file-label">
          Choose File
        </label>
        <span id="file-name" className="file-name">
          {filename}
        </span>
        <button onClick={submitFile} className="submit-file">
          Analyse
        </button>
      </div>

      <div className="analyzed-data">
        <DataObject />
      </div>
    </div>
  );
}
