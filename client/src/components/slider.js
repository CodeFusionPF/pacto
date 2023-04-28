import style from '../styles/Slider.module.css';
import { Button, Carousel } from 'react-bootstrap';


export default function Slider(){

    return (
        <div className={style.container}>  
            <Carousel className={style.slider}>
                <Carousel.Item className={style.sliderItem}>
                    <img
                    className="d-block w-100"
                    src="/image/slider1.avif"
                    alt=""
                    />
                    <Carousel.Caption className={style.sliderTitle}>
                    <h3>Encuentra</h3>
                    <p>Ropa de segunda mano en buen estado!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={style.sliderItem}>
                    <img
                    className="d-block w-100"
                    src="/image/slider2.avif"
                    alt=""
                    />

                    <Carousel.Caption className={style.sliderTitle}>
                    <h3>Compra</h3>
                    <p>Teclados, laptops y mucho más!</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className={style.sliderItem}>
                    <img
                    className="d-block w-100"
                    src="/image/slider3.avif"
                    alt=""
                    />

                    <Carousel.Caption className={style.sliderTitle}>
                    <h3>Vende</h3>
                    <p>Tus productos que puedan reutilizarse!</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>  
    )
};