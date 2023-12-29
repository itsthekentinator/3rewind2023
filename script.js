document.addEventListener('DOMContentLoaded', function () {
    const daySpan = document.getElementById('day');
    const monthSpan = document.getElementById('month');
    const yearSpan = document.getElementById('year');
    const dateSlider = document.getElementById('dateSlider');
    const speedSlider = document.getElementById('speedSlider');
    const rewindButton = document.getElementById('rewindButton');

    const startDate = new Date(2023, 0, 1);
    const endDate = new Date(2023, 11, 31); // Updated end date

    let currentDate = new Date(startDate);

    function updateDate() {
        daySpan.textContent = currentDate.getDate();
        monthSpan.textContent = currentDate.toLocaleString('default', { month: 'short' }).toUpperCase();
        yearSpan.textContent = currentDate.getFullYear();
    }

    function updateSlider() {
        const percentage = ((currentDate - startDate) / (endDate - startDate)) * 100;
        dateSlider.value = percentage;
    }

    function rewindDates() {
        currentDate = new Date(startDate);
        updateDate();
        updateSlider();
    }

    function replayDates() {
        const speed = parseInt(speedSlider.value);
        const intervalId = setInterval(() => {
            currentDate.setDate(currentDate.getDate() + 1);
            updateDate();
            updateSlider();

            if (currentDate > endDate) {
                clearInterval(intervalId);
            }
        }, speed);
    }

    rewindButton.addEventListener('click', () => {
        rewindDates();
    });

    dateSlider.addEventListener('input', () => {
        const percentage = dateSlider.value / 100;
        currentDate = new Date(startDate.getTime() + percentage * (endDate - startDate));
        updateDate();
    });
});
