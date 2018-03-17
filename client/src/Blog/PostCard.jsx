import React from 'react';
import { Link } from 'react-router-dom';
import './PostCard.css';

const PostCard = (props) => (
    <Link to={`/post/${props.slug}/${props._id}`} className="post-card-container">
        <div className="post-card">
            {props.title && <h4 className="post-card-title">{props.title}</h4>}
            {props.mainImage && <img src={props.mainImage} alt="" className="post-card-img" />}
            <span className="post-card-link">Read More</span>
        </div>
    </Link>
)

export default PostCard;