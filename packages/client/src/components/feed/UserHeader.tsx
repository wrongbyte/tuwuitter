import { fromGlobalId } from 'graphql-relay';
import '../../styles/global.css';
import '../../styles/home.css';
import '../../styles/profile.css';
import { useMutation } from 'react-relay';
import { UserFollow } from '../../relay/user/UserFollowMutation';
import type { UserFollowMutation } from '../../relay/user/__generated__/UserFollowMutation.graphql';
import type { UserHeaderQuery$data } from './__generated__/UserHeaderQuery.graphql';
import { UserUnfollow } from '../../relay/user/UserUnfollowMutation';
import type { UserUnfollowMutation } from '../../relay/user/__generated__/UserUnfollowMutation.graphql';
import { useState } from 'react';
import ErrorModal from '../ErrorModal';
import ProfileHeader from '../../assets/tt-header-test.png';
import ProfilePicture from '../../assets/default-pfp-tt.png';
import { graphql, useLazyLoadQuery } from 'react-relay';

export default function UserHeader({
  username,
  displayName,
  followingCount,
  followersCount,
  userId,
}: {
  username: string;
  displayName: string;
  followingCount?: number;
  followersCount?: number;
  userId?: string;
}) {
  const { me } = useLazyLoadQuery(
    graphql`
      query UserHeaderQuery {
        me {
          username
          following
        }
      }
    `,
    {}
  ) as UserHeaderQuery$data;

  const [errorStatus, setErrorStatus] = useState<boolean | string>(false);
  const userMongoId = fromGlobalId(userId as string).id;
  const [meIsFollowingUser, updateFollowingState] = useState<boolean>(
    me?.following?.includes(userMongoId) || false
  );
  const [followUser] = useMutation<UserFollowMutation>(UserFollow);
  const [unfollowUser] = useMutation<UserUnfollowMutation>(UserUnfollow);

  return (
    <>
      {errorStatus && <ErrorModal phrase={errorStatus as string} setErrorStatus={setErrorStatus} />}
      <div className="user-header-info">
        <div className="user-profile-cover">
          <img className="user-image-cover" src={ProfileHeader}></img>
        </div>
        <div className="flex justify-between">
          <img className="user-avatar-profile" src={ProfilePicture}></img>
          {username === me?.username ? (
            <button className="edit-profile-button cursor-default font-bold">Edit profile</button>
          ) : meIsFollowingUser ? (
            <button
              className="edit-profile-button font-bold"
              onClick={() => {
                unfollowUser({
                  variables: {
                    username: username,
                  },
                  onCompleted: (_, error) => {
                    if (error && error.length > 0) {
                      const errorMessage = error[0].message || 'Unknown error';
                      return setErrorStatus(`Error when unfollowing user: ${errorMessage}`);
                    }
                    updateFollowingState(false);
                  },
                });
              }}
            >
              Following
            </button>
          ) : (
            <button
              className="edit-profile-button font-bold"
              onClick={() => {
                followUser({
                  variables: {
                    username: username,
                  },
                  onCompleted: (_, error) => {
                    if (error && error.length > 0) {
                      const errorMessage = error[0].message || 'Unknown error';
                      return setErrorStatus(`Error when following user: ${errorMessage}`);
                    }
                    updateFollowingState(true);
                  },
                });
              }}
            >
              Follow
            </button>
          )}
        </div>
        <div className="user-info-profile">
          <p className="text-white font-bold text-xl">{displayName}</p>
          <p className="username">@{username}</p>
          <p className="text-white bio">404 bio not found</p>
          <div className="flex text-white gap-4">
            <span>
              <strong>{followingCount}</strong> <span className="dark-gray">Following</span>
            </span>
            <span>
              <strong>{followersCount}</strong> <span className="dark-gray">Followers</span>
            </span>
          </div>
          <nav className="flex justify-around nav-user font-semibold">
            <div className="nav-user-active">Tweets</div>
            <div className="nav-user-inactive">Tweets and replies</div>
            <div className="nav-user-inactive">Media</div>
            <div className="nav-user-inactive">Likes</div>
          </nav>
        </div>
      </div>
    </>
  );
}
