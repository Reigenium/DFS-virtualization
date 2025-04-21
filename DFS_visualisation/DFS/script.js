const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const radius = 20;
const nodes = [];
const edges = [];
let currentNode = null;
let selectedNode = null;
let startNode = null;

let dfsOrder = [];
let stepIndex = -1;

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const { offsetX, offsetY } = e;
  const node = getNodeAt(offsetX, offsetY);
  if (node) {
    startNode = node;
    drawGraph();
  }
});

canvas.addEventListener('click', (e) => {
  const { offsetX, offsetY } = e;
  const clickedNode = getNodeAt(offsetX, offsetY);

  if (clickedNode) {
    if (selectedNode && selectedNode !== clickedNode) {
      edges.push({ from: selectedNode, to: clickedNode });

      // Добавим обратное ребро, если граф неориентированный
      if (!isDirected) {
        edges.push({ from: clickedNode, to: selectedNode });
      }

      selectedNode = null;
      drawGraph();
    } else {
      selectedNode = clickedNode;
    }
  } else {
    nodes.push({ x: offsetX, y: offsetY, visited: false });
    drawGraph();
  }
});


function getNodeAt(x, y) {
  return nodes.find(n => Math.hypot(n.x - x, n.y - y) < radius);
}

function drawArrow(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const angle = Math.atan2(dy, dx);
  const len = Math.hypot(dx, dy) - radius;

  const tx = from.x + Math.cos(angle) * len;
  const ty = from.y + Math.sin(angle) * len;

  ctx.beginPath();
  ctx.moveTo(from.x, from.y);
  ctx.lineTo(tx, ty);
  ctx.stroke();

  // Показывать стрелку только если directed
  if (isDirected) {
    const headlen = 10;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(tx - headlen * Math.cos(angle - Math.PI / 6), ty - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(tx - headlen * Math.cos(angle + Math.PI / 6), ty - headlen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
}


function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  edges.forEach(({ from, to }) => {
    drawArrow(from, to);
  });

  nodes.forEach((node, idx) => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
    if (node === startNode) {
      ctx.strokeStyle = 'red';
      ctx.lineWidth = 3;
    } else {
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 1;
    }
    ctx.fillStyle = node.visited ? 'lightgreen' : 'white';
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fillText(idx, node.x - 5, node.y + 5);
  });

  if (currentNode) {
    ctx.beginPath();
    ctx.arc(currentNode.x, currentNode.y, radius + 5, 0, Math.PI * 2);
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 3;
    ctx.stroke();
  }  
}

function getNeighbors(node) {
  return edges.filter(e => e.from === node).map(e => e.to);
}

let dfsStepsWithStack = [];

function dfsSteps(start) {
  dfsStepsWithStack = [];
  const visited = new Set();
  const stack = [start];

  while (stack.length > 0) {
    const node = stack.pop();

    if (!visited.has(node)) {
      visited.add(node);

      const neighbors = getNeighbors(node).filter(n => !visited.has(n));
      // Добавляем в стек соседей (обратный порядок)
      for (let i = neighbors.length - 1; i >= 0; i--) {
        stack.push(neighbors[i]);
      }

      // Сохраняем шаг: текущий узел, и состояние стека ПОСЛЕ добавления соседей
      dfsStepsWithStack.push({
        node,
        stack: [...stack], // ← стек уже с добавленными соседями
      });
    }
  }

  // Обновляем dfsOrder для подсветки посещённых узлов
  return dfsStepsWithStack.map(s => s.node);
}




function startDFS() {
  nodes.forEach(n => n.visited = false);
  dfsOrder = [];
  stepIndex = -1;
  currentNode = null;

  if (!startNode && nodes.length > 0) {
    startNode = nodes[0];
  }

  if (startNode) {
    dfsOrder = dfsSteps(startNode);
  }

  drawGraph();
}

function nextStep() {
  if (stepIndex + 1 < dfsStepsWithStack.length) {
    stepIndex++;
    const step = dfsStepsWithStack[stepIndex];
    currentNode = step.node;
    currentNode.visited = true;
    updateStackDisplay(step.stack);
    drawGraph();
  }
}

function prevStep() {
  if (stepIndex >= 0) {
    const step = dfsStepsWithStack[stepIndex];
    step.node.visited = false;
    stepIndex--;
    const prevStack = stepIndex >= 0 ? dfsStepsWithStack[stepIndex].stack : [];
    currentNode = stepIndex >= 0 ? dfsStepsWithStack[stepIndex].node : null;
    updateStackDisplay(prevStack);
    drawGraph();
  }
}




function clearGraph() {
  nodes.length = 0;
  edges.length = 0;
  selectedNode = null;
  startNode = null;
  dfsOrder = [];
  stepIndex = -1;
  currentNode = null;
  drawGraph();
}


function loadSmallSample() {
  clearGraph();
  const sampleNodes = [
    { x: 150, y: 100 },
    { x: 300, y: 100 },
    { x: 225, y: 200 },
  ];
  const sampleEdges = [
    [0, 1],
    [0, 2],
    [1, 2],
  ];
  for (const { x, y } of sampleNodes) {
    nodes.push({ x, y, visited: false });
  }
  for (const [from, to] of sampleEdges) {
    edges.push({ from: nodes[from], to: nodes[to] });
  }
  startNode = nodes[0];
  drawGraph();
}

function loadAverageSample() {
  clearGraph();
  const sampleNodes = [
    { x: 100, y: 80 }, { x: 250, y: 80 }, { x: 400, y: 80 },
    { x: 175, y: 180 }, { x: 325, y: 180 }, { x: 500, y: 130 },
    { x: 600, y: 220 }, { x: 550, y: 300 },
  ];
  const sampleEdges = [
    [0, 1], [1, 2], [0, 3], [1, 4], [2, 5],
    [3, 4], [4, 5], [5, 6], [6, 7],
  ];
  for (const { x, y } of sampleNodes) {
    nodes.push({ x, y, visited: false });
  }
  for (const [from, to] of sampleEdges) {
    edges.push({ from: nodes[from], to: nodes[to] });
  }
  startNode = nodes[0];
  drawGraph();
}

function loadLargeSample() {
  clearGraph();

  const sampleNodes = [
    { x: 100, y: 80 },  // 0
    { x: 250, y: 80 },  // 1
    { x: 400, y: 80 },  // 2
    { x: 100, y: 200 }, // 3
    { x: 250, y: 200 }, // 4
    { x: 400, y: 200 }, // 5
    { x: 175, y: 320 }, // 6
    { x: 325, y: 320 }, // 7
  ];

  const sampleEdges = [
    [0, 1], [1, 2],
    [0, 3], [1, 4], [2, 5],
    [3, 6], [4, 6], [5, 7],
    [6, 7], // cross edge for interest
  ];

  for (const { x, y } of sampleNodes) {
    nodes.push({ x, y, visited: false });
  }

  for (const [from, to] of sampleEdges) {
    edges.push({ from: nodes[from], to: nodes[to] });
  }

  startNode = nodes[0];
  drawGraph();
}

function updateStackDisplay(stack) {
  const ul = document.getElementById('stackDisplay');
  ul.innerHTML = '';
  stack.slice().reverse().forEach(node => {
    const li = document.createElement('li');
    li.textContent = `Node ${nodes.indexOf(node)}`;
    ul.appendChild(li);
  });
}

let isDirected = true;

document.getElementById('toggleDirected').addEventListener('change', (e) => {
  isDirected = e.target.checked;
  drawGraph();
});

