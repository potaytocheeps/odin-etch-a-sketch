let paintbrushType = "single-color";
initializeEtchASketch();


function initializeEtchASketch()
{
    const gridContainer = document.querySelector("#grid-container");
    const createGridButton = document.querySelector("#create-grid-button");

    if (createGridButton)
    {
        createGridButton.addEventListener("click", () => {
            if (gridContainer)
            {
                const gridSize = getGridSizeInput();

                // Keep current grid if user canceled prompt asking for grid size
                if (gridSize === null) return;

                if (gridContainer.hasChildNodes()) deleteGrid(gridContainer);

                createGrid(gridContainer, gridSize);
                addGridFunctionality(gridContainer);
            }
        });
    }
}


function createGrid(gridContainer: Element, gridSize: number): void
{
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


function addGridFunctionality(gridContainer: Element): void
{
    gridContainer.addEventListener("click", (event) => {
        gridContainer.classList.toggle("painting");

        // Ensure that the tile that is clicked on gets painted, if not already colored
        if (event.target instanceof HTMLDivElement)
        {
            if (!event.target.classList.contains("colored"))
            {
                event.target.style.backgroundColor = getPaintColor(paintbrushType);
            }
        }

        function toggleGridPainting (event: Event)
        {
            paintTiles(event, paintbrushType);
        }

        if (gridContainer.classList.contains("painting"))
        {
            gridContainer.addEventListener("mouseover", toggleGridPainting);
        }
        else
        {
            gridContainer.removeEventListener("mouseover", toggleGridPainting);
        }
    });
}


function getPaintColor(paintbrushType: string)
{
    switch (paintbrushType)
    {
        case "single-color":
            return "black";
        case "rainbow":
            return getRandomColor();
        default:
            return "red";
    }
}


function paintTiles(event: Event, paintbrushType: string): void
{
    if (event.target instanceof HTMLDivElement)
    {
        console.log("painting");
        // Prevent a scenario where the whole grid container element would be
        // colored at once when the target of the event is the grid container itself
        if (event.target.id === "grid-container") return;

        if (event.target.classList.contains("colored")) return;

        event.target.classList.add("colored");
        event.target.style.backgroundColor = getPaintColor(paintbrushType);
    }
}


function getRandomColor(): string
{
    const randomRGBValues = [];

    for (let i = 0; i < 3; i++)
    {
        randomRGBValues.push(Math.floor(Math.random() * 256));
    }

    return `RGB(${randomRGBValues.join(",")})`
}


function getGridSizeInput(): number | null
{
    while (true)
    {
        const userInput = prompt("Enter integer size n for new nxn grid (1-100):", "16");

        if (userInput === null) return userInput;

        const gridSize = Number(userInput);

        if (Number.isInteger(gridSize) && (gridSize >= 1 && gridSize <= 100))
        {
            return gridSize;
        }

        alert("Invalid input. Value must be an integer within the range of 1-100.");
    }
}


function deleteGrid(gridContainer: Element): void
{
    const rows = [...gridContainer.children];

    rows.forEach(row => gridContainer.removeChild(row));
}
