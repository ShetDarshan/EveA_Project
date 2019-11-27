import React, { Component } from 'react'
import "../../css/bootstrap.min.css"
import "../../css/App.css"

 class Footer extends Component {
  render() {
    return (
        <footer className="footer-copyright text-center py-3" style={{backgroundColor:"#593196",color:"white"}}>
        Copyright EVEA &copy; 2019 TUD
      </footer>
    )
  }
}
export default Footer;