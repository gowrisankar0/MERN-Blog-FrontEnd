import React from 'react'
import { Link } from 'react-router-dom'
import PostAuthor from './PostAuthor'

const PostItem = ({postID,thumbnail,discription,title,authorID,category,createdAt}) => {
 
     const shortDescription =discription.length >145 ? discription.substr(0,145) + "...": discription;
     const postTitle =title.length >30 ? title.substr(0,30) + "...": title;
    //  console.log(authorID);

  return (
    <article className='post'>
        <div className='post__thumnail'>
            <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`} alt={title} />
        </div>
        <div className='post__content'>
            <Link to={`posts/${postID}`}>
                <h3>{postTitle}</h3>
            </Link>
     <p dangerouslySetInnerHTML={{__html:shortDescription}}/>
            <div className='post__footer'>
                <PostAuthor authorID={authorID} createdAt={createdAt}/>
                <Link to={`/posts/categories/${category}`} className='btn category'>{category}</Link>
            </div>
        </div>
    </article>
  )
}

export default PostItem