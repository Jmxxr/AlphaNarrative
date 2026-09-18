"""Render an original, silent Alpha Narrative motion film. Requires Pillow and ffmpeg.

Usage: python scripts/generate-hero-video.py /path/to/logo.png public/media/alpha-narrative-motion.mp4
"""
from __future__ import annotations

import math
import random
import subprocess
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter


W, H, FPS, DURATION = 1280, 720, 24, 36
BG = (12, 19, 27)
INK = (27, 43, 55)
GRID = (29, 44, 55)
STEEL = (130, 156, 166)
PALE = (199, 213, 216)
WARM = (181, 157, 118)
random.seed(27)
NODES = [(int(random.uniform(100, W - 100)), int(random.uniform(100, H - 100))) for _ in range(72)]


def clip(x):
    return max(0.0, min(1.0, x))


def smooth(x):
    x = clip(x)
    return x * x * (3 - 2 * x)


def phase(t, start, end):
    return smooth((t - start) / (end - start))


def rgba(rgb, a):
    return (*rgb, max(0, min(255, round(a))))


def draw_segment(draw, a, b, fraction, fill, width=1):
    f = clip(fraction)
    if f:
        draw.line((a, (a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f)), fill=fill, width=width)


def background():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)
    for y in range(H):
        lift = int(9 * (1 - abs(y - H * .48) / (H * .7)))
        d.line((0, y, W, y), fill=(BG[0] + lift, BG[1] + lift, BG[2] + lift))
    for x in range(0, W + 1, 80):
        d.line((x, 0, x, H), fill=GRID, width=1)
    for y in range(0, H + 1, 80):
        d.line((0, y, W, y), fill=GRID, width=1)
    # Editorial frame rules; the hero video itself never contains lettering.
    d.rectangle((40, 38, W - 40, H - 38), outline=(43, 61, 70), width=1)
    for x in (40, W - 40):
        for y in (38, H - 38):
            d.line((x - 10, y, x + 10, y), fill=STEEL, width=1)
            d.line((x, y - 10, x, y + 10), fill=STEEL, width=1)
    return img


BASE = background()


def pulse(draw, x, y, t, start, strength=1):
    p = phase(t, start, start + 1.1)
    if p <= 0:
        return
    radius = int(2 + 23 * p)
    draw.ellipse((x - radius, y - radius, x + radius, y + radius), outline=rgba(PALE, (1 - p) * 135 * strength), width=1)
    r = 3 if strength > .8 else 2
    draw.ellipse((x - r, y - r, x + r, y + r), fill=rgba(PALE, 175 * strength))


def introduction(d, t, opacity):
    if opacity <= 0:
        return
    cx, cy = W // 2, H // 2
    reveal = phase(t, .6, 8.5)
    for i in range(21):
        angle = (i / 21) * math.tau + .08
        reach = (108 + (i % 4) * 38) * reveal
        mid = (cx + math.cos(angle) * reach, cy + math.sin(angle) * reach)
        end = (mid[0] + (95 if i % 2 else -95) * reveal, mid[1])
        start = (cx + math.cos(angle) * 11, cy + math.sin(angle) * 11)
        local = phase(t, 1.3 + i * .12, 4.3 + i * .12)
        d.line((start, mid), fill=rgba(STEEL, 125 * opacity * local), width=1)
        draw_segment(d, mid, end, phase(t, 3.8 + i * .11, 6.5 + i * .11), rgba(PALE, 130 * opacity), 1)
        if local > .4:
            pulse(d, *mid, t, 3.9 + i * .15, opacity)
    # Nested precision rings, drawn as partial arcs like measuring instruments.
    for r in (44, 84, 126):
        p = phase(t, 1.1 + r / 95, 4.5 + r / 95)
        d.arc((cx-r, cy-r, cx+r, cy+r), 210, 210 + 300 * p, fill=rgba(PALE, 170 * opacity * p), width=2 if r == 44 else 1)
    core = 4 + int(4 * (1 + math.sin(t * 2.1)) / 2)
    d.ellipse((cx-core, cy-core, cx+core, cy+core), fill=rgba(PALE, 235 * opacity * phase(t, .3, 1.7)))


def circuitry(d, t, opacity):
    if opacity <= 0:
        return
    # Custom orthogonal pathways: no stock footage, 3D orb, or copied composition.
    for row in range(15):
        y = 94 + row * 39
        left = 74 + (row % 4) * 19
        right = W - 77 - ((row * 3) % 5) * 17
        turn = 320 + ((row * 121) % 635)
        jog = y + (23 if row % 2 else -23)
        start = 7.0 + row * .29
        p = phase(t, start, start + 4.4)
        alpha = 145 * opacity * p
        draw_segment(d, (left, y), (turn, y), phase(t, start, start + 1.9), rgba(STEEL, alpha), 2)
        draw_segment(d, (turn, y), (turn, jog), phase(t, start + 1.2, start + 2.7), rgba(STEEL, alpha), 2)
        draw_segment(d, (turn, jog), (right, jog), phase(t, start + 2, start + 4.4), rgba(STEEL, alpha), 2)
        if p > .3:
            d.ellipse((turn-4, jog-4, turn+4, jog+4), outline=rgba(PALE, 210 * opacity), width=1)
        travel = (t - start - 1.9) / 3.0
        if 0 < travel < 1:
            xx = turn + (right - turn) * travel
            d.ellipse((xx-3, jog-3, xx+3, jog+3), fill=rgba(WARM, 235 * opacity))
    # Four nested chip outlines with physical-looking measured edges.
    for k in range(4):
        p = phase(t, 10 + k * .55, 12 + k * .55)
        if p:
            w, h = 115 + k * 60, 68 + k * 37
            d.rounded_rectangle((W/2-w, H/2-h, W/2+w, H/2+h), radius=3, outline=rgba(PALE, 115 * opacity * p), width=1)


def network(d, t, opacity):
    if opacity <= 0:
        return
    grow = phase(t, 16.0, 23.5)
    scale = .7 + grow * .28
    points = [(W/2 + (x-W/2)*scale, H/2 + (y-H/2)*scale) for x, y in NODES]
    for i, a in enumerate(points):
        near = sorted(range(len(points)), key=lambda j: (points[j][0]-a[0])**2 + (points[j][1]-a[1])**2)
        for j in near[1:5]:
            if j < i or (a[0]-points[j][0])**2 + (a[1]-points[j][1])**2 > 70000:
                continue
            b = points[j]
            p = phase(t, 16.2 + ((i + j) % 13) * .28, 18.8 + ((i + j) % 13) * .28)
            draw_segment(d, a, b, p, rgba(STEEL, 164 * opacity * p), 1)
            travel = ((t * .17 + (i * 7 + j) * .09) % 1)
            if p > .9 and (i + j) % 4 == 0:
                x, y = a[0] + (b[0]-a[0])*travel, a[1] + (b[1]-a[1])*travel
                d.ellipse((x-2, y-2, x+2, y+2), fill=rgba(PALE, 205 * opacity))
    for i, (x, y) in enumerate(points):
        p = phase(t, 16.0 + (i % 15)*.31, 18.0 + (i % 15)*.31)
        if p:
            r = 2 + (i % 6 == 0) * 2
            d.ellipse((x-r, y-r, x+r, y+r), fill=rgba(PALE if i%7 else WARM, 235 * opacity * p))
    # Scale of the system reads as engineered architecture, not fantasy glow.
    for i in range(3):
        p = phase(t, 20.4 + i * .6, 23.2 + i * .6)
        inset = 90 + i * 39
        d.rectangle((inset, inset*.52, W-inset, H-inset*.52), outline=rgba(PALE, 70 * opacity * p), width=1)


def architecture(d, t, opacity):
    """Order the connected network into a physical, layered digital structure."""
    if opacity <= 0:
        return
    for row in range(3):
        for col in range(5):
            idx = row * 5 + col
            p = phase(t, 19.6 + idx * .27, 22.2 + idx * .27)
            if not p:
                continue
            # Perspective skews each slab into a manufactured, non-orb form.
            w, h = 155, 70
            x = 172 + col * 188 + (row % 2) * 16
            y = 168 + row * 147 + (col % 2) * 8
            reveal_y = y + (1-p) * 90
            alpha = p * opacity
            d.polygon([(x, reveal_y), (x+w, reveal_y-14), (x+w+20, reveal_y+4), (x+20, reveal_y+18)], fill=rgba(INK, 125*alpha), outline=rgba(PALE, 167*alpha), width=1)
            d.polygon([(x+20, reveal_y+18), (x+w+20, reveal_y+4), (x+w+20, reveal_y+h), (x+20, reveal_y+h+14)], fill=rgba((24, 42, 53), 112*alpha), outline=rgba(STEEL, 107*alpha), width=1)
            d.line((x+35, reveal_y+36, x+125, reveal_y+28), fill=rgba(PALE, 105*alpha), width=2)
            d.line((x+35, reveal_y+48, x+80, reveal_y+44), fill=rgba(PALE, 80*alpha), width=1)
            for dot in range(3):
                px, py = x + 126 + dot*10, reveal_y + 53
                d.ellipse((px-2, py-2, px+2, py+2), fill=rgba(WARM if dot == 0 else PALE, 205*alpha))
            if col < 4:
                bx = x+w+21
                d.line((bx, reveal_y+47, bx+20, reveal_y+46), fill=rgba(PALE, 135*alpha), width=1)
    # A scan line runs across assembled structure and marks the stage change.
    scan = (t-21) * 116
    if 0 < scan < 540:
        d.line((145, 120+scan, 1150, 120+scan), fill=rgba(PALE, 75*opacity), width=2)


def convergence(d, t, opacity):
    if opacity <= 0:
        return
    cx, cy = W / 2, H / 2
    p = phase(t, 26, 32.0)
    for i in range(28):
        angle = i * math.tau / 28
        radius = 550 * (1 - p) + 85 * p
        x, y = cx + math.cos(angle)*radius, cy + math.sin(angle)*radius*.62
        inner = (cx + math.cos(angle)*65, cy + math.sin(angle)*40)
        d.line(((x, y), inner), fill=rgba(STEEL, 90 * opacity * (1 - p*.6)), width=1)
        d.ellipse((x-2, y-2, x+2, y+2), fill=rgba(PALE, 140 * opacity))
    d.arc((cx-90, cy-90, cx+90, cy+90), 0, 360 * p, fill=rgba(PALE, 180 * opacity * (1-p)), width=1)


def build_logo(path):
    logo = Image.open(path).convert("RGBA")
    box = logo.getbbox()
    if box:
        logo = logo.crop(box)
    logo.thumbnail((565, 345), Image.Resampling.LANCZOS)
    return logo


def frame(t, logo):
    img = BASE.convert("RGBA")
    layer = Image.new("RGBA", (W, H))
    d = ImageDraw.Draw(layer)
    introduction(d, t, (1 - phase(t, 9.1, 12.3)))
    circuitry(d, t, phase(t, 7.2, 10.1) * (1 - phase(t, 17.4, 20.6)))
    network(d, t, phase(t, 15.7, 18.8) * (1 - phase(t, 27.6, 31.5)))
    architecture(d, t, phase(t, 19.0, 22.0) * (1 - phase(t, 27.2, 30.2)))
    convergence(d, t, phase(t, 25.8, 28.5) * (1 - phase(t, 31.0, 33.1)))
    img = Image.alpha_composite(img, layer)
    reveal = phase(t, 31.2, 33.0) * (1 - phase(t, 35.3, 36.0))
    if reveal > 0:
        # Soft rectangular backplate is a deliberate material treatment.
        back = Image.new("RGBA", (W, H))
        bd = ImageDraw.Draw(back)
        bd.rounded_rectangle((W/2-340, H/2-210, W/2+340, H/2+210), radius=6, fill=rgba((17, 27, 38), 220*reveal), outline=rgba(STEEL, 105*reveal), width=1)
        img = Image.alpha_composite(img, back)
        mark = logo.copy()
        mark.putalpha(mark.getchannel("A").point(lambda a: int(a * reveal)))
        img.alpha_composite(mark, ((W-mark.width)//2, (H-mark.height)//2))
    # Fade down to the same dark start frame for a quiet, seamless restart.
    fade = phase(t, 35.65, 36.0)
    if fade:
        img = Image.blend(img, BASE.convert("RGBA"), fade)
    return img.convert("RGB")


def main():
    logo = build_logo(sys.argv[1])
    output = Path(sys.argv[2]); output.parent.mkdir(parents=True, exist_ok=True)
    if len(sys.argv) > 3 and sys.argv[3] == "--stills":
        for sec in (2, 6, 11, 15, 20, 25, 29, 33, 35):
            frame(sec, logo).save(output.parent / f"preview-{sec:02}.jpg", quality=88)
        return
    cmd = ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-", "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "23", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(output)]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    try:
        for n in range(FPS * DURATION):
            proc.stdin.write(frame(n / FPS, logo).tobytes())
            if n % 120 == 0:
                print(f"{n/FPS:.0f}/{DURATION}s", flush=True)
    finally:
        proc.stdin.close()
    if proc.wait():
        raise RuntimeError("ffmpeg failed")
    frame(21, logo).save(output.with_suffix(".jpg"), quality=88)


if __name__ == "__main__":
    main()
