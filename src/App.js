import React from 'react';
import './App.css';
const Resultsorting = [];
var Inputnumber = React.createRef();
var sortingNumber = [];
function Sorting() {
  console.log("clicked function", Inputnumber.current.value)
  sortingNumber.push(Inputnumber.current.value)
  console.log(sortingNumber.sort());
}
function setInputNumber(event) {
  // Inputnumber.push(event.target.value);
  console.log(event.target.value)
}
function App() {
  
  return (
    <div>
      <input type="number" ref= {Inputnumber}></input>
      <button onClick={Sorting}>Submit Number</button>
    </div>
  );
}

export default App;
