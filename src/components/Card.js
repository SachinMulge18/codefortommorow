import { useState } from "react";
import "./Card.css";
import { useGetPostQuery, useDeletePostMutation } from "../services/postsApi";
import { RxCross2 } from "react-icons/rx";

const Card = () => {
  const { data, isLoading, refetch } = useGetPostQuery();
  const fetchData = useGetPostQuery();
  const [deletePost, { isSuccess }] = useDeletePostMutation();

  const deleteHandler = async (id, title) => {
    console.log(title);
    try {
      await deletePost(id);
      alert("Card Removed successfully", title);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <div className="loader"></div>;
  console.log(data);
  
  return (
    <>
      <div className="main">
        {data?.map((curr) => (
          <div key={curr?.id} className="cardboxes">
            <div className="deleteBtn">
              <RxCross2
                size={20}
                onClick={() => deleteHandler(curr?.id, curr?.title)}
              />
            </div>
            <div className="body-text">{curr?.body}</div>
            <div className="title">{curr?.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};


export default Card;
