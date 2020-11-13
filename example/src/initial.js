const initialState = [
  {
    type: "heading-one",
    children: [
      {
        text: "Hello There",
      },
    ],
  },
  {
    children: [
      {
        text: "This example uses markdown syntax to format text.",
      },
    ],
  },
  {
    type: "bulleted-list",
    children: [
      {
        type: "list-item",
        children: [
          {
            code: true,
            text: "*",
          },
          {
            text: ", ",
          },
          {
            code: true,
            text: "-",
          },
          {
            text: ", ",
          },
          {
            code: true,
            text: "+",
          },
          {
            text: ", ",
          },
          {
            code: true,
            text: "1.",
          },
          {
            text: " to create a list",
          },
        ],
      },
      {
        type: "list-item",
        children: [
          {
            code: true,
            text: "#",
          },
          {
            text: ", ",
          },
          {
            code: true,
            text: "##",
          },
          {
            text: ", ",
          },
          {
            code: true,
            text: "###",
          },
          {
            text: ", ",
          },
          {
            text: "to create headers",
          },
        ],
      },
    ],
  },
  {
    children: [
      {
        text: "Demo ",
      },
      {
        code: true,
        text: "ol",
      },
      {
        text: " and ",
      },
      {
        code: true,
        text: "ul",
      },
      {
        text: " list behavior here... ",
      },
    ],
  },
];

export default initialState;
