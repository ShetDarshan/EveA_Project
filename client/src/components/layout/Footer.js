import React, { Component } from 'react'
import "../../css/bootstrap.min.css"
import "../../css/App.css"

 class Footer extends Component {
  render() {
    return (

      <footer className="page-footer font-small blue">


      <div className="footer-copyright text-center py-3" style={{backgroundColor:"#4a148c",color:"white"}}>Copyright EVEA © 2019 TU Dublin. 
        <a href="/datapolicy" style={{color:"skyblue"}}> Privacy Policy</a>
      </div>



    </footer>
    )
  }
}
export default Footer;