import { type FC, useEffect, useRef } from "react";

type Particle = {
	x: number;
	y: number;
	vx: number;
	vy: number;
	size: number;
};

const LINK_DISTANCE = 130;
const POINTER_RADIUS = 180;
const BASE_SPEED = 0.18;

export const ParticleField: FC<{ className?: string }> = ({ className }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

		let width = 0;
		let height = 0;
		let particles: Particle[] = [];
		let animationFrame = 0;
		const pointer = { x: -9999, y: -9999 };

		const resize = () => {
			const dpr = Math.min(window.devicePixelRatio || 1, 2);
			width = window.innerWidth;
			height = window.innerHeight;
			canvas.width = width * dpr;
			canvas.height = height * dpr;
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

			const targetCount = Math.min(110, Math.floor((width * height) / 16000));
			particles = Array.from({ length: targetCount }, () => ({
				x: Math.random() * width,
				y: Math.random() * height,
				vx: (Math.random() - 0.5) * BASE_SPEED * 2,
				vy: (Math.random() - 0.5) * BASE_SPEED * 2,
				size: Math.random() * 1.6 + 0.6,
			}));
		};

		const step = () => {
			ctx.clearRect(0, 0, width, height);

			for (const p of particles) {
				if (!reducedMotion) {
					p.x += p.vx;
					p.y += p.vy;

					const dx = p.x - pointer.x;
					const dy = p.y - pointer.y;
					const dist = Math.hypot(dx, dy);
					if (dist < POINTER_RADIUS && dist > 0.001) {
						const force = ((POINTER_RADIUS - dist) / POINTER_RADIUS) * 0.35;
						p.x += (dx / dist) * force;
						p.y += (dy / dist) * force;
					}

					if (p.x < -10) p.x = width + 10;
					if (p.x > width + 10) p.x = -10;
					if (p.y < -10) p.y = height + 10;
					if (p.y > height + 10) p.y = -10;
				}

				ctx.beginPath();
				ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
				ctx.fillStyle = "rgba(220, 90, 90, 0.35)";
				ctx.fill();
			}

			for (let i = 0; i < particles.length; i++) {
				const a = particles[i]!;
				for (let j = i + 1; j < particles.length; j++) {
					const b = particles[j]!;
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const dist = Math.hypot(dx, dy);
					if (dist < LINK_DISTANCE) {
						const alpha = (1 - dist / LINK_DISTANCE) * 0.14;
						ctx.beginPath();
						ctx.moveTo(a.x, a.y);
						ctx.lineTo(b.x, b.y);
						ctx.strokeStyle = `rgba(185, 60, 60, ${alpha})`;
						ctx.lineWidth = 1;
						ctx.stroke();
					}
				}
			}

			animationFrame = requestAnimationFrame(step);
		};

		const handlePointerMove = (event: PointerEvent) => {
			pointer.x = event.clientX;
			pointer.y = event.clientY;
		};
		const handlePointerLeave = () => {
			pointer.x = -9999;
			pointer.y = -9999;
		};

		resize();
		window.addEventListener("resize", resize);
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("pointerleave", handlePointerLeave);
		animationFrame = requestAnimationFrame(step);

		return () => {
			cancelAnimationFrame(animationFrame);
			window.removeEventListener("resize", resize);
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerleave", handlePointerLeave);
		};
	}, []);

	return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
