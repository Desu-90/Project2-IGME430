
const DomoMovie = (props) => {
    return (
        <div>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/PcltCupJUuk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <input id='_csrf' type='hidden' name='_csrf' value={props.csrf} />
        </div>
    );
}
const init = async () => {
    ReactDOM.render(
        <DomoMovie csrf={data.csrfToken} />,
        document.getElementById('content'));

}

window.onload = init;