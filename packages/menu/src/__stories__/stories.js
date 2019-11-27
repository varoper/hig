export default [
  {
    description: "default",
    getProps: () => ({
      options: [
        {
          item: "HIG Light Theme",
          subMenu: [
            {
              item: "one"
            },
            {
              item: "two"
            },
            {
              item: "three"
            }
          ]
        },
        {
          item: "HIG Dark Blue Theme"
        }, 
        {
          item: "Matrix Theme"
        }
      ],
      onOptionClick: () => { console.log('hello') }
      // options: ["HIG Light Theme", "HIG Dark Blue Theme", "Matrix Theme"]
    })
  }
];
