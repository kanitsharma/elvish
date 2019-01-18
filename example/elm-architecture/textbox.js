import { f, onClick, onEnter, value, Text, h } from "../../dist/main";
import { Union, Record, Effect } from '../../dist/main'

const Model = Record({
  text: String
})

// init :: Model
const Init = Model.create('Hello from textbox')

const Msg = Union({
  UpdateText: [String]
});

// update :: Model -> Msg -> Model
const Update = model => Msg.case({
  UpdateText: text => ({ ...model, text })
})

// view :: Model -> Html Msg
const View = (text, updateText) => (
  f("input", [onEnter(e => updateText(Msg.UpdateText(e.target.value))), value(text)], [])
)

export {
  Model,
  Init,
  Msg,
  Update,
  View
}
