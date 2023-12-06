import React, { useState, useEffect, useRef } from 'react';
import ItemForm from './ItemForm';
import Item from './Item';

function ShoppingList() {
  const [items, setItems] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/items')
      .then((response) => response.json())
      .then((data) => {
        if (isMounted.current) {
          setItems(data);
        }
      })
      .catch((error) => {
        // Handle fetch error
      });
  }, []);

  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  function handleUpdateItem(updatedItem) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  }

  function handleDeleteItem(id) {
    fetch(`http://localhost:4000/items/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(() => {
        if (isMounted.current) {
          setItems((prevItems) =>
            prevItems.filter((item) => item.id !== id)
          );
        }
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
      });
  }
  

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <ul className="Items">
        {items.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
