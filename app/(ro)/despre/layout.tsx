import type { ReactNode } from 'react'

export default function DespreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        #beyond-roles > div {
          display: grid;
          grid-template-columns: minmax(150px, 175px) minmax(0, 560px) minmax(150px, 175px);
          gap: clamp(34px, 5vw, 68px);
          align-items: center;
          justify-content: center;
          margin-bottom: 0;
        }

        #beyond-roles > div > div {
          grid-column: 1 / -1;
          grid-row: 1;
          padding-bottom: clamp(28px, 3vw, 38px);
          margin-bottom: clamp(10px, 1vw, 16px);
          border-bottom: 1px solid rgba(83, 99, 107, 0.34);
        }

        #beyond-roles > div > p {
          grid-column: 2;
          grid-row: 2;
          align-self: center;
          max-width: 560px;
          margin: 0;
          font-size: clamp(17px, 1.35vw, 20px);
          line-height: 1.78;
        }

        #beyond-roles > div::before,
        #beyond-roles > div::after {
          content: '';
          grid-row: 2;
          width: 100%;
          aspect-ratio: 4 / 5;
          background-size: cover;
          background-position: center;
        }

        #beyond-roles > div::before {
          grid-column: 1;
          background-image: url('/media/bogdan-board-game.webp');
        }

        #beyond-roles > div::after {
          grid-column: 3;
          background-image: url('/media/bogdan-cooking-omurice.webp');
        }

        @media (max-width: 980px) {
          #beyond-roles > div {
            grid-template-columns: minmax(125px, 155px) minmax(0, 1fr) minmax(125px, 155px);
            gap: 28px;
          }
        }

        @media (max-width: 700px) {
          #beyond-roles > div {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px 12px;
          }

          #beyond-roles > div > div {
            grid-column: 1 / -1;
            grid-row: 1;
            padding-bottom: 24px;
            margin-bottom: 16px;
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
            padding-top: 18px;
            font-size: 17px;
            line-height: 1.72;
          }
        }
      `}</style>
      {children}
    </>
  )
}
