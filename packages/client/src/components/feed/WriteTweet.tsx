export default function WriteTweetFeed() {
  return (
    <div className="tweet-wrapper">
      <div className="flex ml-4 mt-16 gap-5 ">
        <img src="default-pfp-tt.png" className="tweet-avatar"></img>
        <div className="tweet-input-wrapper-timeline">
          <textarea className="tweet-input" placeholder="What's happening?" />
        </div>
      </div>
      <button className="tweet-blue-button font-bold">Tweet</button>
    </div>
  );
}
