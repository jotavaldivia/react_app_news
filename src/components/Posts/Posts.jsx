import React from "react";

import IconTime from "../../assets/svgs/iconmonstr-time-2.svg";
import IconHeartComplete from "../../assets/svgs/iconHeartComplete.svg";

const Posts = ({ data, loading, favorite }) => {
  return (
    <>
      <div className="containerNews">
        {loading && <h3>Cargando...</h3>}

        {data.map((New, index) => {
          return (
            <div className="news" key={index}>
              <div className="news__divider">
                <div className="news__hour-ago-by-author__container">
                  <img
                    src={IconTime}
                    className="news__hour-ago-by-author__iconTime"
                  />
                  <span className="news__hour-ago-by-author__text">
                    1 hours ago by author
                  </span>
                </div>
                <p className="news__message">{New.title}</p>
              </div>

              <div className="news__icon__container">
                <a onClick={()=> favorite(New)}>
                <img src={IconHeartComplete} alt="" />
                </a>
              </div>
            </div>
          );

          //console.log(New)
        })}
      </div>
    </>
  );
};

export default Posts;
