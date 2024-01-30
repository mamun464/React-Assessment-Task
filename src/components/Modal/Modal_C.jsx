import React from 'react';

const Modal_C = ({ closeModal, modalCVisible, selectedContactData }) => {

    const { phone, country } = selectedContactData;
    // console.log(phone?.split("-")[0]);
    // console.log(country?.name);
    const countryCode = phone?.split("-")[0];

    return (
        <>
            {modalCVisible && (
                <div className="overlay" onClick={closeModal}>
                    <div className="modelDesign" onClick={(e) => e.stopPropagation()}>
                        <h4 className='text-center'>Modal-C</h4>
                        <hr className="bg-secondary my-2" />

                        <h5 className='mt-5' style={{ fontWeight: 'lighter' }}><strong>{country?.name}</strong>'s Telephone Country Code is: <strong>{countryCode}</strong></h5>



                        <div className='d-flex gap-3 mt-5'>
                            {/* <button className="btn btn-sm text-white" style={{ backgroundColor: '#46139f' }} onClick={switchToAllContacts}>All Contacts</button>
                            <button className="btn btn-sm text-white" style={{ backgroundColor: '#ff7f50' }} onClick={switchToUSContacts}>US Contacts</button> */}
                            <button className="btn btn-sm" style={{ backgroundColor: '#fff', borderColor: '#46139f', borderWidth: '2px', borderStyle: 'solid' }} onClick={closeModal}>Close</button>
                        </div>

                    </div>

                </div>
            )}


        </>
    );
};

export default Modal_C;