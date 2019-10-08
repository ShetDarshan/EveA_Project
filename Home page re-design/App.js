import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink} from 'react-router-dom';
import './App.css';
import EveaBuddy from './components/authentication/evea_buddy';


class App extends Component {
  render() {
    return (
      <Router>
        
          <div className="App">
            
            
            <div className="App-Aside">
            <EveaBuddy/>

            </div>
            
            
             <div className="App-Form">
              

              <div className="FormTitle">
                <NavLink to="/sign-up" 
                className="FormTitle-Link">Sign Up</NavLink> or 
                <NavLink exact to="/" activeclassName="FormTitle-Link-Active" 
                className="FormTitle-Link FormTitle-Link-Active">Login</NavLink>
              </div>

              <Route exact path="/">
              <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                  <div className="FormField">
                    <label className="FormField-label" htmlFor="email">ENTER YOUR E-MAIL ID</label>
                    <input type="email" id="email" className="FormField-Input" placeholder="Enter your E-mail" name="email"/>

                  </div>
                  
                </form>
              </div>

              <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                  <div className="FormField">
                    <label className="FormField-label" htmlFor="password">ENTER YOUR PASSWORD </label>
                    <input type="password" id="password" className="FormField-Input" placeholder="Enter your password" name="password"/>

                  </div>
                  
                </form>
              </div>

            

<div className="FormField">
  <button className="FormField-Button mr-20">Login</button>
  <Link to="/sign-up" className="FormField-Link">Create EveA Account</Link>
</div>

          

             

</Route>
 <Route path="/sign-up">
 <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                  <div className="FormField">
                    <label className="FormField-label" htmlFor="name">HELP FRIENDS RECOGNIZE YOU WITH</label>
                    <input type="text" id="name" className="FormField-Input" placeholder="Enter your User Name" name="name"/>

                  </div>
                  
                </form>
              </div>

              <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                  <div className="FormField">
                    <label className="FormField-label" htmlFor="email">ENTER YOUR E-MAIL ID  </label>
                    <input type="email" id="email" className="FormField-Input" placeholder="Enter your E-mail ID" name="email"/>

                  </div>
                  
                </form>
              </div>

              <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                  <div className="FormField">
                    <label className="FormField-label" htmlFor="password">ENTER PASSWORD</label>
                    <input type="password" id="password" className="FormField-Input" placeholder="Enter your Password" name="password"/>

                  </div>
                  
                </form>
              </div>
              <div className="FormCenter">
                <form className="FormFields" onSubmit={this.handleSubmit}>
                  <div className="FormField">
                    <label className="FormField-label" htmlFor="password">RE-ENTER PASSWORD</label>
                    <input type="password" id="password" className="FormField-Input" placeholder="Re-Enter your Password" name="password"/>

                  </div>
                  
                </form>
              </div>

              <div classname="FormField">
              <label className="FormField-CheckboxLabel">
                <input className="FormField-Checkbox" type="checkbox" name="hasAgreed"/>
I agree to all the statements in<a href="" className="FormField-TermsLink">T&C of EveA</a>              
</label>
</div>

<div className="FormField">
  <button className="FormField-Button mr-20">Sign Up</button>
  <Link to="/" className="FormField-Link">Oops! I'm already a member</Link>
</div>

 </Route>

            </div>
                
            </div>
            
          
            </Router>
      
    );
  }
}

export default App;
