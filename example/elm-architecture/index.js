import run from "../../dist/main";
import { onClick, Text, div, button, span, h1 } from "../../dist/main";
import { Union, Record } from "../../dist/main";
import * as TextBox from "./textbox";

const Model = Record({
  counter: Number,
  textbox: TextBox.Model
});

// init :: Model
const Init = Model.create(0)(TextBox.Init);

const Msg = Union({
  Increment: [],
  Decrement: [],
  TextboxMsg: [TextBox.Msg]
});

// update :: Model -> Msg -> Model
const Update = model =>
  Msg.case({
    Increment: () => ({ ...model, counter: model.counter + 1 }),
    Decrement: () => ({ ...model, counter: model.counter - 1 }),
    TextboxMsg: textboxMsg => ({
      ...model,
      textbox: TextBox.Update(model.textbox)(textboxMsg)
    }),
    _: () => model
  });

// view :: Model -> Html Msg
const View = ({ counter, textbox }) =>
  div(
    [],
    [
      button([onClick(Msg.Increment)], ["+"]),
      span([], [Text(counter)]),
      button([onClick(Msg.Decrement)], ["-"]),
      TextBox.View(textbox.text, Msg.TextboxMsg),
      h1([], [Text(textbox.text)])
    ]
  );

// Run
const Root = document.getElementById("root");

run({
  View,
  Update,
  Init,
  Root
});
