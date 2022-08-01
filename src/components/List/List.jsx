import { useState, useEffect } from "react";
import "./List.css";

import Posts from "../Posts/Posts";
import Pagination from "../Pagination/Pagination";

import { getAllNews } from "../../services/HackerNews";

const List = () => {
  const [allNews, setAllNews] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    setLoading(true);
    getAllNews(setAllNews, setLoading);
    getLocalStorage();
  }, []);

  const getNews = () => {
    setLoading(true);
    getAllNews(setAllNews, setLoading);
  };

  const SetLocalStorage = (value) => {
    console.log("nuevo valor", value);
    console.log("valores del estado", favorite);
    if (favorite === null) {
      window.localStorage.setItem("favorite", JSON.stringify(value));
      setFavorite(value);
    } else {
      const newValue = [{...favorite}, value];
      console.log(newValue);
      window.localStorage.setItem("favorite", JSON.stringify(newValue));
      setFavorite(newValue);
    }
  };

  const getLocalStorage = () => {
    const getFavorite = JSON.parse(window.localStorage.getItem("favorite"));
    setFavorite(getFavorite);
  };

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allNews.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="listContainer">
      <div className="buttonsList__container">
        <button className="buttonsList buttonAll" onClick={() => getNews()}>
          All
        </button>
        <button className="buttonsList buttonFaves">My Faves</button>
      </div>
      <Posts data={currentPosts} loading={loading} favorite={SetLocalStorage} />

      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={allNews.length}
        paginate={paginate}
      />
    </div>
  );
};

export default List;
