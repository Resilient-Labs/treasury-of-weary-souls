import React from 'react';
import sanity from './sanity';
import PostCard from './PostCard';
import SideNavigation from './SideNavigation';
import './Posts.css';
import Loading from '../Loading';

const query = `*[_type == "post"] {title, 'mainImage': mainImage.asset->url, _id, slug}`;

export default class Posts extends React.Component {
    constructor() {
        super();
        this.state = {
            data: false,
            posts: [],
            loading: true
        }
    }
    componentDidMount() {
        let ref = this;
        sanity.fetch(query).then(posts => {
            this.setState({ posts: posts })
        })
        setTimeout(function() { 
            ref.setState({ loading: false }) 
        }, 500);
        
    }
    render() {
        if (this.state.loading) {
            return <Loading content="Blog" />;
        } else {
            return (
                <div className="posts">
                    <SideNavigation />
                    <main>
                        <header className="context-subheader">
                            <h4>
                                <b>Our Stories</b>
                            </h4>
                            <h6>Weary:</h6>
                            <small>
                                <span>adj.</span> 
                                <span><b>physically and mentally fatigued</b></span>
                            </small>
                            <small>
                                <span>v.</span> 
                                <b>to become exhausted</b>
                            </small>
                            <small>
                                <span></span>
                                <b>to grow tired from tremendous strain and stress</b>
                            </small>
                        </header>
                        {this.state.posts.map(function(post, idx) {
                            return <PostCard
                                title={post.title}
                                mainImage={post.mainImage}
                                _id={post._id}
                                key={idx}
                                slug={post.slug.current}
                            />
                        })}
                    </main>
                </div>
            )
        }
    }
}