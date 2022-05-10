import * as React from "react";
import { useState } from "react";
import "./App.css";

const App = () => {
  const [urls, setUrls] = useState<string[]>([]);

  const handleDownload = (downUrl: string) => {
    const aTag = document.createElement("a");
    aTag.href = downUrl;
    aTag.download = "video";
    aTag.click();
  };

  const loadUrls = () => {
    chrome.runtime.sendMessage("download-url", (downloadUrls) => {
      setUrls((prev) => {
        let union = new Set(prev);
        downloadUrls.forEach((url: string) => {
          union.add(url);
        });
        return Array.from(union);
      });
    });
  };

  const deleteLog = () => {
    setUrls([]);
    chrome.runtime.sendMessage("clear-url");
  };
  return (
    <div className="App-header">
      <div id="buttons">
        <button onClick={loadUrls} className="button">
          영상 불러오기
        </button>
        <button className="button" onClick={() => alert("어쩔티비")}>
          ! 영상이 안떠요
        </button>
        <button className="button" id="delete" onClick={deleteLog}>
          지우기
        </button>
      </div>
      {urls && (
        <ul id="video-ul">
          {urls.map((url) => (
            <li className="video-li" onClick={() => handleDownload(url)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="video-download-logo"
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
      )}
    </div>
  );
};

export default App;
