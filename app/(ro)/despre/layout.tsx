import type { ReactNode } from 'react'

export default function DespreLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        #beyond-roles .beyondRolesHeader {
          width: 100%;
          padding-bottom: 30px;
          margin-bottom: clamp(34px, 4vw, 46px);
          border-bottom: 1px solid rgba(83, 99, 107, 0.34);
        }

        #beyond-roles .beyondRolesTitle {
          max-width: 1040px;
          font-size: clamp(3rem, 4.7vw, 4.9rem);
          line-height: 1.01;
          letter-spacing: -0.045em;
        }

        #beyond-roles .beyondRolesBody {
          display: grid;
          grid-template-columns: 190px minmax(360px, 540px) 190px;
          column-gap: clamp(34px, 4vw, 58px);
          align-items: center;
          justify-content: center;
        }

        #beyond-roles .beyondRolesPhoto {
          display: block;
          width: 190px;
          height: 238px;
          object-fit: cover;
          object-position: center;
        }

        #beyond-roles .beyondRolesText {
          max-width: 520px;
          margin: 0;
          color: #53636b;
          font-size: clamp(17px, 1.25vw, 19px);
          line-height: 1.8;
        }

        @media (max-width: 980px) {
          #beyond-roles .beyondRolesBody {
            grid-template-columns: 155px minmax(300px, 1fr) 155px;
            column-gap: 28px;
          }

          #beyond-roles .beyondRolesPhoto {
            width: 155px;
            height: 194px;
          }

          #beyond-roles .beyondRolesTitle {
            font-size: clamp(2.8rem, 6vw, 4rem);
          }
        }

        @media (max-width: 760px) {
          #beyond-roles .beyondRolesHeader {
            padding-bottom: 24px;
            margin-bottom: 28px;
          }

          #beyond-roles .beyondRolesTitle {
            font-size: clamp(2.7rem, 12vw, 4rem);
            line-height: 1.02;
          }

          #beyond-roles .beyondRolesBody {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 18px 14px;
          }

          #beyond-roles .beyondRolesPhoto {
            width: 100%;
            height: auto;
            aspect-ratio: 4 / 5;
            object-fit: cover;
          }

          #beyond-roles .beyondRolesText {
            grid-column: 1 / -1;
            grid-row: 2;
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
