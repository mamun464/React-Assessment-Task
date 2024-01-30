import React, { useEffect, useRef, useState } from 'react';
import Modal from './Modal/Modal';
// import { ScaleLoader } from 'react-spinners';


const Problem2 = () => {
    const [previousPath, setPreviousPath] = useState('/');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModal, setCurrentModal] = useState('');
    const modalTitleRef = useRef(null);
    const [modalData, setModalData] = useState({
        modalTitle: '',
        data: [],
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingStatus, setLoadingStatus] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const handleScroll = () => {
        const modalContent = document.getElementById('modal-content');
        // console.log("Scroll content")

        if (modalContent) {
            const tolerance = 2;
            const isAtBottom = modalContent.scrollTop + modalContent.clientHeight + tolerance >= modalContent.scrollHeight;

            if (isAtBottom) {
                // User has scrolled to the bottom, load the next page
                fetchNextPage();
            }
            else {
                console.log("in side else! but not bottom");
                console.log(`Scroll:${modalContent.scrollTop + modalContent.clientHeight}`);
                console.log(`Scroll Height:${modalContent.scrollHeight}`);

            }
        } else {
            console.log("outer Else");
        }

    };


    const debounce = (func, delay) => {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    const fetchData = async (searchTerm, page = 1) => {
        try {
            let apiUrl = '';
            const selectedCountry = 'United%20States';

            if (currentModal === 'A') {
                apiUrl = 'https://contact.mediusware.com/api/contacts/';
                console.log("Fetchinhg data from modal a--------------");
            } else if (currentModal === 'B') {
                apiUrl = `https://contact.mediusware.com/api/country-contacts/${selectedCountry}/`;

                console.log("Fetchinhg data from modal B--------------");
            }

            setLoadingStatus(true);

            const searchApiUrl = `${apiUrl}?search=${searchTerm}&page=${page}`;
            console.log("API: ", searchApiUrl);
            const response = await fetch(searchApiUrl);
            const data = await response.json();
            console.log("Data fetch: ", data);
            setLoadingStatus(false);
            if (currentModal !== modalTitleRef.current) {
                // If modal has changed, set the new modalTitle and reset data
                console.log("Resting The model: ", modalTitleRef.current, " and Set the new modalTitle: ", currentModal);
                setModalData({
                    modalTitle: currentModal === 'A' ? 'Modal-A' : 'Modal-B',
                    data: data?.results || [],
                });
                setCurrentPage(1)
                console.log("Page reset: ", currentPage);
                modalTitleRef.current = currentModal;
            } else {
                // If modal hasn't changed, accumulate the data
                setModalData(prevData => ({
                    modalTitle: prevData.modalTitle,
                    data: page === 1 ? data?.results || [] : [...prevData.data, ...data?.results || []],
                }));
            }



        } catch (error) {
            console.log("...............");
            console.error('Error fetching data:', error);
        }
    };

    const fetchNextPage = () => {
        fetchData(searchTerm, currentPage + 1);
        setCurrentPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        fetchData(searchTerm);
    }, [currentModal, searchTerm]);

    const delayedFetchData = debounce(fetchData, 100);

    // useEffect(() => {
    //     console.log(currentModal);
    //     fetchData(searchTerm);

    // }, [currentModal, searchTerm]);



    const switchToAllContacts = () => {
        console.log('Switching to Modal A');
        setCurrentModal('A');
        window.history.pushState({ modalOpen: true }, '', `${previousPath}/Modal-A`);

    };

    const switchToUSContacts = () => {
        console.log('Switching to Modal B');
        setCurrentModal('B');
        window.history.pushState({ modalOpen: true }, '', `${previousPath}/Modal-B`);


    };

    const openModal = (C_modal) => {
        setCurrentModal(C_modal);

        // setIsModalOpen(true);
        // Save the current path before opening the modal
        const currentPath = window.location.pathname;
        setPreviousPath(currentPath)
        // Change the URL without reloading the page
        window.history.pushState({ modalOpen: true }, '', `${currentPath}/Modal-${C_modal}`);

        setIsModalOpen(true);

        // Add an event listener to handle the back button
        window.onpopstate = (event) => {
            if (event.state && event.state.modalOpen) {
                setIsModalOpen(false);
            }
        };

    };

    const closeModal = () => {
        window.history.pushState(null, '', previousPath);
        setIsModalOpen(false);
        setSearchTerm('')
    };

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setSearchTerm(value);
        console.log(`value: ${value}`);
        console.log(`searchTerm: ${searchTerm}`);
        delayedFetchData(value);
    };

    const handleEnterKey = (event) => {
        if (event.key === 'Enter') {
            fetchData(searchTerm);
            // console.log("Enter:");
            // console.log(searchTerm);
        }
    };



    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

                <div className="d-flex justify-content-center gap-3">
                    <button className="btn btn-lg btn-outline-primary" type="button" onClick={() => openModal('A')}>
                        All Contacts
                    </button>
                    <button className="btn btn-lg btn-outline-warning" type="button" onClick={() => openModal('B')}>
                        US Contacts
                    </button>
                    <Modal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        switchToAllContacts={switchToAllContacts}
                        switchToUSContacts={switchToUSContacts}
                        modalData={modalData}
                        handleEnterKey={handleEnterKey}
                        handleSearchChange={handleSearchChange}
                        searchTerm={searchTerm}
                        loadingStatus={loadingStatus}
                        onScroll={handleScroll}
                    // handleScroll={handleScroll}
                    />
                </div>

            </div>

        </div>
    );
};

export default Problem2;