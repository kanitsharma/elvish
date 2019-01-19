import run from '../../dist/main';
import { f, onClick, Text } from "../../dist/main";
import { Union, Record } from '../../dist/main'
import * as TextBox from './textbox'

const Model = Record({
  counter: Number,
  textbox: TextBox.Model
})

// init :: Model
const Init = Model.create(0, TextBox.Init)

const Msg = Union({
  Increment: [],
  Decrement: [],
  TextboxMsg: [TextBox.Msg]
});

// update :: Model -> Msg -> Model
const Update = model => Msg.case({
  Increment: () => ({ ...model, counter: model.counter + 1 }),
  Decrement: () => ({ ...model, counter: model.counter - 1 }),
  TextboxMsg: textboxMsg => ({ ...model, textbox: TextBox.Update(model.textbox)(textboxMsg) }),
  _: () => model
})

// view :: Model -> Html Msg
const View = ({ counter, textbox }) =>
  f("div", [],
    [
      f("button", [onClick(Msg.Increment)], ["+"]),
      f("span", [], [Text(counter)]),
      f("button", [onClick(Msg.Decrement)], ["-"]),
      TextBox.View(textbox.text, Msg.TextboxMsg),
      f("h1", [], [Text(textbox.text)])
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