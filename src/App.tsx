import * as React from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [src, setSrc] = useState("");
  const [urls, setUrls] = useState([]);

  const handleDownload = (downUrl: string) => {
    // setSrc(downloadUrl);
    const aTag = document.createElement("a");
    aTag.href = downUrl;
    aTag.download = "video";
    aTag.click();
  };

  const loadUrls = () => {
    chrome.runtime.sendMessage("download-url", (downloadUrls) => {
      console.log(downloadUrls);
      setUrls(downloadUrls);
    });
  };

  return (
    <div className="App-header">
      <button onClick={loadUrls} className="App-link">
        영상 불러오기
      </button>
      <ul id="video-ul">
        {urls.map((url) => (
          <li onClick={() => handleDownload(url)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style={{ zIndex: 99, fill: "#868e92", fillOpacity: 0.8 }}
            >
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 9h-4v-1h4v1zm0-3v1h-4v-1h4zm-2 13l-6-6h4v-3h4v3h4l-6 6z" />
            </svg>
            <video
              className="video-player"
              preload="metadata"
              src={`${url}`}
            />
          </li>
        ))}
      </ul>
      {/* <iframe id="iframe1"></iframe> */}
    </div>
  );
};

export default App;
