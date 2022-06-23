import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);

  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?page=${pageNumber}&results=${limit}
 
`)
      .then((response) => response.json())
      .then(({ info, results }) => {
        setPosts(results);
        setNumberOfPages(info.results);
      });
  }, [pageNumber]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  return (
    <div className="App">
      <h3>Page of {pageNumber}</h3>
      <table>
        <tr>
          <th>Full Name</th>
          <th>Username</th>
        </tr>
        {posts.map((post) => (
          <tr key={post._id}>
            <td>{post.name.title + post.name.first + post.name.last}</td>
            <td>{post.name.first + post.name.last}</td>
          </tr>
        ))}
      </table>

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
