export type MdlTreeOption<K = any, T = any> = {
  expanded: boolean;
  level: number;
  key: K;
  value: T;
  parent?: MdlTreeOption<any, any>;
  children?: MdlTreeOption<any, any>[];
};
