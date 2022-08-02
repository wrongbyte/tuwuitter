import '../../styles/profile.css';
import { Dispatch, SetStateAction } from 'react';

export default function NewTweetModal({
  setOpenTweetModal,
}: {
  setOpenTweetModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <div className="new-tweet-modal">
        <div className="close-x text-white" onClick={() => setOpenTweetModal(false)}>
          x
        </div>
        <div className="flex ml-4 mt-16 gap-5 ">
          <img src="default-pfp-tt.png" className="tweet-avatar"></img>
          <div className="tweet-input-wrapper">
            <textarea className="tweet-input" placeholder="What's happening?" />
          </div>
        </div>
        <button className="tweet-blue-button font-bold">Tweet</button>
      </div>
      <div className="modalBackground"></div>
    </>
  );
}
