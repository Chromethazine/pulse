import { useMemo, useState } from 'react';
import djBackgroundVideo from '../assets/dj background.mp4';
import Hyperspeed from './components/Hyperspeed.jsx';

const pulseEffectOptions = {
  distortion: 'LongRaceDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 5,
  lanesPerRoad: 2,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 50,
  lightPairsPerRoadWay: 70,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [20, 60],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.2, 0.2],
  carFloorSeparation: [0.05, 1],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xff63f3, 0xe759d0, 0xff13aa],
    rightCars: [0xa4e3e6, 0x80d7ff, 0x53c2c6],
    sticks: 0xa4e3e6
  }
};

const signalLabels = [
  { id: 'a', text: 'BPM 142', className: 'signal-label label-one' },
  { id: 'b', text: 'SIGNAL LOCKED', className: 'signal-label label-two' },
  { id: 'c', text: 'LIVE SESSION', className: 'signal-label label-three' },
  { id: 'd', text: 'FREQUENCY DETECTED', className: 'signal-label label-four' },
  { id: 'e', text: 'NEW DISCOVERY', className: 'signal-label label-five' }
];

const particles = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  x: 8 + ((index * 23) % 86),
  y: 9 + ((index * 41) % 78),
  delay: -((index * 0.43) % 5.8),
  duration: 4.8 + ((index * 0.37) % 3.4)
}));

const navItems = ['Discover', 'Signals', 'Pulse Radio', 'Live Sessions'];

function WaveformPlayer({ active }) {
  const bars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, index) => ({
        id: index,
        scale: 0.22 + ((index * 7) % 17) / 18,
        delay: -((index * 0.075) % 1.2)
      })),
    []
  );

  return (
    <aside className={`ambient-player ${active ? 'is-active' : ''}`} aria-label="Now playing signal preview">
      <div className="player-copy">
        <span>Live signal</span>
        <strong>Midnight Frequency</strong>
      </div>
      <div className="waveform" aria-hidden="true">
        {bars.map((bar) => (
          <span key={bar.id} style={{ '--bar-scale': bar.scale, '--bar-delay': `${bar.delay}s` }} />
        ))}
      </div>
      <div className="signal-progress" aria-hidden="true">
        <span />
      </div>
      <div className="signal-meta" aria-hidden="true">
        <span>00:42</span>
        <span>03:18</span>
      </div>
    </aside>
  );
}

function DjBackground() {
  return (
    <div className="dj-video-layer" aria-hidden="true">
      <video autoPlay loop muted playsInline preload="metadata">
        <source src={djBackgroundVideo} type="video/mp4" />
      </video>
    </div>
  );
}

function AtmosphereLayers() {
  return (
    <>
      <div className="ghost-type" aria-hidden="true">
        <span>SIGNAL</span>
        <span>FREQUENCY</span>
        <span>PULSE</span>
      </div>

      <div className="signal-orbit" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div className="moving-labels" aria-hidden="true">
        {signalLabels.map((label) => (
          <span className={label.className} key={label.id}>
            {label.text}
          </span>
        ))}
      </div>

      <div className="foreground-particles" aria-hidden="true">
        {particles.map((particle) => (
          <span
            key={particle.id}
            style={{
              '--particle-x': `${particle.x}vw`,
              '--particle-y': `${particle.y}vh`,
              '--particle-delay': `${particle.delay}s`,
              '--particle-duration': `${particle.duration}s`
            }}
          />
        ))}
      </div>

      <div className="foreground-haze" aria-hidden="true" />
    </>
  );
}

function FloatingNav() {
  return (
    <nav className="floating-nav" aria-label="Primary">
      {navItems.map((item) => (
        <a href="/" key={item} onClick={(event) => event.preventDefault()}>
          {item}
        </a>
      ))}
    </nav>
  );
}

function UtilityCluster() {
  return (
    <div className="utility-cluster" aria-label="Live audio status">
      <span className="live-dot">Live</span>
      <button className="utility-button" type="button" aria-label="Search">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6.2" />
          <path d="m16 16 4 4" />
        </svg>
      </button>
      <span className="audio-status">Audio on</span>
    </div>
  );
}

function App() {
  const [accelerating, setAccelerating] = useState(false);

  return (
    <main className="site-shell">
      <section
        className={`hero ${accelerating ? 'is-accelerating' : ''}`}
        aria-labelledby="hero-title"
        onPointerDown={() => setAccelerating(true)}
        onPointerUp={() => setAccelerating(false)}
        onPointerLeave={() => setAccelerating(false)}
        onPointerCancel={() => setAccelerating(false)}
      >
        <DjBackground />
        <Hyperspeed effectOptions={pulseEffectOptions} active={accelerating} />

        <AtmosphereLayers />
        <div className="hero-vignette" aria-hidden="true" />
        <p className="brand-mark">Pulse</p>
        <FloatingNav />
        <UtilityCluster />

        <div className="hero-content">
          <h1 id="hero-title">
            Discover music at the <span>speed of feeling.</span>
          </h1>
          <p className="hero-subcopy">
            Enter a living stream of tracks, signals, and frequencies tuned to what you are about to love.
          </p>
          <button
            className="primary-cta"
            type="button"
            onPointerDown={() => setAccelerating(true)}
            onPointerUp={() => setAccelerating(false)}
            onPointerLeave={() => setAccelerating(false)}
            onBlur={() => setAccelerating(false)}
          >
            Start listening
          </button>
        </div>

        <WaveformPlayer active={accelerating} />
      </section>
    </main>
  );
}

export default App;
