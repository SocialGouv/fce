/**
 * A bug in v8 make sets larger than 16777216 element crash, so we create a class that handles
 * this use case.
 *
 * https://github.com/nodejs/node/issues/37320
 */
export class LargeSet<T> {
  sets: Array<Set<T>>

  constructor() {
    this.sets = [new Set()]
  }

  add(v: T) {
    if (this.sets[this.sets.length-1].size === 16777000) this.sets.push(new Set())
    return this.sets[this.sets.length-1].add(v)
  }

  has(v: T) {
    for (const set of this.sets) {
      if (set.has(v)) return true
    }
    return false;
  }
}
