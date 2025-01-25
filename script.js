// DOM Elements
const bucketForm = document.getElementById('bucketForm');
const bucketInput = document.getElementById('bucketInput');
const bucketCategory = document.getElementById('bucketCategory');
const bucketList = document.getElementById('bucketList');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// Load bucket list from local storage
let bucketListData = JSON.parse(localStorage.getItem('bucketList')) || [];

// Function to update local storage
function updateLocalStorage() {
  localStorage.setItem('bucketList', JSON.stringify(bucketListData));
}

// Function to update progress
function updateProgress() {
  const total = bucketListData.length;
  const completed = bucketListData.filter(item => item.completed).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  // Update progress bar and text
  progressFill.style.width = `${percentage}%`;
  progressText.textContent = `${percentage}% Completed`;
}

// Render bucket list
function renderBucketList() {
  bucketList.innerHTML = '';
  bucketListData.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="wish-text ${item.completed ? 'completed' : ''}">${item.text} <em>(${item.category})</em></span>
      <button class="done-btn">${item.completed ? 'Undo' : 'Done'}</button>
      <button class="delete-btn">Delete</button>
    `;

    // Add GSAP animation
    gsap.from(li, { opacity: 0, y: 20, duration: 0.5 });

    // Add event listeners for buttons
    li.querySelector('.done-btn').addEventListener('click', () => toggleCompleted(index));
    li.querySelector('.delete-btn').addEventListener('click', () => deleteWish(index));

    bucketList.appendChild(li);
  });

  updateProgress();
}

// Add new wish
bucketForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const newWish = bucketInput.value.trim();
  const category = bucketCategory.value;

  if (newWish !== '') {
    bucketListData.push({ text: newWish, category, completed: false });
    updateLocalStorage();
    renderBucketList();

    // Clear input field
    bucketInput.value = '';
  }
});

// Toggle completed status
function toggleCompleted(index) {
  bucketListData[index].completed = !bucketListData[index].completed;
  updateLocalStorage();
  renderBucketList();
}

// Delete a wish
function deleteWish(index) {
  bucketListData.splice(index, 1);
  updateLocalStorage();
  renderBucketList();
}

// Initial render
renderBucketList();
