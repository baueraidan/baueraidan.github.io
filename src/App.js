import React, { PureComponent } from 'react'
import './App.css';
import wave1 from './assets/wave1.svg';
import wave2 from './assets/wave2.svg';
import wave3 from './assets/wave3.svg';
import backgroundBlob from './assets/background-blob.svg'
import me from './media/me.jpg';
import projects from './projects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

class Nav extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      scrollY: 0
    }
    this.handleScroll = this.handleScroll.bind(this)
  }
  handleScroll() {
    this.setState({ scrollY: window.scrollY })
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false)
  }

  render() {
    return (
      <nav
        className="Navigation"
        style={{
          backgroundColor: `rgba(255,255,255,${this.state.scrollY <= 0 ? 0 : 0.95 })`
        }}
      >
        <div className="NavigationInner">
          <a
            href="/"
            style={{
              fontWeight: 800,
              textDecoration: 'none',
              color: '#5e858f',
              fontSize: '14pt',
              marginLeft: '15px',
            }}
          >
            <span>A</span>
            <div
              className="CollapsedName"
              style={{ maxWidth: this.state.scrollY <= 0 ? '0px' : '60px' }}
            >idan&nbsp;</div>
            <span>B</span>
            <div
              className="CollapsedName"
              style={{ maxWidth: this.state.scrollY <= 0 ? '0px' : '60px' }}
            >auer</div>
          </a>
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}
          >
            <a className="NavigationLink" href="https://www.linkedin.com/in/aidanbauer/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </nav>
    );
  }
}

function Header() {
  return (
    <section className="HeaderWrapper">
      <div className="Header">
        <div className="HeaderContent">
          <div className="HeaderLeft">
            <h1 className="Title">Aidan Bauer</h1>
            <p className="Content">
            Hi, I’m Aidan. I’m an engineer at SpaceX working on the Starlink mobile app and Starlink.com user experience. These are some of my hobby projects. :-)
            </p>
          </div>

          <div className="HeaderRight">
            <img
              className="BackgroundBlob"
              src={backgroundBlob}
              alt='Aidan Bauer'
            />
            <img
              className="Portrait"
              src={me}
              alt='Aidan Bauer'
            />
          </div>

        </div>
      </div>
      <img src={wave1} alt="Wave" />
    </section>
  )
}

function Project(props) {
  return (
    <section
      className="Project"
      style={{ backgroundColor: props.index % 2 === 0 ? '#FFF' : '#F6F7FB' }}
    >
      <div className={`ProjectContent ${props.index % 2 === 0 ? 'Even' : 'Odd'}`}>
        <div className="ProjectPreview">
          <div className="DeviceWrapper">
            {props.videoSrc && (
              <video className="ProjectVideo" loop autoPlay muted playsInline>
                <source src={props.videoSrc} />
              </video>
            )}
            {(!props.videoSrc && props.imgSrc) && (
              <img className="ProjectVideo" src={props.imgSrc} alt={props.title} />
            )}
          </div>
        </div>
        <div className="ProjectInfo">
          <h2 className="ProjectTitle">
            <span
              style={{ fontStyle: props.title ? 'normal' : 'italic' }}
            >
              {props.title ? props.title : 'Untitled'}
            </span>
            <span style={{ opacity: 0.4, fontWeight: 500 }}> / {props.platforms.join(', ')}</span>
          </h2>
          <h3 className="ProjectSubtitle">{props.subtitle}</h3>
          {props.text.map((text, index) => (
            <p key={index} className="Content">{text}</p>
          ))}
          <p className="ProjectTechnologies">Created with {props.technologies.join(', ')}</p>
        </div>
      </div>

      <img
        src={props.index % 2 === 0 ? wave3 : wave2}
        alt="Wave"
        style={{
          position: 'absolute',
          bottom: '0',
          pointerEvents: 'none',
        }}
      />
    </section>
  )
}

function Footer() {
  return (
    <footer className="Footer">
      <span>Made with </span>
      <span style={{ margin: '0 2px' }}><FontAwesomeIcon icon={faHeart} /></span>
      <span> by </span>
      <a href="/" style={{ fontWeight: 'bold', color: 'inherit', textDecoration: 'none' }}>Aidan Bauer</a>
      <span> in Seattle, WA</span>
    </footer>
  )
}

class App extends PureComponent {

  render() {
    return (
      <div className="App">
        <Nav />
        <Header />
        {projects.map((project, index) => (
          <Project
            key={index}
            index={index}
            title={project.title}
            platforms={project.platforms}
            subtitle={project.subtitle}
            buttons={project.buttons}
            videoSrc={project.videoSrc}
            imgSrc={project.imgSrc}
            text={project.text}
            technologies={project.technologies}
          />
        ))}
        <Footer />
      </div>
    );
  }
}

export default App;
