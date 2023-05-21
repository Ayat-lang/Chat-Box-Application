import "./App.css";
import Homepage from "./Pages/Homepage";
import { Route } from "react-router-dom";
import Chatpage from "./Pages/Chatpage";
// import {Helmet} from "react-helmet";

function App() {
  return (
    <div className="App">
{/*       
      <Helmet>
                <meta charSet="utf-8" />
                <title>ChatNetBox</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet> */}

        
      <Route path="/" component={Homepage} exact />
      <Route path="/chats" component={Chatpage} />
    </div>
  );
}

export default App;
