

function Image( { path }) {
    return (
        <figure className="h-48 w-48 m-6 rounded-full relative shadow-2xl">
            <img src={path} className="w-full h-full rounded-full object-cover relative object-top"></img>
        </figure>
    );
}

export default Image;