const gridContainer = document.querySelector("#grid-container");

if (gridContainer !== null)
{
    createGrid(gridContainer);
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
