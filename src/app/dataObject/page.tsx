import React from "react";
import { useAppSelector } from "@/lib/hooks";
import "../../../styles/data.css";

interface Themes {
  [key: string]: string[];
}

export default function page() {
  const { data } = useAppSelector((state) => state.data);
  const themes = data.Themes as Themes;
  console.log(data);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "2rem", color: "white" }}>
        Pattern and Insights Display
      </h1>
      <div className="categorization">
        <h1>Message Categorization</h1>
        {data.Categorization?.map((item: any, key: any) => (
          <div style={{ marginTop: "1rem" }} key={key}>
            <h3>timestamp: {item.timestamp}</h3>
            <p>message: {item.message || item.content}</p>
            <h3>category: {item.category}</h3>
          </div>
        ))}
      </div>

      <div className="themes">
        <h1>Identified Themes in Chats</h1>
        {themes && Object.keys(themes).length > 0 ? (
          Object.entries(themes).map(([theme, timestamps], index) => (
            <div key={theme} style={{ marginTop: "1rem" }}>
              <h3>Theme of Chat At Respective Timestamps: {theme}</h3>
              <ul>
                {timestamps.map((timestamp, idx) => (
                  <li key={timestamp + idx}>
                    <span>CHAT TIME STAMP: {timestamp}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No themes available.</p>
        )}
      </div>

      <div className="frequency-analysis">
        <h1>Content and Topic Frequency Analysis</h1>
        <h3>CONTENT TYPES</h3>
        <div style={{ marginTop: ".3rem" }}>
          <h4>
            LINK :{" "}
            {(data.Frequency_Analysis.Content_Types &&
              data.Frequency_Analysis.Content_Types.Link) ||
              (data.Frequency_Analysis.content_types &&
                data.Frequency_Analysis.content_types.Link)}
          </h4>
          <h4>
            REFLECTION :{" "}
            {(data.Frequency_Analysis.Content_Types &&
              data.Frequency_Analysis.Content_Types.Reflection) ||
              (data.Frequency_Analysis.content_types &&
                data.Frequency_Analysis.content_types.Reflection)}
          </h4>
          <h4>
            QUOTE :{" "}
            {(data.Frequency_Analysis.Content_Types &&
              data.Frequency_Analysis.Content_Types.Quote) ||
              (data.Frequency_Analysis.content_types &&
                data.Frequency_Analysis.content_types.Reflection)}
          </h4>
        </div>
        <h3 style={{ marginTop: ".3rem" }}>TOPICS</h3>
        <div style={{ marginTop: "1rem" }}>
          {data.Frequency_Analysis.Repeated_Themes &&
            data.Frequency_Analysis.Repeated_Themes.length > 0 && (
              <>
                {data.Frequency_Analysis.Repeated_Themes.map((item, key) => (
                  <h4 key={key}>{item}</h4>
                ))}
                <span> | </span>
              </>
            )}

          {data.Frequency_Analysis.Themes &&
            Object.entries(data.Frequency_Analysis.Themes).length > 0 && (
              <>
                {Object.entries(data.Frequency_Analysis.Themes).map(
                  ([key, value], index) => (
                    <div key={index} style={{ marginTop: "1rem" }}>
                      <h4>Theme : {key}</h4>
                      <p>Value: {String(value)}</p>
                    </div>
                  )
                )}
                <span> | </span>
              </>
            )}

          {data.Frequency_Analysis.Repeated_Topics &&
            data.Frequency_Analysis.Repeated_Topics.length > 0 && (
              <>
                {data.Frequency_Analysis.Repeated_Topics.map((item, key) => (
                  <h4 key={key}>{item}</h4>
                ))}
                <span> | </span>
              </>
            )}

          {data.Frequency_Analysis.Topics &&
            Object.entries(data.Frequency_Analysis.Topics).length > 0 && (
              <>
                {Object.entries(data.Frequency_Analysis.Topics).map(
                  ([key, value], index) => (
                    <div key={index} style={{ marginTop: "1rem" }}>
                      <h4>Theme : {key}</h4>
                      <p>Value: {String(value)}</p>
                    </div>
                  )
                )}
              </>
            )}
        </div>
      </div>

      <div className="insights">
        <div style={{ marginTop: "1rem" }}>
          <h1>Chat Insights and Patterns</h1>
          <h3>Patterns Identified in the Chat : </h3>
          <p>{data.Insights.Patterns}</p>
          <h3>Active Themes in the Chat : </h3>
          <p>
            {data.Insights.Active_Themes} {data.Insights.Recurring_Themes}
          </p>
          <h3>Relationships Between Chat Elements :</h3>
          <p>{data.Insights.Relationships}</p>
        </div>
      </div>
    </div>
  );
}
