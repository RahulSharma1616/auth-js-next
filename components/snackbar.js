"use client";

import { useEffect, useState } from "react";

export default function Snackbar({ message, duration = 4000 }) {
	const [show, setShow] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setShow(false), duration);
		return () => clearTimeout(timer);
	}, [duration]);

	if (!show) return null;

	return (
		<>
			<div className="snackbar">{message}</div>

			<style>{`
        .snackbar {
          position: fixed;
          left: 50%;
          bottom: 20px;
          transform: translateX(-50%);
          background: #f63030;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          box-shadow:
          0 4px 12px rgba(223, 14, 14, 0.51),
            0 8px 24px rgba(215, 42, 12, 0.58);
          font-weight: 500;
          z-index: 1000;
          animation: slideSnackbar ${duration}ms ease-in-out forwards;
        }

        @keyframes slideSnackbar {
          0% {
            transform: translateX(calc(-50vw - 100%));
            opacity: 0;
          }

          10% {
            transform: translateX(-50%);
            opacity: 1;
          }

          90% {
            transform: translateX(-50%);
            opacity: 1;
          }

          100% {
            transform: translateX(calc(50vw + 100%));
            opacity: 1;
          }
        }
      `}</style>
		</>
	);
}
