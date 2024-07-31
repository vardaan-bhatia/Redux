import React from "react";
import ListItem from "./ListItem";

const App = () => {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h1 className="mb-5 font-bold text-lg">TODO APP</h1>
      <ListItem />
    </div>
  );
};

export default App;
