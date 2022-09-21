import { MdPublic } from "react-icons/md";
import { RiFolderSharedFill } from "react-icons/ri";

interface BarProps {
  public_repos: any;
  public_gists: any;
}

const RepoBar = ({ public_gists, public_repos }: BarProps) => {
  return (
    <div className="repo-bar">
      {public_repos ? (
        <span className="repo-bar-item">
          <MdPublic className="repo-icon" />
          <p>Public</p>
          <p className="repo-stat">{public_repos}</p>
        </span>
      ) : (
        ""
      )}
      {public_gists ? (
        <span className="repo-bar-item">
          <RiFolderSharedFill className="repo-icon" />
          <p>Gists</p>
          <p className="repo-stat">{public_gists}</p>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default RepoBar;
