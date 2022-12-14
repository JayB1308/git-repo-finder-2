import Repo from "./Repo";

interface RepoCont {
  repos: any[];
}
const RepoContainer = ({ repos }: RepoCont) => {
  return (
    <div className="repo-container">
      <div className="repos">
        {repos.map((repo) => {
          return <Repo repo={repo} key={repo.id} />;
        })}
      </div>
    </div>
  );
};

export default RepoContainer;
