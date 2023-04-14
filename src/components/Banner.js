import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "", "", "" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">FÁBRICA DE TECNOLOGIAS TURING</span>
                <h1> Seja bem vindo ao portifólio da FTT </h1>
                  <p>A Fábrica de Tecnologias Turing (FTT) é um laboratório empresa, estruturado em três núcleos (Fábrica de Software, Núcleo de Capacitação e Núcleo de Pesquisa), e tem por objetivo formar alunos com visão mercadológica.<br></br> Aqui são desenvolvidos projetos reais, a partir de parcerias locais e internacionais, fazendo uso de metodologias, padrões, técnicas e ferramentas inovadoras requeridas pelo mercado de trabalho.<br></br> Assim, a FTT, contribui para a integralização do perfil profissional do aluno e, atualmente, é fonte de recrutamento de profissionais.<br></br>

Essa é uma estrutura madura, pois desde 2006, alunos e professores dos cursos de computação exercitam as práticas da Engenharia de Software na produção de sistemas.<br></br> Tanto os clientes como os projetos são reais, o que permite a vivência profissional dos envolvidos, aproximando as teorias e as práticas pedagógicas das necessidades do mercado.

</p>
                
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
