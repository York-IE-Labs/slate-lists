import React, { useState, useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import isHotkey from "is-hotkey";

import withMarkdown from "./plugins/Markdown";
import { withLists, indentItem, undentItem } from "@york-ie-labs/slate-lists";
import initialState from "./initial";

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.code) {
    children = <pre {...attributes}>{children}</pre>;
  }
  return <span {...attributes}>{children}</span>;
};

const Element = (props) => {
  const { attributes, children, element } = props;

  // standard components
  switch (element.type) {
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return (
        <ol {...attributes} className="editor-ol">
          {children}
        </ol>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "heading-three":
      return <h3 {...attributes}>{children}</h3>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Editor = ({ value, setValue }) => {
  const editor = useMemo(
    () => withLists(withMarkdown(withHistory(withReact(createEditor())))),
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

  const update = (value) => {
    console.log(value);
    setValue(value);
  };

  return (
    <Slate editor={editor} value={value} onChange={update}>
      <Editable
        autoFocus={true}
        onKeyDown={onKeyDown}
        renderElement={(props) => <Element {...props} />}
        renderLeaf={(props) => <Leaf {...props} />}
      />
    </Slate>
  );
};

const App = () => {
  // Add the initial value when setting up our state.
  const [value, setValue] = useState(initialState);

  return (
    <>
      <div className="accent"></div>
      <div className="editor">
        <Editor value={value} setValue={setValue} />
      </div>
    </>
  );
};

export default App;
