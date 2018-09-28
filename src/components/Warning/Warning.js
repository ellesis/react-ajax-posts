import React, { Component } from 'react'
import "./Warning.css"

class Warning extends Component {
  constructor(props){
    super(props)
    this.state = {
      closeing: false
    }
  }

  componentWillReceiveProps(nextProps){
    if(this.props.visible && !nextProps.visible){
      //visible props is changing from true->false
      this.setState({
        closeing:true
      })

      // 1s after
      setTimeout(
        () => {
          this.setState({
            closeing:false
          })
        }, 1000
      )
    }
  }

  render() {
    const {message, visible} = this.props;
    const {closeing} = this.state;

    if(!visible && !closeing) return null;

    return(
      <div className="Warning-wrapper">
        <div className={`Warning ${closeing?'bouneOut':'bounceIn'} animated`}>
          {message}
        </div>
      </div>
    )
  }
}

export default Warning
