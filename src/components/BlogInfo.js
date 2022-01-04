function BlogInfo(props) {
    const { blogName, profilePhotoURL } = props;

    return (
        <div>
            <img src={profilePhotoURL} alt={`${blogName}'s profile`} />
            <span>{blogName}</span>
        </div>
    );
}

export default BlogInfo;
