// Sample data for nodes and links
const nodes = [
  { id: 1, label: "Node 1" },
  { id: 2, label: "Node 2" },
  { id: 3, label: "Node 3" },
];

const links = [
  { source: 1, target: 2 },
  { source: 2, target: 3 },
];

// Set up SVG container
const svg = d3.select("svg");

// Create force simulation
const simulation = d3.forceSimulation(nodes)
  .force("link", d3.forceLink(links).id(d => d.id))
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(200, 150));

// Add links
const link = svg.selectAll("line")
  .data(links)
  .enter().append("line")
  .style("stroke", "#999")  // Set the color of the edges
  .style("stroke-width", 2)  // Set the width of the edges
  .on("dblclick", showPopupMenu);

// Add nodes
const node = svg.selectAll("circle")
  .data(nodes)
  .enter().append("circle")
  .attr("r", 10)
  .call(d3.drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
  )
  .on("dblclick", showPopupMenu);

// Update node and link positions on each tick
simulation.on("tick", () => {
  link
    .attr("x1", d => d.source.x)
    .attr("y1", d => d.source.y)
    .attr("x2", d => d.target.x)
    .attr("y2", d => d.target.y);

  node
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);
});

// Drag functions for nodes
function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

// Show popup menu function
function showPopupMenu(event, d) {
  const popupMenu = document.getElementById("popupMenu");
  popupMenu.style.left = event.pageX + "px";
  popupMenu.style.top = event.pageY + "px";
  popupMenu.style.display = "block";

  // Attach click event listeners to menu items
  document.getElementById("showItem").onclick = () => {
    alert("Show item clicked for Node " + d.id);
  };
  document.getElementById("addItem").onclick = () => {
    alert("Add item clicked for Node " + d.id);
  };
  document.getElementById("deleteItem").onclick = () => {
    alert("Delete item clicked for Node " + d.id);
  };
  document.getElementById("editItem").onclick = () => {
    alert("Edit item clicked for Node " + d.id);
  };

  // Close the menu on document click
  document.addEventListener("click", closePopupMenu);
}

// Close popup menu function
function closePopupMenu() {
  const popupMenu = document.getElementById("popupMenu");
  popupMenu.style.display = "none";

  // Remove click event listeners from menu items
  document.getElementById("showItem").onclick = null;
  document.getElementById("addItem").onclick = null;
  document.getElementById("deleteItem").onclick = null;
  document.getElementById("editItem").onclick = null;

  // Remove document click event listener
  document.removeEventListener("click", closePopupMenu);
}
