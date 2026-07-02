import { type FC, useEffect, useRef } from "react";
import { useInView } from "motion/react";

/**
 * Minimal Wolfenstein-style raycaster rendered on a canvas — a live nod to
 * what cub3D actually does. DDA raycasting, distance shading, minimap.
 * Camera slowly rotates on its own; hovering steers the spin.
 */

// prettier-ignore
const MAP = [
	"111111111111",
	"1..........1",
	"1..2....3..1",
	"1..2....3..1",
	"1..........1",
	"1.3......2.1",
	"1.3......2.1",
	"1..........1",
	"111111111111",
];

const MAP_W = MAP[0]!.length;
const MAP_H = MAP.length;
const POS_X = MAP_W / 2;
const POS_Y = MAP_H / 2;
const FOV = Math.PI / 3;

// Internal render resolution — upscaled with image-rendering: pixelated.
const VIEW_W = 300;
const VIEW_H = 170;

// Wall palettes per tile type: [r, g, b]
const WALL_COLORS: Record<string, [number, number, number]> = {
	"1": [214, 121, 63],
	"2": [176, 67, 54],
	"3": [222, 165, 84],
};

const tileAt = (x: number, y: number): string => {
	if (x < 0 || y < 0 || x >= MAP_W || y >= MAP_H) return "1";
	return MAP[y]![x]!;
};

export const RaycasterScene: FC<{ className?: string }> = ({ className }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const inView = useInView(canvasRef, { margin: "-40px" });
	const steer = useRef(0);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = VIEW_W;
		canvas.height = VIEW_H;

		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let angle = 0.6;
		let animationFrame = 0;

		const renderFrame = () => {
			// Ceiling / floor
			const sky = ctx.createLinearGradient(0, 0, 0, VIEW_H / 2);
			sky.addColorStop(0, "#100a08");
			sky.addColorStop(1, "#1f1210");
			ctx.fillStyle = sky;
			ctx.fillRect(0, 0, VIEW_W, VIEW_H / 2);
			const floor = ctx.createLinearGradient(0, VIEW_H / 2, 0, VIEW_H);
			floor.addColorStop(0, "#181210");
			floor.addColorStop(1, "#2a1a12");
			ctx.fillStyle = floor;
			ctx.fillRect(0, VIEW_H / 2, VIEW_W, VIEW_H / 2);

			for (let column = 0; column < VIEW_W; column++) {
				const rayAngle = angle + ((column / VIEW_W) * 2 - 1) * (FOV / 2);
				const dirX = Math.cos(rayAngle);
				const dirY = Math.sin(rayAngle);

				// DDA
				let mapX = Math.floor(POS_X);
				let mapY = Math.floor(POS_Y);
				const deltaX = Math.abs(1 / (dirX || 1e-9));
				const deltaY = Math.abs(1 / (dirY || 1e-9));
				const stepX = dirX < 0 ? -1 : 1;
				const stepY = dirY < 0 ? -1 : 1;
				let sideX = dirX < 0 ? (POS_X - mapX) * deltaX : (mapX + 1 - POS_X) * deltaX;
				let sideY = dirY < 0 ? (POS_Y - mapY) * deltaY : (mapY + 1 - POS_Y) * deltaY;

				let side = 0;
				let tile = "1";
				for (let i = 0; i < 64; i++) {
					if (sideX < sideY) {
						sideX += deltaX;
						mapX += stepX;
						side = 0;
					} else {
						sideY += deltaY;
						mapY += stepY;
						side = 1;
					}
					tile = tileAt(mapX, mapY);
					if (tile !== ".") break;
				}

				const rawDist = side === 0 ? sideX - deltaX : sideY - deltaY;
				const dist = Math.max(0.05, rawDist * Math.cos(rayAngle - angle));
				const wallHeight = Math.min(VIEW_H, VIEW_H / dist);

				const [r, g, b] = WALL_COLORS[tile] ?? WALL_COLORS["1"]!;
				const shade = Math.max(0.15, 1 - dist / 9) * (side === 1 ? 0.65 : 1);
				ctx.fillStyle = `rgb(${Math.round(r * shade)}, ${Math.round(g * shade)}, ${Math.round(b * shade)})`;
				ctx.fillRect(column, (VIEW_H - wallHeight) / 2, 1, wallHeight);
			}

			drawMinimap();
		};

		const drawMinimap = () => {
			const scale = 4;
			const originX = VIEW_W - MAP_W * scale - 6;
			const originY = 6;

			ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
			ctx.fillRect(originX - 2, originY - 2, MAP_W * scale + 4, MAP_H * scale + 4);
			for (let y = 0; y < MAP_H; y++) {
				for (let x = 0; x < MAP_W; x++) {
					if (tileAt(x, y) === ".") continue;
					ctx.fillStyle = "rgba(251, 146, 60, 0.7)";
					ctx.fillRect(originX + x * scale, originY + y * scale, scale - 1, scale - 1);
				}
			}
			// Player + view direction
			const px = originX + POS_X * scale;
			const py = originY + POS_Y * scale;
			ctx.strokeStyle = "#fca5a5";
			ctx.beginPath();
			ctx.moveTo(px, py);
			ctx.lineTo(px + Math.cos(angle) * scale * 2, py + Math.sin(angle) * scale * 2);
			ctx.stroke();
			ctx.fillStyle = "#fecaca";
			ctx.fillRect(px - 1.5, py - 1.5, 3, 3);
		};

		if (reducedMotion || !inView) {
			renderFrame();
			return;
		}

		const loop = () => {
			angle += 0.006 + steer.current * 0.02;
			renderFrame();
			animationFrame = requestAnimationFrame(loop);
		};
		animationFrame = requestAnimationFrame(loop);

		return () => cancelAnimationFrame(animationFrame);
	}, [inView]);

	const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		steer.current = ((event.clientX - rect.left) / rect.width) * 2 - 1;
	};

	return (
		<canvas
			ref={canvasRef}
			className={`h-full w-full object-cover ${className ?? ""}`}
			style={{ imageRendering: "pixelated" }}
			onMouseMove={handleMouseMove}
			onMouseLeave={() => (steer.current = 0)}
			aria-label="Live raycasting demo"
		/>
	);
};
