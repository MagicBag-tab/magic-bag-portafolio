import { useState } from 'react';
import styles from './IntroScreen.module.css';

export default function IntroScreen({ onComplete }) {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setSubmitted(true);

      setTimeout(() => onComplete(name.trim()), 1200);
    }
  };

  return (
    <div className={styles.screen}>

      <div className={styles.clouds}>
        <span className={styles.cloud} style={{ top: '10%', left: '5%',  animationDelay: '0s'   }}>☁️</span>
        <span className={styles.cloud} style={{ top: '20%', left: '70%', animationDelay: '0.5s' }}>☁️</span>
        <span className={styles.cloud} style={{ top: '5%',  left: '40%', animationDelay: '1s'   }}>☁️</span>
        <span className={styles.cloud} style={{ top: '35%', left: '20%', animationDelay: '1.5s' }}>☁️</span>
        <span className={styles.cloud} style={{ top: '30%', left: '85%', animationDelay: '0.8s' }}>☁️</span>
      </div>

      <div className={styles.catOnCloud}>
        <div className={styles.catEmoji}>🐱</div>
        <div className={styles.cloudBase}>☁️</div>
      </div>

      <div className={styles.card}>
        {!submitted ? (
          <>
            <p className={styles.greeting}>¡Hola, viajero!</p>
            <p className={styles.question}>¿Cómo te llamas?</p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <input
                id="visitor-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Escribe tu nombre..."
                className={styles.input}
                maxLength={30}
                autoFocus
                aria-label="Tu nombre"
              />
              <button
                type="submit"
                className={styles.button}
                disabled={!name.trim()}
                id="submit-name-btn"
              >
                ¡Explorar! ✨
              </button>
            </form>
          </>
        ) : (
          <p className={styles.welcome}>
            ¡Bienvenido, <strong>{name}</strong>! ✨
          </p>
        )}
      </div>
    </div>
  );
}
