function calculateAndVisualize() {
    const input = document.getElementById("inputArray").value;
    const heights = input.split(",").map(Number);

    if (heights.length === 0 || heights.some(isNaN)) {
        alert("Please enter valid comma-separated numbers!");
        return;
    }

    const totalWater = trapRainWater(heights);
    document.getElementById("result").textContent = `Total Water Stored: ${totalWater} Units 🌊`;

    drawDiagram("inputSVG", heights, true, true);  // blocks + water
    drawDiagram("outputSVG", heights, true, false); // water only
}

function trapRainWater(height) {
    const n = height.length;
    if(n===0) return 0;
    const leftMax = new Array(n), rightMax = new Array(n);
    leftMax[0]=height[0];
    for(let i=1;i<n;i++) leftMax[i]=Math.max(leftMax[i-1], height[i]);
    rightMax[n-1]=height[n-1];
    for(let i=n-2;i>=0;i--) rightMax[i]=Math.max(rightMax[i+1], height[i]);
    let water=0;
    for(let i=0;i<n;i++) water += Math.min(leftMax[i], rightMax[i]) - height[i];
    return water;
}

function drawDiagram(svgId, heights, showWater, includeBlocks){
    const svg=document.getElementById(svgId);
    svg.innerHTML="";
    const svgWidth=svg.clientWidth;
    const svgHeight=svg.clientHeight;
    const blockCount=heights.length;
    const spacing=8;
    const blockWidth=Math.max(20,(svgWidth-(blockCount+1)*spacing)/blockCount);

    // compute water levels
    const leftMax=[], rightMax=[];
    leftMax[0]=heights[0]; for(let i=1;i<heights.length;i++) leftMax[i]=Math.max(leftMax[i-1], heights[i]);
    rightMax[heights.length-1]=heights[heights.length-1]; for(let i=heights.length-2;i>=0;i--) rightMax[i]=Math.max(rightMax[i+1], heights[i]);
    const waterLevels = heights.map((h,i)=>Math.max(0, Math.min(leftMax[i],rightMax[i]) - h));

    const maxHeight = Math.max(...heights.map((h,i)=>h+waterLevels[i]));
    const scale = (svgHeight-50)/(maxHeight+1);
    const baseY = svgHeight-10;

    // Water gradient
    if(showWater){
        const defs=document.createElementNS("http://www.w3.org/2000/svg","defs");
        const grad=document.createElementNS("http://www.w3.org/2000/svg","linearGradient");
        grad.setAttribute("id","waterGradient"); grad.setAttribute("x1","0%"); grad.setAttribute("y1","0%"); grad.setAttribute("x2","0%"); grad.setAttribute("y2","100%");
        const stop1=document.createElementNS("http://www.w3.org/2000/svg","stop"); stop1.setAttribute("offset","0%"); stop1.setAttribute("stop-color","#00bfff"); stop1.setAttribute("stop-opacity","0.8");
        const stop2=document.createElementNS("http://www.w3.org/2000/svg","stop"); stop2.setAttribute("offset","100%"); stop2.setAttribute("stop-color","#0099cc"); stop2.setAttribute("stop-opacity","0.8");
        grad.appendChild(stop1); grad.appendChild(stop2); defs.appendChild(grad); svg.appendChild(defs);
    }

    // Draw blocks
    if(includeBlocks){
        heights.forEach((h,i)=>{
            const block=document.createElementNS("http://www.w3.org/2000/svg","rect");
            block.setAttribute("x", i*(blockWidth+spacing)+spacing);
            block.setAttribute("y", baseY-h*scale);
            block.setAttribute("width", blockWidth);
            block.setAttribute("height", h*scale);
            block.setAttribute("fill","#555");
            block.setAttribute("rx","6");
            const title=document.createElementNS("http://www.w3.org/2000/svg","title");
            title.textContent = `Block: ${h}, Water: ${waterLevels[i]}`;
            block.appendChild(title);
            svg.appendChild(block);
        });
    }

    // Animate water
    if(showWater){
        let step=0, maxSteps=50;
        const interval = setInterval(()=>{
            svg.querySelectorAll('.water,.water-text').forEach(e=>svg.removeChild(e));
            heights.forEach((h,i)=>{
                const waterHeight = waterLevels[i];
                if(waterHeight>0){
                    const currentWater = waterHeight*step/maxSteps;
                    const yPos = includeBlocks ? baseY-(h+currentWater)*scale : baseY-currentWater*scale;
                    const water = document.createElementNS("http://www.w3.org/2000/svg","rect");
                    water.setAttribute("x", i*(blockWidth+spacing)+spacing);
                    water.setAttribute("y", yPos);
                    water.setAttribute("width", blockWidth);
                    water.setAttribute("height", currentWater*scale);
                    water.setAttribute("fill","url(#waterGradient)");
                    water.setAttribute("class","water");
                    svg.appendChild(water);

                    const text=document.createElementNS("http://www.w3.org/2000/svg","text");
                    text.setAttribute("x", i*(blockWidth+spacing)+spacing+blockWidth/2);
                    text.setAttribute("y", yPos-5);
                    text.setAttribute("fill","#0077ff");
                    text.setAttribute("font-size","14px");
                    text.setAttribute("text-anchor","middle");
                    text.setAttribute("class","water-text");
                    text.textContent = Math.round(currentWater);
                    svg.appendChild(text);
                }
            });
            step++;
            if(step>maxSteps) clearInterval(interval);
        },20);
    }
}

function resetDiagrams(){
    document.getElementById("inputArray").value="";
    document.getElementById("inputSVG").innerHTML="";
    document.getElementById("outputSVG").innerHTML="";
    document.getElementById("result").innerText="";
}

