import { useState, useEffect } from "react";
import "./List.css";

import Posts from "../Posts/Posts";
import Pagination from "../Pagination/Pagination";

import { getAllNews } from "../../services/HackerNews";

const List = () => {
  const [allNews, setAllNews] = useState([]);
  const [favorite, setFavorite] = useState(
    JSON.parse(window.localStorage.getItem("favorite")) ?? [null]
  );
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(6);

  useEffect(() => {
    setLoading(true);
    getAllNews(setAllNews, setLoading);
  }, []);
  const getNews = () => {
    setLoading(true);
    getAllNews(setAllNews, setLoading);
  };

  const SetLocalStorage = (value) => {
    console.log(favorite)
    if(favorite[0] === null){
      console.log("holaaa")
      setFavorite([value]);
      localStorage.setItem("favorite", JSON.stringify(value));
    }else{
     const resp =  favorite.find(fav => fav.objectID === value.objectID)
      if(resp){
        alert("ya tienes esta publicacion en favoritos")
        return
      }
      const tempState = [...favorite,value];
      setFavorite(tempState);
      window.localStorage.setItem("favorite", JSON.stringify(tempState));
       console.log(favorite)
    }
  };

  // const getLocalStorage = () => {

  // };

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
