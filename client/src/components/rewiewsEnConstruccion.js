
import rewiews from "@/pages/api/rewiews";
import { Button, Card, Carousel } from 'react-bootstrap';
import { useState } from 'react';
import style from '../styles/Rewiews.module.css';

export default function Rewiews() {

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    return (
        <div className={style.rewiews}>

            <Carousel activeIndex={index} onSelect={handleSelect}>
                {rewiews.map((item) => (
                    <Carousel.Item key={item.id}>
                        <Card>
                            <Card.Title className={style.title}><h1>Rewiews</h1></Card.Title>
                            <Card.Img src={item.image} className={style.image}/>
                            <Card.Body>
                                <Card.Title className={style.title}><h2>{item.name}</h2></Card.Title>
                                <Card.Text className={style.title}><p>{item.comment}</p></Card.Text>
                            </Card.Body>
                        </Card>
                    </Carousel.Item>
                ))}
            </Carousel>

        </div>

    );

}


