const blank = "ε";

export class NFA {
  static sCount = 0;
  static eCount = 0;

  newState() {
    const state = NFA.sCount++;
    this.status.push(state);
    return state;
  }

  public start: number;
  public end: number;
  private status: number[] = [];
  private edges: IEdge[] = [];

  constructor(char: string) {
    this.start = this.newState();
    this.end = this.newState();
    this.addEdge(this.start, this.end, char);
  }

  private addEdge(start: number, end: number, char: string) {
    // 这里不会有重复的边
    const id = NFA.eCount++;
    const label = char ? char : blank;
    this.edges.push({
      id: id,
      source: start,
      target: end,
      char: char,
      label: label,
    });
  }

  merge(other: NFA) {
    this.status = this.status.concat(other.status);
    this.edges = this.edges.concat(other.edges);
  }

  connect(other: NFA) {
    this.merge(other);
    this.addEdge(this.end, other.start, blank);
    this.end = other.end;
  }

  or(other: NFA) {
    this.merge(other);
    const start = this.newState();
    const end = this.newState();
    this.addEdge(start, this.start, blank);
    this.addEdge(start, other.start, blank);
    this.addEdge(this.end, end, blank);
    this.addEdge(other.end, end, blank);
    this.start = start;
    this.end = end;
  }

  kennel() {
    const start = this.newState();
    const end = this.newState();
    this.addEdge(start, this.start, blank);
    this.addEdge(this.end, end, blank);
    this.addEdge(this.end, this.start, blank);
    this.addEdge(start, end, blank);
    this.start = start;
    this.end = end;
  }

  toJson() {
    let nodes: any[] = [];
    this.status.forEach((state) => {
      nodes.push({ id: state, label: "q" + state });
    });
    const last = nodes[nodes.length-1];
    last["shape"] = "circle";
    last["style"] = "fill:#ffffff00;stroke:red;"
    return { nodes: nodes, edges: this.edges };
  }
}
