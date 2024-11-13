// habits-list-component.js
import { createElement } from '../framework/render.js';
import { StatusLabel, status } from '../const.js';

function createHabitsListComponentTemplate() {
  return `
    <div class="habit-list">
      <h2>Список Привычек</h2>
      <div id="habit-list">
        <!-- Список привычек будет динамически отображаться здесь -->
      </div>
    </div>
  `;
}

function getStatusLabel(statusKey) {
  const statusMapping = {
    [status.DONE]: StatusLabel[status.DONE],
    [status.NODONE]: StatusLabel[status.NODONE],
  };
  return statusMapping[statusKey] || 'Неизвестный статус';
}

export default class HabitsListComponent {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return createHabitsListComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  renderHabit(habit, onDelete, onEdit, onStatusChange) {
    const statusLabel = getStatusLabel(habit.status);
    const habitElement = createElement(`
      <li>
        <h3>${habit.name}</h3>
        <p>Статус: ${statusLabel}</p>
        <button class="edit-habit">Редактировать</button>
        <select class="status-select">
          <option value="nodone" ${habit.status === 'nodone' ? 'selected' : ''}>Не выполнена</option>
          <option value="done" ${habit.status === 'done' ? 'selected' : ''}>Выполнена</option>
        </select>
        <button class="delete-habit">Удалить</button>
      </li>
    `);

    // Обработчик для кнопки удаления
    habitElement.querySelector('.delete-habit').addEventListener('click', () => {
      onDelete(habit.id);
    });

    // Обработчик для кнопки редактирования
    habitElement.querySelector('.edit-habit').addEventListener('click', () => {
      const newName = prompt('Введите новое название привычки', habit.name);
      if (newName && newName.trim() !== '') {
        onEdit(habit.id, { name: newName.trim() });
      }
    });

    // Обработчик для изменения статуса
    habitElement.querySelector('.status-select').addEventListener('change', (event) => {
      onStatusChange(habit.id, { status: event.target.value });
    });

    this.getElement().querySelector('#habit-list').appendChild(habitElement);
  }

  removeElement() {
    this.element = null;
  }
}
