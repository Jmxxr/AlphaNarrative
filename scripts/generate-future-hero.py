"""Original, silent 36-second Alpha Narrative motion graphic.

Run: python scripts/generate-future-hero.py public/brand/alpha-narrative-logo.png public/media/alpha-narrative-future.mp4
Requires Pillow, numpy and ffmpeg. No stock or generated footage is used.
"""
from __future__ import annotations

import math
import random
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


W, H, FPS, LENGTH = 1280, 720, 24, 36
PALETTE = [(57, 207, 215), (121, 112, 244), (245, 111, 153), (255, 176, 96), (163, 229, 164)]
WHITE = (234, 241, 246)
random.seed(164)
DOTS = [(random.randint(65, W-65), random.randint(55, H-55), random.uniform(.5, 1.5)) for _ in range(85)]


def clamp(v, lo=0., hi=1.):
    return max(lo, min(hi, v))


def ease(v):
    v = clamp(v)
    return v*v*(3-2*v)


def enter(t, start, finish):
    return ease((t-start)/(finish-start))


def rgba(rgb, alpha):
    return (*rgb, int(clamp(alpha, 0, 255)))


def blend(a, b, p):
    return tuple(round(a[i]*(1-p) + b[i]*p) for i in range(3))


def backdrop(t):
    """Animated gradients are computed at low resolution and upscaled as cinematic light."""
    ww, hh = 320, 180
    yy, xx = np.mgrid[0:hh, 0:ww].astype(np.float32)
    base = np.zeros((hh, ww, 3), np.float32)
    base[:] = (10, 15, 35)
    focus = [(70+24*math.sin(t*.2), 74, PALETTE[1], .28),
             (245+27*math.cos(t*.17), 130, PALETTE[0], .21),
             (184+30*math.sin(t*.14), 38, PALETTE[2], .13)]
    for cx, cy, color, weight in focus:
        falloff = np.exp(-(((xx-cx)/130)**2 + ((yy-cy)/95)**2)*1.4) * weight
        base += falloff[..., None] * np.asarray(color, np.float32)
    img = Image.fromarray(np.uint8(np.clip(base, 0, 255)), "RGB")
    return img.resize((W, H), Image.Resampling.BILINEAR).convert("RGBA")


def arc_points(cx, cy, rx, ry, start, extent, steps=140):
    return [(cx+rx*math.cos(start+extent*i/steps), cy+ry*math.sin(start+extent*i/steps)) for i in range(steps+1)]


def orbit(draw, t, opacity):
    if opacity <= 0:
        return
    cx, cy = W*.5, H*.48
    for i in range(7):
        size = 86+i*39
        theta = t*(.14 if i%2 else -.12)+i*.42
        length = math.pi*(.75+(i%3)*.12)
        p = enter(t, .3+i*.32, 2.3+i*.32)
        pts = arc_points(cx, cy, size*1.48, size*.78, theta, length*p)
        color = PALETTE[i%len(PALETTE)]
        draw.line(pts, fill=rgba(color, 150*opacity*p), width=16 if i < 3 else 8, joint="curve")
        # A second narrow specular edge makes each arc read like a solid material.
        draw.line(pts, fill=rgba(WHITE, 155*opacity*p), width=2, joint="curve")
        x,y=pts[-1]
        draw.ellipse((x-4,y-4,x+4,y+4), fill=rgba(WHITE,220*opacity*p))
    for i in range(3):
        radius = (42+i*49)*enter(t, .2+i*.34, 2+i*.34)
        draw.ellipse((cx-radius,cy-radius*.54,cx+radius,cy+radius*.54), outline=rgba(PALETTE[(i+2)%5],95*opacity), width=2)
    r=28+9*math.sin(t*1.8)
    draw.ellipse((cx-r,cy-r,cx+r,cy+r), fill=rgba((218,235,244),150*opacity), outline=rgba(WHITE,245*opacity),width=3)


def ribbons(draw, t, opacity):
    if opacity <= 0:
        return
    reveal=enter(t, 6, 11)
    for k in range(9):
        color=PALETTE[k%5]
        offset=k*44-160
        phase=t*.51 + k*.53
        # Quads have a shaded underface and a narrow specular edge.
        last=None
        for i in range(95):
            u=i/94
            if u>reveal:
                break
            x=-140+u*(W+280)
            y=H*.5+offset + 47*math.sin(u*math.tau*1.2 + phase) + 36*math.sin(u*math.tau*2.3-phase*.6)
            thick=8 + 7*math.sin(u*math.pi)**2
            if last:
                px,py,pthick=last
                shade=.57+.25*math.sin(u*math.tau+phase)
                face=tuple(int(c*shade) for c in color)
                draw.polygon([(px,py-pthick),(x,y-thick),(x,y+thick),(px,py+pthick)],fill=rgba(face,230*opacity))
                draw.line((px,py-pthick,x,y-thick),fill=rgba(blend(color,WHITE,.43),230*opacity),width=2)
            last=(x,y,thick)
    for idx,(x,y,z) in enumerate(DOTS):
        if idx%3:
            continue
        drift=t*32*z
        px=(x+drift)%(W+150)-75
        py=y + 15*math.sin(t*.9+idx)
        r=2+idx%3
        draw.ellipse((px-r,py-r,px+r,py+r),fill=rgba(PALETTE[idx%5],160*opacity*reveal))


def tile(draw,x,y,s,color,alpha,angle=0):
    """A colored architectural module made from independent top, face, and edge planes."""
    x,y=float(x),float(y)
    w,h=105*s,57*s
    skew=28*s
    lift=(26+angle)*s
    top=[(x,y),(x+w,y-13*s),(x+w+skew,y+4*s),(x+skew,y+lift)]
    front=[(x+skew,y+lift),(x+w+skew,y+4*s),(x+w+skew,y+h+9*s),(x+skew,y+h+lift)]
    side=[(x+w,y-13*s),(x+w+skew,y+4*s),(x+w+skew,y+h+9*s),(x+w,y+h-8*s)]
    draw.polygon(front,fill=rgba(blend(color,(18,28,54),.68),220*alpha))
    draw.polygon(side,fill=rgba(blend(color,(10,18,37),.78),210*alpha))
    draw.polygon(top,fill=rgba(blend(color,WHITE,.3),225*alpha))
    draw.line(top+[top[0]],fill=rgba(WHITE,170*alpha),width=2)
    draw.line(front+[front[0]],fill=rgba(color,150*alpha),width=1)
    cx=x+skew+13*s
    draw.line((cx,y+lift+18*s,cx+w*.55,y+lift+18*s),fill=rgba(WHITE,170*alpha),width=max(1,int(2*s)))
    draw.line((cx,y+lift+28*s,cx+w*.28,y+lift+28*s),fill=rgba(WHITE,100*alpha),width=1)


def structures(draw,t,opacity):
    if opacity<=0:
        return
    # Repetition, vanishing point, and coloured glass surfaces signal engineered scale.
    for row in range(4):
        for col in range(7):
            index=row*7+col
            p=enter(t, 15+index*.115, 17.2+index*.115)
            if not p:
                continue
            depth=.8 + row*.13
            x=65+col*168+row*21
            y=75+row*147+(1-p)*110+8*math.sin(t*.48+index*.63)
            tile(draw,x,y,depth,PALETTE[(row+col)%5],opacity*p)
            if col<6 and p>.65:
                draw.line((x+135*depth,y+65*depth,x+155,y+69*depth),fill=rgba(PALETTE[(col+1)%5],100*opacity*p),width=2)
    # Soft guide planes lend spatial depth without sci-fi HUD lettering.
    for j in range(6):
        yy=140+j*86 + 15*math.sin(t*.25+j)
        draw.line((60,yy,W-60,yy-32),fill=rgba(WHITE,25*opacity),width=1)


def unfold(draw,t,opacity):
    if opacity<=0:
        return
    cx,cy=W*.5,H*.5
    p=enter(t,24,28)
    for level in range(5):
        for blade in range(12):
            angle=blade*math.tau/12+t*.07+level*.17
            inner=44+level*48*p
            outer=inner+95*p
            spread=.08+.12*p
            points=[(cx+inner*math.cos(angle),cy+inner*.66*math.sin(angle)),
                    (cx+outer*math.cos(angle-spread),cy+outer*.66*math.sin(angle-spread)),
                    (cx+(outer+30)*math.cos(angle+spread),cy+(outer+30)*.66*math.sin(angle+spread)),
                    (cx+(inner+23)*math.cos(angle+spread*.8),cy+(inner+23)*.66*math.sin(angle+spread*.8))]
            color=PALETTE[(blade+level)%5]
            draw.polygon(points,fill=rgba(color,(50+level*13)*opacity*p))
            draw.line(points+[points[0]],fill=rgba(blend(color,WHITE,.45),150*opacity*p),width=2)
    for i in range(14):
        angle=i*math.tau/14 - t*.12
        r=(110+i%4*73)*p
        x,y=cx+math.cos(angle)*r,cy+math.sin(angle)*r*.66
        draw.ellipse((x-3,y-3,x+3,y+3),fill=rgba(WHITE,200*opacity*p))


def logo_image(path):
    im=Image.open(path).convert("RGBA")
    if im.getbbox():
        im=im.crop(im.getbbox())
    im.thumbnail((640,360),Image.Resampling.LANCZOS)
    return im


def render(t, logo):
    img=backdrop(t)
    layer=Image.new("RGBA",(W,H))
    d=ImageDraw.Draw(layer)
    orbit(d,t,1-enter(t,7,10))
    ribbons(d,t,enter(t,5.3,8)*(1-enter(t,16,19)))
    structures(d,t,enter(t,14,17)*(1-enter(t,24,27)))
    unfold(d,t,enter(t,23,26)*(1-enter(t,30,33)))
    img=Image.alpha_composite(img,layer)
    # Brand reveal after the abstract film, using the existing owned logo image.
    reveal=enter(t,30.4,33.1)*(1-enter(t,35.2,36))
    if reveal:
        veil=Image.new("RGBA",(W,H),(8,13,29,round(202*reveal)))
        img=Image.alpha_composite(img,veil)
        halo=Image.new("RGBA",(W,H))
        hd=ImageDraw.Draw(halo)
        for i,color in enumerate(PALETTE[:4]):
            a=(i*math.tau/4+t*.08)
            x,y=W*.5+230*math.cos(a),H*.48+145*math.sin(a)
            hd.ellipse((x-95,y-95,x+95,y+95),fill=rgba(color,80*reveal))
        img=Image.alpha_composite(img,halo.filter(ImageFilter.GaussianBlur(75)))
        logo_alpha=logo.copy()
        logo_alpha.putalpha(logo.getchannel("A").point(lambda a:round(a*reveal)))
        img.alpha_composite(logo_alpha,((W-logo.width)//2,(H-logo.height)//2))
    if t>35.3:
        img=Image.blend(img,backdrop(0),enter(t,35.3,36))
    return img.convert("RGB")


def main():
    logo=logo_image(sys.argv[1]); output=Path(sys.argv[2]); output.parent.mkdir(parents=True,exist_ok=True)
    if len(sys.argv)>3 and sys.argv[3]=="--stills":
        for sec in (1,4,8,12,17,21,26,29,32,34):
            render(sec,logo).save(output.parent/f"future-{sec:02}.jpg",quality=90)
        return
    ffmpeg=["ffmpeg","-y","-loglevel","error","-f","rawvideo","-pix_fmt","rgb24","-s",f"{W}x{H}","-r",str(FPS),"-i","-","-an","-c:v","libx264","-preset","medium","-crf","22","-pix_fmt","yuv420p","-movflags","+faststart",str(output)]
    proc=subprocess.Popen(ffmpeg,stdin=subprocess.PIPE)
    try:
        for n in range(FPS*LENGTH):
            proc.stdin.write(render(n/FPS,logo).tobytes())
            if n%120==0:
                print(f"{n/FPS:.0f}/{LENGTH}s",flush=True)
    finally:
        proc.stdin.close()
    if proc.wait():
        raise RuntimeError("ffmpeg did not finish")
    render(21,logo).save(output.with_suffix(".jpg"),quality=90)
    render(34,logo).save(output.with_name("alpha-narrative-future-end.jpg"),quality=90)


if __name__=="__main__":
    main()
