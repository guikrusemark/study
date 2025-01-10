'use client'

import { forwardRef, useImperativeHandle, useRef } from "react"

import styles from './modal.module.css'

export const Modal = forwardRef(({ children }, ref) => {

    const dialogRef = useRef(null)

    const closeModal = () => {
        dialogRef.current.close()
    }

    const openModal = () => {
        dialogRef.current.showModal()
    }

    useImperativeHandle(ref, () => {
        return {
            closeModal,
            openModal
        }
    })

    return (<dialog className={styles.dialog} ref={dialogRef}>
        <header className={styles.header}>
            <button onClick={closeModal}>
                X
            </button>
        </header>
        {children}
    </dialog>)
})