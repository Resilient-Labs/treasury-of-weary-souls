import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Blog extends Component {
  render() {
        return (
            <section className="blog-container">
                Blog Coming Soon, in the meantime, check out the data <Link to="/map">here</Link>
            </section>
        )
    }
}

export default Blog;