document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:3000/api';
    const categoryModal = document.getElementById('categoryModal');
    const categoryForm = document.getElementById('categoryForm');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const modalTitle = document.getElementById('modalTitle');
    let editCategoryId = null;

    // Função para carregar categorias
    const loadCategories = async () => {
        const response = await fetch(`${apiUrl}/categories`);
        const categories = await response.json();
        const tableBody = document.querySelector('#categoriesTable tbody');
        tableBody.innerHTML = '';

        categories.forEach(category => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${category.name}</td>
                <td>${category.description}</td>
                <td>
                    <button class="editCategoryBtn" data-id="${category.id}">Editar</button>
                    <button class="deleteCategoryBtn" data-id="${category.id}">Deletar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        document.querySelectorAll('.editCategoryBtn').forEach(button => {
            button.addEventListener('click', (e) => openEditCategoryModal(e.target.dataset.id));
        });

        document.querySelectorAll('.deleteCategoryBtn').forEach(button => {
            button.addEventListener('click', (e) => deleteCategory(e.target.dataset.id));
        });
    };

    // Função para adicionar categoria
    const addCategory = async (category) => {
        await fetch(`${apiUrl}/categories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category),
        });
        loadCategories();
    };

    // Função para atualizar categoria
    const updateCategory = async (id, category) => {
        await fetch(`${apiUrl}/categories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(category),
        });
        loadCategories();
    };

    // Função para deletar categoria
    const deleteCategory = async (id) => {
        await fetch(`${apiUrl}/categories/${id}`, {
            method: 'DELETE',
        });
        loadCategories();
    };

    // Abrir modal para editar categoria
    const openEditCategoryModal = async (id) => {
        editCategoryId = id;
        modalTitle.innerText = 'Editar Categoria';

        const response = await fetch(`${apiUrl}/categories/${id}`);
        const category = await response.json();

        document.getElementById('categoryName').value = category.name;
        document.getElementById('categoryDescription').value = category.description;
        categoryModal.style.display = 'block';
    };

    // Abrir modal para adicionar nova categoria
    const openAddCategoryModal = () => {
        editCategoryId = null;
        modalTitle.innerText = 'Adicionar Categoria';
        categoryForm.reset();
        categoryModal.style.display = 'block';
    };

    // Fechar modal ao clicar no "x"
    document.querySelector('.close').addEventListener('click', () => {
        categoryModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === categoryModal) {
            categoryModal.style.display = 'none';
        }
    });

    // Submissão do formulário
    categoryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const categoryData = {
            name: document.getElementById('categoryName').value,
            description: document.getElementById('categoryDescription').value,
        };

        if (editCategoryId) {
            await updateCategory(editCategoryId, categoryData);
        } else {
            await addCategory(categoryData);
        }

        categoryModal.style.display = 'none';
        loadCategories();
    });

    addCategoryBtn.addEventListener('click', openAddCategoryModal);
    loadCategories();
});