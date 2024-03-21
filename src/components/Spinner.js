import React, { Component } from 'react'
import loadingGif from './loading.gif';
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
      
        <img src={loadingGif} className='my-3' alt="Not Found" style={{ width: '100px', height: '90px' }}/>
      </div>
    )
  }
}
