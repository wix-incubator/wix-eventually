export = WixEventually;

declare function WixEventually(fn: Function, opts?: WixEventually.Opts): Promise<void>;

declare namespace WixEventually {
  export interface Opts {
    timeout: number;
    interval: number;
  }
}
