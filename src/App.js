import React, { useState, useRef, useCallback } from "react";
import useGithubUsers from "./useGithubUsers";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const { users, hasMore, loading, error } = useGithubUsers(query, pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  function handleSelection(user) {
    setQuery(user);
    setPageNumber(0);
    console.log("do whatever you want");
  }

  return (
    <>
      <input type="text" value={query} onChange={handleSearch}></input>
      {users.map((user, index) => (
        <div
          key={user}
          onClick={() => handleSelection(user)}
          style={{ cursor: "pointer" }}
          onMouseEnter={(e) => {
            e.target.style.background = "grey";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "white";
          }}
        >
          {users.length === index + 1 ? (
            <div ref={lastElementRef}>{user}</div>
          ) : (
            <div>{user}</div>
          )}
        </div>
      ))}
      <div>{loading && "Loading..."}</div>
      <div>{error && "Error"}</div>
      <div>
        {!loading && !error && !users.length && pageNumber ? "No results" : ""}
      </div>
    </>
  );
}

export default App;
