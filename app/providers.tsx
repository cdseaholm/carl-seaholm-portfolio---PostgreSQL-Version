 // app/providers.tsx
'use client'

import {NextUIProvider} from '@nextui-org/react'
import {ModalProvider} from '@/app/context/modal/modalContext'
import { SetStateAction, useState } from 'react';
import { useSession } from '@/app/context/session/SessionContext';
import { useRouter } from 'next/navigation';
import login from '@/lib/auth/login/login';
import { logoutAuth } from '@/lib/auth/logout/logout';
import ModalLogin from '@/components/modals/auth/login/loginModal';
import { usePathname } from 'next/navigation';
import createUser from '@/lib/prisma/actions/user/create/createUser';
import ModalSignUp from '@/components/modals/auth/signup/signupModal';
import AlertModal from '@/components/modals/alertModal/alertmodal';
import { HobbyProvider } from './context/hobby/hobbyModalContext';
import LogSessionModal from '@/components/modals/hobbyModal/logsession';

export function Providers({children}: { children: React.ReactNode }) {

  //states  
  const [showModal, setShowModal] = useState(false);
  const [modalSignUpOpen, setModalSignUpOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertParent, setAlertParent] = useState('');
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [filterItem, setFilterItem] = useState('');
  const [categoryPassed, setCategoryPassed] = useState('');
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openLogSessionModal, setOpenLogSessionModal] = useState(false);


  //variables

  const { setSession, setUser, user, session, logout } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  //functions

  const handleLogout = async () => {
    if (session) {
      try {
        const loggingOut = await logoutAuth();
        if (loggingOut.valueOf() === true) {
          logout();
          router.replace('/');
        } else {
          setAlertMessage('Already logged out');
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage('An error occurred. Please try again.');
        setShowAlert(true);
        console.log('error logging out', error);
      }
    }
  }

  //better to directly send to dashboard and auto signin or ask for login after?
  const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const createAccount = await createUser({ formData });
    if (typeof createAccount !== 'string' && typeof createAccount !== 'undefined') {
        console.log('Account created', createAccount);
        setModalSignUpOpen(false);
        setShowModal(true); //ask for login after sign up
    } else if (typeof createAccount === 'string') {
        setAlertMessage(createAccount);
        setShowAlert(true);
        return;
    } else {
        setAlertMessage('An error occurred. Please try again.');
        setShowAlert(true);
        return;
    }
  };

  const swapAuthDesire = async () => {
    if (modalSignUpOpen) {
      setModalSignUpOpen(false);
      setShowModal(true);
    } else if (showModal) {
      setShowModal(false);
      setModalSignUpOpen(true);
    }
  };

  return (
    <ModalProvider modalOpen={showModal} handleLogout={handleLogout} setModalOpen={setShowModal} setModalSignUpOpen={setModalSignUpOpen} modalSignUpOpen={modalSignUpOpen} handleSignUpSubmit={handleSignUpSubmit} swapAuthDesire={swapAuthDesire} showAlert={showAlert} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} alertMessage={alertMessage} alertParent={alertParent} setAlertParent={setAlertParent} alertConfirm={alertConfirm} setAlertConfirm={setAlertConfirm}>
      <ModalLogin/>
      <ModalSignUp/>
      <AlertModal/>
      <HobbyProvider openAddModal={openAddModal} setOpenAddModal={setOpenAddModal} filterItem={filterItem} setFilterItem={setFilterItem} categoryPassed={categoryPassed} setCategoryPassed={setCategoryPassed} openCategoryModal={openCategoryModal} setOpenCategoryModal={setOpenCategoryModal} openLogSessionModal={openLogSessionModal} setOpenLogSessionModal={setOpenLogSessionModal}>
        <LogSessionModal show={openLogSessionModal}/>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </HobbyProvider>
    </ModalProvider>
  )
}