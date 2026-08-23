import { useState, useEffect } from "react";

function ChangeTitle() {
  const [marks, setMarks] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem("marks", JSON.stringify(marks));
  }, [marks]);

  const handleClick = () => {
    setMarks([...marks, value]);
    setValue("");
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter value"
      />

      <h1>{marks.toString()}</h1>

      <button onClick={handleClick}>increase</button>
    </>
  );
}

export default ChangeTitle;