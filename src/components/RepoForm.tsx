import { useState } from "react";
import { FiUser, FiSearch } from "react-icons/fi";
import { animated, useSpring } from "react-spring";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const RepoForm = () => {
  const [repoName, setRepoName] = useState<string>("");
  const [hovered, setHovered] = useState<boolean>(false);

  const navigate = useNavigate();

  const expandingButton = useSpring({
    width: hovered ? "60%" : "25%",
    justifyContent: hovered ? "space-between" : "center",
    config: {
      friction: 36,
      duration: 300,
    },
  });

  const animatedSpan = useSpring({
    display: hovered ? "block" : "none",
    opacity: hovered ? 1 : 0,
    config: {
      duration: 800,
    },
  });

  return (
    <form className="form">
      <div className="form-group">
        <label>
          <FiUser className="form-icon" />
        </label>
        <input
          placeholder="Username"
          value={repoName}
          onChange={(e) => {
            setRepoName(e.target.value);
          }}
        />
      </div>
      <animated.button
        type="submit"
        onClick={(e: any) => {
          e.preventDefault();
          if (repoName === "" || repoName === " ") {
            toast.error("ADD A USERNAME!");
          }
          if (repoName !== "") {
            if (repoName !== " ") {
              navigate(`/${repoName}`);
            }
          }
        }}
        style={expandingButton}
        className="form-submit-button"
        onMouseEnter={() => {
          setHovered(true);
        }}
        onMouseLeave={() => {
          setHovered(false);
        }}
      >
        <FiSearch className="search-icon" />
        <animated.span style={animatedSpan}>Search</animated.span>
      </animated.button>
    </form>
  );
};

export default RepoForm;
