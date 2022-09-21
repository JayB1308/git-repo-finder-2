import { IoLocationSharp } from "react-icons/io5";
import {
  AiOutlineTwitter,
  AiOutlineGithub,
  AiTwotoneMail,
} from "react-icons/ai";
import { HiUsers } from "react-icons/hi";
import { FaBloggerB } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import { animated, useSpring, config } from "react-spring";

const calc = (x: number, y: number) => [
  -(y - window.innerHeight / 2) / 20,
  (x - window.innerWidth / 2) / 20,
  1,
];
const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

interface HeaderProps {
  userInfo: any;
}

const ProfileHeader = ({ userInfo }: HeaderProps) => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: config.default,
  }));

  const animatedHeader = useSpring({
    from: {
      marginBottom: "-10%",
      opacity: 0,
    },
    to: {
      marginBottom: "0%",
      opacity: 1,
    },
  });

  return (
    <animated.div className="profile-header-container" style={animatedHeader}>
      <div className="profile-image-container">
        <animated.img
          onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
          onMouseLeave={() => set({ xys: [0, 0, 1] })}
          style={{
            transform: props.xys.interpolate(trans),
          }}
          src={userInfo.avatar_url}
          className="avatar-image"
          alt="avatar"
        />

        <h2>{userInfo.login}</h2>
        <span className="user-link">
          <AiOutlineGithub className="user-icon" />
          <p>
            <a className="link" href={userInfo.html_url}>
              {userInfo.html_url}
            </a>
          </p>
        </span>
      </div>
      <div className="profile-information-container">
        <div className="profile-name-container">
          <h1 className="user-name">{userInfo.name}</h1>
          <p className="user-bio">{userInfo.bio}</p>

          <div className="location-container">
            {userInfo.location ? (
              <span className="user-link">
                <IoLocationSharp className="user-icon location-icon" />{" "}
                <p>{userInfo.location}</p>
              </span>
            ) : (
              ""
            )}
            {userInfo.twitter_username ? (
              <span className="user-link">
                <AiOutlineTwitter className="user-icon twitter-icon" />{" "}
                <p>{userInfo.twitter_username}</p>
              </span>
            ) : (
              ""
            )}

            {userInfo.email ? (
              <span className="user-link">
                <AiTwotoneMail className="user-icon email-icon" />
                <p>{userInfo.email}</p>
              </span>
            ) : (
              ""
            )}
            {userInfo.blog ? (
              <span className="user-link">
                <FaBloggerB className="user-icon blog-icon" />
                <p>{userInfo.blog}</p>
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="follow-container">
            <HiUsers className="sidebar-icon" />
            <div className="dots"></div>
            <p>{userInfo.followers} followers</p>
            <div className="dots"></div>
            <p>{userInfo.following} following</p>
          </div>
          <div className="company-container">
            {userInfo.company ? (
              <span className="user-link">
                <GrOrganization className="company-icon" />
                <p>{userInfo.company}</p>
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </animated.div>
  );
};

export default ProfileHeader;
