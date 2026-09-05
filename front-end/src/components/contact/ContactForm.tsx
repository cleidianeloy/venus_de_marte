import { useState, type ChangeEvent, type SubmitEvent } from 'react';
import axios, { AxiosError } from 'axios';
import { showModal, FEEDBACK_TYPES } from '../modal/Modal';
import '@fancyapps/ui/dist/fancybox/fancybox.css';

// Interface do payload enviado ao backend
interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// Interface da resposta de erro do backend (ex: status 400, 429 ou 500)
interface ApiErrorResponse {
  error: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const fieldMap: Record<string, keyof ContactFormData> = {
      'contact-name': 'name',
      'contact-email': 'email',
      'message': 'message'
    };

    const targetField = fieldMap[name] || name;

    setFormData((prev) => ({
      ...prev,
      [targetField]: value
    }));
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação local prévia
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showModal(FEEDBACK_TYPES.WARNING, 'Por favor, preencha todos os campos antes de enviar.');
      return;
    }

    setIsLoading(true);

    try {
      // URL do backend no Render
      const API_URL = 'https://venus-de-marte-backend.onrender.com/api/contact';

      await axios.post(API_URL, formData);

      // Abre o modal de Sucesso
      showModal(FEEDBACK_TYPES.SUCCESS, 'Sua mensagem foi enviada com sucesso. Em breve entraremos em contato.');

      // Limpa os campos do formulário
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ApiErrorResponse>;

        if (axiosError.response && axiosError.response.data?.error) {
            if(axiosError.response.status === 429) {
              showModal(FEEDBACK_TYPES.ERROR, 'Você está enviando mensagens muito rapidamente. Por favor, aguarde um momento antes de tentar novamente.');
            }else if(axiosError.response.status === 400) {
              showModal(FEEDBACK_TYPES.ERROR, 'Por favor, preencha todos os campos antes de enviar.');
            }else if(axiosError.response.status === 500){
              showModal(FEEDBACK_TYPES.ERROR, 'Ocorreu um erro inesperado. Tente novamente mais tarde.');
            }

        } else {
          showModal(FEEDBACK_TYPES.ERROR, 'Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        }
      } else {
        showModal(FEEDBACK_TYPES.ERROR, 'Ocorreu um erro inesperado.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="name input-container">
        <label htmlFor="contact-name">Nome</label>
        <input
          type="text"
          id="contact-name"
          name="contact-name"
          placeholder="Nome Completo"
          value={formData.name}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="email input-container">
        <label htmlFor="contact-email">Email</label>
        <input
          type="text"
          id="contact-email"
          name="contact-email"
          placeholder="Seu email"
          value={formData.email}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div className="message input-container">
        <label htmlFor="contact-message">Mensagem</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          cols={50}
          placeholder="Sua mensagem"
          value={formData.message}
          onChange={handleChange}
          disabled={isLoading}
        ></textarea>
      </div>

      <div className="submit">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Enviando...' : 'Enviar'}
        </button>
      </div>
    </form>
  );
}