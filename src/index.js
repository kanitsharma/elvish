import render from "./vmost";
import view from "./view";
import reducer from "./reducer";

const root = document.getElementById("root");
render(view, reducer, root);
