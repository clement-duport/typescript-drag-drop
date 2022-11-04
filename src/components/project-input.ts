import { Component} from '../components/base-component';
import {Validatable, validate} from '../utils/validation'
import { projectState } from '../state/project-state';
import { autobind } from '../decorators/autobind';

//ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputEL: HTMLInputElement;
    descInputEL: HTMLInputElement;
    peopleInputEL: HTMLInputElement;

    constructor () {
        super('project-input', 'app', true, 'user-input')

        this.titleInputEL = this.element.querySelector('#title') as HTMLInputElement;
        this.descInputEL = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEL = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();

    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    renderContent() {}

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputEL.value;
        const description = this.descInputEL.value;
        const people = this.peopleInputEL.value;

        const titleValidatable: Validatable = {
            value: title,
            required: true,
        }
        const descriptionValidatable: Validatable = {
            value: description,
            required: true,
            minLength: 5
        }
        const peopleValidatable: Validatable = {
            value: +people,
            required: true,
            min: 1,
            max: 5
        }
        

        if (
          !validate(titleValidatable) ||
          !validate(descriptionValidatable) ||
          !validate(peopleValidatable)
        ) {
          alert('invalid input');
          return;
        } else {
            return [title, description, +people];
        }
    }

    private clearInputs() {
        this.titleInputEL.value = '';
        this.descInputEL.value = '';
        this.peopleInputEL.value = '';
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

}