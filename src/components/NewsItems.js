import React, { Component } from 'react'
import image from './images.png';
export class NewsItems extends Component {
  render() {
    let {title,Description,imgUrl,newsUrl,author,date}=this.props;
    return (
      <div className="container">
       
  <div className="card" >
        <img src={!imgUrl?image:imgUrl} className="card-img-top" alt="Not Found"/>
        <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{Description}...</p>
        <p className="card-text"><small className="text-body-secondary">Written by {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItems
