const helper = require('./helper.js');

const handlePost = (e) => {
    e.preventDefault();
    helper.hideError();

    const title = e.target.querySelector('#titleName').value;
    const text = e.target.querySelector('#text').value;
    const _csrf = e.target.querySelector('#_csrf').value;


    if(!title || !text) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {title, text, _csrf}, loadPostsFromServer);

    return false;
}

const PostForm = (props) => {
    return (
        <form id='textForm'
            onSubmit={handlePost}
            name='textForm'
            action='/main'
            method='POST'
            className='textForm'
        >
            <label htmlFor='title'>Title: </label>
            <input id='titleName' type='text' name='titleName' placeholder='Title' />
            <label htmlFor='text'>Post </label>
            <input id='text' type='text' name='text' placeholder='What are you thinking today?' />
            <input id='_csrf' type='hidden'name='_csrf' value={props.csrf} />
            <input className='makePostSubmit' type='submit' value='Make Post' />
        </form>
    );
}

const PostList = (props) => {
    if(props.post.length === 0) {
        return (
            <div className='postList'>
                <h3 className='emptyPost'>No Posts Yet!</h3>
            </div>
        );
    }

    const postNodes = props.post.map(post => {
        return (
            <div key={post._id} className='post'>
                <img src='/assets/img/domoface.jpeg' alt='domo face' className='domoFace' />
                <h3 className='title'> {post.title} </h3>
                <p className='text'>{post.text} </p>
            </div>
        );
    });

    return (
        <div className='postList'>
            {postNodes}
        </div>
    );
}

const loadPostsFromServer = async () => {
    const response = await fetch('/getPost');
    const data = await response.json();
    ReactDOM.render(
        <PostList post={data.posts} />,
        document.getElementById('posts') 
    );
}

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <PostForm csrf={data.csrfToken} />,
        document.getElementById('makePost')
    );

    ReactDOM.render(
        <PostList post={[]} />,
        document.getElementById('posts')
    );

    loadPostsFromServer();
}

window.onload = init;
