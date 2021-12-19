<script setup  lang="ts">
import { Graph } from "./dagre"
import { reactive, onMounted, watch } from "vue"
import { NFA } from "./nfa"
const data = reactive({
    nodes: [
        {

            id: 10086,
            label: "服务A",
            shape: "rect",
            color: "fill:#d81b13;stroke:transparent",
            toolText: ""
        },
        {

            id: 1,
            label: "服务B",
            shape: "rect",
            color: "",
            toolText: ""
        },
        {

            id: 2,
            label: "服务C",
            shape: "rect",
            color: "",
            toolText: ""
        },
        {

            id: 3,
            label: "服务D",
            shape: "rect",
            color: "",
            toolText: ""
        },
        {

            id: 4,
            label: "服务E",
            shape: "rect",
            color: "",
            toolText: ""
        },
        {

            id: 5,
            label: "服务F",
            shape: "rect",
            color: "",
            toolText: ""
        }
    ],
    edges: [
        {
            id: 1, source: 10086, target: 1, label: "", color: ""
        },
        {
            id: 2, source: 1, target: 2, label: "", color: ""
        },
        {
            id: 3, source: 2, target: 3, label: "", color: ""
        },
        {
            id: 4, source: 3, target: 4, label: "", color: ""
        },
        {
            id: 5, source: 4, target: 5, label: "", color: ""
        },
        {
            id: 6, source: 2, target: 5, label: "", color: ""
        }
    ]
})

// const n = new NFA("a")
// n.connect(new NFA("b"))
// const c = new NFA("c")
// c.kennel()
// n.connect(c)
// const data2 = n.toJson()
let data3 = {"nodes": [{"id": 0, "label": "q0", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 1, "label": "q1", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 2, "label": "q2", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 3, "label": "q3", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 4, "label": "q4", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 5, "label": "q5", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 6, "label": "q6", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 7, "label": "q7", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 8, "label": "q8", "style": "fill:#ffffff00;stroke:#000;"}, {"id": 9, "label": "q9", "style": "fill:#ffffff00;stroke:red;"}], "edges": [{"source": 5, "target": 7, "label": "\u03b5"}, {"source": 8, "target": 6, "label": "\u03b5"}, {"source": 6, "target": 2, "label": "\u03b5"}, {"source": 6, "target": 4, "label": "\u03b5"}, {"source": 3, "target": 7, "label": "\u03b5"}, {"source": 0, "target": 1, "label": "a"}, {"source": 4, "target": 5, "label": "c"}, {"source": 7, "target": 9, "label": "\u03b5"}, {"source": 7, "target": 6, "label": "\u03b5"}, {"source": 1, "target": 8, "label": "\u03b5"}, {"source": 8, "target": 9, "label": "\u03b5"}, {"source": 2, "target": 3, "label": "b"}]}
console.log(data3)
let flow = new Graph("svg.flow", data3);

onMounted(
    () => { flow.draw() }
)

watch(data, () => { flow.draw() })

</script>

<template>
    <svg class="flow" width="100%" height="100%" />
</template>

<style scoped>
.flow {
    /* background-color: #007af3; */
}

:deep(text) {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>