declare interface IMenuAndContextMenuCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'MenuAndContextMenuCommandSetStrings' {
  const strings: IMenuAndContextMenuCommandSetStrings;
  export = strings;
}
