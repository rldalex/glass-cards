/**
 * Thermal canvas particle animation for climate card normal mode.
 * Renders rising (heat) or falling (cool) glowing particles.
 */

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
}

export class ThermalCanvas {
  private _canvas: HTMLCanvasElement | null = null;
  private _particles: Particle[] = [];
  private _animFrame: number | null = null;
  private _currentAction = '';

  attach(canvas: HTMLCanvasElement): void {
    this._canvas = canvas;
  }

  update(hvacAction: string, width: number, height: number): void {
    if (hvacAction === this._currentAction && this._animFrame) return;
    this._currentAction = hvacAction;
    this.stop();

    if (hvacAction === 'off' || hvacAction === 'idle' || !hvacAction) {
      this._particles = [];
      if (this._canvas) {
        const ctx = this._canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      }
      return;
    }

    const isHeat = hvacAction === 'heating' || hvacAction === 'preheating';
    const w2 = width * 2;
    const h2 = height * 2;

    this._particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * w2,
      y: Math.random() * h2,
      size: 1 + Math.random() * 2.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: isHeat ? -(0.3 + Math.random() * 0.8) : 0.3 + Math.random() * 0.8,
      opacity: 0.1 + Math.random() * 0.3,
      life: Math.random(),
    }));

    if (!this._canvas) return;
    this._canvas.width = w2;
    this._canvas.height = h2;
    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';

    const ctx = this._canvas.getContext('2d');
    if (!ctx) return;

    const color = isHeat ? [249, 115, 22] : [56, 189, 248];

    const animate = () => {
      ctx.clearRect(0, 0, w2, h2);

      for (const p of this._particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life += 0.003;

        let alpha = p.opacity;
        if (p.life < 0.1) alpha *= p.life / 0.1;
        if (p.life > 0.8) alpha *= (1 - p.life) / 0.2;

        // Wrap around
        if (isHeat && p.y < -10) {
          p.y = h2 + 10;
          p.x = Math.random() * w2;
          p.life = 0;
        }
        if (!isHeat && p.y > h2 + 10) {
          p.y = -10;
          p.x = Math.random() * w2;
          p.life = 0;
        }

        // Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha * 0.15})`;
        ctx.fill();
      }

      this._animFrame = requestAnimationFrame(animate);
    };
    animate();
  }

  stop(): void {
    if (this._animFrame) {
      cancelAnimationFrame(this._animFrame);
      this._animFrame = null;
    }
  }

  destroy(): void {
    this.stop();
    this._canvas = null;
    this._particles = [];
    this._currentAction = '';
  }
}
