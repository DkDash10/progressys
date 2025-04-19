import { useState } from 'react';
import { ModalContext } from './contexts/modalContext';
import ContactFormModal from './components/contactForm/ContactFormModal';

export const ModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
      <ContactFormModal />
    </ModalContext.Provider>
  );
};