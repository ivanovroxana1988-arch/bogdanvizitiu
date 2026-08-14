import type { ReactNode } from 'react'

export default function DespreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        #beyond-roles > div {
          display: grid;
          grid-template-columns: 190px minmax(360px, 540px) 190px;
          column-gap: clamp(34px, 4vw, 58px);
          row-gap: clamp(34px, 4vw, 46px);
          align-items: center;
          justify-content: center;
          margin-bottom: 0;
        }

        #beyond-roles > div > div {
          grid-column: 1 / -1;
          grid-row: 1;
          width: 100%;
          padding-bottom: 30px;
          margin-bottom: 0;
          border-bottom: 1px solid rgba(83, 99, 107, 0.34);
        }

        #beyond-roles > div > div h2 {
          max-width: 1040px;
          font-size: clamp(3rem, 4.7vw, 4.9rem);
          line-height: 1.01;
          letter-spacing: -0.045em;
        }

        #beyond-roles > div > p {
          grid-column: 2;
          grid-row: 2;
          align-self: center;
          max-width: 520px;
          margin: 0;
          color: #53636b;
          font-size: clamp(17px, 1.25vw, 19px);
          line-height: 1.8;
        }

        #beyond-roles > div::before,
        #beyond-roles > div::after {
          content: '';
          grid-row: 2;
          width: 100%;
          aspect-ratio: 4 / 5;
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        #beyond-roles > div::before {
          grid-column: 1;
          background-image: url('/media/bogdan-board-game.webp?v=20260814-2');
        }

        #beyond-roles > div::after {
          grid-column: 3;
          background-image: url('/media/bogdan-cooking-omurice.webp');
        }

        @media (max-width: 980px) {
          #beyond-roles > div {
            grid-template-columns: 155px minmax(300px, 1fr) 155px;
            column-gap: 28px;
          }

          #beyond-roles > div > div h2 {
            font-size: clamp(2.8rem, 6vw, 4rem);
          }
        }

        @media (max-width: 760px) {
          #beyond-roles > div {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px 14px;
          }

          #beyond-roles > div > div {
            grid-column: 1 / -1;
            grid-row: 1;
            padding-bottom: 24px;
            margin-bottom: 10px;
          }

          #beyond-roles > div > div h2 {
            font-size: clamp(2.7rem, 12vw, 4rem);
            line-height: 1.02;
          }

          #beyond-roles > div::before {
            grid-column: 1;
            grid-row: 2;
          }

          #beyond-roles > div::after {
            grid-column: 2;
            grid-row: 2;
          }

          #beyond-roles > div > p {
            grid-column: 1 / -1;
            grid-row: 3;
            max-width: none;
            padding-top: 14px;
            font-size: 17px;
            line-height: 1.75;
          }
        }
      `}</style>
      {children}
    </>
  )
}
