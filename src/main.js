// main.js
import { render, RenderPosition } from './framework/render.js';
import HabitsBoardPresenter from './presenter/habits-board-presenter.js';
import FormHabitAddComponent from './view/form-habits-add-component.js';

const bodyContainer = document.querySelector('.board-app');
const formContainer = document.querySelector('.add-book');

// Создаем экземпляр HabitsBoardPresenter
const habitsBoardPresenter = new HabitsBoardPresenter({ boardContainer: bodyContainer });

render(new FormHabitAddComponent(), formContainer, RenderPosition.BEFOREBEGIN);
habitsBoardPresenter.init();
