export default function Story({ story, userId }) {
  return (
    <div className="story">
      <img
        src={story?.stories[0]?.background}
        alt={`${story?.user?.username}-story`}
        className="story_img"
      />
      <div className="story_profile_pic">
        <img src={story?.user.picture} alt={story?.user?.username} />
      </div>
      <div className="story_text">{story?.stories[0]?.text}</div>
      <div className="story_profile_name">
        {story?.user?._id === userId
          ? "Your Story"
          : `${story?.user?.first_name} ${story?.user?.last_name}`}
      </div>
    </div>
  );
}
