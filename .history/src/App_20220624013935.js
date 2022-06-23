import "./App.css";
import { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [limit, setLimit] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [posts, setPosts] = useState([]);
  const columns = [
    {
      dataField: "fullname",
      text: "Full Name",
      sort: true,
    },
    {
      dataField: "username",
      text: "User Name",
      sort: true,
    },
  ];
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
  const headerSortingClasses = (column, sortOrder, isLastSorting, colIndex) =>
    sortOrder === "asc" ? "demo-sorting-asc" : "demo-sorting-desc";
  useEffect(() => {
    fetch(`https://randomuser.me/api/?page=${pageNumber}&results=${limit}
 
`)
      .then((response) => response.json())
      .then(({ info, results }) => {
        setPosts(
          results.map((rs) => {
            return {
              fullname:
                rs.name.title + " " + rs.name.first + " " + rs.name.last,
              username: rs.name.first + " " + rs.name.last,
            };
          })
        );
        setNumberOfPages(10);
      });
  }, [pageNumber, limit]);

  const gotoPrevious = () => {
    setPageNumber(Math.max(1, pageNumber - 1));
  };

  const gotoNext = () => {
    setPageNumber(Math.min(numberOfPages, pageNumber + 1));
  };

  return (
    <div className="App">
      <h3>Page of {pageNumber}</h3>
      <BootstrapTable keyField="id" data={posts} columns={columns} />

      <button onClick={gotoPrevious}>Previous</button>
      {pages.map((pageIndex) => (
        <button key={pageIndex} onClick={() => setPageNumber(pageIndex + 1)}>
          {pageIndex + 1}
        </button>
      ))}
      <button onClick={gotoNext}>Next</button>
    </div>
  );
}

export default App;
