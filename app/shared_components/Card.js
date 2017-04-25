import React, { Component } from 'react';
import {Link} from 'react-router';

class Card extends Component {
    render() {
        return (
        <div className="blog-card">
            <div >
                <img className="photo photo1" src={this.props.imgsrc} alt="" />
            </div>
            <ul className="details">
                <li className="author"><a href="#">John Doe</a></li>
                <li className="tags">
                    <ul>
                        <li><a href="#">elections</a></li>
                        <li><a href="#">parlimantary</a></li>
                        <li><a href="#">HTML</a></li>
                        <li><a href="#">CSS</a></li>
                    </ul>
                </li>
            </ul>
            <div className="description">
                <h1>{this.props.title}</h1>
                <h2></h2>
                <p className="summary">{this.props.subtitle}</p>
                <Link to={this.props.link}>Read More</Link>
            </div>
        </div>
        );
    }
}

export default Card;