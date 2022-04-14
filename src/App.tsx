import React from "react";
import data from "./API.json";
import Header from "./components/Header";
function App() {
  const a = data.renderings;
  console.log(a);
  return (
    <div>
      <Header />

      {a.map((c, index) => {
        const url = c["_id"];
        return <>{<img key={index} src={url} alt="~" />}</>;
      })}
    </div>
  );
}

export default App;
