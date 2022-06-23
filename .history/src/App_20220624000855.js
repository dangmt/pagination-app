import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?page={$pageNumber}&results={$limit}
 
`)
      .then((response) => response.json())
      .then(({ totalPages, posts }) => {
        setPosts(posts);
        setNumberOfPages(totalPages);
      });
  }, [pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };

  return (
    <div className="App">
      <h3>Page of {pageNumber + 1}</h3>

      {posts.map((post) => (
        <div key={post._id} className="post">
          <h4>{post.title}</h4>
          <p>{post.text}</p>
        </div>
      ))}

      <button onClick={gotoPrevious}>Previous</button>
      {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={gotoNext}>Next</button>
    </div>
  );
}

export default App;
