import React from 'react';

const AttractionCard = ({ attraction }) => {
  const { name, category, tags = [] } = attraction;

  // First three tags for display
  const displayTags = tags.slice(0, 3);

  return (
    <div style={styles.card}>
      <img
        src="https://via.placeholder.com/300x200" // Placeholder; update if image data is available
        alt={name}
        style={styles.image}
      />
      <div style={styles.content}>
        <h2 style={styles.name}>{name}</h2>
        <p style={styles.category}>{category}</p>
        <div style={styles.tagContainer}>
          {displayTags.map((tag, index) => (
            <span key={index} style={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    width: '300px',
    margin: '20px auto',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '15px',
  },
  name: {
    fontSize: '1.5em',
    margin: '10px 0',
    color: '#333',
  },
  category: {
    fontSize: '1em',
    color: '#666',
    marginBottom: '15px',
  },
  tagContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  tag: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '0.9em',
  },
};

export default AttractionCard;