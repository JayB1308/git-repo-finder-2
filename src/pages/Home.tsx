import GitHubHeader from "../components/GitHubHeader";
import RepoForm from "../components/RepoForm";

const Home = () => {
  return (
    <div className="home-container">
      <div className="form-card">
        <GitHubHeader />
        <RepoForm />
      </div>
    </div>
  );
};

export default Home;
