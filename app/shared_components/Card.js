import React, { Component } from 'react';
import {Link} from 'react-router';

class Card extends Component {
    render() {
        const imgsrc = '/img/' +this.props.imgsrc;
		const link = this.props.link+ this.props.imgsrc.match(/.+?(?=\.)/g);
        return (
        <div className={this.props.class}>
            <div >
                <img className="photo photo1" src={imgsrc} alt="" />
            </div>
            <ul className="details">
                <li className="author"><Link to={link}>Map</Link></li>
                <li className="tags">
                    <ul>
                        <li><Link to={link}>{this.props.tag[0]}</Link></li>
                        <li><Link to={link}>{this.props.tag[1]}</Link></li>
                        <li><Link to={link}>{this.props.tag[2]}</Link></li>
                        <li><Link to={link}>{this.props.tag[3]}</Link></li>
                    </ul>
                </li>
            </ul>
            <div className="description">
                <h1>{this.props.title}</h1>
                <h2></h2>
                <p className="summary">{this.props.subtitle}</p>
                <Link to={link}>Read More</Link>
            </div>
        </div>
        );
    }
}

export default Card;