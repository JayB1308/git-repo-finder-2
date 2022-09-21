import "./app.scss";
import { RecoilRoot } from "recoil";
import Switch from "./routes";

function App() {
  return (
    <div className="app-container">
      <RecoilRoot>
        <Switch />
      </RecoilRoot>
    </div>
  );
}

export default App;
