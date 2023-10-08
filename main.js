// Load test items from Minecraft JSON file
fetch('minecraft_items.json')
    .then(response => response.json())
    .then(data => {
        // Create the inventory grid and item menu
        createInventoryGrid();
        createItemMenu(data);

        // Event listener for slot clicks
        document.querySelector('.inventory-grid').addEventListener('click', (event) => {
            if (event.target.classList.contains('slot')) {
                openItemMenu(event.target.dataset.slot);
            }
        });

        // Update JSON continuously
        setInterval(generateJSON, 1000); // Update every second
    });

function createInventoryGrid() {
    const inventoryGrid = document.querySelector('.inventory-grid');
    for (let row = 0; row < 3; row++) {
        for (let column = 0; column < 9; column++) {
            const slot = document.createElement('div');
            slot.classList.add('slot');
            slot.dataset.slot = row * 9 + column; // Calculate slot number
            inventoryGrid.appendChild(slot);
        }
    }
}
    

function createItemMenu(items) {
    const itemMenu = document.querySelector('.item-menu');
    const itemDropdown = document.createElement('select');
    const itemNameInput = document.createElement('input');
    itemNameInput.placeholder = 'Item Name';
    const itemFunctionInput = document.createElement('input');
    itemFunctionInput.placeholder = 'Function (optional)';

    for (const item of items) {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        itemDropdown.appendChild(option);
    }

    itemMenu.appendChild(itemDropdown);
    itemMenu.appendChild(itemNameInput);
    itemMenu.appendChild(itemFunctionInput);
}

const itemSlots = {};

function openItemMenu(slot) {
    const itemMenu = document.querySelector('.item-menu');
    itemMenu.dataset.activeSlot = slot;
    itemMenu.style.display = 'block';
}

function generateJSON() {
    const jsonOutput = document.getElementById('json-output');
    jsonOutput.textContent = JSON.stringify(itemSlots, null, 2);
}

// Function to automatically update JSON whenever an item is changed
function updateJSON() {
    const activeSlot = document.querySelector('.item-menu').dataset.activeSlot;
    const selectedOption = document.querySelector('.item-menu select').value;
    const itemName = document.querySelector('.item-menu input[placeholder="Item Name"]').value;
    const itemFunction = document.querySelector('.item-menu input[placeholder="Function (optional)"]').value;

    // Save the selected item details to the itemSlots object
    itemSlots[activeSlot] = {
        type: selectedOption,
        name: itemName,
        function: itemFunction || undefined,
    };
}
