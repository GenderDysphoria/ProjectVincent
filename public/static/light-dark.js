class LightDark extends HTMLElement {
  #theme = null;

  onClick = (ev) => {
    const { target } = ev;
    const theme = target.value;

    this.saveTheme(theme);
    this.classList.remove(this.#theme);
    this.classList.add(theme);
    this.#theme = theme;
  };

  loadTheme () {
    const browserPrefersDark = !!window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    } else if (browserPrefersDark) {
      return 'dark';
    }

    return 'light';
  }

  saveTheme (theme) {
    if (!theme) {
      localStorage.removeItem('theme');
      return;
    }

    localStorage.setItem('theme', theme);
  }

  connectedCallback () {
    this.addEventListener('change', this.onClick);
    this.#theme = this.loadTheme();
    this.classList.add(this.#theme);

    // connected callback fires before the inner dom actually populates,
    // so we need to defer until dom loading finishes
    requestAnimationFrame(this.onMount);
  }

  onMount = () => {
    const currentCheckbox = this.querySelector(`input[value="${this.#theme}"]`);
    console.log(currentCheckbox);
    if (currentCheckbox) currentCheckbox.checked = true;
  };
}

window.customElements.define('light-dark', LightDark);
