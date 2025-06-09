document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guessInput');
    const checkButton = document.getElementById('checkButton');
    const messageDisplay = document.getElementById('message');
    const guessesRemainingDisplay = document.getElementById('guessesRemaining');
    const resetButton = document.getElementById('resetButton');

    let secretNumber;
    let guessesRemaining;
    const maxGuesses = 5; // Max guesses allowed

    function initializeGame() {
        secretNumber = Math.floor(Math.random() * 10) + 1; // Random number between 1 and 10
        guessesRemaining = maxGuesses;
        guessesRemainingDisplay.textContent = guessesRemaining;
        messageDisplay.textContent = '';
        messageDisplay.style.color = '#333'; // Reset message color
        guessInput.value = '';
        guessInput.disabled = false;
        checkButton.disabled = false;
        resetButton.classList.add('hidden');
        guessInput.focus();

        // Update the prompt message
        document.querySelector('.container p').textContent = 'I have picked a number between 1 and 10. Can you guess it?';
    }

    function checkGuess() {
        const userGuess = parseInt(guessInput.value);

        // Validate input
        if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
            messageDisplay.textContent = 'Please enter a valid number between 1 and 10.';
            messageDisplay.style.color = 'red';
            return;
        }

        guessesRemaining--;
        guessesRemainingDisplay.textContent = guessesRemaining;

        if (userGuess === secretNumber) {
            messageDisplay.textContent = `Congratulations! You guessed the number ${secretNumber} correctly!`;
            messageDisplay.style.color = 'green';
            endGame(true);
        } else if (guessesRemaining === 0) {
            messageDisplay.textContent = `Game Over! The number was ${secretNumber}.`;
            messageDisplay.style.color = 'red';
            endGame(false);
        } else if (userGuess < secretNumber) {
            messageDisplay.textContent = 'Too low! Try again.';
            messageDisplay.style.color = 'orange';
        } else {
            messageDisplay.textContent = 'Too high! Try again.';
            messageDisplay.style.color = 'orange';
        }

        guessInput.value = ''; // Clear input field
    }

    function endGame(won) {
        guessInput.disabled = true;
        checkButton.disabled = true;
        resetButton.classList.remove('hidden');
    }

    checkButton.addEventListener('click', checkGuess);
    resetButton.addEventListener('click', initializeGame);

    // Allow pressing Enter to submit the guess
    guessInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && !guessInput.disabled) {
            checkGuess();
        }
    });

    // Initialize the game on load
    initializeGame();
});
