interface MakeEtaOptions {
  max?: number,
  min?: number,
  historyTimeConstant?: number,
  autostart?: boolean,
  ignoreSameProgress?: boolean,
}

interface ETAInstance {
  start(): void

  reset(): void

  report(progress: number, timestamp?: number): void

  estimate(timestamp?: number): number

  rate(): number
}

declare function makeEta(options?: MakeEtaOptions): ETAInstance;

export = makeEta