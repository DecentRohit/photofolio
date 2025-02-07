import { Link } from "react-router-dom";


function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404</h1>
      <p style={styles.text}>No such page exists.</p>
      <Link to="/" style={styles.button}>Go Back Home</Link>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "100px",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "80px",
    color: "#ff4d4d",
  },
  text: {
    fontSize: "20px",
    color: "#333",
  },
  button: {
    display: "inline-block",
    marginTop: "20px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
  },
};

export default NotFound;
