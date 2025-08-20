"use client";

import BootstrapClientLoader from '../components/BootstrapClientLoader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProviders({ children }) {
    return (
        <>
            <BootstrapClientLoader />
            <ToastContainer position="top-left" />
            {children}
        </>
    );
}
