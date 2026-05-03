const gridContainer = document.querySelector("#grid-container");

if (gridContainer !== null)
{
    createGrid(gridContainer);
    addGridFunctionality(gridContainer);
}


function createGrid(gridContainer: Element)
{
    const gridSize = 16;

    for (let row = 0; row < gridSize; row++)
    {
        let row = document.createElement("div");
        row.classList.add("row");

        for (let tile = 0; tile < gridSize; tile++)
        {
            let tile = document.createElement("div");

            tile.classList.add("tile");
            row.appendChild(tile);
        }

        if (gridContainer !== null) gridContainer.appendChild(row);
    }
}


function addGridFunctionality(gridContainer: Element)
{
    gridContainer.addEventListener("mouseover", (event) => {
        if (event.target instanceof HTMLDivElement)
        {
            // Prevents a scenario where the whole grid container element would be
            // colored at once when the target of the event is the grid container itself
            if (event.target.id === "grid-container") return;

            if (event.target.classList.contains("colored")) return;

            event.target.classList.add("colored");
            event.target.style.backgroundColor = "black";
        }
    });
}
