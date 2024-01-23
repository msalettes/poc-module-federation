import React from "react";
import ReactDOM from "react-dom";

import "./index.scss";

const Widget = React.lazy(() => import("widget/Widget"));

const App = () => (
  <div className="mt-10 text-3xl mx-auto max-w-6xl">
    <React.Suspense fallback={<div>Loading</div>}>
      <Widget />
    </React.Suspense>
    <div>Home App</div>
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
