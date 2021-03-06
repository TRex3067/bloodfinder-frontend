import React, {Component} from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import {Collapse} from 'bootstrap';
import Actions from '../redux/actions';
import {connect} from 'react-redux';

function NavItems(props){
    let items = [];
    items.push([
        <li className='nav-item' key='home'>
            <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/home'> <i className='fas fa-home' /> Home</NavLink>
        </li>
    ]);

    if(!props.user){
        items.push(
            <li className='nav-item' key='about'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/about'> <i className='far fa-question-circle' /> About</NavLink>
            </li>,
            <li className='nav-item' key='signup'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/auth/signup'> <i className='fas fa-id-card' /> Register</NavLink>
            </li>,
            <li className='nav-item' key='signin'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/auth/signin'> <i className='fas fa-sign-in-alt' /> SignIn</NavLink>
            </li>);
    }
    else if(props.user && props.user.category==='med'){
        items.push([
            <li className='nav-item' key='about'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/about'> <i className='far fa-question-circle' /> About</NavLink>
            </li>,
            <li className='nav-item dropdown' key="med">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown1" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="rounded-circle">{props.user.name}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-md-right" aria-labelledby="navbarDropdown1">
                    <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link dropdown-item' to={`/med/generateRequest`} > <i className="fab fa-creative-commons-sampling"></i> Generate Request</NavLink>
                    <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link dropdown-item' to={`/med/requests`} > <i className='far fa-paper-plane' /> Requests</NavLink>
                    <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link dropdown-item' to={`/med/profile`} > <i className='far fa-user-circle' /> Profile</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} onClick={props.logOut} className='nav-link dropdown-item' to='/auth/signout' > <i className='fas fa-sign-out-alt' /> SignOut</NavLink>
                </div>
            </li>
        ]);
    }
    else if(props.user && props.user.category==='donor'){
        items.push([
            <li className='nav-item' key='about'>
                <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link' to='/about'> <i className='far fa-question-circle' /> About</NavLink>
            </li>,
            <li className='nav-item dropdown' key="donor">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <span className="rounded-circle b-2 p-2">{props.user.name}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-md-right mybg-dark" aria-labelledby="navbarDropdown2">
                    <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link dropdown-item' to={`/donor/inbox`} > <i className='fas fa-inbox' /> Inbox</NavLink>
                    <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link dropdown-item' to={`/donor/profile`} > <i className='far fa-user-circle' /> Profile</NavLink>
                    <div className="dropdown-divider"></div>
                    <NavLink  activeStyle={{color: 'floralwhite', fontWeight: 'bold', textShadow: 'black 0px 1px'}} className='nav-link dropdown-item' onClick={props.logOut} to='/auth/signout' > <i className='fas fa-sign-out-alt' /> SignOut</NavLink>
                </div>
            </li>
        ]);
    }
    return (
        <>
            {items}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        logOut: () => dispatch(Actions.logOut())
    };
};

class Navbar extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return (
            <nav className='navbar container-fluid navbar-expand-md navbar-dark mybg-dark'>
            <div className='container-fluid'>
                <Link className='navbar-brand' to='/home'><i className="fas fa-tint"></i>-FACTOR</Link>
                <button type="button" className='navbar-toggler' data-target='#navbar' data-toggle='collapse'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='navbar-collapse collapse' id='navbar'>
                    <ul className='navbar-nav ml-auto'>
                        <NavItems user={this.props.user} logOut={this.props.logOut} />
                    </ul>
                </div>
            </div>
            </nav>
        );
    }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Navbar));