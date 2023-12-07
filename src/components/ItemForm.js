import React, { useState } from "react";

function ItemForm({ onAddItem }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  function handleSubmit(e) {
    e.preventDefault();
    const itemData = {
      name: name,
      category: category,
      isInCart: false,
    };
    fetch("http://localhost:4000/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    })
      .then((r) => r.json())
      .then((newItem) => onAddItem(newItem));
  }

  return (
    <form className="NewItem" onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Produce">Produce</option>
        <option value="Dairy">Dairy</option>
        {/* Other category options */}
      </select>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default ItemForm;
