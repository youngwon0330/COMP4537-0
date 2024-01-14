import userMessages from '../lang/messages/en/user.js';
class MemoryGame {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.numberOfButtons = 0;
        this.buttonElements = [];
        this.originalOrder = [];
        this.clickCount = 0;
    }

    startGame() {
        const inputValue = document.getElementById('numButtons').value;
        this.numberOfButtons = parseInt(inputValue);
        if (!this.numberOfButtons || this.numberOfButtons < 3 || this.numberOfButtons > 7) {
            alert(userMessages.invalidNumber);
            return;
        }
        this.createButtons();
        this.saveOriginalOrder();
        setTimeout(() => this.scrambleButtons(), this.numberOfButtons * 1000); // Scramble after 1 second for any number of buttons
    }

    createButtons() {
        this.container.innerHTML = ''; // Clear existing buttons
        this.buttonElements = [];
        this.clickCount = 0; // Reset click count for a new game

        for (let i = 0; i < this.numberOfButtons; i++) {
            let button = document.createElement('button');
            button.className = 'game-button';
            // Keep the number as a data attribute for debugging or future use
            button.dataset.number = i + 1;
            button.style.backgroundColor = this.getRandomColor();
            this.container.appendChild(button);
            this.buttonElements.push(button);
            button.textContent = button.dataset.number;
        }
    }
    saveOriginalOrder() {
        // Save the original color order
        this.originalColorOrder = this.buttonElements.map(button => button.style.backgroundColor);
    }

    scrambleButtons() {
        this.container.style.position = 'relative'; 
        const containerRect = this.container.getBoundingClientRect();

        this.buttonElements.forEach(button => {
            // 각 버튼에 대해 무작위 위치 결정
            const randomX = Math.random() * (containerRect.width - button.offsetWidth);
            const randomY = Math.random() * (containerRect.height - button.offsetHeight);

            button.style.position = 'absolute';
            button.style.left = randomX + 'px';
            button.style.top = randomY + 'px';
        });

        this.hideNumbers();
    }

    hideNumbers() {
        // Hide the numbers on the buttons
        this.buttonElements.forEach(button => {
            button.textContent = ''; // Clear the number on the button
            // Attach the click event to check color order
            button.addEventListener('click', this.checkColorOrder.bind(this));
        });
    }

    checkColorOrder(event) {
        const button = event.target;
        const buttonColor = button.style.backgroundColor;

        // Check if the color of the clicked button matches the next color in the original order
        if (buttonColor === this.originalColorOrder[this.clickCount]) {
            button.style.backgroundColor = 'green';
            this.clickCount++;

            if (this.clickCount === this.numberOfButtons) {
                alert(userMessages.successMessage);
                this.startGame(); // Restart the game
            }
        } else {
            this.buttonElements.forEach((button, index) => {
                // Set the background to the original color
                button.style.backgroundColor = this.originalColorOrder[index];
                // Optionally, add the number on the button for a visual cue
                button.textContent = button.dataset.number;
            });
            setTimeout(() => {
                alert(userMessages.wrongOrderMessage);
                this.startGame(); // Restart the game
            }, 2000); // Increase delay to 2 seconds for better readability
        }
    }
    updateButtonPositions() {
        this.container.innerHTML = '';
        this.buttonElements.forEach(button => {
            this.container.appendChild(button);
        });
    }

    getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';

        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
console.log("1")

const memoryGame = new MemoryGame('buttonContainer');

window.startGame = () => memoryGame.startGame();
//chat gpt has been used for this lab