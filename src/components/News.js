import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import propTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'General',
  };

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [], // Initialize articles as an empty array
      loading: true,
      page: 1,
      totalResults: 0
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - Daily Update's`;
  }

  async componentDidMount() {
    this.UpdateNews();
  }

  async UpdateNews() {
    this.props.setProgress(10);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0020467e557421c810e62062b7d30fc&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }
      const data = await response.json();
      this.props.setProgress(30);
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    }
  }  
  HandlePrePage = async () => {
    this.setState({ page: this.state.page - 1 });
    this.UpdateNews();
  };

  HandleNextPage = async () => {
    this.setState({ page: this.state.page + 1 });
    this.UpdateNews();
  };

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0020467e557421c810e62062b7d30fc&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page + 1,
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults
    });
  };

  render() {
  return (
    <>
      <h1 className="text-center" style={{ margin: '35px 0px', marginTop:'90px'}}>Daily News Updates</h1>
      {this.state.loading && <Spinner />}
      {this.state.articles && this.state.articles.length > 0 && (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !==this.state.totalResults}
          loader={<h4><Spinner /></h4>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  {element && (
                    <NewsItems
                      title={element.title ? element.title.slice(0, 45) : ""}
                      Description={element.description ? element.description.slice(0, 75) : ""}
                      imgUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
}
}

export default News;
