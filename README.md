# slate-lists

> Lists (ol, ul) plugin for the latest version of slate.

[![NPM](https://img.shields.io/npm/v/@york-ie-labs/slate-lists.svg)](https://www.npmjs.com/package/@york-ie-labs/slate-lists) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @york-ie-labs/slate-lists
```

## Usage

```jsx
import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

import { withLists, indentItem, undentItem } from "@york-ie-labs/slate-lists";

const Element = (props) => {
  const { attributes, children, element } = props;

  // standard components
  switch (element.type) {
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Editor = ({ value, setValue }) => {
  const editor = useMemo(
    () => withLists(withHistory(withReact(createEditor()))),
    []
  );

  const onKeyDown = (event, change) => {
    if (isHotkey("shift+tab", event)) {
      // attempt to un-indent on shift+tab within list
      event.preventDefault();
      undentItem(editor);
    } else if (isHotkey("tab", event)) {
      // attempt to indent on tab within list
      event.preventDefault();
      indentItem(editor);
    }
  };

  return (
    <Slate editor={editor} value={(value) => setValue(value)} onChange={update}>
      <Editable
        autoFocus={true}
        onKeyDown={onKeyDown}
        renderElement={(props) => <Element {...props} />}
      />
    </Slate>
  );
};

const App = () => {
  // Add the initial value when setting up our state.
  const [value, setValue] = useState([{ children: [{ text: "" }] }]);

  return <Editor value={value} setValue={setValue} />;
};

export default App;
```

Or view the [example](./example/src) code for reference.

## License

MIT © [York IE Labs](https://github.com/York-IE-Labs)
