// Modal.js

import React, { useEffect, useState } from 'react';
import './Modal.css';
// import Modal_C from './Modal_C';
import Modal_C from './Modal_C';
import { ScaleLoader } from 'react-spinners';


const Modal = ({ isOpen, onClose, switchToAllContacts, switchToUSContacts, modalData, handleSearchChange, handleEnterKey, searchTerm, loadingStatus, onScroll, handleScroll }) => {
    const { modalTitle, data } = modalData;
    const [onlyEven, setOnlyEven] = useState(false);
    const [selectedContactData, setSelectedContactData] = useState({});
    const [modalCVisible, setModalCVisible] = useState(false);

    const filteredData = onlyEven ? data.filter(item => item.id % 2 === 0) : data;

    useEffect(() => {
        const modalContent = document.getElementById('modal-content');

        // Attach the scroll event listener to the modal content
        if (modalContent) {
            modalContent.addEventListener('scroll', onScroll);
        }

        // Remove the event listener when the Modal is closed
        return () => {
            if (modalContent) {
                modalContent.removeEventListener('scroll', onScroll);
            }
        };
    }, [onScroll]);

    const handleContactItemClick = (ClickContact) => {
        // const { phone, country} = ClickContact;
        console.log(ClickContact);
        setSelectedContactData(ClickContact);
        setModalCVisible(true);
    };

    const closeModal = () => {
        setModalCVisible(false);
    };

    return (
        <>
            {isOpen && (
                <div className="overlay" onClick={onClose}>
                    <div className="modelDesign" onClick={(e) => e.stopPropagation()}>
                        <h2 className='text-center'>{modalTitle}</h2>
                        <hr className="bg-secondary my-2" />

                        <div className="d-flex justify-content-end mb-3">
                            <div className="col-6">
                                <input
                                    type="tel"
                                    className="form-control"
                                    aria-label="Sizing example input"
                                    aria-describedby="inputGroup-sizing-sm"
                                    placeholder="Search by Cell No."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    onKeyPress={handleEnterKey}
                                />
                            </div>
                        </div>
                        {loadingStatus ? (
                            <div className="d-flex justify-content-center">
                                <ScaleLoader
                                    color="#eda005"
                                    loading={loadingStatus}
                                    loadingStatus
                                    margin={2.5}
                                    radius={2}
                                    speedMultiplier={1.25}
                                    width={8} />
                            </div>
                        ) : (
                            <div style={{ maxHeight: '300px', overflowY: 'auto' }} id="modal-content" >
                                <table className="table">
                                    <thead style={{ position: 'sticky', top: 0, background: 'white' }}>
                                        <tr>
                                            <th>ID</th>
                                            <th>Country Name</th>
                                            <th>Phone Number</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredData &&
                                            filteredData.map((item, idx) => (
                                                <tr
                                                    className="custom-pointer"
                                                    key={idx}
                                                    onClick={() => handleContactItemClick(item)}
                                                >
                                                    <td>{item.id}</td>
                                                    <td>{item?.country?.name}</td>
                                                    <td>{item?.phone}</td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        )}


                        <div className="form-check mb-2">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="onlyEvenCheckbox"
                                checked={onlyEven}
                                onChange={() => setOnlyEven(!onlyEven)}
                            />
                            <label className="form-check-label" htmlFor="onlyEvenCheckbox">
                                Only even
                            </label>
                        </div>
                        <div className='d-flex gap-3'>
                            <button className="btn btn-sm text-white" style={{ backgroundColor: '#46139f' }} onClick={switchToAllContacts}>All Contacts</button>
                            <button className="btn btn-sm text-white" style={{ backgroundColor: '#ff7f50' }} onClick={switchToUSContacts}>US Contacts</button>
                            <button className="btn btn-sm" style={{ backgroundColor: '#fff', borderColor: '#46139f', borderWidth: '2px', borderStyle: 'solid' }} onClick={onClose}>Close</button>
                        </div>

                    </div>
                    <Modal_C
                        selectedContactData={selectedContactData}
                        modalCVisible={modalCVisible}
                        closeModal={closeModal}

                    />
                </div>
            )}


        </>
    );
};

export default Modal;
