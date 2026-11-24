import { useState, useEffect } from 'react';
import profileImage from './assets/images/formal.jpeg';
import DecryptedText from './components/DecryptedText/DecryptedText';
import ElectricLogo from './components/ElectricLogo/ElectricLogo';
import ShapeWaves from './components/ShapeWaves/ShapeWaves';
import TechText from './components/TechText/TechText';
import './styles/App.css';


function App() {
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

if (isLoading) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#000000',
        position: 'relative', 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        overflow: 'hidden'
      }}>
        

          <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: -1 }}>
            <ShapeWaves
              text=""
              fontFamily='Geist, "Geist Sans", system-ui, sans-serif'
              fontWeight={500}
              textSize={0.6}
              shapes="mixed"
              cellSize={6}
              dotSize={0.42}
              color="#8b1010"
              hoverColor="#de0000"
              backgroundColor="#030303"
              speed={3.8}
              scale={0.75}
              contrast={1}
              brightness={0.17}
              flow={0.1}
              direction={0}
              fade={0}
              interactive
              splashRadius={18}
              splashStrength={0.4}
              glow={0.9}
              intro={true}
              introDuration={1.6}
              paused={false}
            />
          </div>

          <div style={{ 
            position: 'absolute', 
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>

          <div style={{ width: '100%', height: '300px' }}>
            <TechText 
              text="fathurVoid" 
              color="#9c0000" 
              accentColor="#794848"
              fontSize={150}      
              fontFamily="monospace" 
              fontWeight={900} 
              lineStyle="dashed" 
              strokeWidth={1.5}
              speed={1.8}   
            />
          </div>

          <div style={{ 
            fontFamily: 'monospace', 
            fontSize: '15px', 
            color: '#a10000', 
            marginTop: '2px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px'
          }}>
            <DecryptedText 
              text="root@fathurVoid:~#" 
              animateOn="view" 
              speed={80} 
              sequential={true} 
              revealDirection="end" 
            />
            <DecryptedText 
              text="./init_portfolio.sh" 
              animateOn="view" 
              speed={90} 
              sequential={true} 
              revealDirection="end" 
            />
            <DecryptedText 
              text="[ OK ] Loading core modules..." 
              animateOn="view" 
              speed={105} 
              sequential={true} 
              revealDirection="end" 
            />
          </div>
        </div>

      </div>
    );
  }

  return (
    <>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <ElectricLogo
          src="/favicon.png"
          color="#000000"
          glowColor="#7f0000"
          scale={0.2}
          strands={6}
          bend={1.35}
          crackle={1.5}
          arcs={0.95}
          speed={2.5}
          interactive
          intensity={1}
          glow={0.75}
          thickness={2.2}
          flicker={0.6}
          fill={0}
          cursorIntensity={0.45}
          cursorRadius={100}
      />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <header>
          <h1>fathurVoid</h1>
          <nav>
            <ul>
              <li><a href="#profil"></a></li>
              <li><a href="#jadwal"></a></li>
              <li><a href="#contact"></a></li>
            </ul>
          </nav>
        </header>

      <main>
        <section id="profil">
          <h2>Profile</h2>

          <div className="profil-content">
            <img
              src={profileImage}
              alt="Personal Profile Picture"
              width="200"
            />

            <div className="profil-text">
              <h3>About Me</h3>

              <p>
                Farid is an Informatics student at UIN Sunan Gunung Djati
                Bandung with a strong interest in technology and software
                development. His interests include artificial intelligence
                and machine learning, networking, databases, Linux, and
                cybersecurity. He develops his skills through academic
                projects and personal experiments, with a learning approach
                centered on hands-on practice, problem-solving,
                troubleshooting, and understanding how systems work under
                the hood. Currently, he is exploring different areas of
                Informatics to determine his future specialization while
                continuously expanding his technical knowledge and
                experience.
              </p>
            </div>
          </div>
        </section>

        <hr />

        <section id="jadwal">
          <h2>Academic</h2>

          <h3>Current Semester Courses</h3>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Course</th>
                  <th>Professor</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    20100470501024 - Manajemen Basis Data - SMT 5
                  </td>
                  <td>
                    Wildan Budiawan Zulfikar S.T., M.Kom.
                  </td>
                </tr>

                <tr>
                  <td>2</td>
                  <td>
                    20100470501026 - Jaringan Komputer - SMT 5
                  </td>
                  <td>
                    Cecep Nurul Alam M.T.
                  </td>
                </tr>

                <tr>
                  <td>3</td>
                  <td>
                    20100470501028 - Pengembangan Aplikasi Mobile - SMT 5
                  </td>
                  <td>
                    H. Aldy Rialdy Atmadja M.T
                  </td>
                </tr>

                <tr>
                  <td>4</td>
                  <td>
                    20100470501030 - Pengembangan Aplikasi Web - SMT 5
                  </td>
                  <td>
                    Muhammad Deden Firdaus ST, M.Kom
                  </td>
                </tr>

                <tr>
                  <td>5</td>
                  <td>
                    20100470501032 - Interaksi Manusia dan Komputer - SMT 5
                  </td>
                  <td>
                    Dr. Cepy Slamet S.T., M.Kom.
                  </td>
                </tr>

                <tr>
                  <td>6</td>
                  <td>
                    20100470501033 - Intelegensia Buatan - SMT 5
                  </td>
                  <td>
                    Jumadi ST., M.Cs.
                  </td>
                </tr>

                <tr>
                  <td>7</td>
                  <td>
                    20100470501034 - Manajemen Proyek Perangkat Lunak - SMT 5
                  </td>
                  <td>
                    Agung Wahana S.E., M.T.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <hr />

        <section id="contact">
          <h2>Contact</h2>

          <div className="contact-icons">
            <a
              href="mailto:faridhakim1234a@gmail.com"
              title="Email"
            >
              <i className="fa-regular fa-envelope"></i>
            </a>

            <a
              href="https://instagram.com/ffathurrd"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="https://github.com/fathurVoid"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2026 fathurVoid.</p>
      </footer>
    </div>
    </>
  );
}

export default App;