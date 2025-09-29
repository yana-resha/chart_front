type BurgerIconProps = {
  open?: boolean
  size?: number
  strokeWidth?: number
  className?: string
}

export const BurgerIcon = ({ open, size = 28, strokeWidth = 2.4, className }: BurgerIconProps) => (
  <svg
    className={`burger ${open ? 'is-open' : ''} ${className ?? ''}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={size}
    height={size}
  >
    <style>{`
      .burger line{
        stroke: currentColor;
        stroke-width: ${strokeWidth};
        stroke-linecap: round;
        vector-effect: non-scaling-stroke;
        transition:
          transform .28s cubic-bezier(.2,.8,.2,1),
          opacity .2s ease;
      }
      /* закрыто: три линии, разнесённые по Y трансформом */
      .burger .t { transform: translate(0, -6px); }
      .burger .m { opacity: 1; transition: transform .16s ease, opacity .16s ease; }
      .burger .b { transform: translate(0,  6px); }

      /* открыто: вращаем вокруг (12,12) явным переносом центра */
      .burger.is-open .t { transform: translate(12px,12px) rotate(45deg)  translate(-12px,-12px); }
      .burger.is-open .m { opacity: 0; transform: scaleX(.4); }
      .burger.is-open .b { transform: translate(12px,12px) rotate(-45deg) translate(-12px,-12px); }
    `}</style>

    {/* все три линии лежат на y=12, а «бургер» создаём сдвигами */}
    <line
      className="t"
      x1="4"
      y1="12"
      x2="20"
      y2="12"
    />
    <line
      className="m"
      x1="4"
      y1="12"
      x2="20"
      y2="12"
    />
    <line
      className="b"
      x1="4"
      y1="12"
      x2="20"
      y2="12"
    />
  </svg>
)
