import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import './scss/modal.scss';
export const FEEDBACK_TYPES = {
    SUCCESS: {
        title: 'Sucesso',
        className: 'success',
        icon: 'fa-solid fa-circle-check'
    },
    ERROR: {
        title: 'Ops',
        className: 'error',
        icon: 'fa-solid fa-circle-xmark'
    },
    WARNING: {
        title: 'Atenção',
        className: 'warning',
        icon: 'fa-solid fa-circle-exclamation'
    },
    INFO: {
        title: 'OK',
        className: 'info',
        icon: 'fa-solid fa-circle-check'
    },
} as const;

export type FeedbackType = typeof FEEDBACK_TYPES[keyof typeof FEEDBACK_TYPES];

//TODO: falta estilizar o modal
export const showModal = (type: FeedbackType, message: string) => {

    Fancybox.show([
        {
            type: 'html',
            html: `
                <div class="fancybox-feedback-modal ${type.className}">
                    <div class="fancybox-feedback-modal-flex">
                        <div class="fancybox-feedback-modal-icon">
                            <i class="${type.icon}"></i>
                        </div>
                        <div class="fancybox-feedback-modal-content">
                            <h1>${type.title}</h1>
                            <p>${message}</p>
                        </div>
                    </div>
                </div>
            `
        }
    ]);
};