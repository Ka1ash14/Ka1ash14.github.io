const simulator = document.querySelector('[data-airlock]');
const powerLabel = simulator.querySelector('[data-power]');
const doorLabel = simulator.querySelector('[data-door]');
const status = simulator.querySelector('[role="status"]');
let hasPower = false;
let isOpen = false;

simulator.addEventListener('click', (event) => {
  const action = event.target.closest('button')?.dataset.action;

  switch (action) {
    case 'power':
      status.textContent = hasPower
        ? 'Питание уже включено.'
        : 'Питание восстановлено. Теперь можно открыть шлюз.';
      hasPower = true;
      break;
    case 'open':
      if (!hasPower) {
        status.textContent = 'Шлюз заперт. Сначала подайте питание.';
        return;
      }
      status.textContent = isOpen
        ? 'Шлюз уже открыт.'
        : 'Шлюз открыт. Путь к антенне свободен.';
      isOpen = true;
      break;
    case 'reset':
      hasPower = false;
      isOpen = false;
      status.textContent = 'Сценарий сброшен. Попробуйте открыть шлюз.';
      break;
    default:
      return;
  }

  powerLabel.textContent = hasPower ? 'включено' : 'отключено';
  doorLabel.textContent = isOpen ? 'открыт' : 'заперт';
});

simulator.querySelector('[data-controls]').hidden = false;
