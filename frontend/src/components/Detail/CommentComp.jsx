import { Avatar, Rate } from "antd";
import React from "react";

function CommentComp({ comments }) {
  return (
    <>
      {comments && comments.length > 0 ? (
        comments.map((item, index) => (
          <div key={index} className="itemComment">
            <div className="avt_name">
              <div>
                <Avatar
                  size="large"
                  src="https://joeschmoe.io/api/v1/random"
                  className="avt"
                />
              </div>
              <div className="name">
                <h3>{item.nameUser}</h3>
                <div className="star">
                  <Rate disabled defaultValue={item.star}></Rate>
                </div>
              </div>
            </div>
            <div className="textCommnet">
              <h4>{item.content}</h4>
            </div>
            <div className="hritemComment"></div>
          </div>
        ))
      ) : (
        <>
          <p>No commnent !!!!!!!</p>
        </>
      )}
    </>
  );
}

export default CommentComp;
