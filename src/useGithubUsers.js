import { useEffect, useRef, useState } from "react";
import axios from "axios";

const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export default function useGithubUsers(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const searchRef = useRef();

  useEffect(() => {
    setUsers([]);
  }, [query]);

  useEffect(() => {
    if (!searchRef.current) {
      searchRef.current = debounce(function (query, pageNumber) {
        axios({
          method: "GET",
          url: "https://api.github.com/search/users",
          params: { q: query, page: pageNumber, per_page: 100 },
          headers: { accept: "application/vnd.github.v3+json" },
        })
          .then((res) => {
            setUsers((prevUsers) => {
              return [
                ...new Set([
                  ...prevUsers,
                  ...res.data.items.map((user) => user.login),
                ]),
              ];
            });
            setHasMore(res.data.items.length > 0);
            setLoading(false);
          })
          .catch((e) => {
            setError(true);
          });
      }, 3000);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(false);

    if (query) searchRef.current(query, pageNumber);
    else {
      setLoading(false);
    }
  }, [query, pageNumber]);

  return { loading, error, users, hasMore };
}
