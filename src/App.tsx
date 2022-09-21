import "./app.scss";
import { RecoilRoot } from "recoil";
import Switch from "./routes";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <div className="app-container">
      <RecoilRoot>
        <Toaster />
        <Switch />
      </RecoilRoot>
    </div>
  );
}

export default App;
