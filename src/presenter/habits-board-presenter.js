// habits-board-presenter.js
import HabitsModel from '../model/habits-model.js';
import HabitsListComponent from '../view/habits-list-component.js';
import FilterHabitComponent from '../view/filter-habits-component.js';  // Компонент фильтрации

export default class HabitsBoardPresenter {
  constructor({ boardContainer, formContainer }) {
    this.boardContainer = boardContainer;
    this.formContainer = formContainer;
    this.habitsModel = new HabitsModel();
    this.habitsListComponent = new HabitsListComponent();
    this.filterStatus = 'all'; // Статус фильтра по умолчанию
  }

  init() {
    this.renderFilterComponent();
    this.renderHabitsList();
    this.setAddHabitHandler();
  }

  renderFilterComponent() {
    const filterComponent = new FilterHabitComponent();
    filterComponent.getElement().querySelector('#status-filter').addEventListener('change', (event) => {
      this.filterStatus = event.target.value;
      this.renderHabitsList(); // Обновить список привычек при изменении фильтра
    });
    this.boardContainer.appendChild(filterComponent.getElement());
  }

  renderHabitsList() {
    const habits = this.habitsModel.getHabits(this.filterStatus);
    this.habitsListComponent.getElement().querySelector('#habit-list').innerHTML = ''; // Очистить текущий список
    habits.forEach(habit => this.habitsListComponent.renderHabit(habit, this.handleDeleteHabit.bind(this), this.handleEditHabit.bind(this), this.handleStatusChange.bind(this)));
    this.boardContainer.appendChild(this.habitsListComponent.getElement());
  }

  handleDeleteHabit(habitId) {
    this.habitsModel.removeHabit(habitId);
    this.renderHabitsList(); // Обновить отображение списка
  }

  handleEditHabit(habitId, updatedData) {
    this.habitsModel.updateHabit(habitId, updatedData);
    this.renderHabitsList(); // Обновить отображение списка
  }

  handleStatusChange(habitId, updatedData) {
    this.habitsModel.updateHabit(habitId, updatedData);
    this.renderHabitsList(); // Обновить отображение списка
  }

  setAddHabitHandler() {
    const formComponent = document.querySelector('.habit-form');
    formComponent.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const habitName = formComponent.querySelector('#habit-name').value.trim();
      if (habitName) {
        const newHabit = {
          id: Date.now().toString(), // Уникальный ID на основе времени
          name: habitName,
          status: 'nodone',
        };
        this.habitsModel.addHabit(newHabit);
        formComponent.querySelector('form').reset();
        this.renderHabitsList(); // Обновить список привычек
      }
    });
  }
}
