import ProfileHeader from "../components/ProfileHeader";
import RepoContainer from "../components/RepoContainer";
import { useEffect, useState } from "react";
import RepoBar from "../components/RepoBar";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useRecoilState } from "recoil";
import { LoadingState } from "../atoms";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-hot-toast";
const Profile = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfRepos, setNumberOfRepos] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<Array<number>>([]);

  const [repos, setRepos] = useState<any>([]);

  const [loading, setLoading] = useRecoilState<boolean>(LoadingState);

  const [loadHeader, setLoadHeader] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>({});

  const { name } = useParams();
  const nav = useNavigate();

  const getHeader = async () => {
    setLoadHeader(true);
    try {
      const response = await axios.get(`https://api.github.com/users/${name}`, {
        headers: {
          Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
        },
      });

      let data = Math.round(response.data.public_repos / numberOfRepos);
      console.log(data);
      if (data === 0) {
        data = 1;
      }
      const arr = Array.from({ length: data }, (_, index) => index + 1);

      setTotalPages(arr);
      setLoadHeader(false);
      setUserProfile(response.data);
    } catch (error) {
      console.log(error);
      toast.error("PLEASE ENTER A VALID USERNAME!");
      nav("/");
    }
  };

  const getRepos = async () => {
    setLoading(true);
    try {
      const repos = await axios.get(
        `https://api.github.com/users/${name}/repos?page=${currentPage}&per_page=${numberOfRepos}`,
        {
          headers: {
            Authorization: `Token ${process.env.REACT_APP_API_KEY}`,
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
  }, [numberOfRepos]);

  useEffect(() => {
    getRepos();
  }, [currentPage, numberOfRepos]);

  return (
    <>
      {loadHeader ? (
        <Loader />
      ) : (
        <div className="profile-container">
          <div className="profile-upper-container">
            <ProfileHeader userInfo={userProfile} />
            <RepoBar
              public_gists={userProfile.public_repos}
              public_repos={userProfile.public_gists}
            />
          </div>
          <div className="profile-lower-container">
            <RepoContainer repos={repos} />
          </div>
          <div className="pagination-container">
            {loading ? (
              <Skeleton />
            ) : (
              <div className="pagination-options">
                <div className="page-changer">
                  <button
                    className={`page-button ${
                      currentPage === 1 ? "button-disabled" : ""
                    }`}
                    disabled={currentPage === 1 ? true : false}
                    onClick={() => {
                      setCurrentPage((prev) => prev - 1);
                    }}
                  >
                    <FaChevronLeft />
                  </button>
                  <div className="pages">
                    {totalPages.map((ele, index) => {
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            setCurrentPage(ele);
                          }}
                          className={`${
                            ele === currentPage ? "current-page" : ""
                          } page-number `}
                        >
                          {ele}
                        </button>
                      );
                    })}
                  </div>
                  <button
                    disabled={
                      currentPage ===
                      Math.round(userProfile.public_repos / numberOfRepos)
                    }
                    className={`page-button ${
                      currentPage ===
                      Math.round(userProfile.public_repos / numberOfRepos)
                        ? "button-disabled"
                        : ""
                    }`}
                    onClick={() => {
                      setCurrentPage((prev) => prev + 1);
                    }}
                  >
                    <FaChevronRight />
                  </button>
                </div>
                <div className="repo-changer">
                  <select
                    value={numberOfRepos}
                    onChange={(e: any) => {
                      setNumberOfRepos(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={75}>75</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
