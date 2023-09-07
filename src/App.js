import React from "react";
import "../node_modules/primeflex/primeflex.css";
import { useState } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { InputText } from "primereact/inputtext";

function App() {
  const [textArea1, setTextArea1] = useState("");
  const [textArea2, setTextArea2] = useState("");
  const [combinedText, setCombinedText] = useState("");
  const [songtitle, setSongTitle] = useState("");
  const [songauthor, setSongAuthor] = useState("");

  const combineText = () => {
    const lines1 = textArea1.split("\n");
    const lines2 = textArea2.split("\n");

    const combinedLines = [];

    combinedLines.push(`<?xml version='1.0' encoding='UTF-8'?>`);
    combinedLines.push(
      `<song xmlns="http://openlyrics.info/namespace/2009/song" version="0.8" createdIn="OpenLP 2.4.6" modifiedIn="OpenLP 2.4.6" modifiedDate="2022-10-16T09:45:20">`
    );
    combinedLines.push(`  <properties>`);
    combinedLines.push(`    <titles>`);
    combinedLines.push(`      <title>${songtitle} &lt;PT/DE&gt;</title>`);
    combinedLines.push(`    </titles>`);
    combinedLines.push(`    <authors>`);
    combinedLines.push(`      <author>${songauthor}</author>`);
    combinedLines.push(`    </authors>`);
    combinedLines.push(`  </properties>`);
    combinedLines.push(`  <format>`);
    combinedLines.push(`    <tags application="OpenLP">`);
    combinedLines.push(`      <tag name="tr1">`);
    combinedLines.push(
      `        <open>&lt;span style="-webkit-text-fill-color:yellow; margin-top: 5px; line-heigth: 200%;"&gt;</open>`
    );
    combinedLines.push(`        <close>&lt;/span&gt;</close>`);
    combinedLines.push(`      </tag>`);
    combinedLines.push(`    </tags>`);
    combinedLines.push(`  </format>`);
    combinedLines.push(`  <lyrics>`);

    let count = 1; // Initialize the count

    for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
      const line1 = lines1[i] || "";
      const line2 = lines2[i] || "";

      if (line1.trim() !== "" && line2.trim() !== "") {
        combinedLines.push(
          `<verse name="v${count}"><lines> \n ${line1} <br/> \n <tag name="tr1">${line2}</tag></lines></verse>`
        );
        count++; // Increment the count for non-empty lines
      }
    }
    combinedLines.push(`  </lyrics>`);
    combinedLines.push(`</song>`);

    setCombinedText(combinedLines.join("\n"));
  };
  const saveToFile = () => {
    const blob = new Blob([combinedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${songtitle}.xml`;
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleSongTitle = (textSongTitle) =>{
    // Regular expression to match any special characters
    const specialCharsRegex = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/g;

    // Remove special characters from the input
    setSongTitle(textSongTitle.replace(specialCharsRegex, ''));
  }

  const handleSongAuthor = (textSongAuthor)=>{
      // Regular expression to match any special characters
      const specialCharsRegex = /[!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?]+/g;

      // Remove special characters from the input
      setSongAuthor(textSongAuthor.replace(specialCharsRegex, ''));

  }
  return (
    <div>
      <div className="card flex align-items-end justify-content-center">
      <h1 className="card flex justify-content-center">Church Lyrics</h1>
      <h4 className="ml-2">v1.1</h4>
      </div>
      <div className="flex flex-column gap-2 mb-3 w-24rem">
        <label htmlFor="songtitle">Song Title</label>
        <InputText
          id="songtitle"
          value={songtitle}
          onChange={(e)=>handleSongTitle(e.target.value)}
        />
        <label htmlFor="songauthor">Song Author</label>
        <InputText
          id="songauthor"
          value={songauthor}
          onChange={(e) => handleSongAuthor(e.target.value)}
        />
      </div>
      <div className="grid">
        <div className="col">
          <div className="card flex justify-content-center">
            <InputTextarea
              id="description"
              value={textArea1}
              onChange={(e) => setTextArea1(e.target.value)}
              rows={30}
              cols={50}
              placeholder="Lyrics in Portuguese"
            />
          </div>
        </div>
        <div className="col">
          <div className="card flex justify-content-center">
            <InputTextarea
              id="description"
              value={textArea2}
              onChange={(e) => setTextArea2(e.target.value)}
              rows={30}
              cols={50}
              placeholder="Lyrics in German"
            />
          </div>
        </div>
      </div>
      <button onClick={combineText}>Combine</button>
      <div className="card flex justify-content-center">
        <InputTextarea
          id="description"
          value={combinedText}
          onChange={(e) => setCombinedText(e.target.value)}
          rows={30}
          cols={80}
        />
      </div>
      <button onClick={saveToFile}>Save to File</button>
    </div>
  );
}

export default App;
