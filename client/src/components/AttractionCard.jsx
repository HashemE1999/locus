import React, { useState } from "react";
import { useDraggable } from "@dnd-kit/core";

const AttractionCard = ({ attraction }) => {
  const { name, description, pictures = [], tags = [], id } = attraction;

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
      data: {
        name: name,
        pictures: pictures,
      },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 10px)`,
        zIndex: 30,
      }
    : undefined;
  // First three tags for display
  const displayTags = tags.slice(0, 3);
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="basis-1/3 block aspect-square max-w-xs z-30"
      style={style}
    >
      <div style={styles.card}>
        {pictures.length ? (
          <img
            src={pictures[0]} // Placeholder; update if image data is available
            alt={name}
            style={styles.image}
          />
        ) : (
          <img
            src="https://via.placeholder.com/300x200" // Placeholder; update if image data is available
            alt={name}
            style={styles.image}
          />
        )}

        <div style={styles.content}>
          <a style={styles.name}>{name}</a>
          <div style={styles.tagContainer}>
            {displayTags.map((tag, index) => (
              <span key={index} style={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    width: "300px",
    margin: "20px auto",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    overflow: "hidden",
    backgroundColor: "beige",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  content: {
    padding: "15px",
  },
  name: {
    fontSize: "1.2em",
    margin: "10px 0",
    color: "#333",
  },
  category: {
    fontSize: "1em",
    color: "#666",
    marginBottom: "15px",
  },
  tagContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  tag: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "0.9em",
  },
};

export default AttractionCard;
