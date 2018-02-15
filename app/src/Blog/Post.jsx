import React from 'react';
import sanity from './sanity';
import { Link } from 'react-router-dom';
import './Post.css';
import Loading from '../Loading';

const query = `*[_type == "post" && _id == $id]{
    _id, title, author, 
    'mainImage': mainImage.asset->url, 
    body, slug }[0]`;
const BlockContent = require('@sanity/block-content-to-react')

export default class Post extends React.Component {
    constructor() {
        super();
        this.state = {
            data: false,
            post: {},
            loading: true
        }
    }

    componentDidMount() {
        let ref = this;
        // Access the Id from the Router
        sanity.fetch(query, {id: this.props.match.params._id}).then(post => {
            let fetchedPost = {
                title: post.title,
                body: post.body,
                mainImage: post.mainImage
            }
            this.setState({ post: fetchedPost })
        })
        setTimeout(function() { 
            ref.setState({ loading: false }) 
        }, 1000);
    }

    render() {
        if (this.state.loading) {
            return <Loading content="Post" />;
        } else {
            return (
                <div className="post">
                    <header className="post-hero-banner">
                        <img src={this.state.post.mainImage} alt=""/>
                    </header>
                    <article className="post-content">
                        <h2>{this.state.post.title}</h2>
                        <Link to={`/post`}>Back to Posts</Link>
                        {this.state.post.body && 
                            <BlockContent 
                            blocks={this.state.post.body} 
                            imageOptions={{w: 320, h: 240, fit: 'max'}} 
                            projectId={sanity.clientConfig.projectId}
                            dataset={sanity.clientConfig.dataset}
                            />
                        }
                    </article>
                </div>
            )
        }
    }
}