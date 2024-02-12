import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../../assets/img/header-img.png";
import '../../Css/Home.css'
import {
  BrowserRouter as Router,
  Link 
} from "react-router-dom";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Project", "Monitoring", "System"];
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 2000;

  useEffect(() => {
    let intervalId = setInterval(() => {
      Ticker();
    }, delta);

    return () => {
      clearInterval(intervalId);
    };
  }, [text, delta]);

  const Ticker = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updateText;

    if (isDeleting) {
      updateText = fullText.substring(0, text.length - 1);
    } else {
      updateText = fullText.substring(0, text.length + 1);
    }

    setText(updateText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updateText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updateText === '') {
      setIsDeleting(false);
      setLoopNum((prevLoopNum) => prevLoopNum + 1);
    } else {
      setLoopNum((prevLoopNum) => prevLoopNum);
    }

    setDelta(300);
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">WELCOME TO...</span>
            <h1>
              Hi! Welcome To Median <span className="wrap">{text}</span>
            </h1>
            <p>
              "Median Project Monitoring System: Platform terintegrasi untuk
              pemantauan proyek secara real-time, memungkinkan pelacakan
              kemajuan, alokasi sumber daya, identifikasi risiko, dan kolaborasi
              tim proyek dengan efisien."
            </p>
            <button><span><Link to='/login' style={{ color: 'white' }}>Login<ArrowRightCircle size={25} /></Link></span></button>
           
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={headerImg} alt="Header Img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};