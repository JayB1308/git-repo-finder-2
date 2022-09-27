import axios from "axios";
import { useState, useEffect } from "react";
import { AiFillEye, AiOutlineFork } from "react-icons/ai";
import { IoStarSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { LoadingState } from "../atoms/index";
import { animated, useSpring } from "react-spring";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
interface RepoProp {
  repo: any;
}
const Repo = ({ repo }: RepoProp) => {
  const { name } = useParams();

  const loading = useRecoilValue<boolean>(LoadingState);

  const animateRepo = useSpring({
    from: {
      marginBottom: "-10%",
      opacity: 0,
    },
    to: {
      marginBottom: "0%",
      opacity: 1,
    },
    config: {
      duration: 250,
    },
  });

  const [languages, setLanguages] = useState<any[]>([]);

  const getLanguages = async () => {
    try {
      const response = await axios(
        `https://api.github.com/repos/${name}/${repo.name}/languages`,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      setLanguages(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLanguages();
  }, []);

  return (
    <animated.div
      key={repo.id}
      style={animateRepo}
      className={loading ? "repo-loading" : "repo"}
    >
      <div className="info-container">
        <h2>
          {loading ? (
            <Skeleton baseColor="#caf0f8aa" />
          ) : (
            <a className="link" href={repo.html_url}>
              {repo.name}
            </a>
          )}
        </h2>
        {loading ? (
          <Skeleton baseColor="#caf0f8aa" />
        ) : repo.description ? (
          <p>{repo.description}</p>
        ) : (
          ""
        )}
        {loading ? (
          <Skeleton baseColor="#caf0f8aa" />
        ) : (
          <div className="language-container">
            {Object.keys(languages).map((lang) => {
              return (
                <p key={lang} className="lang">
                  {lang}
                </p>
              );
            })}
          </div>
        )}
      </div>
      {loading ? (
        ""
      ) : (
        <div className="stat-container">
          {repo.watchers_count ? (
            <div className="repo-link">
              <AiFillEye />
              <p className="repo-val">{repo.watchers_count}</p>
            </div>
          ) : (
            ""
          )}
          {repo.stargazaer_count ? (
            <div className="repo-link">
              <IoStarSharp />
              <p className="repo-val">{repo.stargazers_count}</p>
            </div>
          ) : (
            ""
          )}
          {repo.forks ? (
            <div className="repo-link">
              <AiOutlineFork />
              <p className="repo-val">{repo.forks}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      )}
    </animated.div>
  );
};

export default Repo;
