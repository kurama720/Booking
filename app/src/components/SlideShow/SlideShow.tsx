import React, {useState} from 'react';
import Modal from "../Modal/Modal";
import SliderApartmentPhotos from "./SliderApartmentPhotos/SliderApartmentPhotos";

const SlideShow = () => {
    const [showSlider,setShowSlider] = useState<boolean>(false)

    const openModal = () => {
        setShowSlider(true)
    }

    return (
        <>
            <button onClick={openModal}>Show all photos</button>
            <Modal active={showSlider} setActive={setShowSlider}>
                <SliderApartmentPhotos setActive={setShowSlider}/>
            </Modal>
        </>
    );
};

export default SlideShow;