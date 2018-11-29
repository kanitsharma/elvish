# Elf
 A functional, reactive and some what type safe javascript library to build UIs 

Elf is heavily inspired from elm-architecture, it is an effort to implement the type safe and functional architecture that elm provides in a non typed language like javascript.

Built with
 - [@most/core](https://github.com/mostjs/core)
 - [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
 - [union-type](https://github.com/paldepind/union-type)

## Basic Example

The logic of every Elm program will break up into three cleanly separated parts:

- Model — the state of your application
- Update — a way to update your state
- View — a way to view your state as HTML


```javascript
  import run from "../../src/lib/core";
  import { f, onClick, onEnter, value, Text } from "../../src/lib/dom-effect";
  import { Union, Record, Effect } from '../../src/lib/core/types'

  const Model = Record({
    counter: Number,
    text: String
  })

  // init :: Model
  const Init = Model(0, 'Hello')

  const Msg = Union({
    Increment: [],
    Decrement: [],
    UpdateText: [String]
  });

  // update :: Msg -> Model -> (Msg -> Model)
  const Update = msg => model => msg.case({
    Increment: () => ({ ...model, counter: model.counter + 1 }),
    Decrement: () => ({ ...model, counter: model.counter - 1 }),
    UpdateText: text => ({ ...model, text }),
    _: () => model
  })

  // view :: Model -> Html Msg
  const View = ({ counter, text }) =>
    f(
      "div",
      [],
      [
        f("button", [onClick(Msg.Increment)], ["+"]),
        f("span", [], [Text(counter)]),
        f("button", [onClick(Msg.Decrement)], ["-"]),
        TextBox(text, Msg.UpdateText),
        f("h1", [], [Text(text)])
      ]
    );

  const TextBox = (text, updateText) => (
    f("input", [onEnter(e => updateText(e.target.value)), value(text)], [])
  )

  // Run
  const Root = document.getElementById("root");

  run({
    View,
    Update,
    Msg,
    Init,
    Root
  });
```

## Side Effect example

```javascript
  import run from "../../src/lib/core";
  import { f, onClick, Text } from '../../src/lib/dom-effect'
  import { Union, Record, Effect } from '../../src/lib/core/types'

  const Model = Record({
    userId: Number,
    title: String,
    fetched: Boolean,
    url: String
  })

  // init :: Model
  const Init = Model(0, '', false, 'https://jsonplaceholder.typicode.com/todos/1')

  const Msg = Union({
    FetchData: [],
    FetchedData: [Number, String],
    FetchError: []
  });

  // fetchUserData :: String -> Effect FetchedData
  const fetchUserData = url => Effect((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(({ userId, title }) => Msg.FetchedData(userId, title))
      .then(resolve)
      .catch(err => reject(Msg.FetchError))
  })

  // update :: Msg -> Model -> (Msg -> Model)
  const Update = msg => model => msg.case({
    FetchData: () => [model, fetchUserData(model.url)],
    FetchedData: (userId, title) => ({ ...model, userId, title, fetched: true }),
    FetchError: () => ({ ...model, title: 'Error fetching', fetched: true }),
    _: _ => model
  })

  // view :: Model -> Html Msg
  const View = ({ userId, title, fetched }) =>
    f(
      'div',
      [],
      [
        f('button', [onClick(Msg.FetchData)], [Text('Fetch Data')]),
        fetched && f('div', [], [
          f('h3', [], [Text(userId)]),
          f('h3', [], [Text(title)])
        ])
      ]
    );


  // Run
  const Root = document.getElementById("root");

  run({
    View,
    Update,
    Msg,
    Init,
    Root
  });
```

## Types

### Record

- Example
```javascript
  const Model = Record({
    counter: Number,
    text: String
  }) // Returns a type constructor Model(counter, text)

  const model = Model(0, 'hello world') // create new Model

  console.log(model.counter) // 0
  console.log(model.text) // hello world
```

- Type safe

```javascript
  const Model = Record({
    counter: Number
  })

  const model = Model('0') // wrong type passed to record
```

### Union Type

Union types are an important part of an elf application. 

- Example

```javascript
  const Bool = Union({
    True: [],
    False: []
  })
```

- Adding instance methods to union types.

```javascript
  const T = () => true

  const Maybe = Union({
    Just: [T],
    Nothing: []
  })
  
  Maybe.prototype.map = function(fn) {
    return Maybe.case({
      Nothing: () => Maybe.Nothing,
      Just: (v) => Maybe.Just(fn(v))
    }, this);
  };

  const just = Maybe.Just(1)
  const nothing = Maybe.Nothing
  nothing.map(add(1)); // => Nothing
  just.map(add(1)); // => Just(2)
```

- Pattern Matching

```javascript
  const Action = Union({
    ShowNumber: [Number],
    HideNumber: []
  })

  const initState = {
    number: 0,
    showNumber: false
  }

  const reducer = (initState, action) =>
    Action.case({
      ShowNumber: number => ({ showNumber: true, number }),
      HideNumber: _ => ({ showNumber: false, number: 0 })
      _: () => initState,
    }, action)
```

### Effect type

Effect types are used to run side effects in an elf application. Effects can be thought of as a lazy promise, basically the idea is to abstract the side effects from your pure code and running them separately, so your code stays pure even when you are doing side effects.

You can think of an elf application as pure and functional code running in an imperative shell.

- Example

```javascript
  const fetchUserData = url => Effect((resolve, reject) => {
    fetch(url)
      .then(res => res.json())
      .then(({ userId, title }) => Msg.FetchedData(userId, title))
      .then(resolve)
      .catch(err => reject(Msg.FetchError))
  })
```
Only way to run Effects in an elf application is to return a tuple from the update function containing [ Model, Effect ].

```javascript
  FetchData: () => [model, fetchUserData(model.url)],
```