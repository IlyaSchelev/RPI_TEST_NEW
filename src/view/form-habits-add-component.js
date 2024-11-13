import { createElement } from '../framework/render.js';

function createFormHabitAddComponentTemplate() {
    return `
        <div class="book-form">
            <div class="habit-form">
            <h2>Добавить Привычку</h2>
            <form id="habit-form">
                <label for="habit-name">Название привычки:</label>
                <input type="text" id="habit-name" placeholder="Например, Утренняя зарядка" required />
                
                

                <label for="habit-status">Статус привычки:</label>
                <select id="habit-status" required>
                    <option value="active">Выполнена</option>
                    <option value="completed">Не выполнена</option>
                </select>

                <button type="submit">Добавить Привычку</button>
            </form>
        </div>
        </div>
    `;
}

export default class FormHabitAddComponent {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return createFormHabitAddComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  setSubmitHandler(callback) {
    this.getElement().querySelector('#habit-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const habitName = this.getElement().querySelector('#habit-name').value.trim();
      if (habitName) {
        callback(habitName);
        this.getElement().querySelector('#habit-form').reset();
      }
    });
  }

  removeElement() {
    this.element = null;
  }
}
