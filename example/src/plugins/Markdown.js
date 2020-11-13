import { Editor, Transforms, Range, Point } from "slate";

const noBackspace = [
  "bulleted-list",
  "numbered-list",
  "list-item",
  "paragraph",
];

const LIST_WRAPPER = {
  "*": "bulleted-list",
  "-": "bulleted-list",
  "+": "bulleted-list",
  "1.": "numbered-list",
};

const SHORTCUTS = {
  "*": "list-item",
  "-": "list-item",
  "+": "list-item",
  "1.": "list-item",
  "#": "heading-two",
  "##": "heading-three",
  "###": "heading-four",
};

// withLists handles behavior regarding ol and ul lists
// more specifically, withLists properly exits the list with `enter` or `backspace`
// from an empty list item, transforming the node to a paragraph
const withMarkdown = (editor) => {
  const { deleteBackward, insertText } = editor;

  editor.insertText = (text) => {
    const { selection } = editor;

    if (text === " " && selection && Range.isCollapsed(selection)) {
      const { anchor } = selection;
      const block = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });
      const path = block ? block[1] : [];
      const start = Editor.start(editor, path);
      const range = { anchor, focus: start };
      const beforeText = Editor.string(editor, range);
      const type = SHORTCUTS[beforeText];

      if (type) {
        Transforms.select(editor, range);
        Transforms.delete(editor);
        Transforms.setNodes(
          editor,
          { type },
          { match: (n) => Editor.isBlock(editor, n) }
        );

        if (type === "list-item") {
          const list = { type: LIST_WRAPPER[beforeText], children: [] };
          Transforms.wrapNodes(editor, list, {
            match: (n) => n.type === "list-item",
          });
        }

        if (type === "check-list-item") {
          setTimeout(
            () => Transforms.move(editor, { unit: "word", distance: 1 }),
            0
          );
          setTimeout(
            () =>
              Transforms.move(editor, {
                unit: "word",
                distance: 1,
                reverse: true,
              }),
            0
          );
        }

        return;
      }
    }

    insertText(text);
  };

  // reset formatting to paragraph, on backspace, when there is no content
  editor.deleteBackward = (...args) => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      const match = Editor.above(editor, {
        match: (n) => Editor.isBlock(editor, n),
      });

      if (match) {
        const [block, path] = match;
        const start = Editor.start(editor, path);

        if (
          !noBackspace.includes(block.type) &&
          Point.equals(selection.anchor, start)
        ) {
          Transforms.setNodes(editor, { type: "paragraph" });

          if (block.type === "list-item") {
            Transforms.unwrapNodes(editor, {
              match: (n) =>
                n.type === "bulleted-list" || n.type === "numbered-list",
              split: true,
            });
          }

          return;
        }
      }

      deleteBackward(...args);
    }
  };

  return editor;
};

export default withMarkdown;
