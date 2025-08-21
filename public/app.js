// public/app.js

const API_URL = 'http://localhost:3000/api/users';
const IMAGE_BASE_URL = 'http://localhost:3000/';

// --- DOM Elements ---
const userList = document.getElementById('user-list');
const userModal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');
const modalTitle = document.getElementById('modalTitle');
const userIdInput = document.getElementById('userId');
const messageDiv = document.getElementById('message');
const existingImageP = document.getElementById('existingImage');

// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', fetchUsers);
userForm.addEventListener('submit', handleFormSubmit);

// --- READ: Fetch and Display All Users ---
async function fetchUsers() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch users.');
        const users = await response.json();

        let tableHtml = `
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
        `;

        if (users.length === 0) {
            tableHtml += '<tr><td colspan="5" class="text-center py-4">No users found.</td></tr>';
        } else {
            users.forEach(user => {
                const profilePicUrl = user.profile_picture ? `${IMAGE_BASE_URL}${user.profile_picture.replace(/\\/g, '/')}` : 'https://via.placeholder.com/40';
                tableHtml += `
                    <tr>
                        <td class="px-6 py-4 whitespace-nowrap"><img class="h-10 w-10 rounded-full object-cover" src="${profilePicUrl}" alt="Profile"></td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${user.name}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.email}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${user.phone || 'N/A'}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onclick="handleEdit('${user.id}')" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                            <button onclick="handleDelete('${user.id}')" class="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                    </tr>
                `;
            });
        }

        tableHtml += '</tbody></table>';
        userList.innerHTML = tableHtml;

    } catch (error) {
        userList.innerHTML = `<p class="text-red-500 text-center">${error.message}</p>`;
    }
}

// --- CREATE and UPDATE: Handle Form Submission ---
async function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(userForm);
    const userId = userIdInput.value;
    let url = API_URL + '/register';
    let method = 'POST';

    // If a userId exists, it's an update (PUT) operation
    if (userId) {
        url = `${API_URL}/${userId}`;
        method = 'PUT';
    }

    try {
        const response = await fetch(url, {
            method: method,
            body: formData,
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(result.message, 'success');
            closeModal();
            fetchUsers(); // Refresh the user list
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

// --- UPDATE (Part 1): Populate the form for editing ---
async function handleEdit(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error('Failed to fetch user data.');
        const user = await response.json();
        
        openModal(user); // Open the modal with the user's data
    } catch (error) {
        alert(error.message);
    }
}

// --- DELETE: Handle User Deletion ---
async function handleDelete(id) {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            fetchUsers(); // Refresh the list
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        alert(`Failed to delete user: ${error.message}`);
    }
}

// --- Modal Helper Functions ---
function openModal(user = null) {
    userForm.reset();
    messageDiv.textContent = '';
    existingImageP.textContent = '';

    if (user) {
        // Editing an existing user
        modalTitle.textContent = 'Edit User';
        userIdInput.value = user.id;
        document.getElementById('name').value = user.name;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phone || '';
        if (user.profile_picture) {
            existingImageP.textContent = `Current image: ${user.profile_picture.split(/[\\/]/).pop()}. Leave blank to keep it.`;
            // Add existing path to form data for the backend to use if no new file is uploaded
            const hiddenInput = document.createElement('input');
            hiddenInput.type = 'hidden';
            hiddenInput.name = 'existingProfilePicture';
            hiddenInput.value = user.profile_picture;
            userForm.appendChild(hiddenInput);
        }
    } else {
        // Adding a new user
        modalTitle.textContent = 'Add New User';
        userIdInput.value = '';
    }
    userModal.classList.remove('hidden');
}

function closeModal() {
    const hiddenInput = userForm.querySelector('input[name="existingProfilePicture"]');
    if (hiddenInput) {
        hiddenInput.remove();
    }
    userModal.classList.add('hidden');
}

// --- UI Message Helper ---
function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type === 'success' ? 'text-green-600' : 'text-red-600';
}
