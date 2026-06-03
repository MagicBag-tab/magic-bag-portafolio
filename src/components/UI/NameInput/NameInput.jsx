import styles from './NameInput.module.css';

// =========================================
// NameInput — componente de input del nombre del visitante
// (usado en IntroScreen, pero también exportado por si se reutiliza)
// Props:
//   value       — valor actual del input
//   onChange(e) — handler de cambio
//   onSubmit()  — handler de envío
//   placeholder — placeholder del input
// =========================================
export default function NameInput({
  value = '',
  onChange,
  onSubmit,
  placeholder = 'Escribe tu nombre...',
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') onSubmit?.();
  };

  return (
    <div className={styles.wrapper}>
      <input
        id="name-input"
        type="text"
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={styles.input}
        maxLength={30}
        autoFocus
        aria-label="Tu nombre"
      />
      <button
        id="name-submit-btn"
        className={styles.button}
        onClick={onSubmit}
        disabled={!value.trim()}
        type="button"
        aria-label="Confirmar nombre"
      >
        ✨
      </button>
    </div>
  );
}
