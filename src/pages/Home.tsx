import { useEffect } from "react";
import GitHubHeader from "../components/GitHubHeader";
import RepoForm from "../components/RepoForm";
import { useToasterStore, toast } from "react-hot-toast";
const Home = () => {
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

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
