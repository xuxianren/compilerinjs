import { applyMixins } from "@antv/x6/lib/util/object/mixins";
import * as d3 from "d3";
import dagreD3 from "dagre-d3";



class Data {
  public nodes: Inode[];
  public edges: IEdge[];
  private currentID: number = 0;

  constructor(data: IData) {
    this.nodes = data.nodes;
    this.edges = data.edges;
    this.currentID = this.maxEdgeID();
  }

  maxEdgeID() {
    let maxID = 0;
    this.edges.forEach((edge) => {
      maxID = edge.id > maxID ? edge.id : maxID;
    });
    return maxID;
  }

  removeEdge(source: number, target: number) {
    for (let i = 0; i < this.edges.length; i++) {
      let edge = this.edges[i];
      if (edge.source === source && edge.target === target) {
        return this.edges.splice(i, 1);
      }
    }
  }

  addEdge(source: number, target: number, label?: string, color?: string) {
    // 防止重复
    for (let i = 0; i < this.edges.length; i++) {
      let edge = this.edges[i];
      if (edge.source === source && edge.target === target) {
        return edge;
      }
    }
    const id = ++this.currentID;
    if (!label) {
      label = "";
    }
    if (!color) {
      color = "";
    }
    let edge: IEdge = {
      id: id,
      source: source,
      target: target,
      label: label,
      color: color,
    };
    this.edges.push(edge);
    return edge;
  }
}

export class Graph {
  private path;
  protected data;
  public g: dagreD3.graphlib.Graph;
  public svg: any;
  public inner: any;

  constructor(path: string, data: IData) {
    this.path = path;
    this.data = new Data(data);
  }

  initGraph() {
    this.g = new dagreD3.graphlib.Graph().setGraph({ rankdir: "LR" });
    this.data.nodes.forEach((item) => {
      this.g.setNode(item.id, {
        //节点标签
        label: item.label,
        //节点形状
        shape: item.shape || "circle",
        //节点样式
        style: item.style || "fill:#ffffff00;stroke:#000;",
      });
    });
    this.data.edges.forEach((item) => {
      this.g.setEdge(item.source, item.target, {
        //边标签
        label: item.label,
        //边样式
        style: "fill:#ffffff00;stroke:#333;stroke-width:1.5px;",
      });
    });
  }

  renderGraph() {
    this.svg = d3.select(this.path);
    if (this.inner) {
      this.inner.remove();
    } // 删除旧的
    this.inner = this.svg.append("g");
    const render = new dagreD3.render();
    render(this.inner, this.g);
  }

  setZoomCenter() {
    let zoom = d3.zoom().on("zoom", (event: any) => {
      this.inner.attr("transform", event.transform);
    });
    this.svg.call(zoom);
    let width =
      (this.svg && this.svg.node().clientWidth) || this.g.graph().width;
    this.svg.call(
      zoom.transform,
      d3.zoomIdentity.translate((width - this.g.graph().width) / 2, 50)
    );
  }

  draw() {
    console.log("draw");
    this.initGraph();
    this.renderGraph();
    this.setZoomCenter();
  }
}
