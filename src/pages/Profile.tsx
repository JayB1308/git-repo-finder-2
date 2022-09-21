import ProfileHeader from "../components/ProfileHeader";
import RepoContainer from "../components/RepoContainer";
import { useEffect, useState } from "react";
import RepoBar from "../components/RepoBar";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useRecoilState } from "recoil";
import { LoadingState } from "../atoms";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const Profile = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [repos, setRepos] = useState<any>([]);

  const [loading, setLoading] = useRecoilState<boolean>(LoadingState);
  const [loadHeader, setLoadHeader] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>({});

  const { name } = useParams();

  const getHeader = async () => {
    setLoadHeader(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${name}`, {
        headers: {
          Authorization: `${process.env.REACT_APP_API_KEY}`,
        },
      });
      setLoadHeader(false);
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRepos = async () => {
    setLoading(true);
    try {
      const repos = await axios.get(
        `https://api.github.com/users/${name}/repos?page=${currentPage}&per_page=10`,
        {
          headers: {
            Authorization: `${process.env.REACT_APP_API_KEY}`,
          },
        }
      );
      if (repos.status === 200) {
        setLoading(false);
      }
      setRepos(repos.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getHeader();
  }, []);

  useEffect(() => {
    getRepos();
  }, [currentPage]);

  return (
    <>
      {loadHeader ? (
        <Loader />
      ) : (
        <div className="profile-container">
          <ProfileHeader userInfo={userProfile} />
          <RepoBar
            public_gists={userProfile.public_repos}
            public_repos={userProfile.public_gists}
          />
          <div className="profile-lower-container">
            <RepoContainer repos={repos} />
          </div>
          <div className="pagination-container">
            {loading ? (
              <Skeleton />
            ) : (
              <>
                <button
                  className="page-button"
                  disabled={currentPage === 1 ? true : false}
                  onClick={() => {
                    setCurrentPage((prev) => prev - 1);
                  }}
                >
                  <FaChevronLeft />
                </button>
                <div className="pages">
                  <h2>{currentPage}</h2>
                </div>
                <button
                  className="page-button"
                  onClick={() => {
                    setCurrentPage((prev) => prev + 1);
                  }}
                >
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
