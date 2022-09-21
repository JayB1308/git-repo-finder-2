import { HiUsers } from "react-icons/hi";
import { useRecoilValue } from "recoil";
import { userProfileState } from "../atoms/index";
import { useEffect, useState } from "react";
import axios from "axios";

const Sidebar = () => {
  const userInfo = useRecoilValue<any>(userProfileState);

  const [organization, setOrganizations] = useState<any>([]);

  const getOrganizations = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${userInfo.login}/orgs`
      );
      console.log(response.data);
      setOrganizations(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrganizations();
  }, []);

  return (
    <div className="sidebar">
      <div className="follow-container">
        <HiUsers className="sidebar-icon" />
        <div className="dots"></div>
        <p>{userInfo.followers} followers</p>
        <div className="dots"></div>
        <p>{userInfo.following} following</p>
      </div>
      <div className="org-container">
        <h5>Organizations</h5>
        <div className="orgs">
          {organization.map((org: any) => {
            return (
              <img src={org.avatar_url} className="org-img" alt="org-img" />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
