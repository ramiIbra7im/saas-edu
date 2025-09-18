"use client";

import BootstrapClientLoader from '../components/BootstrapClientLoader';
import 'react-toastify/dist/ReactToastify.css';

export default function ClientProviders({ children }) {
    return (
        <>
            <BootstrapClientLoader />
            {children}
        </>
    );
}
